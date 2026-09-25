export default {
  family: 'data-table',
  title: 'Finch measurements',
  description:
    'Numeric table of beak morphometrics. Reads the `finchMeasurements` array from the monograph record.',

  content: {
    title: 'Chapter heading (defaults to "Finch beak morphometrics")',
  },

  // The `content.data` key this section reads — the site's `monograph` record, of '@/monograph'.
  data: { monograph: '@/monograph' },

  params: {},
}
