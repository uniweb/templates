/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  PASTE YOUR DESIGN HERE
 *
 *  Replace this ENTIRE file with your React design — AI-generated (Gemini,
 *  ChatGPT, Claude) or hand-built. The only rule: keep a default export.
 *
 *      export default function App() {
 *        return ( ...your design... )
 *      }
 *
 *  You don't need to touch anything else:
 *    • The home page (site/pages/home/home.md) already renders this section
 *      via `type: App`.
 *    • `lucide-react` is preinstalled — the icon set most AI tools emit —
 *      so `import { X } from 'lucide-react'` just works.
 *    • The site is SPA-first (site.yml → build.prerender: false), so a design
 *      that reads `window`/`document` while rendering won't crash a build.
 *
 *  Save the file and the dev server hot-reloads. That's Level 0.
 *
 *  Next: split the monolith into real sections, move text into markdown, and
 *  add theming. See "Converting Existing Designs" (Levels 0 → 3) in your
 *  project's AGENTS.md — or ask a coding agent to do the conversion for you.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Sparkles, Clipboard, ArrowUpRight } from 'lucide-react'

// A Uniweb section type receives { content, params, block }. At Level 0 your
// pasted design ignores them and renders its own baked-in JSX — that's fine.
export default function App() {
  const steps = [
    ['Replace this file', 'Drop in your full React design. Keep the default export.'],
    ['Save', 'The dev server hot-reloads instantly — no build step.'],
    ["That's it", 'The home page already renders this section. lucide-react is ready.']
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-6 py-16">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/5 sm:p-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            <Sparkles size={14} /> Level 0 · Paste template
          </span>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your project is ready.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Paste your design into{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800">
              src/sections/App.jsx
            </code>{' '}
            and see it live — no wiring required.
          </p>

          <ol className="mt-8 space-y-4">
            {steps.map(([title, body], i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-slate-900">{title}</div>
                  <div className="mt-0.5 text-sm text-slate-600">{body}</div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <Clipboard size={16} className="mt-0.5 shrink-0 text-slate-400" />
            <span>
              Once it looks right, graduate Levels 1 → 3 — real sections, markdown
              content, then theming. See "Converting Existing Designs" in AGENTS.md.
            </span>
          </div>

          <a
            href="https://github.com/uniweb/docs"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-all hover:gap-2.5"
          >
            Read the conversion guide <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
