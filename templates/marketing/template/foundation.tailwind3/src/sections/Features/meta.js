/**
 * Features Component Metadata (v2)
 *
 * Showcase product features in a responsive grid layout with icons.
 */
export default {
  title: 'Features Grid',
  description: 'Showcase product features in a responsive grid layout with icons',
  category: 'showcase',
  purpose: 'Explain',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory text [1]',
    items: 'Feature cards (H3 = title, paragraph = description, icon: before H3 for icons)',
  },

  params: {
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: 2, label: '2 Columns' },
        { value: 3, label: '3 Columns' },
        { value: 4, label: '4 Columns' },
      ],
      default: 3,
    },
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
    style: {
      type: 'select',
      label: 'Style',
      options: [
        { value: 'cards', label: 'Cards' },
        { value: 'minimal', label: 'Minimal' },
        { value: 'list', label: 'List' },
      ],
      default: 'cards',
    },
  },

  presets: {
    default: {
      label: 'Feature Cards',
      params: { style: 'cards', columns: 3 },
    },
    minimal: {
      label: 'Minimal Centered',
      params: { style: 'minimal', columns: 3 },
    },
    list: {
      label: 'Icon List',
      params: { style: 'list', columns: 2 },
    },
  },
}
