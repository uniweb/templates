export default {
  // Meant for the layout's header area: an editor offers it there, not among a page's sections.
  area: 'header',
  // Stays in view: the runtime keeps the header at the top, and lays it over a section that
  // asks to lie under it (`underHeader`).
  sticky: true,
  // The bar's height before the browser measures it (h-16).
  height: '4rem',
  // The bar paints its own background: see-through over such a section, solid or frosted
  // elsewhere.
  background: 'self',
  title: 'Header',
  description: 'Responsive navigation header',

  content: {
    title: 'Site name (shown as logo text)',
    links: 'Optional call-to-action button',
  },

  // The `content.data` key this section reads — the ```yaml:nav``` block in layout/header.md.
  data: { nav: {} },

  params: {},
}
