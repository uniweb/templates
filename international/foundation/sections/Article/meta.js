export default {
  title: 'Article',
  description: 'Renders a full article with title, date, and body content.',
  category: 'content',
  purpose: 'Inform',

  // The `content.data` key this section reads. On the [slug] parametric page it
  // holds a list of one: content.data.articles[0] is the article the URL names.
  // Field defaults come from the '@std/article' standard schema (shipped in
  // @uniweb/schemas).
  data: { articles: '@std/article' },

  content: {
    // The article comes from content.data.articles, not from the section's markdown
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
