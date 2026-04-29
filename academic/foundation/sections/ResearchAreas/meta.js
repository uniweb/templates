/**
 * ResearchAreas Component Metadata (v2)
 *
 * Display research focus areas, topics, or expertise.
 */
export default {
  title: 'Research Areas',
  description: 'Display research focus areas, topics, or expertise',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory description',
    items: 'Research areas (H3 = area name, paragraph = description, links = related pages)',
  },

  params: {
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
      params: { layout: 'cards', accentPosition: 'left' },
    },
    numbered: {
      label: 'Numbered List',
      params: { layout: 'list', showNumbers: true },
    },
    tags: {
      label: 'Topic Tags',
      params: { layout: 'compact' },
    },
  },
}
