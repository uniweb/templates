/**
 * Footer Component Metadata
 *
 * Site footer with auto/manual navigation modes.
 */
export default {
  title: 'Footer',
  description: 'Site footer with navigation, contact info, and copyright',
  category: 'Navigation',

  elements: {
    title: {
      label: 'Site Name',
      description: 'Site or brand name (uses site config name if not provided)',
    },
    subtitle: {
      label: 'Tagline',
      description: 'Short site description or tagline',
    },
    imgs: {
      label: 'Logo',
      description: 'Site logo image',
    },
    paragraphs: {
      label: 'Contact Info',
      description: 'Contact information or address',
    },
    links: {
      label: 'Links',
      description: 'Footer links including social media (auto-detected)',
    },
    items: {
      label: 'Columns',
      description: 'Additional columns (use H3 for column headings with links below)',
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
    background: {
      type: 'select',
      label: 'Background',
      description: 'Footer background style',
      options: [
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
        { value: 'primary', label: 'Primary Color' },
        { value: 'white', label: 'White' },
      ],
      default: 'dark',
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
      description: 'Dark footer with automatic navigation',
      properties: { mode: 'auto', background: 'dark' },
    },
    light: {
      label: 'Light Footer',
      description: 'Light background footer',
      properties: { mode: 'auto', background: 'light' },
    },
    multiColumn: {
      label: 'Multi-Column',
      description: 'Footer with custom columns from content',
      properties: { mode: 'manual', columns: '4', background: 'dark' },
    },
  },
}
