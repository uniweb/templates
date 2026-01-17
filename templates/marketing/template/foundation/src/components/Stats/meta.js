/**
 * Stats Component Metadata
 */
export default {
  title: 'Stats Section',
  description: 'Display key metrics and statistics in a grid layout',
  category: 'Content',

  elements: {
    title: {
      label: 'Section Title',
      description: 'Optional heading for the stats section',
    },
    paragraphs: {
      label: 'Section Description',
      description: 'Introductory text for the stats',
    },
    subsections: {
      label: 'Stats',
      description: 'Each H3 is the stat value, first paragraph is the label. Add "icon:name" before H3 for icons.',
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
      description: 'Simple centered stats',
      properties: { theme: 'light', style: 'simple' },
    },
    cards: {
      label: 'Card Stats',
      description: 'Stats in card containers',
      properties: { theme: 'gray', style: 'cards' },
    },
    primary: {
      label: 'Primary Background',
      description: 'Stats on primary color background',
      properties: { theme: 'primary', style: 'simple' },
    },
  },
}
