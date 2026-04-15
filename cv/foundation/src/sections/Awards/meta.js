export default {
  title: 'Awards',
  description: 'Medals, honours, and honorary degrees. Renders as a timeline of single-year entries.',
  category: 'report',
  purpose: 'Inform',

  content: {
    title: 'Optional heading override (defaults to "Awards and Honours")',
  },

  data: {
    awards: 'Collection of award entries. Each item: { title, organization, year, start, end, excerpt }',
  },
}
