/**
 * Section Component Metadata
 */
export default {
  title: 'Section',
  description: 'Layout container with background and spacing options',
  category: 'Layout',

  elements: {
    title: {
      label: 'Section Title',
    },
    paragraphs: {
      label: 'Description',
    },
  },

  properties: {
    background: {
      type: 'select',
      label: 'Background',
      options: [
        { value: 'white', label: 'White' },
        { value: 'gray', label: 'Gray' },
        { value: 'dark', label: 'Dark' },
        { value: 'primary', label: 'Primary' },
        { value: 'gradient', label: 'Subtle Gradient' },
      ],
      default: 'white',
    },
    padding: {
      type: 'select',
      label: 'Vertical Padding',
      options: [
        { value: 'none', label: 'None' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' },
      ],
      default: 'lg',
    },
    maxWidth: {
      type: 'select',
      label: 'Max Width',
      options: [
        { value: 'narrow', label: 'Narrow' },
        { value: 'regular', label: 'Regular' },
        { value: 'wide', label: 'Wide' },
        { value: 'full', label: 'Full Width' },
      ],
      default: 'regular',
    },
  },
}
