export default {
  title: 'Team Grid',
  description: 'Display team members with photos and roles.',
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
  },
}
