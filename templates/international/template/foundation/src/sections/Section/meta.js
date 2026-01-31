/**
 * Section Component Metadata (v2)
 *
 * A general content section with title, text, and optional items grid.
 */
export default {
  title: 'Content Section',
  description: 'A general content section with title, text, and optional items grid',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section heading',
    subtitle: 'Secondary heading',
    paragraphs: 'Description text',
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
  },

  presets: {
    default: {
      label: 'Light',
      params: { theme: 'light' },
    },
    gray: {
      label: 'Gray Background',
      params: { theme: 'gray' },
    },
    dark: {
      label: 'Dark',
      params: { theme: 'dark' },
    },
  },
}
