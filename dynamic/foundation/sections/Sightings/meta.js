export default {
  title: 'Sightings',
  description: 'Community wildlife sightings from iNaturalist',

  content: {
    title: 'Section title',
    paragraphs: 'Description [0-1]',
  },

  // The `content.data` key this section reads — records of an external API, which have no schema.
  data: { sightings: {} },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
