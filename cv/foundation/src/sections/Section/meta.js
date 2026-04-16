export default {
  title: 'Section',
  description:
    'Generic timeline section. Reads a data array from the profile via the dataField param and renders each item as a timeline entry with primary heading, secondary line, and description.',
  category: 'report',

  data: {
    inherit: ['profile'],
  },

  content: {
    title: 'Section heading',
  },

  params: {
    dataField: {
      type: 'string',
      description: 'Profile field containing the data array (e.g., "education", "employment").',
    },
    primaryField: {
      type: 'string',
      description: 'Item field for the main heading (e.g., "degree", "role").',
      default: 'title',
    },
    secondaryField: {
      type: 'string',
      description: 'Item field for the secondary line (e.g., "institution", "organization").',
    },
  },
}
