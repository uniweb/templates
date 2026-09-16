export default {
  family: 'steps',
  title: 'Lesson',
  description: 'Unified lesson section with auto-detected variant (material, quiz, code challenge, open-ended)',

  content: {
    title: 'Lesson heading (optional)',
    paragraphs: 'Lesson prose content',
    snippets: 'Code snippets (triggers code challenge variant)',
  },

  // The data blocks a lesson reads — from content.sequence, by tag. Declared, they are in
  // content.data too, and a block under another tag is said to reach no key (in dev).
  data: { quiz: {}, rubric: {}, requirements: {}, resources: {} },

  params: {
    video: { type: 'boolean', default: false },
  },
}
