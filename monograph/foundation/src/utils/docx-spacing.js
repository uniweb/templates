/**
 * Docx paragraph spacing constants in twips (1 pt = 20 twips).
 *
 * Used by section components to set data-spacing-before /
 * data-spacing-after on Press builder elements. These attributes are
 * docx-only — the browser ignores them, and CSS handles the web preview
 * spacing independently.
 */
export const SP = {
  // Chapters
  chapterBefore: 720,       // 36pt before each numbered chapter
  chapterAfter: 240,        // 12pt after
  subsectionBefore: 360,    // 18pt before a subsection heading
  subsectionAfter: 120,     // 6pt after

  // Body paragraphs
  paraAfter: 140,           // 7pt after each body paragraph

  // Figures
  figureBefore: 240,        // 12pt before a figure
  figureAfter: 40,          // 2pt after the image (tight against caption)
  captionAfter: 240,        // 12pt after a figure caption

  // Tables
  tableBefore: 240,
  tableAfter: 240,

  // Front matter
  frontTitleBefore: 1200,   // 60pt — pushes the title down on the cover page
  frontTitleAfter: 240,
  frontSubtitleAfter: 360,
  frontAbstractBefore: 480,
  frontAbstractAfter: 240,
  frontMetaAfter: 120,

  // Lists
  bulletAfter: 80,          // 4pt between bullet items
  numberedAfter: 100,       // 5pt between numbered items

  // Bibliography
  bibEntryAfter: 80,
}
