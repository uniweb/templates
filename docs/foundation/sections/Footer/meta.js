/**
 * Footer Component Metadata
 *
 * Simple documentation footer with copyright and links.
 * `background: 'self'` — layout area component, manages own background.
 */
export default {
  // Meant for the layout's footer area: an editor offers it there, not among a page's sections.
  area: 'footer',
  title: 'Footer',
  description: 'Simple documentation footer with copyright and links',
  background: 'self',

  content: {
    title: 'Site name (for copyright)',
    paragraphs: 'Custom copyright notice',
    links: 'Footer links (Privacy, Terms, etc.)',
  },

  params: {
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'simple', label: 'Simple (left/right)' },
        'centered',
      ],
      default: 'simple',
    },
  },

  presets: {
    default: {
      label: 'Simple Footer',
      params: { layout: 'simple' },
    },
    centered: {
      label: 'Centered Footer',
      params: { layout: 'centered' },
    },
  },
}
