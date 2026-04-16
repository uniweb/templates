export default {
  title: 'Publications',
  description:
    'Formatted bibliography via citestyle. Reads CSL-JSON items from the profile and formats them with the selected citation style.',
  category: 'report',

  data: {
    inherit: ['profile'],
  },

  content: {
    title: 'Optional heading override (defaults to "Publications")',
  },

  params: {},
}
