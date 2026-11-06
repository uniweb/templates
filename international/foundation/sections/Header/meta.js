/**
 * Header Component Metadata (v2)
 *
 * Responsive navigation header with language switcher.
 */
export default {
  // Meant for the layout's header area: an editor offers it there, not among a page's sections.
  area: 'header',
  // Stays in view: the runtime keeps the header at the top, and lays it over a section that
  // asks to lie under it (`underHeader`).
  sticky: true,
  // The bar's height before the browser measures it (h-16 on a phone, h-20 wide).
  height: '4rem',
  // The bar paints its own background: see-through over such a section, solid or frosted
  // elsewhere.
  background: 'self',
  title: 'Header',
  description: 'Responsive navigation header with language switcher',

  content: {
    title: 'Site name (shown as logo text)',
    links: 'Optional call-to-action button',
  },

  params: {},

  presets: {
    default: {
      label: 'Standard',
      params: {},
    },
  },
}
