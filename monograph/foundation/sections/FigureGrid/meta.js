export default {
  title: 'Figure Grid',
  family: 'gallery',
  description:
    'A gallery of captioned plates, in the document and in its web preview, shown when the document includes figures. Its heading starts a numbered chapter. `plates:` in the frontmatter lists the images, each with src, alt and caption, and optionally width, height and portrait.',

  content: {
    title: 'Plates heading [0-1]',
  },

  params: {
    chapterKey: {
      type: 'string',
      label: 'Chapter',
      hint: 'The key of the chapter it belongs to, so it is left out with that chapter',
    },
  },
}
