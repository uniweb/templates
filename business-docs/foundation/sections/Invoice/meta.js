export default {
  title: 'Invoice slice',
  description:
    'A section in an invoice document. Renders title, paragraphs, items, and insets from semantic content; Loom expressions in the markdown are resolved before this component sees the content. Multi-line subscription invoices use source: items with a divider-split table body; totals sections rely on the computed {subtotal} / {tax_amount} / {total} placeholders.',
  category: 'business-docs',

  content: {
    title: 'Section heading',
    paragraphs: 'Body paragraphs (Loom expressions allowed)',
    items: 'Repeated entries when the section uses source: items',
  },

  params: {
    source: {
      type: 'string',
      description:
        'Invoice field to iterate (e.g., "items"). When set, --- dividers split the markdown into header / body / footer; the body is rendered once per item with that item\'s fields merged into the Loom namespace.',
    },
    where: {
      type: 'string',
      description:
        'Loom filter expression applied to the source array. Example: "qty > 0".',
    },
  },
}
