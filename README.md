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
| blog | [Live Demo](https://uniweb.github.io/templates/blog/) | A blog on the `@std/article` standard schema, with a page for every post |
| dynamic | [Live Demo](https://uniweb.github.io/templates/dynamic/) | Live API data fetching with loading states and transforms |
| store | [Live Demo](https://uniweb.github.io/templates/store/) | Artisan e-commerce with a product catalog and Shopify integration |
| learning | [Live Demo](https://uniweb.github.io/templates/learning/) | Course-based learning site with quizzes and code challenges |
| extensions | [Live Demo](https://uniweb.github.io/templates/extensions/) | Multi-foundation sites with visual effects extension |
| cv-loom | [Live Demo](https://uniweb.github.io/templates/cv-loom/) | An academic CV filled in from profile data with Loom, also downloadable as a Word document |
| monograph | [Live Demo](https://uniweb.github.io/templates/monograph/) | An illustrated long-form document, also downloadable as a Word document |
| academic-metrics | [Live Demo](https://uniweb.github.io/templates/academic-metrics/) | A university unit's publications, funding and supervisions, also downloadable as an Excel workbook |
| business-docs | [Live Demo](https://uniweb.github.io/templates/business-docs/) | Invoices, statements of work and an engagement report, exportable to Excel |
| paste | [Live Demo](https://uniweb.github.io/templates/paste/) | Bring an existing React design into Uniweb by pasting it in |
| services | [Live Demo](https://uniweb.github.io/templates/services/) | A local-services site built around a request-a-quote form |
| conference | [Live Demo](https://uniweb.github.io/templates/conference/) | A conference programme that becomes a web app, with sign-in, when the site has a backend |

## Quick Start

```bash
uniweb create my-project --template marketing
```

Any name in the table works in place of `marketing`. `uniweb template list` prints the official templates your CLI knows.

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

**International** — Multilingual corporate sites demonstrating Uniweb's i18n capabilities. Includes blog, search, and records with English, Spanish, and French translations.

**Dynamic** — Conservation site demonstrating live API data fetching with loading states, transforms, and the portable data pattern.

**Store** — Artisan e-commerce with a product catalog, Shopify Buy Button integration, journal blog, and warm stone-amber design.

**Learning** — Course-based learning platform with auto-detecting lesson types (reading material, quizzes, code challenges, open-ended prompts), sidebar navigation, and AI grading integration point.

**Extensions** — Multi-foundation demo with a primary foundation and a visual effects extension, showing how multiple foundations contribute section types to one site.

**Blog** — Article cards on the home page and a full page for every post, built on the `@std/article` standard data schema: the site supplies its articles as markdown records and needs no schema file of its own.

**CV (Loom + Press)** — An academic CV whose sections are written in markdown with Loom `{placeholder}` expressions, filled in from a single profile at render time, and downloadable as a branded Word document through Press. Ships with Charles Darwin's CV as sample data.

**Monograph** — A richly illustrated long-form document: numbered chapters, figures with captions, data-driven tables and a citestyle bibliography. The same components drive the web preview and a branded `.docx` with headers, footers and page numbers. Ships with Darwin's Galapagos observations as sample content.

**Academic Metrics** — A report whose content is also a downloadable Excel workbook: publications, funding and supervisions aggregated across the members of a university unit, shown as charts and tables on the web and as flat sheets in Excel. Ships with three 19th-century naturalists as sample members.

**Business Documents** — Invoice and statement-of-work records, pages that list them, and a filtered engagement report with XLSX export.

**Paste a Design** — The fastest way to see an existing React design running in Uniweb: replace `sections/App.jsx` with your design and run. `lucide-react`, the icon set most AI tools emit, comes preinstalled.

**Services** — A site for a local trade, such as a plumber or an electrician, built around a quote request form. The form is content, not code: a `yaml:form` block the author designs, drawn by one section type.

**Conference** — A conference programme that works as a static site and becomes a web app when the site has a backend: attendees sign in and record the sessions they attend, and organisers edit and reorder the programme in place. Ships a local backend, so it runs with nothing installed.

## Template Format

Templates use **format 2** — they contain only content (section types, pages, theme, records). The CLI provides all structural scaffolding (package.json, vite.config.js, the site's entry.js, etc.) from its own package templates.

```
marketing/
├── template.json           # Metadata: name, description, format, tags
├── foundation/
│   ├── main.js             # Foundation declarations
│   ├── styles.css          # Foundation styles
│   ├── sections/           # Section type components
│   └── components/         # Components the sections share
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
