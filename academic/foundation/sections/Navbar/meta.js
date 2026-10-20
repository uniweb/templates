/**
 * Navbar Component Metadata (v2)
 *
 * Navigation header with auto/manual modes and locale support.
 */
export default {
  family: 'header',

  // Stays in view as the page scrolls — the runtime makes sticky the box that can (a
  // section's own markup cannot). An author turns it off with `sticky: false`, a setting of
  // the section rather than one of this component's params.
  sticky: true,
  title: 'Navbar',
  description: 'Site navigation header with automatic page detection and locale switcher',

  content: {
    title: 'Site name (uses site config if not provided)',
    image: 'Site logo',
    links: 'Navigation links (only used in manual mode)',
  },

  params: {
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
    showSearch: {
      type: 'select',
      label: 'Search',
      description: 'When to show the search button',
      options: [
        { value: 'auto', label: 'Auto (if search enabled)' },
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
      params: { mode: 'auto' },
    },
    manual: {
      label: 'Manual Navigation',
      params: { mode: 'manual' },
    },
    centered: {
      label: 'Centered Logo',
      params: { mode: 'auto', logoPosition: 'center' },
    },
  },
}
