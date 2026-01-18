/**
 * TeamGrid Component Metadata
 */
export default {
  title: 'Team Grid',
  description: 'Display lab members, collaborators, or team with academic roles',
  category: 'Content',

  elements: {
    title: {
      label: 'Section Title',
    },
    paragraphs: {
      label: 'Description',
    },
    subsections: {
      label: 'Team Members',
      required: true,
      description: 'Each H3 is member name. H4 before H3 is role. Paragraphs: bio, email. Image: photo. Links: website, profiles.',
    },
  },

  properties: {
    groupByRole: {
      type: 'boolean',
      label: 'Group by Role',
      description: 'Organize members by their academic role',
      default: true,
    },
    cardStyle: {
      type: 'select',
      label: 'Card Style',
      description: 'How to display each member',
      options: [
        { value: 'photo', label: 'Photo Centered' },
        { value: 'compact', label: 'Compact Row' },
        { value: 'detailed', label: 'Detailed Card' },
        { value: 'minimal', label: 'Text Only' },
      ],
      default: 'photo',
    },
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: 2, label: '2 Columns' },
        { value: 3, label: '3 Columns' },
        { value: 4, label: '4 Columns' },
      ],
      default: 3,
    },
  },

  presets: {
    labMembers: {
      label: 'Lab Members',
      description: 'Photos centered, grouped by role',
      properties: { cardStyle: 'photo', groupByRole: true, columns: 3 },
    },
    alumni: {
      label: 'Alumni List',
      description: 'Compact list without grouping',
      properties: { cardStyle: 'compact', groupByRole: false, columns: 2 },
    },
    faculty: {
      label: 'Faculty Directory',
      description: 'Detailed cards with bios',
      properties: { cardStyle: 'detailed', groupByRole: false, columns: 2 },
    },
  },
}
