/**
 * Pricing Component Metadata (v2)
 *
 * Display pricing tiers with features and call-to-action.
 */
export default {
  title: 'Pricing Table',
  description: 'Display pricing tiers with features and call-to-action',
  category: 'showcase',
  purpose: 'Compare',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory text',
    items: 'Pricing tiers (H3 = tier name, list = features, link = CTA)',
  },

  params: {
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

  presets: {
    default: {
      label: 'Light Background',
      params: { theme: 'light' },
    },
    white: {
      label: 'White Background',
      params: { theme: 'white' },
    },
    dark: {
      label: 'Dark Background',
      params: { theme: 'dark' },
    },
  },
}
