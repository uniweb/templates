export default {
  title: 'Article',
  description: 'Renders a full article with title, date, and body content.',

  // The `content.data` key this section reads: on the [slug] parametric page, the
  // article the URL names. `single: true` holds that one record — null when no
  // record matches — where a key holds a list by default. `whole: true` gives it
  // WHOLE — each section under its name, the card in `brief` and the body in
  // `body` — where the default, its brief, would give the card's fields at the top
  // and no body. The shape is the '@std/article' standard schema (shipped in
  // @uniweb/schemas); a record arrives as it is stored, and a field it lacks is
  // absent. The page's `articles` query fills the key: its records are of the
  // schema this key names.
  data: { article: { schema: '@std/article', single: true, whole: true } },

  content: {
    // The article comes from content.data.article, not from the section's markdown
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
