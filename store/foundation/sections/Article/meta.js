export default {
  title: 'Article',
  description: 'Full article view with author info and featured image',

  // The article the URL of the journal's [slug] page names: one record (`single: true`), null
  // when the URL names none. The page's `articles` query fills it by its records' type — the
  // journal's list declares them `@/post` (`data: { articles: '@/post' }`), and so does this key.
  data: { article: { schema: '@/post', single: true } },

  content: {},

  params: {},

  presets: {
    default: {
      label: 'Full Article',
      params: {},
    },
  },
}
