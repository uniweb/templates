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
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'gradient', label: 'Gradient' },
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ],
      default: 'gradient',
    },
  },

  presets: {
    default: {
      label: 'Gradient',
      params: { theme: 'gradient' },
    },
    dark: {
      label: 'Dark',
      params: { theme: 'dark' },
    },
    light: {
      label: 'Light',
      params: { theme: 'light' },
    },
  },
}
