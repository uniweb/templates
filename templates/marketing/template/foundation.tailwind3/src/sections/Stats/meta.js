/**
 * Stats Component Metadata (v2)
 *
 * Display key metrics and statistics in a grid layout.
 */
export default {
  title: 'Stats Section',
  description: 'Display key metrics and statistics in a grid layout',
  category: 'showcase',
  purpose: 'Impress',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory text',
    items: 'Statistics (H3 = value, paragraph = label, icon: before H3 for icons)',
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'gray', label: 'Gray' },
        { value: 'dark', label: 'Dark' },
        { value: 'primary', label: 'Primary' },
      ],
      default: 'light',
    },
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
      options: [
        { value: 'simple', label: 'Simple' },
        { value: 'cards', label: 'Cards' },
        { value: 'bordered', label: 'Bordered' },
      ],
      default: 'simple',
    },
  },

  presets: {
    default: {
      label: 'Default Stats',
      params: { theme: 'light', style: 'simple' },
    },
    cards: {
      label: 'Card Stats',
      params: { theme: 'gray', style: 'cards' },
    },
    primary: {
      label: 'Primary Background',
      params: { theme: 'primary', style: 'simple' },
    },
  },
}
