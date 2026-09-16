/**
 * Team Component Metadata (v2)
 */
export default {
  title: 'Team Grid',
  description: 'Display team members with photos and roles.',

  // The `content.data` key this section reads — team-member records
  // (content.data.team); a section receives only the keys it declares. Field
  // defaults come from the '@/member' schema.
  data: { team: '@/member' },

  content: {
    title: 'Section title',
    subtitle: 'Subtitle text',
    paragraphs: 'Description [1]',
    items: {
      label: 'Team members [2-8]',
      hint: 'Each H3 is a name, the H4 below it the role. Or use query: team',
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
