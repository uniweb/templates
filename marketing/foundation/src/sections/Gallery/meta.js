/**
 * Gallery Component Metadata (v2)
 */
export default {
  title: 'Image Gallery',
  description: 'Display images in grid, masonry, or carousel layouts',
  category: 'showcase',
  purpose: 'Display',

  content: {
    title: 'Section title',
    paragraphs: 'Intro text [1]',
    image: 'Gallery images [3+]',
  },

  params: {
    layout: {
      type: 'select',
      label: 'Layout',
      options: ['grid', 'masonry', 'carousel'],
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
