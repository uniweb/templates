export default {
  title: 'Doc Section',
  description: 'Main documentation content section with typography and navigation',
  category: 'Content',

  elements: {
    pretitle: {
      label: 'Category',
      description: 'Small text above the title (H3 before H1)',
    },
    title: {
      label: 'Page Title',
      required: true,
    },
    subtitle: {
      label: 'Description',
      description: 'Brief description below the title (H2 after H1)',
    },
    paragraphs: {
      label: 'Content',
      description: 'Main documentation text',
    },
    lists: {
      label: 'Lists',
      description: 'Bullet or numbered lists',
    },
    links: {
      label: 'Links',
      description: 'External or internal links',
    },
  },

  properties: {
    show_navigation: {
      type: 'boolean',
      label: 'Show Navigation',
      description: 'Display previous/next page links',
      default: true,
    },
    max_width: {
      type: 'select',
      label: 'Content Width',
      options: [
        { value: 'prose', label: 'Prose (65ch)' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' },
        { value: 'full', label: 'Full Width' },
      ],
      default: 'prose',
    },
  },
}
