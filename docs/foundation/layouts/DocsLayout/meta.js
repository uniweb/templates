/**
 * DocsLayout Metadata
 *
 * Layout meta.js describes the layout to an editor, and declares the few
 * settings the runtime reads (scroll, transitions, param defaults).
 *
 * - areas: Which named content areas the layout renders — for an editor to
 *   offer. Content authors place section files in site/layout/ to fill them;
 *   the runtime renders whatever that folder holds.
 *
 * - scroll: Which element the runtime restores on back/forward navigation. This
 *   layout lets the page itself scroll, which is the default, so it sets none.
 */
export default {
  title: 'Documentation',
  description: 'Three-column layout with sidebar navigation for documentation pages',
  areas: ['header', 'footer', 'left', 'right'],

  // View transition names for animated page navigation.
  // Maps layout areas to view-transition-name CSS values. The runtime wraps
  // each area in a thin div with this name, so the browser can animate them
  // independently. Areas with the same name across layouts morph between them
  // (position + size interpolation); areas unique to one layout fade in/out.
  // The body has no name and crossfades with the page: Safari captures a named
  // element whole, and a long page would freeze a phone on every navigation.
  transitions: {
    header: 'header',   // Stays put during same-layout navigation
    left: 'sidebar',    // Stays put (same sidebar across pages)
    footer: 'footer',   // Stays put
  },
}
