/**
 * ResearchAreas Component Metadata
 */
export default {
  title: 'Research Areas',
  description: 'Display research focus areas, topics, or expertise',
  category: 'Content',

  elements: {
    title: {
      label: 'Section Title',
    },
    paragraphs: {
      label: 'Description',
    },
    subsections: {
      label: 'Research Areas',
      required: true,
      description: 'Each H3 is an area name. First paragraph is description. Links for related pages.',
    },
  },

  properties: {
    layout: {
      type: 'select',
      label: 'Layout',
      description: 'How to display research areas',
      options: [
        { value: 'cards', label: 'Cards (grid)' },
        { value: 'list', label: 'List (vertical)' },
        { value: 'compact', label: 'Tags (inline)' },
      ],
      default: 'cards',
    },
    showNumbers: {
      type: 'boolean',
      label: 'Show Numbers',
      description: 'Number each research area (list layout only)',
      default: false,
    },
    accentPosition: {
      type: 'select',
      label: 'Accent Position',
      description: 'Position of accent bar on cards',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'top', label: 'Top' },
        { value: 'none', label: 'None' },
      ],
      default: 'left',
    },
  },

  presets: {
    cards: {
      label: 'Research Cards',
      description: 'Areas displayed as cards in a grid',
      properties: { layout: 'cards', accentPosition: 'left' },
    },
    numbered: {
      label: 'Numbered List',
      description: 'Areas as a numbered list',
      properties: { layout: 'list', showNumbers: true },
    },
    tags: {
      label: 'Topic Tags',
      description: 'Compact inline tags for keywords',
      properties: { layout: 'compact' },
    },
  },
}
