export default {
  title: 'Footer',
  description: 'Simple documentation footer with copyright and links',
  category: 'Navigation',

  elements: {
    title: {
      label: 'Site Name',
      description: 'Used in copyright if no custom text provided',
    },
    paragraphs: {
      label: 'Copyright Text',
      description: 'Custom copyright notice',
    },
    links: {
      label: 'Footer Links',
      description: 'Links like Privacy Policy, Terms, etc.',
    },
  },

  properties: {
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'simple', label: 'Simple (left/right)' },
        { value: 'centered', label: 'Centered' },
      ],
      default: 'simple',
    },
  },
}
