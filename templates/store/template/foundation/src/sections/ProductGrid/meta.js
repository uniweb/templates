export default {
  title: 'Product Grid',
  description: 'Display products from a collection with quick view and buy buttons',
  category: 'showcase',
  purpose: 'Sell',

  data: {
    inherit: ['products'],
    schemas: {
      products: {
        title: { type: 'string', default: '' },
        excerpt: { type: 'string', default: '' },
        longDescription: { type: 'string', default: '' },
        price: { type: 'number', default: 0 },
        category: { type: 'string', default: '' },
        image: { type: 'string', default: '' },
        features: { type: 'array', default: [] },
      },
    },
  },

  content: {
    title: 'Section title [0-1]',
  },

  params: {
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: 2, label: '2 Columns' },
        { value: 3, label: '3 Columns' },
        { value: 4, label: '4 Columns' },
      ],
      default: 4,
    },
  },

  presets: {
    default: {
      label: 'Four Column Grid',
      params: { columns: 4 },
    },
  },
}
