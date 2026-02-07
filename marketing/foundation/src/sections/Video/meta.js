/**
 * Video Component Metadata (v2)
 */
export default {
  title: 'Video Section',
  description: 'Embed YouTube or Vimeo videos with optional thumbnail facade',
  category: 'showcase',
  purpose: 'Demonstrate',

  content: {
    pretitle: 'Eyebrow',
    title: 'Section title',
    paragraphs: 'Description [1]',
    links: 'Video URL [1]',
    thumbnail: 'Custom thumbnail [1]',
  },

  params: {
    layout: {
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'center', label: 'Centered' },
        { value: 'split', label: 'Split (text + video)' },
      ],
      default: 'center',
    },
    autoplay: {
      type: 'boolean',
      label: 'Autoplay',
      hint: 'Start playing immediately (muted)',
      default: false,
    },
  },

  presets: {
    default: {
      label: 'Centered Video',
      params: { layout: 'center' },
    },
    split: {
      label: 'Split Layout',
      params: { layout: 'split' },
    },
  },
}
