/**
 * DocsLayout Metadata
 *
 * Layout meta.js describes the layout to an editor, and declares the few
 * settings the runtime reads (scroll, param defaults).
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
}
