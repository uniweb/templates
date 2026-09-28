/**
 * Section Component Metadata (v2)
 *
 * A general content section with title, text, and optional items grid.
 */
export default {
  title: 'Content Section',
  description: 'A general content section with title, text, and optional items grid',

  content: {
    title: 'Section heading',
    subtitle: 'Secondary heading',
    paragraphs: 'Description text',
  },

  params: {
  },

  presets: {
    default: {
      label: 'Light',
      params: { theme: 'light' },
    },
    medium: {
      label: 'Dim',
      params: { theme: 'medium' },
    },
    dark: {
      label: 'Dark',
      params: { theme: 'dark' },
    },
  },
}
