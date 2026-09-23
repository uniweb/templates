export default {
  title: 'Grid',
  description: 'Renders child sections in a responsive grid layout',
  children: true,

  content: {
    title: 'Optional heading above the grid',
    paragraphs: 'Optional description (0-1)',
  },

  params: {
    columns: {
      type: 'number',
      label: 'Columns',
      default: 3,
      min: 2,
      max: 4,
    },
    layout: {
      type: 'select',
      label: 'Column widths',
      hint: 'Relative widths, one part per column. A ratio whose part count differs from Columns is ignored in favour of equal widths.',
      options: [
        '50/50', '67/33', '33/67', '60/40', '40/60', '75/25', '25/75',
        '33/33/33', '25/50/25', '50/25/25', '25/25/50',
        '25/25/25/25',
      ],
      default: '33/33/33',
    },
    headerRow: {
      type: 'boolean',
      label: 'Full-width first item',
      hint: 'The first child spans every column; the rest follow the column widths.',
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
