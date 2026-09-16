export default {
  family: 'spotlight',
  title: 'Split Content',
  description: 'Two-column layout with text and visual',

  content: {
    title: 'Section heading',
    paragraphs: 'Description text [1-2]',
    links: 'Call-to-action buttons [0-2]',
    images: 'Visual image [0-1]',
  },

  starter: {
    title: 'Explain one idea',
    paragraphs: ['Describe it in a sentence or two, then pair it with an image on the other side.'],
    links: [{ text: 'Learn more', href: '#' }],
  },

  params: {
    variant: {
      type: 'select',
      options: ['default', 'flipped'],
      default: 'default',
    },
  },
}
