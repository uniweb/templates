/**
 * Hero Component Metadata
 */
export default {
  title: 'Hero Banner',
  description: 'A bold hero section with headline, description, and call-to-action buttons',
  category: 'Headers',

  elements: {
    title: {
      label: 'Headline',
      description: 'From H1 in markdown',
      required: true,
    },
    paragraphs: {
      label: 'Description',
      description: 'From paragraphs in markdown',
    },
    links: {
      label: 'Call to Action',
      description: 'Primary and secondary buttons from links',
    },
  },

  properties: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'gradient', label: 'Gradient' },
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'gradient',
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
