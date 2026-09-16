export default {
  title: 'Donors',
  description: 'Call-to-action section with donor avatars',

  content: {
    title: 'Section title',
    paragraphs: 'Description',
  },

  // The `content.data` key this section reads — records of an external API, which have no schema.
  data: { donors: {} },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
