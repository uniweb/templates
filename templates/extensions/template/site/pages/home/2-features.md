---
type: Features
---

# How Extensions Work

## Secondary foundations contribute section types to your site

### Same Build Process

Extensions are built with the same `@uniweb/build` pipeline as any foundation. No new tools to learn.

### Runtime Loaded

Extensions load via `import()` from a URL. They share React and `@uniweb/core` through import maps.

### Primary Wins

If both the primary foundation and an extension define the same component name, the primary's version is used.

### Theme Aware

Extension components use semantic CSS tokens (`var(--heading)`, `var(--text)`) and automatically adapt to whatever theme the site applies.
