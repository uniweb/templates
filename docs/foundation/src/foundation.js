/**
 * Documentation Foundation Configuration
 *
 * This file defines foundation-level settings:
 * - vars: CSS custom properties that sites can override in theme.yml
 * - defaultLayout: Which layout to use when pages don't specify one
 *
 * Identity (name, version, description) comes from package.json.
 * Layout components are auto-discovered from src/layouts/.
 * Section types are auto-discovered from src/sections/.
 *
 * Optionally, a foundation-level `scroll` property can be set here to
 * control scroll restoration for all layouts that don't declare their own.
 * This foundation's DocsLayout declares scroll: 'main' in its own meta.js,
 * so no foundation-level scroll override is needed.
 */

/**
 * CSS custom properties — sites override these in theme.yml under `vars:`.
 * These become CSS variables (e.g., var(--header-height)) available to
 * all components in the foundation.
 */
export const vars = {
  // Layout
  'header-height': {
    default: '4rem',
    description: 'Fixed header height',
  },
  'sidebar-width': {
    default: '280px',
    description: 'Left sidebar width',
  },
  'content-max-width': {
    default: '48rem',
    description: 'Maximum content width (768px)',
  },

  // Typography
  'prose-font-size': {
    default: '1rem',
    description: 'Base font size for prose content',
  },
}

export default {
  defaultLayout: 'DocsLayout',

  // Foundation-wide props (accessible via website.foundationProps):
  props: {},
}
