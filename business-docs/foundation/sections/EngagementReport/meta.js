export default {
  title: 'Engagement report',
  description:
    'Aggregate view across invoices or SOWs. Reads filter state (date range, client, status, and which records are the source) from page state via useFilteredEngagement; renders an on-screen table plus aggregate cards (count, sum subtotals, sum totals, sum outstanding); registers an XLSX export with two sheets (Records, Summary).',

  content: {
    title: 'Report title',
    subtitle: 'Optional subtitle (overridden by active filter description when one is set)',
  },

  params: {},
}
