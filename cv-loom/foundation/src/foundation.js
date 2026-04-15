/**
 * Foundation entry — cv-loom
 *
 * Declares the foundation's CSS variables, the default layout (none —
 * rendering is a single Summary section), and the content handler that
 * runs Loom over every block's raw ProseMirror tree before it reaches
 * the component.
 *
 * The content handler is the interesting part. It's a foundation-level
 * hook the runtime invokes at render time, after all fetched data has
 * been assembled onto the block. It receives `(data, block)`:
 *
 *   - `data` is `block.parsedContent.data` — whatever collections the
 *     page declared via `data:` frontmatter. For the Career Summary
 *     page, that's `data.profile` (the single-item `profile` collection
 *     containing name, publications, funding, and the rest).
 *
 *   - `block` is the Block instance. `block.rawContent` holds the raw
 *     ProseMirror document parsed from the authored markdown — the
 *     tree with all the `{placeholder}` text still in place.
 *
 * The handler flattens `data.profile[0]` (the Darwin profile item) and
 * hands it to Loom as a resolver. Loom walks the ProseMirror tree via
 * `instantiateContent`, finds every `{...}` expression in a text node,
 * evaluates it against the profile, and returns a new tree with the
 * computed strings spliced in. The framework then re-parses that tree
 * through the semantic parser and the `Summary` component receives
 * `content.title`, `content.paragraphs`, etc. with the placeholders
 * already resolved.
 *
 * The Summary component itself has zero knowledge of Loom. It just
 * renders whatever semantic content it's given. That's the point of
 * the content-handler layer: template instantiation is foundation
 * wiring, not component logic.
 */
import { Loom, instantiateContent } from '@uniweb/loom'

// Module-scoped Loom instance. The engine is stateless for the
// expressions used here; sharing one instance across all blocks
// avoids re-parsing snippet definitions on every render.
const loom = new Loom()

export const vars = {
  'max-content-width': {
    default: '48rem',
    description: 'Maximum content width for the career summary prose',
  },
  'section-padding-y': {
    default: 'clamp(3rem, 5vw, 5rem)',
    description: 'Vertical padding around the summary section',
  },
  'section-padding-x': {
    default: '1.5rem',
    description: 'Horizontal padding around the summary section',
  },
}

export default {
  handlers: {
    /**
     * Content handler — runs Loom over the block's raw ProseMirror
     * tree. Returns the transformed tree, or `null` / the same tree
     * to signal "no change" and leave the raw content as-is.
     */
    content: (data, block) => {
      // The Career Summary page declares `data: profile`, which
      // makes `data.profile` an array of matching collection items.
      // The profile collection holds a single item — the individual's
      // flat data — so pick it out and hand it to Loom as the vars.
      //
      // Pass the profile object directly. Loom's vars accepts both a
      // plain object and a `(key) => value` function — the object form
      // is what enables dot-path resolution (`publications.type`,
      // `funding.0.amount`). A resolver function only ever receives
      // the full dotted key as-is and would need to re-implement the
      // walker. `getProperty()` inside Loom already handles objects,
      // arrays, and Maps, so the object form is the right default.
      const profile = data?.profile?.[0]
      if (!profile) return null

      return instantiateContent(block.rawContent, loom, profile)
    },
  },
  props: {},
}
