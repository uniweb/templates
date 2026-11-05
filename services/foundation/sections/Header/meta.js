export default {
  // Meant for the layout's header area: an editor offers it there, not among a page's sections.
  area: 'header',
  title: 'Header',
  description: 'Site header with logo, navigation list and a call-to-action',

  content: {
    title: 'Business name (the logo)',
    lists: 'Navigation links [1]',
    links: 'Call-to-action button [0-1]',
  },

  params: {},

  // Stays in view as the page scrolls — the runtime makes sticky the box that can (a
  // section's own markup cannot). An author turns it off with `sticky: false`.
  sticky: true,
}
