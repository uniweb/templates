/**
 * Hero Component Metadata (v2)
 *
 * A bold hero section with headline, description, and call-to-action buttons.
 */
export default {
  title: 'Hero Banner',
  description: 'A bold hero section with headline, description, and call-to-action buttons',

  // The header lies over this section when it opens a page, see-through until the page scrolls.
  underHeader: true,

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
