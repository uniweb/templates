import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import typography from '@tailwindcss/typography'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  content: [join(__dirname, './src/**/*.{js,jsx,ts,tsx}')],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
      },
    },
  },
  plugins: [typography],
}
