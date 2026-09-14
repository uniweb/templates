export default {
  title: 'Field Notes',
  description: 'Blog-style cards from a remote API',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section title',
    paragraphs: 'Description [0-1]',
  },

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
