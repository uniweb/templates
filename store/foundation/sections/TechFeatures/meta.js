export default {
  family: 'features',
  title: 'Tech Features',
  description: 'Feature cards with icons on a dark background',

  content: {
    title: 'Section title',
    paragraphs: 'Description [1]',
    items: {
      label: 'Feature cards [3-6]',
      content: { icon: 'Icon [1]', title: 'Feature', paragraphs: 'Description [1]' },
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
