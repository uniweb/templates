/**
 * Hero Component Metadata (v2)
 *
 * A modern hero section with multiple layout options, glassmorphism effects,
 * and support for eyebrow text (kicker/pretitle).
 */
export default {
  title: 'Hero Banner',
  description: 'A bold hero section with headline, eyebrow, description, and call-to-action buttons',
  category: 'impact',
  purpose: 'Impress',

  content: {
    pretitle: 'Eyebrow text (e.g., "New Release", "Coming Soon")',
    title: 'Main headline',
    subtitle: 'Secondary headline',
    paragraphs: 'Supporting description [1-2]',
    links: 'Call-to-action buttons [1-2]',
    image: 'Hero image for split layouts',
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'gradient', label: 'Gradient' },
        { value: 'glass', label: 'Glassmorphism' },
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ],
      default: 'gradient',
    },
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'center', label: 'Center' },
        { value: 'left', label: 'Left-aligned' },
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
