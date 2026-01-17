/**
 * Gallery Component Metadata
 */
export default {
  title: 'Image Gallery',
  description: 'Display images in grid, masonry, or carousel layouts',
  category: 'Media',

  elements: {
    title: {
      label: 'Section Title',
      description: 'Optional heading for the gallery',
    },
    paragraphs: {
      label: 'Section Description',
      description: 'Introductory text above the gallery',
    },
    imgs: {
      label: 'Images',
      required: true,
      description: 'Images from markdown ![alt](url) syntax',
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
        { value: 'grid', label: 'Grid' },
        { value: 'masonry', label: 'Masonry' },
        { value: 'carousel', label: 'Carousel' },
      ],
      default: 'grid',
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
  },

  presets: {
    default: {
      label: 'Standard Grid',
      description: 'Images in a uniform grid',
      properties: { layout: 'grid', columns: 3 },
    },
    masonry: {
      label: 'Masonry',
      description: 'Pinterest-style masonry layout',
      properties: { layout: 'masonry', columns: 3 },
    },
    carousel: {
      label: 'Carousel',
      description: 'Horizontal scrolling gallery',
      properties: { layout: 'carousel' },
    },
  },
}
