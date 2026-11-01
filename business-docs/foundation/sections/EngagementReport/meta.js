export default {
  title: 'Engagement report',
  description:
    'Aggregate view across invoices or SOWs. Reads filter state (date range, client, status) from page state via useFilteredEngagement; renders the narrative, aggregate cards (count, sum subtotals, sum totals, sum outstanding) and a table; registers the same as a Word file and a print page, and a spreadsheet with two sheets (Records, Summary).',

  content: {
    title: 'Report title',
    subtitle: 'Optional subtitle (overridden by active filter description when one is set)',
  },

  params: {
    records: {
      type: 'select',
      label: 'Records',
      options: ['invoices', 'sows'],
      default: 'invoices',
    },
  },
}
