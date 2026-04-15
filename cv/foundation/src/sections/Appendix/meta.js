export default {
  title: 'Appendix',
  description: "Free-form additional content driven by tagged YAML blocks in the section's markdown file. Each tag becomes its own subsection in both preview and docx.",
  category: 'report',
  purpose: 'Inform',

  content: {
    title: 'Optional heading override (defaults to "Appendix")',
  },

  data: {
    '*': 'Any tagged YAML block in the markdown body is treated as a subsection',
  },
}
