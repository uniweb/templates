/**
 * Foundation Configuration
 *
 * This file defines foundation-level configuration:
 * - vars: CSS custom properties that sites can override in theme.yml
 * - defaultLayout: the layout a page uses when it names none (optional)
 *
 * Name: `uniweb create` adds `name` to the default export — what this
 * foundation registers as (@org/<name>). The version comes from package.json.
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
    default: '80rem',
    description: 'Maximum content width (1280px)',
  },
  'section-padding-y': {
    default: 'clamp(4rem, 6vw, 7rem)',
    description: 'Vertical padding for sections (fluid: adapts to viewport)',
  },
}
/**
 * The foundation's declarations
 */
export default {
  // Optional: Create custom layouts in src/layouts/
  // Then set defaultLayout: 'MyLayout' below
}
