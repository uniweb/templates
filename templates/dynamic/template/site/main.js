// Static CSS import - Vite will inject <link> tag into HTML
import '#foundation/styles'

import { start } from '@uniweb/runtime'

start({
  foundation: import('#foundation')
})
