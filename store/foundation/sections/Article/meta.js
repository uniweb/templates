export default {
  title: 'Article',
  description: 'Full article view with author info and featured image',

  // The article the URL of the journal's [slug] page names. The key is the page's query's
  // name, `articles`, so that query fills it by name; `single: true` holds the one record
  // rather than a list of one — null when the URL names none.
  data: { articles: { schema: '@/post', single: true } },

  content: {},

  params: {},

  presets: {
    default: {
      label: 'Full Article',
      params: {},
    },
  },
}
