/**
 * Team Component Metadata (v2)
 */
export default {
  title: 'Team Grid',
  description: 'Display team members with photos and roles.',
  category: 'showcase',
  purpose: 'Introduce',

  // Accept cascaded data from page/site level fetches
  inheritData: ['team'],

  // Schema for team member data (from fetch or tagged blocks)
  schemas: {
    team: {
      name: { type: 'string', default: '' },
      role: { type: 'string', default: '' },
      bio: { type: 'string', default: '' },
      avatar: { type: 'string', default: '' },
    },
  },

  content: {
    title: 'Section title',
    subtitle: 'Subtitle text',
    paragraphs: 'Description [1]',
    items: {
      label: 'Team members [2-8]',
      hint: 'Each H3 is a name, H2 is role. Or use fetch: /data/team.json',
    },
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: ['light', 'gray'],
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
  },

  presets: {
    default: {
      label: 'Light Grid',
      params: { theme: 'light', columns: 4 },
    },
    gray: {
      label: 'Gray Background',
      params: { theme: 'gray', columns: 4 },
    },
  },
}
