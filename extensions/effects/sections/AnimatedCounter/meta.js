export default {
  title: 'Animated Counter',
  description: 'Numbers that count up when scrolled into view',

  content: {
    title: 'Section title',
    subtitle: 'Section subtitle',
    items: {
      label: 'Counters',
      content: {
        title: 'Number (e.g., "500+")',
        paragraphs: 'Label [1]',
      },
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
