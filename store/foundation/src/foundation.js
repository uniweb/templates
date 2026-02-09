/**
 * Solis Artisans Foundation Configuration
 *
 * Artisan e-commerce foundation with a warm stone-amber design system.
 * CSS vars can be overridden by sites in theme.yml.
 */

export const vars = {
  'header-height': {
    default: '5rem',
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
  'section-padding-x': {
    default: '2rem',
    description: 'Horizontal padding for sections',
  },
  'heading-font': {
    default: 'inherit',
    description: 'Font family for headings',
  },
  'body-font': {
    default: 'inherit',
    description: 'Font family for body text',
  },
  'radius-lg': {
    default: '1.5rem',
    description: 'Large border radius (24px)',
  },
  'radius-xl': {
    default: '3rem',
    description: 'Extra large border radius (48px)',
  },
}

export default {
  props: {},
}
