/**
 * CTA Component Metadata (v2)
 *
 * A prominent call-to-action section.
 */
export default {
  title: 'Call to Action',
  description: 'A prominent call-to-action section',
  category: 'content',
  purpose: 'Convert',

  content: {
    title: 'Headline',
    subtitle: 'Secondary heading',
    paragraphs: 'Supporting text',
    links: 'Action buttons',
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ],
      default: 'primary',
    },
  },

  presets: {
    default: {
      label: 'Primary',
      params: { theme: 'primary' },
    },
    dark: {
      label: 'Dark',
      params: { theme: 'dark' },
    },
    light: {
      label: 'Light',
      params: { theme: 'light' },
    },
  },
}
