export default {
  title: 'Grid',
  description: 'Renders child sections in a responsive grid layout',

  // The column counts an author may choose with the section's `grid:` key. The first
  // is the one a section gets when it chooses none.
  children: {
    grid: [3, 2, 4],
  },

  content: {
    title: 'Optional heading above the grid',
    paragraphs: 'Optional description [0-1]',
  },
}
