import { Loom, instantiateContent } from '@uniweb/loom'
import splitAtDividers from '#utils/splitAtDividers.js'

const loom = new Loom()

export const vars = {
  'max-content-width': {
    default: '48rem',
    description: 'Maximum width for section content',
  },
  'section-padding-y': {
    default: 'clamp(2rem, 4vw, 4rem)',
    description: 'Vertical padding around each section',
  },
  'header-height': {
    default: '4rem',
    description: 'Height of the sticky download bar',
  },
}

export default {
  defaultLayout: 'CvLayout',
  handlers: {
    content: (data, block) => {
      const profile = data?.profile?.[0]
      if (!profile) return null

      const raw = block.rawContent?.doc ?? block.rawContent
      const repeatField = block.properties?.repeat

      if (!repeatField || !raw?.content) {
        return instantiateContent(raw, loom, profile)
      }

      const items = profile[repeatField]
      const { header, body, footer } = splitAtDividers(raw.content)

      if (!Array.isArray(items) || body.length === 0) {
        return instantiateContent(raw, loom, profile)
      }

      const result = []

      if (header.length > 0) {
        const resolved = instantiateContent(
          { type: 'doc', content: header },
          loom,
          profile
        )
        result.push(...(resolved.content || []))
      }

      for (const item of items) {
        const resolved = instantiateContent(
          { type: 'doc', content: body },
          loom,
          { ...profile, ...item }
        )
        result.push(...(resolved.content || []))
      }

      if (footer.length > 0) {
        result.push({ type: 'divider' })
        const resolved = instantiateContent(
          { type: 'doc', content: footer },
          loom,
          profile
        )
        result.push(...(resolved.content || []))
      }

      return { type: 'doc', content: result }
    },
  },
}
