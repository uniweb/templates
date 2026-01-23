/**
 * ContactForm Component Metadata (v2)
 */
export default {
  title: 'Contact Form',
  description: 'Contact form with customizable fields via structured data',
  category: 'showcase',
  purpose: 'Convert',

  content: {
    title: 'Form heading',
    paragraphs: 'Description text [1]',
    data: {
      form: 'Field configuration (yaml:form or json:form block)',
    },
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: ['light', 'dark'],
      default: 'light',
    },
    layout: {
      type: 'select',
      label: 'Layout',
      options: ['centered', 'split'],
      default: 'centered',
    },
  },

  presets: {
    default: {
      label: 'Centered Light',
      params: { theme: 'light', layout: 'centered' },
    },
    dark: {
      label: 'Centered Dark',
      params: { theme: 'dark', layout: 'centered' },
    },
    split: {
      label: 'Split Layout',
      params: { theme: 'light', layout: 'split' },
    },
  },
}
