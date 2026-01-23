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

  // Schema for dataBlocks - applied at runtime to ensure defaults and types
  schemas: {
    api: {
      method: {
        type: 'select',
        default: 'GET',
        label: 'HTTP Method',
        options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      },
      path: {
        type: 'string',
        default: '',
        label: 'Endpoint Path',
        description: 'URL path with optional {param} placeholders',
      },
      parameters: {
        type: 'array',
        default: [],
        label: 'Parameters',
        description: 'Path, query, header, or body parameters',
        of: {
          name: { type: 'string', label: 'Parameter name' },
          in: { type: 'string', default: 'query', label: 'Location (path, query, header, body)' },
          type: { type: 'string', default: 'string', label: 'Data type' },
          required: { type: 'boolean', default: false, label: 'Required parameter' },
          description: { type: 'string', default: '', label: 'Parameter description' },
        },
      },
      requestBody: {
        type: 'string',
        label: 'Request Body',
        description: 'Example request body (JSON string)',
      },
      response: {
        type: 'object',
        label: 'Single Response',
        description: 'Simple response definition',
        schema: {
          status: { type: 'number', default: 200, label: 'HTTP status code' },
          body: { type: 'string', default: '', label: 'Response body example' },
        },
      },
      responses: {
        type: 'array',
        default: [],
        label: 'Multiple Responses',
        description: 'Array of possible responses',
        of: {
          status: { type: 'number', default: 200, label: 'HTTP status code' },
          description: { type: 'string', default: '', label: 'Response description' },
          body: { type: 'string', default: '', label: 'Response body example' },
        },
      },
    },
  },
}
