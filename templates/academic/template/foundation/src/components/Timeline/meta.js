/**
 * Timeline Component Metadata (v2)
 *
 * Academic career timeline - education, positions, awards.
 */
export default {
  title: 'Timeline',
  description: 'Academic career timeline - education, positions, awards',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory description',
    items: 'Timeline entries (H3 = event title, H4 before = date/period, paragraphs = institution/description)',
  },

  params: {
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
      params: { orientation: 'vertical', datePosition: 'left' },
    },
    career: {
      label: 'Career Timeline',
      params: { orientation: 'vertical', datePosition: 'inline' },
    },
    milestones: {
      label: 'Milestone Overview',
      params: { orientation: 'horizontal' },
    },
  },
}
