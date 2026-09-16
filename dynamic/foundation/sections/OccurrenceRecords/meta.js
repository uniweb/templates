export default {
  title: 'Occurrence Records',
  description: 'Biodiversity occurrence records from GBIF',

  content: {
    title: 'Section title',
    paragraphs: 'Description [0-1]',
  },

  // The `content.data` key this section reads — records of an external API, which have no schema.
  data: { occurrences: {} },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
