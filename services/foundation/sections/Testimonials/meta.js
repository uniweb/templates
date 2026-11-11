export default {
  title: 'Testimonials',
  description: 'What customers said, as a grid of short quotes with attribution',

  content: {
    title: 'Section heading',
    items: {
      label: 'Quotes',
      content: { title: 'Name', subtitle: 'Role or company', paragraphs: 'Quote [1]' },
    },
  },

  params: {
    columns: {
      type: 'number',
      label: 'Columns',
      default: 3,
    },
  },
}
