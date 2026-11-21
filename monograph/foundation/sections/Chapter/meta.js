export default {
  title: 'Chapter',
  family: 'article',
  description:
    'A numbered chapter of the document and of its web preview: a heading, its opening paragraphs (the first with a drop cap), and numbered subsections, each a ## heading with its paragraphs. `bullets:` or `observations:` in its frontmatter, each a list of lines, ends it with a bulleted or a numbered list.',

  content: {
    title: 'Chapter heading',
    paragraphs: 'Opening paragraphs',
    items: {
      label: 'Subsections [0+]',
      content: { title: 'Subsection heading', paragraphs: 'Its paragraphs' },
    },
  },

  params: {
    key: {
      type: 'string',
      label: 'Chapter key',
      hint: 'Names the chapter, so the document options can leave it out',
    },
  },
}
