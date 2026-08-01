/**
 * QuoteForm Component Metadata
 *
 * Note what is NOT declared here: the form's fields.
 *
 * A form definition is content the author owns — they design it in the editor
 * and it lands as a `yaml:form` block. Its field names are not knowable when
 * this file is written, so declaring a schema for them would describe the
 * visitor's answers rather than anything this component can promise.
 *
 * A schema for the form's *envelope* (title, description, fields-as-a-map)
 * would be legitimate and is deliberately left off: the component already
 * degrades to rendering nothing when the block is absent or malformed, and a
 * build-time check earns its keep once a site has more than one of these.
 */
export default {
  title: 'Quote Form',
  description:
    'Renders a form designed by the author and sends it to the destination the site declares. Draws whatever fields it is given.',
  category: 'structure',
  purpose: 'Convert',

  content: {
    title: 'Section heading',
    paragraphs: 'Short introduction [0-1]',
    data: 'A `yaml:form` block describing the fields to draw',
  },

  params: {},
}
