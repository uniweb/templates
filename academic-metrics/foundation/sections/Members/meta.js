export default {
  family: 'team',
  title: 'Members',
  description:
    'Roster of the filtered member set (name, rank, department, tenured, start year). Registers a Members sheet in the downloaded workbook.',

  content: {
    title: 'Section heading (defaults to "Members")',
  },

  // The `content.data` keys this section reads (through useFilteredMembers): the members, of
  // '@/researcher', and the saved views, of '@/view'.
  data: { members: '@/researcher', queries: '@/view' },

  params: {},
}
