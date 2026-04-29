/**
 * PublicationList Component Metadata (v2)
 *
 * Domain-specific component for academic publications.
 * Uses @uniweb/scholar for professional citation formatting.
 */
export default {
  title: 'Publication List',
  description: 'Display academic publications with citation formatting',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory text about the publications',
    items: 'Publications (H3 = title, paragraphs = authors/venue/year/doi, H4 before = type)',
  },

  params: {
    citationStyle: {
      type: 'select',
      label: 'Citation Style',
      description: 'How to format publication citations',
      options: [
        { value: 'detailed', label: 'Detailed (title prominent)' },
        { value: 'apa', label: 'APA 7th Edition' },
        { value: 'mla', label: 'MLA 9th Edition' },
        { value: 'chicago', label: 'Chicago Author-Date' },
        { value: 'ieee', label: 'IEEE (numeric)' },
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
    showCiteButton: {
      type: 'boolean',
      label: 'Show Cite Button',
      description: 'Show button to copy citation in various formats',
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
      params: { groupBy: 'year', showSearch: true, showType: true, showCiteButton: true },
    },
    recent: {
      label: 'Recent Publications',
      params: { limit: 5, groupBy: 'none', showSearch: false, showCiteButton: false },
    },
    apa: {
      label: 'APA Citations',
      params: { citationStyle: 'apa', showType: false, showCiteButton: true },
    },
    mla: {
      label: 'MLA Citations',
      params: { citationStyle: 'mla', showType: false, showCiteButton: true },
    },
    ieee: {
      label: 'IEEE Citations',
      params: { citationStyle: 'ieee', showType: false, showCiteButton: true },
    },
  },
}
