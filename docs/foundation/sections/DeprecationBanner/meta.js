/**
 * DeprecationBanner Component Metadata (v2)
 *
 * Warning banner for deprecated documentation versions.
 */
export default {
  family: 'callout',
  title: 'Deprecation Banner',
  description: 'Warning banner for deprecated documentation versions',

  content: {},

  params: {
    dismissible: {
      type: 'boolean',
      label: 'Dismissible',
      description: 'Allow users to dismiss the banner',
      default: false,
    },
  },

  presets: {
    default: {
      label: 'Fixed Banner',
      params: { dismissible: false },
    },
    dismissible: {
      label: 'Dismissible Banner',
      params: { dismissible: true },
    },
  },
}
