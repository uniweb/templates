/**
 * PublicationList Component Metadata
 *
 * Domain-specific component for academic publications.
 * Parameters focused on citation formatting and organization, not generic styling.
 */
export default {
  title: 'Publication List',
  description: 'Display academic publications with citation formatting',
  category: 'Content',

  elements: {
    title: {
      label: 'Section Title',
      description: 'Optional heading for the publications section',
    },
    paragraphs: {
      label: 'Description',
      description: 'Introductory text about the publications',
    },
    subsections: {
      label: 'Publications',
      required: true,
      description: 'Each H3 is a publication title. Paragraphs: authors, venue, year. Add type as H4 before H3 (journal, conference, book, preprint).',
    },
  },

  properties: {
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
      description: 'All publications grouped by year with search',
      properties: {
        groupBy: 'year',
        showSearch: true,
        showType: true,
      },
    },
    recent: {
      label: 'Recent Publications',
      description: 'Latest 5 publications without grouping',
      properties: {
        limit: 5,
        groupBy: 'none',
        showSearch: false,
      },
    },
    apa: {
      label: 'APA Citations',
      description: 'Publications formatted as APA citations',
      properties: {
        citationStyle: 'apa',
        showType: false,
      },
    },
  },
}
