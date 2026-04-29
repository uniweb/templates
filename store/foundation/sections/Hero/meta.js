export default {
  title: 'Hero Banner',
  description: 'Full-width hero with background image, headline, and call-to-action',
  category: 'impact',
  purpose: 'Impress',

  context: {
    allowTranslucentTop: true,
  },

  content: {
    title: 'Main headline',
    paragraphs: 'Description [1]',
    links: 'CTA button [1]',
  },

  params: {},

  presets: {
    default: {
      label: 'Standard Hero',
      params: {},
    },
  },
}
