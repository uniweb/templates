export default {
  title: 'Specimen table',
  description:
    'Bordered table of tortoise specimens. Reads the `specimens` array from the monograph record.',
  category: 'monograph',

  content: {
    title: 'Chapter heading (defaults to "Specimens collected")',
  },

  // The `content.data` key this section reads — the site's `monograph` records. `{}`: no schema.
  data: { monograph: {} },

  params: {},
}
