export default {
  title: 'Hero Banner',
  description: 'A bold hero section with headline, description, and call-to-action buttons.',
  category: 'Headers',

  elements: {
    pretitle: {
      label: 'Eyebrow',
      description: 'Small text above the headline',
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
      description: 'Supporting text',
    },
    links: {
      label: 'Call to Action',
      description: 'Primary and secondary CTA buttons',
    },
  },

  properties: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'gradient', label: 'Gradient' },
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ],
      default: 'gradient',
    },
  },

  presets: [
    { name: 'default', label: 'Gradient', settings: { theme: 'gradient' } },
    { name: 'dark', label: 'Dark', settings: { theme: 'dark' } },
    { name: 'light', label: 'Light', settings: { theme: 'light' } },
  ],
}
