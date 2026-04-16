export default {
  title: 'Section',
  description:
    'Generic CV section. Renders title, paragraphs, and items from semantic content. Loom expressions in the markdown are resolved before this component sees the content.',
  category: 'content',

  data: {
    inherit: ['profile'],
  },

  content: {
    description:
      'Markdown with an H1 title, body paragraphs, and optional H2-headed items. Any {expression} is evaluated by Loom at render time.',
  },

  params: {
    repeat: {
      type: 'string',
      description:
        'Profile data field to iterate. When set, a --- divider splits the markdown into header (rendered once against the full profile) and body (repeated per item in the named array). A second --- starts a footer (rendered once).',
    },
  },
}
