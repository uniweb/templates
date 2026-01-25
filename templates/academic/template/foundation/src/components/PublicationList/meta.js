/**
 * PublicationList Component Metadata (v2)
 *
 * Domain-specific component for academic publications.
 */
export default {
  title: 'Publication List',
  description: 'Display academic publications with citation formatting',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory text about the publications',
    items: 'Publications (H3 = title, paragraphs = authors/venue/year, H4 before = type)',
  },

  params: {
    citationStyle: {
      type: 'select',
      label: 'Citation Style',
      description: 'How to format publication citations',
      options: [
        { value: 'detailed', label: 'Detailed (title prominent)' },
        { value: 'apa', label: 'APA-style (inline citation)' },
      ],
      default: 'detailed',
    },
    groupBy: {
      type: 'select',
      label: 'Group By',
      description: 'How to organize publications',
      options: [
        { value: 'none', label: 'No grouping' },
        { value: 'year', label: 'By Year' },
      ],
      default: 'none',
    },
    showType: {
      type: 'boolean',
      label: 'Show Publication Type',
      description: 'Display color-coded publication type indicators',
      default: true,
    },
    showSearch: {
      type: 'boolean',
      label: 'Enable Search',
      description: 'Show search box to filter publications',
      default: false,
    },
    limit: {
      type: 'select',
      label: 'Limit',
      description: 'Maximum number of publications to show (0 = all)',
      options: [
        { value: 0, label: 'Show All' },
        { value: 5, label: 'Recent 5' },
        { value: 10, label: 'Recent 10' },
      ],
      default: 0,
    },
  },

  presets: {
    full: {
      label: 'Full List',
      params: { groupBy: 'year', showSearch: true, showType: true },
    },
    recent: {
      label: 'Recent Publications',
      params: { limit: 5, groupBy: 'none', showSearch: false },
    },
    apa: {
      label: 'APA Citations',
      params: { citationStyle: 'apa', showType: false },
    },
  },
}
