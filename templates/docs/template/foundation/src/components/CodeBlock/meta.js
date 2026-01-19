export default {
  title: 'Code Block',
  description: 'Display code snippets with syntax highlighting and copy button',
  category: 'Content',

  elements: {
    title: {
      label: 'Filename',
      description: 'Optional filename or description',
    },
    paragraphs: {
      label: 'Code',
      description: 'The code to display',
      required: true,
    },
  },

  properties: {
    language: {
      type: 'select',
      label: 'Language',
      options: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'jsx', label: 'JSX' },
        { value: 'tsx', label: 'TSX' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'json', label: 'JSON' },
        { value: 'yaml', label: 'YAML' },
        { value: 'markdown', label: 'Markdown' },
        { value: 'bash', label: 'Bash' },
        { value: 'python', label: 'Python' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
      ],
      default: 'javascript',
    },
    show_copy: {
      type: 'boolean',
      label: 'Show Copy Button',
      default: true,
    },
    show_language: {
      type: 'boolean',
      label: 'Show Language Label',
      default: true,
    },
  },
}
