/**
 * Pricing Component Metadata
 */
export default {
  title: 'Pricing Table',
  description: 'Display pricing tiers with features and call-to-action',
  category: 'Commerce',

  elements: {
    title: {
      label: 'Section Title',
      description: 'From H2 in markdown',
    },
    paragraphs: {
      label: 'Section Description',
      description: 'Introductory text',
    },
    subsections: {
      label: 'Pricing Tiers',
      description: 'Each H3 becomes a pricing card. Use lists for features.',
    },
  },

  properties: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'white', label: 'White' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'light',
    },
  },
}
