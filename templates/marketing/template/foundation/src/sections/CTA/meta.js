/**
 * CTA Component Metadata (v2)
 */
export default {
  title: 'Call to Action',
  description: 'Conversion-focused section with headline and action buttons',
  category: 'impact',
  purpose: 'Convert',

  content: {
    title: 'Headline',
    paragraphs: 'Description [1]',
    links: 'Action buttons [1-2]',
  },

  params: {
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: ['center', 'left'],
      default: 'center',
    },
  },
}
