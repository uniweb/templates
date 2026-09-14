export default {
  title: 'Logbook Entry',
  description: 'One logbook record, on its own page under [...path]',
  category: 'content',
  purpose: 'Inform',

  content: {},

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
