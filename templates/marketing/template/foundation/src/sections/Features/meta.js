/**
 * Features Component Metadata (v2)
 */
export default {
  title: 'Features Grid',
  description: 'Showcase product features in a responsive grid layout with icons',
  category: 'showcase',
  purpose: 'Explain',

  content: {
    title: 'Section title',
    paragraphs: 'Intro text [1]',
    items: {
      label: 'Feature cards [3-6]',
      hint: 'Each H3 becomes a feature card. Add icon: before H3 for icons.',
    },
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
      options: ['light', 'gray', 'dark'],
      default: 'light',
    },
    style: {
      type: 'select',
      label: 'Style',
      options: ['cards', 'minimal', 'list'],
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
