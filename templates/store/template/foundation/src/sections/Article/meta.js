export default {
  title: 'Article',
  description: 'Full article view with author info and featured image',
  category: 'content',
  purpose: 'Inform',

  data: {
    inherit: ['article', 'articles'],
    schemas: {
      article: {
        slug: { type: 'string', default: '' },
        title: { type: 'string', default: '' },
        excerpt: { type: 'string', default: '' },
        date: { type: 'string', default: '' },
        readTime: { type: 'string', default: '' },
        image: { type: 'string', default: '' },
        author: { type: 'string', default: '' },
        content: { type: 'object', default: null },
      },
    },
  },

  content: {},

  params: {},

  presets: {
    default: {
      label: 'Full Article',
      params: {},
    },
  },
}
