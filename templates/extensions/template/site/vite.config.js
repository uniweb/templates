import { resolve } from 'node:path'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { defineSiteConfig } from '@uniweb/build/site'

/**
 * Serve the effects extension's built output during development.
 * Maps /effects/* to ../effects/dist/* so the same URL works in dev and production.
 */
function serveExtensions() {
  const extensionsDir = resolve(import.meta.dirname, '../effects/dist')

  return {
    name: 'serve-extensions',
    configureServer(server) {
      server.middlewares.use('/effects', (req, res, next) => {
        const filePath = resolve(extensionsDir, req.url.slice(1))

        // Security: don't serve outside the dist directory
        if (!filePath.startsWith(extensionsDir)) return next()

        if (existsSync(filePath) && statSync(filePath).isFile()) {
          const ext = filePath.split('.').pop()
          const types = { js: 'application/javascript', css: 'text/css', json: 'application/json' }
          res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(readFileSync(filePath))
        } else {
          next()
        }
      })
    }
  }
}

export default defineSiteConfig({
  plugins: [serveExtensions()]
})
