/**
 * Team Component Metadata
 */
export default {
  title: 'Team Section',
  description: 'Display team member profiles with photos and social links',
  category: 'Content',

  elements: {
    title: {
      label: 'Section Title',
      description: 'Heading for the team section',
    },
    paragraphs: {
      label: 'Section Description',
      description: 'Introductory text about the team',
    },
    subsections: {
      label: 'Team Members',
      required: true,
      description: 'Each H3 is a name. Paragraphs: role, bio. Image: photo. Links: social profiles.',
    },
  },

  properties: {
    theme: {
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'gray', label: 'Gray' },
        { value: 'dark', label: 'Dark' },
      ],
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
      options: [
        { value: 'cards', label: 'Cards' },
        { value: 'simple', label: 'Simple' },
      ],
      default: 'cards',
    },
  },

  presets: {
    default: {
      label: 'Team Cards',
      description: 'Team members in card format',
      properties: { style: 'cards', columns: 3 },
    },
    simple: {
      label: 'Simple Avatars',
      description: 'Compact avatar-based layout',
      properties: { style: 'simple', columns: 4 },
    },
  },
}
