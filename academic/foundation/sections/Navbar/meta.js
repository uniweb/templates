/**
 * Navbar Component Metadata (v2)
 *
 * Navigation header with auto/manual modes and locale support.
 */
export default {
  title: 'Navbar',
  description: 'Site navigation header with automatic page detection and locale switcher',
  category: 'navigation',
  purpose: 'Navigate',

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
    showSearch: {
      type: 'select',
      label: 'Search',
      description: 'When to show the search button (requires fuse.js)',
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
      params: { mode: 'auto', sticky: true },
    },
    manual: {
      label: 'Manual Navigation',
      params: { mode: 'manual', sticky: true },
    },
    centered: {
      label: 'Centered Logo',
      params: { mode: 'auto', logoPosition: 'center' },
    },
  },
}
