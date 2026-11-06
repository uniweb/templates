export default {
  // Meant for the layout's header area: an editor offers it there, not among a page's sections.
  area: 'header',
  // Stays in view: the runtime keeps the header at the top, and lays it over a section that
  // asks to lie under it (`underHeader`).
  sticky: true,
  // The bar's height before the browser measures it (h-20).
  height: '5rem',
  // The bar paints its own background: see-through over such a section, solid or frosted
  // elsewhere.
  background: 'self',
  title: 'Header',
  description: 'Navigation header with logo, nav links, and shopping cart',

  content: {
    title: 'Store name',
    icons: 'Logo icon [0-1]',
  },

  params: {},
}
