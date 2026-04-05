export default {
  title: 'Lesson',
  description: 'Unified lesson section with auto-detected variant (material, quiz, code challenge, open-ended)',
  category: 'learning',

  content: {
    title: 'Lesson heading (optional)',
    paragraphs: 'Lesson prose content',
    snippets: 'Code snippets (triggers code challenge variant)',
  },

  params: {
    video: { type: 'boolean', default: false },
  },
}
