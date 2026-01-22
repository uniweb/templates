/**
 * Team Component Metadata (v2)
 */
export default {
  title: 'Team Section',
  description: 'Display team member profiles with photos and social links',
  category: 'showcase',
  purpose: 'Introduce',

  content: {
    title: 'Section title',
    paragraphs: 'Intro text [1]',
    items: {
      label: 'Team members [3-8]',
      hint: 'Each H3 is a name. Paragraphs: role, bio. Image: photo. Links: social profiles.',
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
