export default {
  title: 'Cover',
  description:
    'Report summary: title, a Population selector (saved queries from the queries collection), and high-level counts over the filtered member set. Registers a Summary sheet in the downloaded workbook.',
  category: 'academic-metrics',

  data: {
    inherit: ['members', 'queries'],
  },

  content: {
    title: 'Report title (e.g., "Academic Metrics — 2025")',
    subtitle: 'Optional subtitle (overridden by active query name when one is selected)',
  },

  params: {},
}
