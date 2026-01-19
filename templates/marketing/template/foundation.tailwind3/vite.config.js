import { defineFoundationConfig } from '@uniweb/build'

export default defineFoundationConfig({
  tailwind: false // Tailwind 3 uses PostCSS, not the Vite plugin
})
