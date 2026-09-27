export default {
  title: 'Grid',
  description: 'Renders child sections in a responsive grid layout',

  // The layouts an author may choose with the section's `grid:` key — a column count,
  // or relative widths whose part count is the column count. The first is the one a
  // section gets when it chooses none.
  children: {
    grid: [
      3, 2, 4,
      '67/33', '33/67', '60/40', '40/60', '75/25', '25/75',
      '25/50/25', '50/25/25', '25/25/50',
    ],
  },

  content: {
    title: 'Optional heading above the grid',
    paragraphs: 'Optional description (0-1)',
  },

  params: {
    headerRow: {
      type: 'boolean',
      label: 'Full-width first item',
      hint: 'The first child spans every column; the rest follow the layout.',
      default: false,
    },
    gap: {
      type: 'select',
      label: 'Gap',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      default: 'lg',
    },
  },
}
