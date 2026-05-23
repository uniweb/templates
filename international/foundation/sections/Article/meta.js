export default {
  title: 'Article',
  description: 'Renders a full article with title, date, and body content.',
  category: 'content',
  purpose: 'Inform',

  // Renders one article — content.data.articles[0] on a [slug] route. Field
  // defaults come from the '@/article' schema. Delivery is default-on.
  data: { articles: '@/article' },

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
