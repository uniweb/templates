export default {
  title: 'Logbook List',
  description: 'Records placed in folders, grouped by placement, each linking to its own URL',

  content: {
    title: 'Section title',
    paragraphs: 'Introduction [0-1]',
  },

  // The `content.data` key this section reads. `{}` declares it with no schema.
  data: { logbook: {} },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
