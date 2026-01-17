/**
 * Features Component Metadata
 */
export default {
  title: 'Features Grid',
  description: 'Showcase product features in a responsive grid layout with icons',
  category: 'Content',

  elements: {
    title: {
      label: 'Section Title',
      description: 'From H2 in markdown',
    },
    paragraphs: {
      label: 'Section Description',
      description: 'Introductory text for the features section',
    },
    subsections: {
      label: 'Features',
      description: 'Each H3 with its content becomes a feature card. Add "icon:name" before H3 for icons (zap, file, palette, mobile, search, rocket, shield, clock, globe, users, chart, settings).',
    },
  },

  properties: {
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
      description: 'Features in card containers',
      properties: { style: 'cards', columns: 3 },
    },
    minimal: {
      label: 'Minimal Centered',
      description: 'Clean centered layout',
      properties: { style: 'minimal', columns: 3 },
    },
    list: {
      label: 'Icon List',
      description: 'Compact list with icons',
      properties: { style: 'list', columns: 2 },
    },
  },
}
