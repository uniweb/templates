export default {
  title: 'Publications by Year',
  description:
    'Timeline of publication counts per year across the filtered member set. Preview is a vertical bar chart chronologically sorted; xlsx is Year / Count / Cumulative rows with a totals row.',
  category: 'academic-metrics',

  data: {
    inherit: ['members', 'queries'],
  },

  content: {
    title: 'Section heading (defaults to "Publications by year")',
  },

  params: {},
}
