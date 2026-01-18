export default {
  title: 'Header',
  description: 'A responsive navigation header with intelligent context awareness',
  category: 'Navigation',

  elements: {
    title: {
      label: 'Site Name',
      description: 'Shown if no logo image is provided',
    },
    imgs: {
      label: 'Logo',
      description: 'Site logo image',
    },
    links: {
      label: 'CTA Button',
      description: 'Optional call-to-action button',
    },
  },

  // No configurable parameters - header adapts automatically
  // based on the next block's context
  properties: {},
}
