export default {
  title: 'Journal List',
  description: 'Grid of article cards from a content collection',
  category: 'content',
  purpose: 'Organize',

  data: {
    inherit: ['articles'],
    schemas: {
      articles: {
        slug: { type: 'string', default: '' },
        title: { type: 'string', default: '' },
        excerpt: { type: 'string', default: '' },
        date: { type: 'string', default: '' },
        readTime: { type: 'string', default: '' },
        image: { type: 'string', default: '' },
        author: { type: 'string', default: '' },
      },
    },
  },

  content: {
    title: 'Section title',
  },

  params: {
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: 2, label: '2 Columns' },
        { value: 3, label: '3 Columns' },
      ],
      default: 2,
    },
  },

  presets: {
    default: {
      label: 'Two Column Grid',
      params: { columns: 2 },
    },
  },
}
