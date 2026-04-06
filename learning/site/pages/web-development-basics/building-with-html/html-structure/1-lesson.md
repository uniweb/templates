---
type: Lesson
---

Every HTML document follows the same basic structure. Understanding this structure is essential — it's the foundation that every webpage is built on.

An HTML document is made of **elements**, written with angle-bracket tags:

```html
<tagname>Content goes here</tagname>
```

Most elements have an opening tag (`<p>`) and a closing tag (`</p>`). Some are self-closing (`<img />`, `<br />`). Elements can be nested inside each other, creating a tree structure:

```html
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is my first paragraph.</p>
  </body>
</html>
```

The key structural elements are:

- **`<html>`** — the root element that wraps everything
- **`<head>`** — metadata about the page (title, character set, linked stylesheets)
- **`<body>`** — the visible content of the page
- **`<h1>` to `<h6>`** — headings, from most important to least
- **`<p>`** — paragraphs of text
- **`<a href="...">`** — links to other pages
- **`<img src="..." alt="...">`** — images
- **`<div>`** — a generic container for grouping elements
- **`<ul>` / `<ol>` / `<li>`** — unordered and ordered lists

**Attributes** provide additional information about elements. They appear in the opening tag:

```html
<a href="https://example.com" target="_blank">Visit Example</a>
<img src="photo.jpg" alt="A description of the photo" />
```

The most common attributes are `href` (link destination), `src` (resource path), `alt` (alternative text for accessibility), `class` (CSS styling hook), and `id` (unique identifier).

Proper HTML structure isn't just about making pages work — it's about making them **accessible**. Screen readers, search engines, and other tools rely on correct structure to understand your content. A heading (`<h1>`) tells these tools "this is the most important title on the page." A `<div>` tells them nothing.

---

## Challenge: Fix the broken HTML

The HTML below has several structural problems — missing document boilerplate, incorrect heading hierarchy, invalid nesting, and accessibility issues. Fix all the errors in the editor.

```html
<html>
<body>
  <h3>Welcome to My Site</h3>
  <div>This is the introduction to my website.</div>
  <h1>About Me</h1>
  <p>I enjoy <a href="https://example.com">hiking, reading, and <p>cooking</p></a>.</p>
  <img src="photo.jpg">
</body>
</html>
```

```yaml:requirements
- Add the missing document structure (DOCTYPE, head, meta charset, title)
- Fix the heading hierarchy so it follows logical order
- Fix the invalid nesting (p inside a inside p)
- Add an alt attribute to the img element
- Use semantic elements where appropriate (p instead of div for text)
```

```yaml:rubric
- Includes DOCTYPE declaration, head element with meta charset and title
- Headings follow logical order (h1 first, then h2 or h3 as needed)
- No invalid nesting — inline elements don't contain block elements
- The img element has a descriptive alt attribute
- Uses semantic elements (p for paragraph text instead of div)
```
