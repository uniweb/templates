/**
 * Hero Component Metadata
 *
 * A modern hero section with multiple layout options, glassmorphism effects,
 * and support for eyebrow text (kicker/pretitle).
 */
export default {
  title: 'Hero Banner',
  description: 'A bold hero section with headline, eyebrow, description, and call-to-action buttons. Supports multiple layouts and themes.',
  category: 'Headers',

  elements: {
    pretitle: {
      label: 'Eyebrow',
      description: 'Small text above the headline (e.g., "New Release", "Coming Soon")',
    },
    title: {
      label: 'Headline',
      description: 'Main H1 headline',
      required: true,
    },
    subtitle: {
      label: 'Subtitle',
      description: 'Secondary headline below the main title',
    },
    paragraphs: {
      label: 'Description',
      description: 'Supporting text paragraphs',
    },
    links: {
      label: 'Call to Action',
      description: 'Primary and secondary CTA buttons from links',
    },
    imgs: {
      label: 'Hero Image',
      description: 'Optional image for split layouts or below content',
    },
  },

  properties: {
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

  presets: [
    {
      name: 'default',
      label: 'Centered Hero',
      settings: { theme: 'gradient', layout: 'center' },
    },
    {
      name: 'glass',
      label: 'Glassmorphism',
      settings: { theme: 'glass', layout: 'center' },
    },
    {
      name: 'split',
      label: 'Split Layout',
      settings: { theme: 'gradient', layout: 'split-right' },
    },
    {
      name: 'minimal',
      label: 'Minimal Light',
      settings: { theme: 'light', layout: 'left', showPattern: false },
    },
  ],
}
