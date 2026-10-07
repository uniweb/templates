export default {
  title: 'Front matter',
  description:
    'Cover page: portrait, title, subtitle, author meta, and abstract. Reads title / author / affiliation / date / abstract from the monograph record.',

  content: {
    title: 'Optional override — defaults to monograph.title',
    subtitle: 'Optional subtitle',
  },

  // The `content.data` key this section reads — the site's `monograph` record, of '@/monograph'.
  // `single: true` holds that one record rather than a list of one.
  data: { monograph: { schema: '@/monograph', single: true } },

  params: {
    key: 'front-matter',
    portrait: '/images/darwin-portrait.png',
  },
}
