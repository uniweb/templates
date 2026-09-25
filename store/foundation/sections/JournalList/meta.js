export default {
  family: 'card-grid',
  title: 'Journal List',
  description: 'Grid of article cards from the records of a query',

  data: { articles: '@/post' },

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
