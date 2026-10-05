/**
 * Team Component Metadata (v2)
 */
export default {
  title: 'Team Grid',
  description: 'Display team members with photos and roles.',

  // The `content.data` key this section reads — team-member records
  // (content.data.team); a section receives only the keys it declares. Their
  // shape is the '@/member' schema; a record arrives as it is stored, and a
  // field it lacks is absent.
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
    medium: {
      label: 'Dim Background',
      params: { theme: 'medium', columns: 4 },
    },
  },
}
