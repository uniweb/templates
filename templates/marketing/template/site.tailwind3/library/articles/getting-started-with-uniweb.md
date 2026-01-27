---
title: Getting Started with Uniweb
excerpt: Learn how to build your first Uniweb site in minutes with our comprehensive getting started guide.
date: 2025-01-15
author:
  name: Sarah Chen
  avatar: https://randomuser.me/api/portraits/women/44.jpg
image: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800
tags: [tutorial, getting-started]
---

## Introduction

Uniweb makes it easy to build beautiful, **content-driven websites**. In this guide, we'll walk through the basics of creating your first site.

> "The best way to learn is by doing. Let's build something together!"

## Prerequisites

Before you begin, make sure you have:

- **Node.js 20** or later installed on your system
- A code editor like [VS Code](https://code.visualstudio.com/)
- Basic familiarity with the command line
- Understanding of *markdown* syntax

## Creating Your Project

Run the following command to create a new Uniweb project:

```bash
npx uniweb create my-site --template marketing
```

This will scaffold a new project with:

1. A **foundation** - your component library
2. A **site** - your content and pages
3. Pre-configured Vite and Tailwind CSS

## Project Structure

After creation, your project will look like this:

```
my-site/
├── foundation/        # Component library
│   └── src/
│       └── components/
├── site/              # Content site
│   ├── pages/         # Page content
│   ├── library/       # Collections (articles, team, etc.)
│   └── public/        # Static assets
└── package.json
```

## Writing Content

Content in Uniweb is written in **Markdown** with YAML frontmatter. Here's an example section:

```markdown
---
type: Hero
theme: gradient
---

# Welcome to My Site

This is the hero section content.

[Get Started](#features)
[Learn More](/about)
```

## Key Concepts

Understanding these concepts will help you work effectively:

| Concept | Description |
|---------|-------------|
| Foundation | A library of React components |
| Site | Content files and configuration |
| Section | A page is made of sections |
| Block | Runtime representation of a section |

## Working with Images

Images can be stored in `site/public/` and referenced by path:

![Example placeholder](/images/placeholder.svg)

For section images, use markdown image syntax:

```markdown
![Hero image](/images/hero-banner.jpg)
```

Images in the public folder are served at the root path, so `/images/hero.jpg` maps to `site/public/images/hero.jpg`.

## Next Steps

Once your project is created:

- Explore the foundation components in `foundation/src/components/`
- Add new pages in `site/pages/`
- Customize the theme in `site/theme.yml`
- Read the [component documentation](/docs/components)

---

*Happy building!* If you have questions, join our [community Discord](https://discord.gg/uniweb) or check out the [GitHub repository](https://github.com/uniweb/cli).
