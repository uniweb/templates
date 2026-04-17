export default {
  title: 'Article',
  description: 'Renders a full article with title, date, and body content.',
  category: 'content',
  purpose: 'Inform',

  // Data: article-shaped data. Delivery is default-on; `entity` is a
  // declaration for the editor and prepare-props shape guarantees.
  data: {
    entity: 'articles',
    schemas: {
      article: {
        slug: { type: 'string', default: '' },
        title: { type: 'string', default: '' },
        excerpt: { type: 'string', default: '' },
        date: { type: 'string', default: '' },
        image: { type: 'string', default: '' },
        body: { type: 'string', default: '' },
        tags: { type: 'array', default: [] },
      },
    },
  },

  content: {
    // Article content is expected from cascaded data, not markdown
  },

  params: {
    showImage: {
      type: 'boolean',
      label: 'Show Featured Image',
      default: true,
    },
    showDate: {
      type: 'boolean',
      label: 'Show Date',
      default: true,
    },
    showTags: {
      type: 'boolean',
      label: 'Show Tags',
      default: true,
    },
  },

  presets: {
    default: {
      label: 'Full Article',
      params: { showImage: true, showDate: true, showTags: true },
    },
    minimal: {
      label: 'Minimal',
      params: { showImage: false, showDate: false, showTags: false },
    },
  },
}
