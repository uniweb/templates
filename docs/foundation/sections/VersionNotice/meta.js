/**
 * A section this foundation places in the header area of every page, drawn only on an older version.
 */
export default {
  // Meant for the layout's header area: an editor offers it there, not among a page's sections.
  area: 'header',
  family: 'callout',
  title: 'Older Version Notice',
  description: 'A line above the pages of an older version of the docs, leading to the latest',

  content: {
    title: 'The notice',
    links: 'Its link to the latest version: its label is what readers see [0-1]',
  },
}
