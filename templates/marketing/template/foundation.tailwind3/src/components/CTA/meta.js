/**
 * CTA Component Metadata
 */
export default {
  title: 'Call to Action',
  description: 'A conversion-focused section with headline and action buttons',
  category: 'Conversion',

  elements: {
    title: {
      label: 'Headline',
      description: 'From H2 in markdown',
      required: true,
    },
    paragraphs: {
      label: 'Description',
    },
    links: {
      label: 'Action Buttons',
      description: 'Primary and secondary CTAs',
    },
  },

  properties: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'gradient', label: 'Gradient' },
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ],
      default: 'primary',
    },
    alignment: {
      type: 'select',
      label: 'Alignment',
      options: [
        { value: 'center', label: 'Center' },
        { value: 'left', label: 'Left' },
      ],
      default: 'center',
    },
  },
}
