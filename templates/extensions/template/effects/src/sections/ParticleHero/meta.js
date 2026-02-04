export default {
  title: 'Particle Hero',
  description: 'Hero section with animated floating particles',
  category: 'impact',

  content: {
    title: 'Headline',
    subtitle: 'Subtitle',
    paragraphs: 'Description [1]',
    links: 'CTA buttons [1-2]',
  },

  params: {
    particleCount: {
      type: 'number',
      label: 'Particle Count',
      default: 40,
    },
    speed: {
      type: 'number',
      label: 'Animation Speed',
      default: 1,
    },
  },
}
