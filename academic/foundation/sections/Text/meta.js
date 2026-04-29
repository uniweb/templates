/**
 * Text Component Metadata (v2)
 *
 * Rich text with academic typography options.
 */
export default {
  title: 'Text Block',
  description: 'Rich text content with academic typography options',
  category: 'content',
  purpose: 'Inform',

  content: {
    pretitle: 'Eyebrow text',
    title: 'Main heading',
    subtitle: 'Secondary heading',
    paragraphs: 'Body content',
    links: 'Related links',
  },

  params: {
    textScale: {
      type: 'select',
      label: 'Size Scale',
      description: 'Overall text size progression',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'normal', label: 'Normal' },
        { value: 'large', label: 'Large' },
        { value: 'xlarge', label: 'Extra Large' },
      ],
      default: 'normal',
    },
    textDensity: {
      type: 'select',
      label: 'Spacing & Density',
      description: 'Vertical rhythm and padding',
      options: [
        { value: 'compact', label: 'Compact' },
        { value: 'normal', label: 'Normal' },
        { value: 'spacious', label: 'Spacious' },
      ],
      default: 'normal',
    },
    headingStyle: {
      type: 'select',
      label: 'Heading Style',
      description: 'Typography character for headings',
      options: [
        { value: 'bold', label: 'Modern Bold' },
        { value: 'light', label: 'Clean Light' },
        { value: 'serif', label: 'Elegant Serif' },
        { value: 'slab', label: 'Impact Slab' },
      ],
      default: 'bold',
    },
    textWidth: {
      type: 'select',
      label: 'Content Width',
      description: 'Maximum width for readability',
      options: [
        { value: 'narrow', label: 'Narrow' },
        { value: 'regular', label: 'Regular' },
        { value: 'wide', label: 'Wide' },
        { value: 'full', label: 'Full Width' },
      ],
      default: 'regular',
    },
    textAlign: {
      type: 'select',
      label: 'Alignment',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
      default: 'left',
    },
  },

  presets: {
    body: {
      label: 'Body Text',
      params: { textScale: 'normal', textDensity: 'normal', textWidth: 'regular' },
    },
    intro: {
      label: 'Introduction',
      params: { textScale: 'large', textDensity: 'spacious', textWidth: 'regular' },
    },
    hero: {
      label: 'Hero Text',
      params: { textScale: 'xlarge', textAlign: 'center', textWidth: 'wide' },
    },
    compact: {
      label: 'Compact',
      params: { textScale: 'small', textDensity: 'compact', textWidth: 'narrow' },
    },
  },
}
