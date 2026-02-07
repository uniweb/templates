# Uniweb Templates

Official starter templates for the [Uniweb](https://github.com/uniweb/cli) CLI. Each template provides content (section types, pages, theme) that the CLI scaffolds into a complete project with foundation and site packages.

## Live Demos

See the templates in action: **[View all demos](https://uniweb.github.io/templates/)**

| Template | Demo | Description |
|----------|------|-------------|
| marketing | [Live Demo](https://uniweb.github.io/templates/marketing/) | Landing pages and marketing sites with Tailwind CSS |
| academic | [Live Demo](https://uniweb.github.io/templates/academic/) | Research labs, departments, and academic portfolios |
| docs | [Live Demo](https://uniweb.github.io/templates/docs/) | Documentation sites with sidebar navigation and syntax highlighting |
| international | [Live Demo](https://uniweb.github.io/templates/international/) | Multilingual sites with i18n (English, Spanish, French) |
| dynamic | [Live Demo](https://uniweb.github.io/templates/dynamic/) | Live API data fetching with loading states and transforms |
| store | [Live Demo](https://uniweb.github.io/templates/store/) | Artisan e-commerce with product collections and Shopify integration |
| extensions | [Live Demo](https://uniweb.github.io/templates/extensions/) | Multi-foundation sites with visual effects extension |

## Quick Start

```bash
npx uniweb@latest create my-project --template marketing
npx uniweb@latest create my-project --template academic
npx uniweb@latest create my-project --template docs
npx uniweb@latest create my-project --template international
npx uniweb@latest create my-project --template dynamic
npx uniweb@latest create my-project --template store
npx uniweb@latest create my-project --template extensions
```

Then:

```bash
cd my-project
pnpm install
pnpm dev
```

## Available Templates

**Marketing** — Product launches, SaaS websites, and business landing pages. Includes Hero, Features, Pricing, Testimonials, and CTA components.

**Academic** — Universities, research labs, and academic portfolios. Designed for researchers and departments to showcase publications and projects.

**Docs** — Technical documentation with navigation levels, sidebar navigation, and code syntax highlighting. Ideal for API references and developer guides.

**International** — Multilingual corporate sites demonstrating Uniweb's i18n capabilities. Includes blog, search, and collections with English, Spanish, and French translations.

**Dynamic** — Conservation site demonstrating live API data fetching with loading states, transforms, and the portable data pattern.

**Store** — Artisan e-commerce with product collections, Shopify Buy Button integration, journal blog, and warm stone-amber design.

**Extensions** — Multi-foundation demo with a primary foundation and a visual effects extension, showing how multiple foundations contribute section types to one site.

## Template Format

Templates use **format 2** — they contain only content (section types, pages, theme, collections). The CLI provides all structural scaffolding (package.json, vite.config.js, main.js, etc.) from its own package templates.

```
marketing/
├── template.json           # Metadata: name, description, format, tags
├── foundation/
│   └── src/
│       ├── foundation.js   # Section exports
│       ├── styles.css      # Foundation styles
│       └── sections/       # Section type components
└── site/
    ├── site.yml.hbs        # Site configuration
    ├── theme.yml            # Theme variables
    ├── layout/              # Header, footer content
    └── pages/               # Page content (markdown)
```

## Creating Your Own Templates

See [creating-templates.md](creating-templates.md) for the full guide on template structure, content directories, and publishing.

## License

MIT
