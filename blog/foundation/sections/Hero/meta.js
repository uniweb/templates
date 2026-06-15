/**
 * Hero Component Metadata (v2)
 *
 * A bold hero section with headline, description, and call-to-action buttons.
 */
export default {
  title: 'Hero Banner',
  description: 'A bold hero section with headline, description, and call-to-action buttons',
  category: 'impact',
  purpose: 'Impress',

  // Static capabilities for cross-block coordination
  // Header reads this to know Hero supports translucent/floating navbar
  context: {
    allowTranslucentTop: true,
  },

  content: {
    pretitle: 'Eyebrow text',
    title: 'Main headline',
    subtitle: 'Secondary headline',
    paragraphs: 'Supporting description',
    links: 'Call-to-action buttons [1-2]',
  },

  params: {
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { value: 'gradient', label: 'Gradient' },
        { value: 'default', label: 'Default' },
      ],
      default: 'gradient',
    },
  },

  presets: {
    default: {
      label: 'Gradient',
      params: { variant: 'gradient' },
    },
    minimal: {
      label: 'Default',
      params: { variant: 'default' },
    },
  },
}
