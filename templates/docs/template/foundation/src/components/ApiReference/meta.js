/**
 * ApiReference Component Metadata
 *
 * Displays API endpoint documentation with method, path, parameters,
 * and request/response examples. Uses dataBlock for structured API definition.
 */
export default {
  title: 'API Reference',
  description: 'API endpoint documentation with method, parameters, and examples',
  category: 'Content',

  elements: {
    title: {
      label: 'Endpoint Name',
      description: 'Name of the API endpoint (H1)',
      required: true,
    },
    paragraphs: {
      label: 'Description',
      description: 'Endpoint description text',
    },
    data: {
      api: 'API definition (yaml:api or json:api block)',
    },
  },

  properties: {
    show_try_it: {
      type: 'boolean',
      label: 'Show Try It',
      description: 'Display a "Try it" button (visual only)',
      default: false,
    },
    compact: {
      type: 'boolean',
      label: 'Compact Mode',
      description: 'Use compact layout for parameter tables',
      default: false,
    },
  },
}
