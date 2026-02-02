/**
 * Stats Component Metadata (v2)
 */
export default {
  title: 'Stats Section',
  description: 'Display key metrics and statistics in a grid layout',
  category: 'showcase',
  purpose: 'Quantify',

  content: {
    title: 'Section title',
    paragraphs: 'Intro text [1]',
    items: {
      label: 'Stats [3-6]',
      hint: 'Each H3 is the stat value, first paragraph is the label. Add icon: for icons.',
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
      default: 4,
    },
    style: {
      type: 'select',
      label: 'Style',
      options: ['simple', 'cards', 'bordered'],
      default: 'simple',
    },
  },

  presets: {
    default: {
      label: 'Default Stats',
      params: { style: 'simple' },
    },
    cards: {
      label: 'Card Stats',
      params: { style: 'cards' },
    },
  },
}
