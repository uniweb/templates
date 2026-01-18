/**
 * Navbar Component Metadata
 *
 * Navigation header with auto/manual modes and locale support.
 */
export default {
  title: 'Navbar',
  description: 'Site navigation header with automatic page detection and locale switcher',
  category: 'Navigation',

  elements: {
    title: {
      label: 'Site Name',
      description: 'Site or brand name (uses site config name if not provided)',
    },
    imgs: {
      label: 'Logo',
      description: 'Site logo image',
    },
    links: {
      label: 'Navigation Links',
      description: 'Manual navigation links (only used in manual mode)',
    },
  },

  properties: {
    mode: {
      type: 'select',
      label: 'Navigation Mode',
      description: 'Auto mode builds navigation from site pages; Manual mode uses provided links',
      options: [
        { value: 'auto', label: 'Auto (from pages)' },
        { value: 'manual', label: 'Manual (from content)' },
      ],
      default: 'auto',
    },
    sticky: {
      type: 'boolean',
      label: 'Sticky Header',
      description: 'Keep navbar fixed at top while scrolling',
      default: true,
    },
    showLocale: {
      type: 'select',
      label: 'Locale Switcher',
      description: 'When to show the language/locale switcher',
      options: [
        { value: 'auto', label: 'Auto (if multiple locales)' },
        { value: 'always', label: 'Always' },
        { value: 'never', label: 'Never' },
      ],
      default: 'auto',
    },
    logoPosition: {
      type: 'select',
      label: 'Logo Position',
      description: 'Position of logo/site name',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
      ],
      default: 'left',
    },
  },

  presets: {
    default: {
      label: 'Auto Navigation',
      description: 'Automatic navigation from site pages',
      properties: { mode: 'auto', sticky: true },
    },
    manual: {
      label: 'Manual Navigation',
      description: 'Custom navigation links from content',
      properties: { mode: 'manual', sticky: true },
    },
    centered: {
      label: 'Centered Logo',
      description: 'Logo in center with navigation on sides',
      properties: { mode: 'auto', logoPosition: 'center' },
    },
  },
}
