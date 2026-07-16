# Paste a Design (Level 0)

The fastest way to see an existing React design running inside Uniweb.

You generated a page in a chat AI (Gemini, ChatGPT, Claude) or you have a
hand-built React file. It's one component — nav, hero, sections, footer, all in
one place. This template is a harness for exactly that: paste the file, run,
done.

## Use it

```bash
uniweb create my-site --template paste
cd my-site
pnpm install
pnpm dev
```

Then open `foundation/sections/App.jsx` and **replace the whole file** with your
design. Keep a default export:

```jsx
export default function App() {
  return ( /* ...your design... */ )
}
```

Save — the dev server hot-reloads. That's it.

## What's already wired for you

- **The home page renders your section.** `site/pages/home/home.md` contains
  `type: App`, so `/` shows `App.jsx`. No routing to set up.
- **`lucide-react` is preinstalled** — the icon set most AI tools emit — so
  `import { ArrowRight } from 'lucide-react'` resolves out of the box.
- **Tailwind CSS v4** is configured and scans `sections/` and `components/`.
- **SPA-first** (`site.yml` → `build.prerender: false`). The site renders in the
  browser, so a pasted design that touches `window`/`document` while rendering
  won't crash a build. Flip `prerender: true` once your design is SSR-clean to
  get prerendered static HTML.

## This is a starting point, not the destination

Level 0 gets the design live with zero rewiring, but everything is still one
monolithic component with hardcoded content and colors. When you're ready, the
**"Converting Existing Designs"** guide (in your project's `AGENTS.md`) walks the
path from here:

- **Level 1** — split the monolith into named section types.
- **Level 2** — move text out of JSX into markdown; components read `content`.
- **Level 3** — replace hardcoded colors with semantic tokens; the site's
  `theme.yml` drives the palette.

A coding agent (Claude Code, Codex) can do the conversion for you — the site is
markdown/YAML and the foundation is standard React with a clear contract.
