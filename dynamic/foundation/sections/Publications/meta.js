export default {
  title: 'Publications',
  description: 'Research paper listings from CrossRef API',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section title',
    paragraphs: 'Description [0-1]',
  },

  // The `content.data` key this section reads — records of an external API, which have no schema.
  data: { papers: {} },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
