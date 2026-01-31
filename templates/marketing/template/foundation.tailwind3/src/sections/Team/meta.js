/**
 * Team Component Metadata (v2)
 *
 * Display team member profiles with photos and social links.
 */
export default {
  title: 'Team Section',
  description: 'Display team member profiles with photos and social links',
  category: 'showcase',
  purpose: 'Introduce',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory text about the team',
    items: 'Team members (H3 = name, paragraphs = role/bio, image = photo, links = social)',
  },

  params: {
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
      params: { style: 'cards', columns: 3 },
    },
    simple: {
      label: 'Simple Avatars',
      params: { style: 'simple', columns: 4 },
    },
  },
}
