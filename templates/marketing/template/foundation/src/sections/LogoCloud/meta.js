/**
 * LogoCloud Component Metadata (v2)
 */
export default {
  title: 'Logo Cloud',
  description: 'Display partner or client logos in a grid or marquee',
  category: 'showcase',
  purpose: 'Trust',

  content: {
    title: 'Section title',
    paragraphs: 'Subtitle [1]',
    icon: 'Logo images [4+]',
    links: 'Logo links',
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: ['light', 'gray', 'dark'],
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
      hint: 'Show logos in grayscale until hover',
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
