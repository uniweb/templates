/**
 * Academic Foundation Configuration
 *
 * This file defines foundation-level configuration:
 * - vars: CSS custom properties that sites can override in theme.yml
 * - Layout: Custom layout component (optional)
 *
 * Identity (name, version, description) comes from package.json.
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
  'max-content-width': {
    default: '72rem',
    description: 'Maximum content width (1152px)',
  },
  'section-padding-y': {
    default: 'clamp(3rem, 5vw, 5rem)',
    description: 'Vertical padding for sections (fluid: adapts to viewport)',
  },

  // Academic-specific
  'sidebar-width': {
    default: '300px',
    description: 'Profile sidebar width',
  },

  // Publication type indicators
  'pub-journal': {
    default: '#3b82f6',
    description: 'Journal article indicator color',
  },
  'pub-conference': {
    default: '#8b5cf6',
    description: 'Conference paper indicator color',
  },
  'pub-book': {
    default: '#f59e0b',
    description: 'Book/chapter indicator color',
  },
  'pub-preprint': {
    default: '#6b7280',
    description: 'Preprint indicator color',
  },
}
/**
 * Runtime exports (Layout and props)
 */
export default {
  // Optional: Create custom layouts in src/layouts/
  // Then set defaultLayout: 'MyLayout' below

  // Foundation-wide props (accessible via website.foundationProps):
  props: {},
}
