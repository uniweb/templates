export default {
  title: 'Testimonials',
  description: 'What customers said, as a grid of short quotes with attribution',
  category: 'showcase',
  purpose: 'Reassure',

  content: {
    title: 'Section heading',
    items: 'One per quote: the quote as text, the person as the heading',
  },

  params: {
    columns: {
      type: 'number',
      label: 'Columns',
      default: 3,
    },
  },
}
