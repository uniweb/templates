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
 * What IS declared is `@std/form` — a schema describing *a well-formed form
 * definition*, which is the only answerable question at build time. It cannot
 * reach the author's own field names (it does not name them, and validation
 * recurses only where a schema declares structure), so it checks the shape
 * without touching the design: a list of controls, each with a `name` and a
 * `type` from the authoring vocabulary.
 */
export default {
  title: 'Quote Form',
  description:
    'Renders a form designed by the author and sends it to the destination the site declares. Draws whatever fields it is given.',
  category: 'structure',
  purpose: 'Convert',

  data: {
    form: '@std/form',
  },

  content: {
    title: 'Section heading',
    paragraphs: 'Short introduction [0-1]',
    data: 'A `yaml:form` block — a list of controls to draw',
  },

  params: {},
}
