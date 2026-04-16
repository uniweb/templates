export default {
  title: 'Bibliography',
  description:
    'Formatted reference list. Reads CSL-JSON items from the monograph collection `references` array and formats them with the selected citation style.',
  category: 'monograph',

  data: {
    inherit: ['monograph'],
  },

  content: {
    title: 'Chapter heading (defaults to "References")',
  },

  params: {},
}
