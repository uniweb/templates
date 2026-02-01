export default {
  title: 'Hero',
  description: 'Split hero with live data widget',
  category: 'impact',
  purpose: 'Impress',

  context: {
    allowTranslucentTop: true,
  },

  content: {
    pretitle: 'Eyebrow text',
    title: 'Main headline',
    paragraphs: 'Supporting description',
    links: 'Call-to-action buttons [1-2]',
  },

  data: { inherit: true },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
