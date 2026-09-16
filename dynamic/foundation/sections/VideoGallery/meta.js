export default {
  family: 'gallery',
  title: 'Video Gallery',
  description: 'YouTube video grid with poster/embed facade',

  content: {
    title: 'Section title',
    paragraphs: 'Description [0-1]',
  },

  // The `content.data` key this section reads. `{}` declares it with no schema.
  data: { videos: {} },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
