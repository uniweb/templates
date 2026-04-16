import { createLoomHandlers } from '@uniweb/loom'

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
  handlers: createLoomHandlers({
    vars: (data) => data?.profile?.[0],
  }),
}
