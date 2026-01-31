/**
 * CTA Component Metadata (v2)
 *
 * A conversion-focused section with headline and action buttons.
 */
export default {
  title: 'Call to Action',
  description: 'A conversion-focused section with headline and action buttons',
  category: 'content',
  purpose: 'Convert',

  content: {
    title: 'Headline',
    paragraphs: 'Supporting description',
    links: 'Action buttons [1-2]',
  },

  params: {
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

  presets: {
    default: {
      label: 'Primary Centered',
      params: { theme: 'primary', alignment: 'center' },
    },
    gradient: {
      label: 'Gradient',
      params: { theme: 'gradient', alignment: 'center' },
    },
    left: {
      label: 'Left Aligned',
      params: { theme: 'light', alignment: 'left' },
    },
  },
}
