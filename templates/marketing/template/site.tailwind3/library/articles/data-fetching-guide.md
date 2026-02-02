---
title: Dynamic Data Fetching Guide
excerpt: Learn how to fetch external data and use it in your Uniweb components.
date: 2025-01-10
author:
  name: Elena Rodriguez
  avatar: https://randomuser.me/api/portraits/women/67.jpg
image: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800
tags: [data, advanced]
---

## Introduction

Uniweb supports fetching data from **local JSON files** or **remote APIs**. This guide covers the data fetching patterns available at different levels of your site.

## Fetch Levels

Data can be fetched at three levels:

| Level | Scope | Use Case |
|-------|-------|----------|
| Site | Entire site | Global data, navigation |
| Page | Single page | Page-specific data |
| Section | Single section | Component data |

## Section-Level Data

Add a `data` property to your section frontmatter to pull from a collection:

```yaml
---
type: Team
data: team
---

# Our Team

Meet the people behind the product.
```

The fetched data is available in `content.data`:

```jsx
export function Team({ content }) {
  const teamMembers = content.data?.team || []

  return (
    <div className="grid grid-cols-3 gap-6">
      {teamMembers.map(member => (
        <TeamCard key={member.id} {...member} />
      ))}
    </div>
  )
}
```

## Page-Level Data

Configure in the page's `page.yml`:

```yaml
title: Blog
data: articles
```

All sections on the page can access this data through **data cascading**.

## Cascading Data

Components opt into inherited data using `inheritData` in their `meta.js`:

```javascript
export default {
  title: 'Blog List',

  // Inherit specific schemas from parent
  inheritData: ['articles'],

  // Or inherit all cascaded data
  // inheritData: true,
}
```

## Local vs Remote Data

Uniweb supports multiple data sources:

- **Local JSON**: Files in `site/public/data/`
- **Remote APIs**: Any public URL returning JSON
- **Collection data**: Markdown files in `site/library/`

```yaml
# Collection shorthand (recommended)
data: team

# Remote API
fetch: https://api.example.com/products
```

## Working with Collections

Collections are powerful for blog posts, team members, products, etc.

### Define in site.yml

```yaml
collections:
  articles:
    path: library/articles
    route: /blog
    sort: date desc

  team:
    path: library/team
    sort: order asc
```

### Access in Components

Collection data cascades automatically to dynamic routes:

```jsx
// On /blog/:slug page
export function Article({ content }) {
  const article = content.data.article

  return (
    <article>
      <h1>{article.title}</h1>
      <time>{article.date}</time>
      <ArticleBody content={article.content} />
    </article>
  )
}
```

## Best Practices

Follow these guidelines for effective data fetching:

1. **Keep data files small** - Large files slow initial load
2. **Use collections** for content that grows over time
3. **Cache remote data** at build time when possible
4. **Validate schemas** to catch data errors early

> **Pro tip**: Use the `data` block in markdown for inline structured data that doesn't need a separate file.

## Inline Data Blocks

For small amounts of structured data, use fenced code blocks:

~~~markdown
```yaml data
items:
  - name: Feature A
    description: First feature
  - name: Feature B
    description: Second feature
```
~~~

Access via `content.data.items` in your component.

---

*Need help?* Check the [API documentation](/docs/api) or ask in our [Discord](https://discord.gg/uniweb).
