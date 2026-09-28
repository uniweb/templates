/**
 * Section Component Metadata (v2)
 *
 * Layout container with background and spacing options.
 */
export default {
  title: 'Section',
  description: 'Layout container with background and spacing options',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory description',
  },

  params: {
    padding: {
      type: 'select',
      label: 'Vertical Padding',
      options: [
        { value: 'none', label: 'None' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' },
      ],
      default: 'lg',
    },
    maxWidth: {
      type: 'select',
      label: 'Max Width',
      options: [
        { value: 'narrow', label: 'Narrow' },
        { value: 'regular', label: 'Regular' },
        { value: 'wide', label: 'Wide' },
        { value: 'full', label: 'Full Width' },
      ],
      default: 'regular',
    },
  },

  presets: {
    default: {
      label: 'Standard',
      params: { padding: 'lg', maxWidth: 'regular' },
    },
    highlight: {
      label: 'Highlighted',
      params: { theme: 'medium', padding: 'lg', maxWidth: 'regular' },
    },
    dark: {
      label: 'Dark',
      params: { theme: 'dark', padding: 'lg', maxWidth: 'regular' },
    },
  },
}
