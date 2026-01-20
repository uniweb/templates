/**
 * Foundation Runtime Configuration
 *
 * Exports foundation-level runtime configuration:
 * - Layout: Custom layout component for page rendering
 * - props: Foundation-wide props accessible to components
 *
 * The Layout component receives pre-rendered page areas:
 * - header, body, footer: Core page regions
 * - left/leftPanel, right/rightPanel: Sidebar panels
 * - page, website: Runtime context
 */

import Layout from './components/Layout'

export default {
  Layout,

  // Foundation-wide props (accessible via website.foundationProps)
  props: {
    // Add any foundation-wide configuration here
    // e.g., themeToggleEnabled: true
  },
}
