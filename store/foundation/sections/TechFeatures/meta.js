export default {
  title: 'Tech Features',
  description: 'Feature cards with icons on a dark background',
  category: 'showcase',
  purpose: 'Explain',

  content: {
    title: 'Section title',
    paragraphs: 'Description [1]',
    items: {
      label: 'Feature cards [3-6]',
      hint: 'Each H3 becomes a feature card. Add an icon before the heading.',
    },
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
  },

  presets: {
    default: {
      label: 'Three Column Features',
      params: { columns: 3 },
    },
  },
}
