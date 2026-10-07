export default {
  title: 'Logbook Entry',
  description: 'One logbook record, on its own page under [...path]',

  content: {},

  // The `content.data` key this section reads — the record of the `logbook` query that the URL
  // names, of '@/logentry'. The key is the query's name, so the query fills it by name;
  // `single: true` holds that one record rather than a list of one — null when there is none.
  data: { logbook: { schema: '@/logentry', single: true } },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
