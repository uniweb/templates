export default {
  title: 'Bibliography',
  description:
    'Formatted reference list. Reads CSL-JSON items from the `references` array of the monograph record and formats them with the selected citation style.',

  content: {
    title: 'Chapter heading (defaults to "References")',
  },

  // The `content.data` key this section reads — the site's `monograph` records. `{}`: no schema.
  data: { monograph: {} },

  params: {},
}
