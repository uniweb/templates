/**
 * Gallery Component Metadata (v2)
 *
 * Display images in grid, masonry, or carousel layouts.
 */
export default {
  title: 'Image Gallery',
  description: 'Display images in grid, masonry, or carousel layouts',
  category: 'media',
  purpose: 'Showcase',

  content: {
    title: 'Section heading',
    paragraphs: 'Introductory text',
    images: 'Gallery images',
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
      params: { layout: 'grid', columns: 3 },
    },
    masonry: {
      label: 'Masonry',
      params: { layout: 'masonry', columns: 3 },
    },
    carousel: {
      label: 'Carousel',
      params: { layout: 'carousel' },
    },
  },
}
