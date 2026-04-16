export default {
  title: 'Front matter',
  description:
    'Cover page: portrait, title, subtitle, author meta, and abstract. Reads title / author / affiliation / date / abstract from the monograph collection.',
  category: 'monograph',

  data: {
    inherit: ['monograph'],
  },

  content: {
    title: 'Optional override — defaults to monograph[0].title',
    subtitle: 'Optional subtitle',
  },

  params: {
    key: 'front-matter',
    portrait: '/images/darwin-portrait.png',
  },
}
