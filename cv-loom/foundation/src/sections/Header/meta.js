export default {
  title: 'Header',
  description:
    'CV header block. Renders name, role, affiliation, and contact details from Loom-resolved content.',
  category: 'content',

  data: {
    inherit: ['profile'],
  },

  content: {
    description:
      'H1 = full name, H2 = role. Body paragraphs for affiliation and contact lines. Loom expressions fill in the values.',
  },

  params: {},
}
