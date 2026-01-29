# Uniweb Templates

Official starter templates for the [Uniweb](https://github.com/uniweb/cli) CLI. Each template scaffolds a complete project with a foundation (component library) and site, ready to develop and deploy.

## Live Demos

See the templates in action: **[View all demos](https://uniweb.github.io/templates/)**

| Template | Demo | Description |
|----------|------|-------------|
| marketing | [Live Demo](https://uniweb.github.io/templates/marketing/) | Landing pages and marketing sites with Tailwind CSS |
| academic | [Live Demo](https://uniweb.github.io/templates/academic/) | Research labs, departments, and academic portfolios |
| docs | [Live Demo](https://uniweb.github.io/templates/docs/) | Documentation sites with sidebar navigation and syntax highlighting |
| international | [Live Demo](https://uniweb.github.io/templates/international/) | Multilingual sites with i18n (English, Spanish, French) |

## Quick Start

```bash
npx uniweb@latest create my-project --template marketing
npx uniweb@latest create my-project --template academic
npx uniweb@latest create my-project --template docs
npx uniweb@latest create my-project --template international
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

## Creating Your Own Templates

See [docs/creating-templates.md](docs/creating-templates.md) for the full guide on template structure, Handlebars processing, variant support, and publishing.

## License

MIT
