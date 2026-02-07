export default {
  title: 'Animated Counter',
  description: 'Numbers that count up when scrolled into view',
  category: 'data',

  content: {
    title: 'Section title',
    subtitle: 'Section subtitle',
    items: {
      title: 'Number (e.g., "500+")',
      subtitle: 'Label',
    },
  },

  params: {
    duration: {
      type: 'number',
      label: 'Animation Duration (ms)',
      default: 2000,
    },
  },
}
