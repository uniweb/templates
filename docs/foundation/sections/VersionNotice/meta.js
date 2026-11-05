/**
 * A section this foundation places in the header area of every page, drawn only on an older version.
 */
export default {
  // Placed in a layout area: an editor leaves it out of a page's sections.
  area: true,
  family: 'callout',
  title: 'Older Version Notice',
  description: 'A line above the pages of an older version of the docs, leading to the latest',

  content: {
    title: 'The notice',
    links: 'Its link to the latest version: its label is what readers see [0-1]',
  },
}
