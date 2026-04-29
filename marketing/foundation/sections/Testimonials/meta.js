export default {
  title: 'Testimonials',
  description: 'Customer quotes in a responsive grid',
  category: 'social-proof',

  content: {
    title: 'Optional heading above the quotes',
    paragraphs: 'Optional description [0-1]',
    items: 'Testimonial quotes — each item has a heading (name + role) and a paragraph (the quote) [2-6]',
  },

  params: {
    columns: {
      type: 'select',
      options: ['2', '3', '4'],
      default: '3',
    },
  },

  presets: {
    default: { label: 'Three Columns', params: { columns: '3' } },
    'two-up': { label: 'Two Columns', params: { columns: '2' } },
  },
}
