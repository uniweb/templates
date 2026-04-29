export default {
  title: 'Cover',
  description:
    'Report summary: title, a narrative paragraph rendered via Loom (unit-wide counts), a Population selector, and a live stats strip over the filtered member set. Registers a Summary sheet in the downloaded workbook.',
  category: 'academic-metrics',

  content: {
    title: 'Report title (e.g., "Academic Metrics — 2025")',
    subtitle: 'Optional subtitle (overridden by active query name when one is selected)',
    paragraphs:
      'Narrative body — write prose with Loom expressions like {COUNT OF members}, {SHOW members.name JOINED BY ", "}, {totalPublications}, {totalFunding}, {totalGrants}, {totalSupervisions}.',
  },

  params: {},
}
