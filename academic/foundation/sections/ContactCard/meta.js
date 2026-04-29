/**
 * ContactCard Component Metadata (v2)
 *
 * Contact information block for academic profiles.
 */
export default {
  title: 'Contact Card',
  description: 'Contact information block for academic profiles',
  category: 'content',
  purpose: 'Connect',

  content: {
    title: 'Optional heading (e.g., "Contact")',
    paragraphs: 'Contact items in "Label: Value" format',
    links: 'Additional links (calendar, map, etc.)',
  },

  params: {
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
      params: { layout: 'sidebar', showIcon: true },
    },
    footer: {
      label: 'Footer Contact',
      params: { layout: 'inline', showIcon: true },
    },
    prominent: {
      label: 'Contact Card',
      params: { layout: 'card', showIcon: true },
    },
  },
}
