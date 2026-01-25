/**
 * FAQ Component Metadata (v2)
 *
 * Collapsible frequently asked questions.
 */
export default {
  title: 'FAQ Section',
  description: 'Collapsible frequently asked questions',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory text above the questions',
    items: 'Questions (H3 = question, paragraphs = answer)',
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
      params: { layout: 'single', expandFirst: true },
    },
    compact: {
      label: 'Two Column',
      params: { layout: 'two-column', expandFirst: false },
    },
  },
}
