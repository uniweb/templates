export default {
  title: 'Figure',
  description:
    'One captioned image, in the document and in its web preview, shown when the document includes figures. The image is set in the frontmatter, and the caption is the body\'s first paragraph.',

  content: {
    paragraphs: 'Caption [1]',
  },

  params: {
    src: { type: 'string', label: 'Image', hint: 'The image\'s address, such as /images/galapagos-aerial.png' },
    alt: { type: 'string', label: 'Alt text' },
    width: { type: 'number', label: 'Width', default: 560 },
    height: { type: 'number', label: 'Height', default: 360 },
    portrait: { type: 'boolean', label: 'Portrait', hint: 'Shown narrow and centred', default: false },
    chapterKey: {
      type: 'string',
      label: 'Chapter',
      hint: 'The key of the chapter it belongs to, so it is left out with that chapter',
    },
  },
}
