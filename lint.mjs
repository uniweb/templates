#!/usr/bin/env node

/**
 * Template registry lint
 *
 * Validates every template against the registry files at this repo's
 * root. Runs in CI and can be run locally with `node lint.mjs`.
 *
 * Checks:
 *   - Every folder with template.json is listed in manifest.json
 *   - Every manifest entry has a folder with template.json
 *   - @uniweb/* dependencies in template.json use {{version "X"}} helper
 *   - Third-party dependencies match standard-deps.json when listed
 *   - A template with a sample site gives it a name, a description and tags,
 *     which is what a site card shows
 *   - template.json says how to scaffold; the listing is manifest.json's
 *   - README.md's table has a row for every template
 *   - Links in this repo's own docs stay in this repo
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve, sep } from 'node:path'

const ROOT = dirname(fileURLToPath(import.meta.url))

function readJson(path, fallback = null) {
  if (!existsSync(path)) return fallback
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return fallback
  }
}

const manifest = readJson(join(ROOT, 'manifest.json'), { templates: {} })
const standardDeps = readJson(join(ROOT, 'standard-deps.json'), {})

const templateNames = Object.keys(manifest.templates || {})
const errors = []

const folderNames = readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .filter((e) => !e.name.startsWith('.') && !e.name.startsWith('_'))
  .filter((e) => !['node_modules'].includes(e.name))
  .filter((e) => existsSync(join(ROOT, e.name, 'template.json')))
  .map((e) => e.name)

// Manifest <-> folders
for (const name of templateNames) {
  const folder = join(ROOT, name)
  if (!existsSync(folder) || !statSync(folder).isDirectory()) {
    errors.push(`"${name}" listed in manifest.json but ${name}/ folder does not exist`)
  } else if (!existsSync(join(folder, 'template.json'))) {
    errors.push(`${name}/ exists but has no template.json`)
  }
}
for (const name of folderNames) {
  if (!templateNames.includes(name)) {
    errors.push(`${name}/ contains a template.json but "${name}" is not in manifest.json`)
  }
}

// Dependency conventions
for (const name of templateNames) {
  const tpl = readJson(join(ROOT, name, 'template.json'), null)
  if (!tpl || !tpl.dependencies) continue
  for (const [pkgType, deps] of Object.entries(tpl.dependencies)) {
    if (!deps || typeof deps !== 'object') continue
    for (const [depName, value] of Object.entries(deps)) {
      const v = String(value)
      if (depName.startsWith('@uniweb/')) {
        if (!v.includes('{{version')) {
          errors.push(
            `${name}/template.json (${pkgType}): "${depName}" = "${v}" must use {{version "${depName}"}} helper`
          )
        }
      } else if (depName in standardDeps && v !== standardDeps[depName]) {
        errors.push(
          `${name}/template.json (${pkgType}): "${depName}" = "${v}" differs from standard-deps.json ("${standardDeps[depName]}")`
        )
      }
    }
  }
}

// template.json says how to scaffold; the listing is manifest.json's
//
// A template's name, description and tags were kept in both files, and by
// 2026-10-08 they disagreed in fifteen of sixteen templates. manifest.json holds
// the listing — the `create` picker, `uniweb template list` and the release
// notes read it. template.json keeps what the scaffold reads, `name` included:
// every CLI's validator requires one, so it must be the manifest's.
for (const name of templateNames) {
  const tpl = readJson(join(ROOT, name, 'template.json'), null)
  if (!tpl) continue
  const listed = manifest.templates[name]?.name
  if (tpl.name !== listed) {
    errors.push(`${name}/template.json: name "${tpl.name}" differs from manifest.json ("${listed}")`)
  }
  for (const key of ['description', 'tags']) {
    if (key in tpl) {
      errors.push(`${name}/template.json: "${key}" belongs in manifest.json, where the listing is read`)
    }
  }
  for (const key of ['compatible', 'uniweb']) {
    if (key in tpl) {
      errors.push(
        `${name}/template.json: "${key}" is not read — a CLI downloads the templates release it was published with`
      )
    }
  }
}

// README.md's table has a row for every template
//
// It listed eight of sixteen until 2026-10-08: nothing failed when a template
// was added without one.
const readme = existsSync(join(ROOT, 'README.md')) ? readFileSync(join(ROOT, 'README.md'), 'utf8') : ''
for (const name of templateNames) {
  if (!new RegExp(`^\\| ${name} \\|`, 'm').test(readme)) {
    errors.push(`README.md: the templates table has no row for "${name}"`)
  }
}

// Links in this repo's own docs stay in this repo
//
// The repo is published on its own, so a relative link that climbs out of it
// (`../../unipress/…`) points at a sibling checkout no reader has: link a public
// URL. Code is skipped, and so is a site's content (pages, records, layout),
// whose paths the site build resolves.
const docFiles = ['README.md', 'creating-templates.md', ...templateNames.map((n) => `${n}/README.md`)]
for (const file of docFiles.filter((f) => existsSync(join(ROOT, f)))) {
  const prose = readFileSync(join(ROOT, file), 'utf8')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '')
  for (const [, target] of prose.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    // A URL, an anchor, a site-root path, an @Component inset
    if (/^(?:[a-z][a-z0-9+.-]*:|#|\/|@)/i.test(target)) continue
    const path = target.split('#')[0]
    if (!path) continue
    const at = resolve(dirname(join(ROOT, file)), decodeURI(path))
    if (!at.startsWith(ROOT + sep)) {
      errors.push(`${file}: link "${target}" leaves this repo — link a public URL instead`)
    } else if (!existsSync(at)) {
      errors.push(`${file}: link "${target}" points at nothing in this repo`)
    }
  }
}

// Site card: name, description, tags
//
// An app that offers a template shows it as a card read from the sample site's
// own site.yml — `name` is the title and the default name of a site made from
// it, `description` the line under it, `tags` its categories. A `{{projectName}}`
// placeholder would name every site after its project folder instead.
//
// Tags must be standard ids from `@uniweb/schemas/site-tags`. This lint runs
// with nothing installed, so it checks their form here, not the vocabulary.
const topLevelLine = (text, key) => text.match(new RegExp(`^${key}:(.*)$`, 'm'))?.[1]?.trim()
for (const name of templateNames) {
  const siteDir = join(ROOT, name, 'site')
  if (!existsSync(siteDir)) continue
  const file = ['site.yml.hbs', 'site.yml'].map((f) => join(siteDir, f)).find(existsSync)
  if (!file) {
    errors.push(`${name}/site has no site.yml`)
    continue
  }
  const text = readFileSync(file, 'utf8')
  for (const key of ['name', 'description']) {
    const value = topLevelLine(text, key)
    if (!value) errors.push(`${name}/site: site.yml needs a \`${key}:\` for the site card`)
    else if (value.includes('{{')) errors.push(`${name}/site: \`${key}:\` is a placeholder — give the template its own`)
  }
  const tags = topLevelLine(text, 'tags')
  const list = tags?.match(/^\[(.*)\]$/)?.[1]
  const ids = list?.split(',').map((t) => t.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
  if (!ids?.length) {
    errors.push(`${name}/site: site.yml needs \`tags: [id, …]\` (standard ids from @uniweb/schemas/site-tags)`)
  } else {
    for (const id of ids) {
      if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(id)) errors.push(`${name}/site: tag "${id}" is not a kebab-case id`)
    }
  }
}

if (errors.length > 0) {
  console.error('Template lint errors:')
  for (const e of errors) console.error(`  x ${e}`)
  console.error('')
  console.error(`${errors.length} error(s) found`)
  process.exit(1)
}

console.log(`All templates valid (${templateNames.length} checked)`)
