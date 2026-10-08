export default {
  title: 'Logbook Entry',
  description: 'One logbook record, on its own page under [...path]',

  content: {},

  // The `content.data` key this section reads — the logbook record the URL names: one record
  // (`single: true`), null when there is none. The page's `logbook` query fills it by its records'
  // type — the logbook's list declares them '@/logentry' (`data: { logbook: '@/logentry' }`), and so
  // does this key.
  data: { entry: { schema: '@/logentry', single: true } },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
