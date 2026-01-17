import { readFileSync, existsSync } from 'fs'
import yaml from 'js-yaml'

// Read foundation from site.yml
const siteConfig = yaml.load(readFileSync('./site.yml', 'utf8'))
const foundation = siteConfig.foundation || 'foundation'

// Resolve foundation path (workspace sibling or node_modules)
const workspacePath = `../${foundation}/src/**/*.{js,jsx,ts,tsx}`
const npmPath = `./node_modules/${foundation}/src/**/*.{js,jsx,ts,tsx}`
const contentPath = existsSync(`../${foundation}`) ? workspacePath : npmPath

export default {
  content: [contentPath],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
      },
    },
  },
  plugins: [],
}
