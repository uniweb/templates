import { defineSiteConfig } from '@uniweb/build/site'

// Tailwind v3 uses PostCSS, not the Vite plugin
export default defineSiteConfig({ tailwind: false })
