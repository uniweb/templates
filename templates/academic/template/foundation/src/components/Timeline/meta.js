/**
 * Timeline Component Metadata
 */
export default {
  title: 'Timeline',
  description: 'Academic career timeline - education, positions, awards',
  category: 'Content',

  elements: {
    title: {
      label: 'Section Title',
    },
    paragraphs: {
      label: 'Description',
    },
    subsections: {
      label: 'Timeline Entries',
      required: true,
      description: 'Each H3 is event title. H4 before H3 is date/period. Paragraphs: institution, description.',
    },
  },

  properties: {
    orientation: {
      type: 'select',
      label: 'Orientation',
      options: [
        { value: 'vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' },
      ],
      default: 'vertical',
    },
    showLine: {
      type: 'boolean',
      label: 'Show Timeline Line',
      description: 'Display connecting line between entries',
      default: true,
    },
    datePosition: {
      type: 'select',
      label: 'Date Position',
      description: 'Where to display dates (vertical only)',
      options: [
        { value: 'left', label: 'Above Title' },
        { value: 'inline', label: 'Inline Left' },
      ],
      default: 'left',
    },
  },

  presets: {
    education: {
      label: 'Education History',
      description: 'Vertical timeline with dates above',
      properties: { orientation: 'vertical', datePosition: 'left' },
    },
    career: {
      label: 'Career Timeline',
      description: 'Vertical with inline dates',
      properties: { orientation: 'vertical', datePosition: 'inline' },
    },
    milestones: {
      label: 'Milestone Overview',
      description: 'Horizontal timeline for key events',
      properties: { orientation: 'horizontal' },
    },
  },
}
