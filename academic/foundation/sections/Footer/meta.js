/**
 * Footer Component Metadata (v2)
 *
 * Site footer with auto/manual navigation modes.
 */
export default {
  title: 'Footer',
  description: 'Site footer with navigation, contact info, and copyright',

  content: {
    title: 'Site name (uses site config if not provided)',
    subtitle: 'Short site tagline',
    image: 'Site logo',
    paragraphs: 'Contact information or address',
    links: 'Footer links including social media',
    items: 'Additional columns (H3 = column heading, links below)',
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
    columns: {
      type: 'select',
      label: 'Columns',
      description: 'Number of columns in footer',
      options: [
        { value: 'auto', label: 'Auto' },
        { value: '2', label: '2 Columns' },
        { value: '3', label: '3 Columns' },
        { value: '4', label: '4 Columns' },
      ],
      default: 'auto',
    },
    showCopyright: {
      type: 'boolean',
      label: 'Show Copyright',
      description: 'Display copyright notice at bottom',
      default: true,
    },
    copyrightText: {
      type: 'string',
      label: 'Copyright Text',
      description: 'Custom copyright text (uses site name and current year if not provided)',
    },
  },

  presets: {
    default: {
      label: 'Auto Navigation',
      params: { mode: 'auto', theme: 'dark' },
    },
    light: {
      label: 'Light Footer',
      params: { mode: 'auto', theme: 'light' },
    },
    multiColumn: {
      label: 'Multi-Column',
      params: { mode: 'manual', columns: '4', theme: 'dark' },
    },
  },
}
