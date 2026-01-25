/**
 * Features Component Metadata (v2)
 *
 * Display features or services in a grid layout.
 */
export default {
  title: 'Features Grid',
  description: 'Display features or services in a grid layout',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section heading',
    subtitle: 'Secondary heading',
    paragraphs: 'Description text',
    items: 'Feature cards (H3 = title, paragraph = description, icon = visual)',
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'gray', label: 'Gray' },
      ],
      default: 'light',
    },
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: '2', label: '2 Columns' },
        { value: '3', label: '3 Columns' },
        { value: '4', label: '4 Columns' },
      ],
      default: '3',
    },
  },

  presets: {
    default: {
      label: '3 Columns',
      params: { theme: 'light', columns: '3' },
    },
    twoColumn: {
      label: '2 Columns',
      params: { theme: 'light', columns: '2' },
    },
    fourColumn: {
      label: '4 Columns',
      params: { theme: 'gray', columns: '4' },
    },
  },
}
