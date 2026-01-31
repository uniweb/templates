/**
 * Video Component Metadata (v2)
 *
 * Embed YouTube or Vimeo videos with optional thumbnail facade.
 */
export default {
  title: 'Video Section',
  description: 'Embed YouTube or Vimeo videos with optional thumbnail facade',
  category: 'media',
  purpose: 'Engage',

  content: {
    pretitle: 'Eyebrow text',
    title: 'Section heading',
    paragraphs: 'Description of the video',
    links: 'Video URL (YouTube or Vimeo)',
    image: 'Custom thumbnail image',
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
      description: 'Start playing immediately (muted)',
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
