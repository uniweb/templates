/**
 * FAQ Component Metadata (v2)
 */
export default {
  title: 'FAQ Section',
  description: 'Collapsible frequently asked questions',
  category: 'showcase',
  purpose: 'Answer',

  content: {
    title: 'Section title',
    paragraphs: 'Intro text [1]',
    items: {
      label: 'Questions [3+]',
      hint: 'Each H3 is a question, paragraphs below are the answer',
    },
  },

  params: {
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
      hint: 'Start with first question expanded',
      default: true,
    },
    autoClose: {
      type: 'boolean',
      label: 'Auto Close',
      hint: 'Close other answers when opening a new one',
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
