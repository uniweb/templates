/**
 * Testimonials Component Metadata (v2)
 *
 * Display customer quotes and social proof.
 */
export default {
  title: 'Testimonials',
  description: 'Display customer quotes and social proof',
  category: 'showcase',
  purpose: 'Trust',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory text',
    items: 'Testimonials (H3 = name, paragraphs = quote/role, image = avatar)',
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'gray', label: 'Gray' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'light',
    },
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: 2, label: '2 Columns' },
        { value: 3, label: '3 Columns' },
      ],
      default: 3,
    },
  },

  presets: {
    default: {
      label: '3 Columns',
      params: { theme: 'light', columns: 3 },
    },
    twoColumn: {
      label: '2 Columns',
      params: { theme: 'light', columns: 2 },
    },
    dark: {
      label: 'Dark Background',
      params: { theme: 'dark', columns: 3 },
    },
  },
}
