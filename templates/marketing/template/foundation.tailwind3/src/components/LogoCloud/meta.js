/**
 * LogoCloud Component Metadata
 */
export default {
  title: 'Logo Cloud',
  description: 'Display partner or client logos in a grid or marquee',
  category: 'Social Proof',

  elements: {
    title: {
      label: 'Section Title',
      description: 'Optional heading (e.g., "Trusted by")',
    },
    paragraphs: {
      label: 'Section Description',
      description: 'Optional subtitle',
    },
    imgs: {
      label: 'Logos',
      required: true,
      description: 'Logo images from markdown ![alt](url)',
    },
    links: {
      label: 'Logo Links',
      description: 'Optional links for each logo (same order as images)',
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
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'grid', label: 'Grid' },
        { value: 'marquee', label: 'Scrolling Marquee' },
      ],
      default: 'grid',
    },
    grayscale: {
      type: 'boolean',
      label: 'Grayscale',
      description: 'Show logos in grayscale until hover',
      default: true,
    },
  },

  presets: {
    default: {
      label: 'Standard Grid',
      description: 'Logos in a centered grid',
      properties: { layout: 'grid', grayscale: true },
    },
    marquee: {
      label: 'Scrolling Marquee',
      description: 'Infinite scrolling logo display',
      properties: { layout: 'marquee', grayscale: true },
    },
    colorful: {
      label: 'Full Color',
      description: 'Logos in full color',
      properties: { layout: 'grid', grayscale: false },
    },
  },
}
