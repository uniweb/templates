/**
 * Pricing Component Metadata (v2)
 */
export default {
  title: 'Pricing Table',
  description: 'Display pricing tiers with features and call-to-action',
  category: 'showcase',
  purpose: 'Compare',

  content: {
    title: 'Section title',
    paragraphs: 'Intro text [1]',
    items: {
      label: 'Pricing tiers [2-4]',
      hint: 'Each H3 becomes a pricing card. Use lists for features.',
    },
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: ['light', 'white', 'dark'],
      default: 'light',
    },
  },
}
