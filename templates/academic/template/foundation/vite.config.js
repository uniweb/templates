import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react(), svgr()],
  build: {
    lib: {
      entry: './src/_entry.generated.js',
      name: 'Foundation',
      fileName: 'foundation',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@uniweb/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
