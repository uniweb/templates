export default {
  title: 'Bibliography',
  description:
    'Formatted reference list. Reads CSL-JSON items from the `references` array of the monograph record and formats them with the selected citation style.',

  content: {
    title: 'Chapter heading (defaults to "References")',
  },

  // The `content.data` key this section reads — the site's `monograph` record, of '@/monograph'.
  // `single: true` holds that one record rather than a list of one.
  data: { monograph: { schema: '@/monograph', single: true } },

  params: {},
}
