export default {
  title: 'Article List',
  description: 'Displays a grid of article cards with links to individual posts.',
  category: 'content',
  purpose: 'Organize',

  // Inherit articles data from page-level fetch
  inheritData: ['articles'],

  schemas: {
    articles: {
      slug: { type: 'string', default: '' },
      title: { type: 'string', default: '' },
      excerpt: { type: 'string', default: '' },
      date: { type: 'string', default: '' },
      image: { type: 'string', default: '' },
      tags: { type: 'array', default: [] },
    },
  },

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
