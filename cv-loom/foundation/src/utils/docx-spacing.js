/**
 * Docx paragraph spacing constants in twips (1 pt = 20 twips).
 *
 * Used by section components to set data-spacing-before / data-spacing-after
 * on Press builder elements. These attributes are docx-only — the browser
 * ignores them, and CSS handles the web preview spacing.
 */
export const SP = {
  sectionBefore: 480, // 24pt before section heading
  sectionAfter: 120,  // 6pt after section heading
  paraAfter: 120,     // 6pt after body paragraphs
  itemBefore: 200,    // 10pt before each item heading
  itemAfter: 40,      // 2pt after item heading
  detailAfter: 60,    // 3pt after item detail
  coverTitleBefore: 960,  // 48pt before cover title
  coverTitleAfter: 120,   // 6pt after cover title
  coverSubtitleAfter: 240, // 12pt after cover subtitle
  contactAfter: 80,   // 4pt after contact lines
}
