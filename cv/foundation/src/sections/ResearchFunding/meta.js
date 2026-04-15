export default {
  title: 'Research Funding',
  description: 'Tabular summary of research funding — period, project + source, amount — with a total row. Reads from the funding collection.',
  category: 'report',
  purpose: 'Inform',

  content: {
    title: 'Optional heading override (defaults to "Research Funding")',
  },

  data: {
    funding: 'Collection of funding entries. Each item: { title, source, role, amount, currency, start, end, excerpt }',
  },
}
