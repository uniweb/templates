/**
 * DocSection Component Metadata
 *
 * Main documentation content section with typography and navigation.
 * `background: 'self'` — the layout's prose wrapper and the layout's own surface handle
 * the visual background; the runtime's section background is not needed.
 */
export default {
  family: 'article',
  title: 'Doc Section',
  description: 'Main documentation content section with typography and navigation',
  background: 'self',

  content: {
    pretitle: 'Category label',
    title: 'Page title',
    subtitle: 'Brief description',
    // After its header, the page renders as written, through kit's <Render> — lists, code,
    // tables, images and callouts included, wherever the author put them — and honours every
    // placement an author gives an image, a video or a table: <Render> lays out all four.
    sequence: { label: 'The page, as written', placement: true },
  },

  params: {
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
        'lg',
        'xl',
        { value: 'full', label: 'Full Width' },
      ],
      default: 'prose',
    },
  },

  presets: {
    default: {
      label: 'Standard Docs',
      params: { show_navigation: true, max_width: 'prose' },
    },
    wide: {
      label: 'Wide Content',
      params: { show_navigation: true, max_width: 'xl' },
    },
  },
}
