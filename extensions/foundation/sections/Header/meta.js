export default {
  title: 'Header',
  description: 'Top bar with the site\'s name, linking home, and a row of links',

  content: {
    title: 'Name shown in the bar, else the site\'s name [0-1]',
    links: 'Links in the bar [0-5]',
  },

  // Meant for the layout's header area: an editor offers it there, not among a page's sections.
  area: 'header',
  // Stays in view as the page scrolls — the runtime makes sticky the box that can (a
  // section's own markup cannot). An author turns it off with `sticky: false`.
  sticky: true,
}
