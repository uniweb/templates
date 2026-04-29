/**
 * Primary Foundation Configuration
 *
 * Declares CSS custom properties that sites can override in theme.yml.
 */

export const vars = {
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

export default {
  props: {},
}
