/**
 * Documentation Foundation Configuration
 *
 * This file defines foundation-level configuration:
 * - vars: CSS custom properties that sites can override in theme.yml
 *
 * Identity (name, version, description) comes from package.json.
 * Layout components are discovered from src/layouts/.
 */

/**
 * CSS custom properties that sites can override in theme.yml
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
