export default {
  title: 'Service',
  description: 'Society memberships, committee roles, and civic service. Renders as a timeline of entries.',
  category: 'report',
  purpose: 'Inform',

  content: {
    title: 'Optional heading override (defaults to "Service")',
  },

  data: {
    service: 'Collection of service entries. Each item: { title (role), organization, start, end, excerpt }',
  },
}
