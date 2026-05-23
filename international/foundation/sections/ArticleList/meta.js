export default {
  title: 'Article List',
  description: 'Displays a grid of article cards with links to individual posts.',
  category: 'content',
  purpose: 'Organize',

  // Renders article-shaped data (content.data.articles); field defaults come
  // from the '@/article' schema. Delivery is default-on.
  data: { articles: '@/article' },

  content: {
    title: 'Section title',
    subtitle: 'Subtitle text',
    paragraphs: 'Description [0-1]',
  },

  params: {
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: 2, label: '2 Columns' },
        { value: 3, label: '3 Columns' },
      ],
      default: 3,
    },
    showExcerpt: {
      type: 'boolean',
      label: 'Show Excerpt',
      default: true,
    },
    showDate: {
      type: 'boolean',
      label: 'Show Date',
      default: true,
    },
  },

  presets: {
    default: {
      label: 'Three Column Grid',
      params: { columns: 3, showExcerpt: true, showDate: true },
    },
    compact: {
      label: 'Compact Two Column',
      params: { columns: 2, showExcerpt: false, showDate: true },
    },
  },
}
