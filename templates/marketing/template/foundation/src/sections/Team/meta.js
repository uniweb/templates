/**
 * Team Component Metadata (v2)
 */
export default {
  title: 'Team Section',
  description: 'Display team member profiles with photos and social links',
  category: 'showcase',
  purpose: 'Introduce',

  // Data configuration: team entity with schema for type safety
  data: {
    entity: 'team',
    schemas: {
      team: {
        name: { type: 'string', default: '' },
        role: { type: 'string', default: '' },
        bio: { type: 'string', default: '' },
        avatar: { type: 'string', default: '' },
        social: {
          type: 'object',
          schema: {
            linkedin: 'string',
            twitter: 'string',
            github: 'string',
          },
        },
      },
    },
  },

  content: {
    title: 'Section title',
    paragraphs: 'Intro text [1]',
    items: {
      label: 'Team members [3-8]',
      hint: 'Use a team collection in library/team/ or inline H3 patterns.',
    },
  },

  params: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: ['light', 'gray', 'dark'],
      default: 'light',
    },
    columns: {
      type: 'select',
      label: 'Columns',
      options: [
        { value: 2, label: '2 Columns' },
        { value: 3, label: '3 Columns' },
        { value: 4, label: '4 Columns' },
      ],
      default: 3,
    },
    style: {
      type: 'select',
      label: 'Style',
      options: ['cards', 'simple'],
      default: 'cards',
    },
  },

  presets: {
    default: {
      label: 'Team Cards',
      params: { style: 'cards', columns: 3 },
    },
    simple: {
      label: 'Simple Avatars',
      params: { style: 'simple', columns: 4 },
    },
  },
}
