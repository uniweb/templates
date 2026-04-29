export default {
  title: 'Split Content',
  description: 'Two-column layout with text and visual',
  category: 'content',

  content: {
    title: 'Section heading',
    paragraphs: 'Description text [1-2]',
    links: 'Call-to-action buttons [0-2]',
    images: 'Visual image [0-1]',
  },

  params: {
    variant: {
      type: 'select',
      options: ['default', 'flipped'],
      default: 'default',
    },
  },
}
