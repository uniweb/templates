export default {
  title: 'Logbook Entry',
  description: 'One logbook record, on its own page under [...path]',

  content: {},

  // The `content.data` key this section reads — the `logbook` query's records, of '@/logentry'.
  data: { logbook: '@/logentry' },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
