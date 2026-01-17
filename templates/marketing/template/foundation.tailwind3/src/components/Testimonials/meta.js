/**
 * Testimonials Component Metadata
 */
export default {
  title: 'Testimonials',
  description: 'Display customer quotes and social proof',
  category: 'Social Proof',

  elements: {
    title: {
      label: 'Section Title',
      description: 'From H2 in markdown',
    },
    paragraphs: {
      label: 'Section Description',
    },
    subsections: {
      label: 'Testimonials',
      description: 'Each H3 (name) with paragraphs (quote, role) becomes a testimonial',
    },
  },

  properties: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'gray', label: 'Gray' },
        { value: 'dark', label: 'Dark' },
      ],
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
