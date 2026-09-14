export default {
  title: 'Field Note',
  description: 'Full article view for a single field note',
  category: 'content',
  purpose: 'Inform',

  content: {},

  // The `content.data` key this section reads — records of an external API, which have no schema.
  data: { posts: {} },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
