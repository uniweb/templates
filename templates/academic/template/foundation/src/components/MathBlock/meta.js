/**
 * MathBlock Component Metadata
 *
 * Display mathematical equations using LaTeX notation.
 * Uses @uniweb/scholar for KaTeX-based rendering.
 */
export default {
  title: 'Math Block',
  description: 'Display mathematical equations and formulas',
  category: 'content',
  purpose: 'Inform',

  content: {
    title: 'Section heading',
    pretitle: 'Eyebrow text above title',
    paragraphs: 'Text content with inline math ($...$) and display math ($$...$$)',
    items: 'Named equations (H3 = label, first paragraph = LaTeX, second = description)',
  },

  params: {
    layout: {
      type: 'select',
      label: 'Layout',
      description: 'Spacing between equations',
      options: [
        { value: 'standard', label: 'Standard' },
        { value: 'compact', label: 'Compact' },
      ],
      default: 'standard',
    },
    showNumbers: {
      type: 'boolean',
      label: 'Show Equation Numbers',
      description: 'Display numbered labels for equations',
      default: true,
    },
    background: {
      type: 'select',
      label: 'Background',
      description: 'Section background color',
      options: [
        { value: 'white', label: 'White' },
        { value: 'gray', label: 'Light Gray' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'white',
    },
  },

  presets: {
    default: {
      label: 'Default',
      params: { layout: 'standard', showNumbers: true, background: 'white' },
    },
    highlight: {
      label: 'Highlighted',
      params: { layout: 'standard', showNumbers: true, background: 'gray' },
    },
    compact: {
      label: 'Compact',
      params: { layout: 'compact', showNumbers: false, background: 'white' },
    },
  },
}
