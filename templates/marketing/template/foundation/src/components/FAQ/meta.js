/**
 * FAQ Component Metadata
 */
export default {
  title: 'FAQ Section',
  description: 'Collapsible frequently asked questions',
  category: 'Content',

  elements: {
    title: {
      label: 'Section Title',
      description: 'Heading for the FAQ section',
    },
    paragraphs: {
      label: 'Section Description',
      description: 'Introductory text above the questions',
    },
    subsections: {
      label: 'Questions',
      required: true,
      description: 'Each H3 is a question, paragraphs below are the answer',
    },
  },

  properties: {
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
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'single', label: 'Single Column' },
        { value: 'two-column', label: 'Two Columns' },
      ],
      default: 'single',
    },
    expandFirst: {
      type: 'boolean',
      label: 'Expand First',
      description: 'Start with first question expanded',
      default: true,
    },
  },

  presets: {
    default: {
      label: 'Standard FAQ',
      description: 'Single column with first expanded',
      properties: { layout: 'single', expandFirst: true },
    },
    compact: {
      label: 'Two Column',
      description: 'Questions in two columns',
      properties: { layout: 'two-column', expandFirst: false },
    },
  },
}
