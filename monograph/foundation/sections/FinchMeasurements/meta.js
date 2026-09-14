export default {
  title: 'Finch measurements',
  description:
    'Numeric table of beak morphometrics. Reads the `finchMeasurements` array from the monograph collection.',
  category: 'monograph',

  content: {
    title: 'Chapter heading (defaults to "Finch beak morphometrics")',
  },

  // The `content.data` key this section reads — the site's `monograph` records. `{}`: no schema.
  data: { monograph: {} },

  params: {},
}
