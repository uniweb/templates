/**
 * TeamGrid Component Metadata (v2)
 *
 * Display lab members, collaborators, or team with academic roles.
 */
export default {
  title: 'Team Grid',
  description: 'Display lab members, collaborators, or team with academic roles',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory description',
    items: 'Team members (H3 = name, H4 before = role, paragraph = bio/email, image = photo, links = profiles)',
  },

  params: {
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
      params: { cardStyle: 'photo', groupByRole: true, columns: 3 },
    },
    alumni: {
      label: 'Alumni List',
      params: { cardStyle: 'compact', groupByRole: false, columns: 2 },
    },
    faculty: {
      label: 'Faculty Directory',
      params: { cardStyle: 'detailed', groupByRole: false, columns: 2 },
    },
  },
}
