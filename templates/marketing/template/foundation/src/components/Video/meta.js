/**
 * Video Component Metadata
 */
export default {
  title: 'Video Section',
  description: 'Embed YouTube or Vimeo videos with optional thumbnail facade',
  category: 'Media',

  elements: {
    pretitle: {
      label: 'Eyebrow',
      description: 'Small text above the title (H3 before H2)',
    },
    title: {
      label: 'Section Title',
      description: 'Heading for the video section',
    },
    paragraphs: {
      label: 'Description',
      description: 'Text description of the video',
    },
    links: {
      label: 'Video URL',
      required: true,
      description: 'YouTube or Vimeo URL as a markdown link',
    },
    imgs: {
      label: 'Custom Thumbnail',
      description: 'Optional custom thumbnail image',
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
      description: 'Full-width centered video',
      properties: { layout: 'center' },
    },
    split: {
      label: 'Split Layout',
      description: 'Video alongside description',
      properties: { layout: 'split' },
    },
  },
}
