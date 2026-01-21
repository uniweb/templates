export default {
  title: 'Content Section',
  description: 'A general content section with title, text, and optional items grid.',
  category: 'Content',

  elements: {
    title: { label: 'Title', required: true },
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
        { value: 'dark', label: 'Dark' },
      ],
      default: 'light',
    },
  },
}
