export default {
  title: 'Features Grid',
  description: 'Display features or services in a grid layout.',
  category: 'Content',

  elements: {
    title: { label: 'Title' },
    subtitle: { label: 'Subtitle' },
    paragraphs: { label: 'Description' },
  },

  properties: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'gray', label: 'Gray' },
      ],
      default: 'light',
    },
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: '2', label: '2 Columns' },
        { value: '3', label: '3 Columns' },
        { value: '4', label: '4 Columns' },
      ],
      default: '3',
    },
  },
}
