/**
 * LogoCloud Component Metadata (v2)
 *
 * Display partner or client logos in a grid or marquee.
 */
export default {
  title: 'Logo Cloud',
  description: 'Display partner or client logos in a grid or marquee',
  category: 'showcase',
  purpose: 'Trust',

  content: {
    title: 'Section heading (e.g., "Trusted by")',
    paragraphs: 'Optional subtitle',
    images: 'Logo images',
    links: 'Optional links for each logo',
  },

  params: {
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
      params: { layout: 'grid', grayscale: true },
    },
    marquee: {
      label: 'Scrolling Marquee',
      params: { layout: 'marquee', grayscale: true },
    },
    colorful: {
      label: 'Full Color',
      params: { layout: 'grid', grayscale: false },
    },
  },
}
