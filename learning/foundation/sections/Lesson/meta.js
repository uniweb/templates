export default {
  family: 'steps',
  title: 'Lesson',
  description: 'Unified lesson section with auto-detected variant (material, quiz, code challenge, open-ended)',

  content: {
    title: 'Lesson heading (optional)',
    paragraphs: 'Lesson prose content',
    snippets: 'Code snippets (triggers code challenge variant)',
    // It renders the lesson as written, through kit's <Prose> — images, tables, equations and
    // embedded components included, wherever the author put them — and honours every placement
    // an author gives an image, a video or a table: kit's <Render> lays out all four.
    sequence: { label: 'The lesson, as written', placement: true },
  },

  // The data blocks a lesson reads — from content.sequence, by tag. Declared, they are in
  // content.data too, and a block under another tag is said to reach no key (in dev).
  data: { quiz: {}, rubric: {}, requirements: {}, resources: {} },

  params: {
    video: { type: 'boolean', default: false },
  },
}
