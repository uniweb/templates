export default {
  title: 'Publications',
  description: 'Formatted bibliography rendered through citestyle. Preview uses CSL semantic HTML with per-field CSS classes; docx uses a hanging-indent paragraph style from the foundation style pack.',
  category: 'report',
  purpose: 'Inform',

  content: {
    title: 'Optional heading override (defaults to "Publications")',
  },

  data: {
    publications: 'Collection of CSL-JSON publication records. Each item: { id, type, title, author, issued, publisher, container-title, volume, page, ... }',
  },
}
