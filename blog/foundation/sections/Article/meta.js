export default {
  title: 'Article',
  description: 'Renders a full article with title, date, and body content.',

  // The `content.data` key this section reads. On the [slug] parametric page it
  // holds a list of one: content.data.articles[0] is the article the URL names.
  // `/*` asks for the article WHOLE — each section under its name, the card in
  // `brief` and the body in `body` — where '@std/article' alone would give the
  // card's fields at the top and no body. The shape is the '@std/article'
  // standard schema (shipped in @uniweb/schemas); a record arrives as it is
  // stored, and a field it lacks is absent.
  data: { articles: '@std/article/*' },

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
