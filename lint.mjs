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
 *   - package.json "files" array matches manifest order
 *   - A template with a sample site gives it a name, a description and tags,
 *     which is what a site card shows
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

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
const pkg = readJson(join(ROOT, 'package.json'), {})
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

// package.json files array order
const templateSet = new Set(templateNames)
const trailing = (pkg.files || []).filter((f) => !templateSet.has(f))
const expected = [...templateNames, ...trailing]
if (JSON.stringify(pkg.files) !== JSON.stringify(expected)) {
  errors.push(
    `package.json "files" drifts from manifest.\n    expected: ${JSON.stringify(expected)}\n    actual:   ${JSON.stringify(pkg.files)}`
  )
}

if (errors.length > 0) {
  console.error('Template lint errors:')
  for (const e of errors) console.error(`  x ${e}`)
  console.error('')
  console.error(`${errors.length} error(s) found`)
  process.exit(1)
}

console.log(`All templates valid (${templateNames.length} checked)`)
