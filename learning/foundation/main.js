export const vars = {
  'section-padding-y': { default: 'clamp(2rem, 4vw, 4rem)', description: 'Vertical section padding' },
}

export default {
  defaultLayout: 'LearnLayout',

  // The section type a markdown file that names no `type:` renders with, and the one an editor
  // starts a new single-section page with. A Lesson picks its variant from what the file holds.
  defaultSection: 'Lesson',
}
