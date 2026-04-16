export default {
  title: 'CV Entry',
  description:
    'Generic CV section. Renders title, paragraphs, and items from semantic content. Loom expressions in the markdown are resolved before this component sees the content.',
  category: 'content',

  data: {
    inherit: ['profile'],
  },

  content: {
    title: 'Section heading (H1)',
    paragraphs: 'Introductory text',
    items: 'Repeated entries — each with title (H2) and detail paragraphs',
  },

  params: {
    source: {
      type: 'string',
      description:
        'Profile data field to iterate. When set, a --- divider splits the markdown into header (rendered once against the full profile) and body (repeated per item in the named array). A second --- starts a footer (rendered once).',
    },
    where: {
      type: 'string',
      description:
        'Loom filter expression. When set alongside source, only items where the expression evaluates to truthy are iterated. Examples: "type = \'book\'", "year > \'1870\'", "refereed".',
    },
  },
}
