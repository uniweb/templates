export default {
  title: 'Hero Banner',
  description: 'Full-width hero with background image, headline, and call-to-action',

  // The header lies over this section when it opens a page, see-through until the page scrolls.
  underHeader: true,

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
