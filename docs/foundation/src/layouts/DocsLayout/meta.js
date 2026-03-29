/**
 * DocsLayout Metadata
 *
 * Layout meta.js declares capabilities the runtime needs to know about.
 *
 * - areas: Which named content areas the layout renders. Content authors
 *   place section files in site/layout/ to fill these areas.
 *
 * - scroll: Controls how the runtime manages scroll restoration on
 *   back/forward navigation. Values:
 *     - (not set): runtime manages scroll on window (default)
 *     - 'self':    layout handles its own scrolling, runtime disables
 *     - 'main':    runtime manages scroll on the <main> element
 *   This layout uses overflow-based scrolling on <main>, so we tell the
 *   runtime to track scroll on that element instead of window.
 */
export default {
  title: 'Documentation',
  description: 'Three-column layout with sidebar navigation for documentation pages',
  areas: ['header', 'footer', 'left', 'right'],
  scroll: 'main',
}
