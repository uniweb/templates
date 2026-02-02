/**
 * Hero Banner Metadata (v2)
 */
export default {
  title: 'Hero Banner',
  description: 'Bold hero section with headline, description, and call-to-action buttons',
  category: 'impact',
  purpose: 'Impress',

  context: {
    allowTranslucentTop: true,
  },

  content: {
    pretitle: 'Eyebrow text (e.g., "New in 2025")',
    title: 'Main headline',
    subtitle: 'Subtitle text',
    paragraphs: 'Description [1]',
    links: 'CTA buttons [1-2]',
    image: 'Hero image [1]',
  },

  params: {
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'center', label: 'Centered' },
        { value: 'left', label: 'Left-Aligned' },
        { value: 'split-right', label: 'Split (Image Right)' },
        { value: 'split-left', label: 'Split (Image Left)' },
      ],
      default: 'center',
    },
    showPattern: {
      type: 'boolean',
      label: 'Background Pattern',
      hint: 'Show subtle grid pattern',
      default: true,
    },
  },

  presets: {
    default: {
      label: 'Centered Hero',
      params: { layout: 'center', showPattern: true },
    },
    split: {
      label: 'Split Layout',
      params: { layout: 'split-right', showPattern: true },
    },
    minimal: {
      label: 'Minimal',
      params: { layout: 'center', showPattern: false },
    },
  },
}
