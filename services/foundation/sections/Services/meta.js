export default {
  title: 'Services',
  description: 'Grid of the services offered, each with an icon, a name and a short description',
  category: 'showcase',
  purpose: 'Explain',

  content: {
    title: 'Section heading',
    paragraphs: 'Introduction [0-1]',
    items: 'One per service: icon, name, description',
  },

  params: {
    columns: {
      type: 'number',
      label: 'Columns',
      default: 3,
      description: 'How many services sit side by side on a wide screen',
    },
  },

  presets: {
    default: { label: 'Three across', params: { columns: 3 } },
    pairs: { label: 'Two across', params: { columns: 2 } },
  },
}
