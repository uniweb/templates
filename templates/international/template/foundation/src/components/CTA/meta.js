export default {
  title: 'Call to Action',
  description: 'A prominent call-to-action section.',
  category: 'Content',

  elements: {
    title: { label: 'Title', required: true },
    subtitle: { label: 'Subtitle' },
    paragraphs: { label: 'Description' },
    links: { label: 'Button' },
  },

  properties: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ],
      default: 'primary',
    },
  },
}
