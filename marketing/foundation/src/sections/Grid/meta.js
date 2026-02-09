export default {
  title: 'Grid',
  description: 'Renders child sections in a responsive grid layout',
  category: 'layout',
  children: true,

  content: {
    title: 'Optional heading above the grid',
    paragraphs: 'Optional description [0-1]',
  },

  params: {
    columns: {
      type: 'number',
      default: 3,
      min: 2,
      max: 4,
    },
  },
}
