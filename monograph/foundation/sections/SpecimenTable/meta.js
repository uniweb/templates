export default {
  family: 'data-table',
  title: 'Specimen table',
  description:
    'Bordered table of tortoise specimens. Reads the `specimens` array from the monograph record.',

  content: {
    title: 'Chapter heading (defaults to "Specimens collected")',
  },

  // The `content.data` key this section reads — the site's `monograph` record, of '@/monograph'.
  // `single: true` holds that one record rather than a list of one.
  data: { monograph: { schema: '@/monograph', single: true } },

  params: {},
}
