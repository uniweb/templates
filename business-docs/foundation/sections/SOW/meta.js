export default {
  title: 'SOW slice',
  description:
    'A section in a statement-of-work document. Renders title, paragraphs, items, and insets from semantic content; Loom expressions in the markdown are resolved before this component sees the content. Pair multiple SOW sections in one folder (cover, scope, deliverables, fees, terms, signatures) to compose a full SOW.',

  content: {
    title: 'Section heading',
    paragraphs: 'Body paragraphs (Loom expressions allowed)',
    items: {
      label: 'Repeated entries',
      hint: 'With a source set, one entry for each record of that field.',
      content: { title: 'Heading', paragraphs: 'Details' },
    },
  },

  params: {
    source: {
      type: 'string',
      description:
        'SOW field to iterate (e.g., "deliverables", "signatures"). When set, --- dividers split the markdown into header / body / footer; the body is rendered once per item with that item\'s fields merged into the Loom namespace.',
    },
    where: {
      type: 'string',
      description:
        'Loom filter expression applied to the source array. Examples: "fee > 0", "party = \'client\'".',
    },
  },
}
