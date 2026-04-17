export default {
  title: 'Cover',
  description:
    'Report summary: title, subtitle, and high-level counts (members, publications, funding, supervisions). Registers a Summary sheet in the downloaded workbook.',
  category: 'academic-metrics',

  data: {
    inherit: ['members'],
  },

  content: {
    title: 'Report title (e.g., "Academic Metrics — 2025")',
    subtitle: 'Optional subtitle',
  },

  params: {},
}
