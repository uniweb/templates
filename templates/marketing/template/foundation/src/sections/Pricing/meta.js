/**
 * Pricing Component Metadata (v2)
 */
export default {
  title: 'Pricing Table',
  description: 'Display pricing tiers with features, toggle, and call-to-action',
  category: 'showcase',
  purpose: 'Compare',

  content: {
    title: 'Section title',
    paragraphs: 'Intro text [1]',
    items: {
      label: 'Pricing tiers [2-4]',
      hint: 'Each H3 becomes a pricing card. Use lists for features. Or use yaml:pricing code block for structured data.',
    },
  },

  // Data configuration: accept tagged YAML pricing data
  data: {
    inherit: ['pricing'],
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: ['light', 'white', 'dark'],
      default: 'light',
    },
    showToggle: {
      type: 'boolean',
      label: 'Show Billing Toggle',
      default: true,
    },
    defaultBilling: {
      type: 'select',
      label: 'Default Billing Period',
      options: ['monthly', 'annual'],
      default: 'annual',
    },
    currency: {
      type: 'string',
      label: 'Currency Symbol',
      default: '$',
    },
    annualDiscount: {
      type: 'string',
      label: 'Annual Discount Label',
      default: 'Save 20%',
    },
  },
}
