/**
 * Foundation Configuration
 *
 * Identity (name, version, description) comes from package.json.
 */

/**
 * CSS custom properties that sites can override in theme.yml
 */
export const vars = {
  'header-height': {
    default: '4.5rem',
    description: 'Fixed header height',
  },
  'max-content-width': {
    default: '72rem',
    description: 'Maximum content width (1152px)',
  },
  'section-padding-y': {
    default: 'clamp(3.5rem, 6vw, 6rem)',
    description: 'Vertical padding for sections (fluid: adapts to viewport)',
  },
  'control-radius': {
    default: '0.75rem',
    description: 'Corner radius for form controls and buttons',
  },
}

export default {
  props: {},
}
