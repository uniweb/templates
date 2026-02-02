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
    layout: {
      type: 'select',
      label: 'Layout',
      options: ['centered', 'split'],
      default: 'centered',
    },
  },

  presets: {
    default: {
      label: 'Centered',
      params: { layout: 'centered' },
    },
    split: {
      label: 'Split Layout',
      params: { layout: 'split' },
    },
  },

  data: {
    schemas: {
      form: {
        fields: {
          type: 'array',
          default: [],
          label: 'Form Fields',
          description: 'Array of field definitions',
          of: {
            name: { type: 'string', label: 'Field name (for form data)' },
            label: { type: 'string', label: 'Display label' },
            type: { type: 'string', default: 'text', label: 'Input type (text, email, textarea, etc.)' },
            placeholder: { type: 'string', default: '', label: 'Placeholder text' },
            required: { type: 'boolean', default: false, label: 'Required field' },
          },
        },
        submitLabel: {
          type: 'string',
          default: 'Submit',
          label: 'Submit Button Text',
        },
        successMessage: {
          type: 'string',
          default: 'Thank you for your message!',
          label: 'Success Message',
          description: 'Shown after successful form submission',
        },
        action: {
          type: 'string',
          label: 'Form Action URL',
          description: 'Optional URL for form submission (POST)',
        },
      },
    },
  },
}
