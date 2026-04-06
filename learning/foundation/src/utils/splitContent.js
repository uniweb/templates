// Split content at a --- divider into lesson material and challenge.
// Lessons that teach a concept and then present a challenge use a
// horizontal rule (---) as the boundary. Everything before the divider
// is lesson prose; everything after is the challenge prompt.
// If no divider exists, everything is challenge content (backward compatible).
export default function splitContent(content) {
  const seq = content.sequence || []
  const idx = seq.findIndex((el) => el.type === 'divider')
  if (idx === -1) return { lesson: null, challenge: content }
  return {
    lesson: { ...content, sequence: seq.slice(0, idx) },
    challenge: { ...content, sequence: seq.slice(idx + 1) },
  }
}
