export default {
  title: 'Publications',
  description:
    'Formatted bibliography via citestyle. Escape-hatch section type — reads publications directly from the profile (no Loom), normalizes to CSL-JSON, and formats every entry in APA. Demonstrates when to step outside Loom because the content is too structured for text substitution.',
  category: 'report',

  data: {
    inherit: ['profile'],
  },

  content: {
    title: 'Optional heading override (defaults to "Publications")',
  },

  params: {},
}
