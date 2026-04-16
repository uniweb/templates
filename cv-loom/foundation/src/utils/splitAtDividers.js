/**
 * Split a ProseMirror content array at divider nodes.
 *
 * Returns { header, body, footer } where:
 *   - header: nodes before the first ---
 *   - body: nodes between the first and second ---
 *   - footer: nodes after the second ---
 *
 * Used by the content handler's repeat pattern: header is rendered once,
 * body is repeated per data item, footer is rendered once after items.
 */
export default function splitAtDividers(nodes) {
  const parts = [[]]
  for (const node of nodes) {
    if (node.type === 'divider') {
      parts.push([])
    } else {
      parts[parts.length - 1].push(node)
    }
  }
  return {
    header: parts[0] || [],
    body: parts[1] || [],
    footer: parts[2] || [],
  }
}
