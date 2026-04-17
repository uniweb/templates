export default {
  title: 'Publications list',
  description:
    'Formatted bibliography across the filtered member set. Applies the date-range and refereed-only filters and formats each entry through citestyle using the active citation style. Preview uses the per-field HTML citestyle emits; xlsx records citation text + year + author; docx uses a hanging-indent paragraph per entry.',
  category: 'academic-metrics',

  data: {
    inherit: ['members', 'queries'],
  },

  content: {
    title: 'Section heading (defaults to "Publications")',
  },

  params: {},
}
