export default {
  name: 'Summary',
  description:
    'Career summary prose section. Renders a title and paragraphs from semantic content, after the foundation content handler has instantiated any Loom {placeholder} expressions against the block data.',
  content: {
    description:
      'Narrative markdown. Any {expression} in the text is evaluated by Loom at render time against the data from the page frontmatter.',
  },
  params: {},
}
