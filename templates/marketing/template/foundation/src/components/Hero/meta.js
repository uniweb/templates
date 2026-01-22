/**
 * Hero Component Metadata (v2)
 *
 * A modern hero section with multiple layout options, glassmorphism effects,
 * and support for eyebrow text (kicker/pretitle).
 */
export default {
  title: 'Hero Banner',
  description: 'Bold hero section with headline, eyebrow, description, and CTA buttons',
  category: 'impact',
  purpose: 'Impress',
  background: true,

  // Static capabilities for cross-block coordination
  // Header reads this to know Hero supports translucent/floating navbar
  context: {
    allowTranslucentTop: true,
  },

  content: {
    pretitle: 'Eyebrow',
    title: 'Headline',
    subtitle: 'Subtitle',
    paragraphs: 'Description [1-2]',
    links: 'CTA buttons [1-2]',
    image: 'Hero image [1]',
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: ['gradient', 'glass', 'dark', 'light'],
      default: 'gradient',
    },
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        'center',
        'left',
        { value: 'split-right', label: 'Split (image right)' },
        { value: 'split-left', label: 'Split (image left)' },
      ],
      default: 'center',
    },
    showPattern: {
      type: 'boolean',
      label: 'Show Background Pattern',
      default: true,
    },
  },

  presets: {
    default: {
      label: 'Centered Hero',
      params: { theme: 'gradient', layout: 'center' },
    },
    glass: {
      label: 'Glassmorphism',
      params: { theme: 'glass', layout: 'center' },
    },
    split: {
      label: 'Split Layout',
      params: { theme: 'gradient', layout: 'split-right' },
    },
    minimal: {
      label: 'Minimal Light',
      params: { theme: 'light', layout: 'left', showPattern: false },
    },
  },
}
