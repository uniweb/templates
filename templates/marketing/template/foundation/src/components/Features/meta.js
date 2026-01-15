/**
 * Features Component Metadata
 */
export default {
  title: 'Features Grid',
  description: 'Showcase product features in a responsive grid layout',
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
      description: 'Each H3 with its content becomes a feature card',
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
  },
}
