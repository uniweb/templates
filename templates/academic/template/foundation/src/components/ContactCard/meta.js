/**
 * ContactCard Component Metadata
 */
export default {
  title: 'Contact Card',
  description: 'Contact information block for academic profiles',
  category: 'Content',

  elements: {
    title: {
      label: 'Title',
      description: 'Optional heading (e.g., "Contact")',
    },
    paragraphs: {
      label: 'Contact Items',
      required: true,
      description: 'Each paragraph is "Label: Value" format. E.g., "Email: prof@university.edu", "Office: Room 123"',
    },
    links: {
      label: 'Links',
      description: 'Additional links (calendar, map, etc.)',
    },
  },

  properties: {
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'sidebar', label: 'Sidebar (compact)' },
        { value: 'card', label: 'Card (prominent)' },
        { value: 'inline', label: 'Inline (minimal)' },
      ],
      default: 'sidebar',
    },
    showIcon: {
      type: 'boolean',
      label: 'Show Icons',
      description: 'Display icons for contact types',
      default: true,
    },
  },

  presets: {
    sidebar: {
      label: 'Sidebar Contact',
      description: 'Compact contact for page sidebars',
      properties: { layout: 'sidebar', showIcon: true },
    },
    footer: {
      label: 'Footer Contact',
      description: 'Inline contact for footers',
      properties: { layout: 'inline', showIcon: true },
    },
    prominent: {
      label: 'Contact Card',
      description: 'Prominent contact information',
      properties: { layout: 'card', showIcon: true },
    },
  },
}
