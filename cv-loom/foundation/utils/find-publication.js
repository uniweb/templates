/**
 * Look up a publication by id in a flat publications list.
 *
 * Shared by the CITE custom Loom function and the Cite inset section
 * type. Centralizing the lookup here means there's one place to change
 * if the publication shape ever gains a different stable-id field.
 *
 * @param {Array} publications - The profile's publications array (flat shape).
 * @param {string} id - The publication id (e.g., 'origin-1859').
 * @returns {Object|null} The matching publication record, or null.
 */
export function findPublication(publications, id) {
  if (!Array.isArray(publications) || !id) return null
  return publications.find((p) => p && p.id === id) || null
}
