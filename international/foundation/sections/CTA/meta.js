/**
 * CTA Component Metadata (v2)
 *
 * A prominent call-to-action section.
 */
export default {
  title: 'Call to Action',
  description: 'A prominent call-to-action section',

  content: {
    title: 'Headline',
    subtitle: 'Secondary heading',
    paragraphs: 'Supporting text',
    links: 'Action buttons',
  },

  params: {
  },

  presets: {
    default: {
      label: 'Dark',
      params: { theme: 'dark' },
    },
    medium: {
      label: 'Dim',
      params: { theme: 'medium' },
    },
    light: {
      label: 'Light',
      params: { theme: 'light' },
    },
  },
}
