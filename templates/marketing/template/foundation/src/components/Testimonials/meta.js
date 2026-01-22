/**
 * Testimonials Component Metadata (v2)
 */
export default {
  title: 'Testimonials',
  description: 'Display customer quotes and social proof',
  category: 'showcase',
  purpose: 'Persuade',

  content: {
    title: 'Section title',
    paragraphs: 'Intro text [1]',
    items: {
      label: 'Testimonials [3-6]',
      hint: 'Each H3 (name) with paragraphs (quote, role) becomes a testimonial',
    },
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: ['light', 'gray', 'dark'],
      default: 'light',
    },
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: 2, label: '2 Columns' },
        { value: 3, label: '3 Columns' },
      ],
      default: 3,
    },
  },
}
