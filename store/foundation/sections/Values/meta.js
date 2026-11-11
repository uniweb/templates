export default {
  family: 'features',
  title: 'Values',
  description: 'Two-column layout with text and icon-based value propositions',

  content: {
    items: {
      label: 'Value columns [2]',
      content: {
        title: 'Heading',
        paragraphs: 'Text',
        icons: { label: 'Icons', hint: 'Start each paragraph with an icon to show the column as a list.' },
      },
    },
  },

  params: {},

  presets: {
    default: {
      label: 'Two Column Values',
      params: {},
    },
  },
}
