/**
 * DocumentOptionsPanel — popover form for download options.
 *
 * Three groups of controls:
 *
 *   1. Citation style  — dropdown; the Bibliography section swaps its
 *      style live on change.
 *   2. Figures         — single toggle; off hides every <Figure> and
 *      every <FigureGrid> from both the preview and the compiled doc.
 *   3. Chapter toggles — one checkbox per chapter key; excluded chapters
 *      are removed from the preview and the file alike.
 *
 * The panel is controlled. State lives in DocumentOptionsProvider and
 * is mutated through the setter returned from useDocumentOptions().
 */
import React from 'react'
import {
  useDocumentOptions,
  updateOptions,
  CITATION_STYLES,
  ALL_CHAPTER_KEYS,
} from './document-options.jsx'

const CHAPTER_LABELS = {
  'front-matter': 'Front matter',
  prologue: 'Prologue',
  zoology: 'Zoological observations',
  specimens: 'Specimens collected',
  measurements: 'Finch measurements',
  biogeography: 'A note on biogeography',
  plates: 'Plates',
  bibliography: 'References',
}

function FieldLabel({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-semibold uppercase tracking-wide text-subtle mb-1"
    >
      {children}
    </label>
  )
}

export default function DocumentOptionsPanel() {
  const [options, setOptions] = useDocumentOptions()

  const handleStyle = (e) => {
    updateOptions(setOptions, { citationStyle: e.target.value })
  }

  const handleFigures = (e) => {
    updateOptions(setOptions, { includeFigures: e.target.checked })
  }

  const handleChapter = (key) => (e) => {
    updateOptions(setOptions, {
      includedChapters: { [key]: e.target.checked },
    })
  }

  const handleReset = () => {
    setOptions((prev) => ({
      ...prev,
      citationStyle: 'apa',
      includeFigures: true,
      includedChapters: Object.fromEntries(
        ALL_CHAPTER_KEYS.map((k) => [k, true]),
      ),
    }))
  }

  return (
    <div
      className="w-80 rounded-lg border border-border bg-card shadow-xl p-5 text-body"
      role="dialog"
      aria-label="Download options"
    >
      <h3 className="text-heading font-semibold text-base mb-4">
        Download options
      </h3>

      {/* Citation style */}
      <fieldset className="mb-5">
        <FieldLabel htmlFor="opt-citation-style">Citation style</FieldLabel>
        <select
          id="opt-citation-style"
          value={options.citationStyle}
          onChange={handleStyle}
          className="w-full rounded border border-border bg-section px-2 py-1.5 text-sm"
        >
          {CITATION_STYLES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </fieldset>

      {/* Figures */}
      <fieldset className="mb-5">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={options.includeFigures}
            onChange={handleFigures}
            className="h-4 w-4 accent-primary"
          />
          <span>Include figures (portrait, plates)</span>
        </label>
        <p className="text-xs text-subtle mt-1">
          Hides images in the preview and omits them from the compiled file.
        </p>
      </fieldset>

      {/* Chapter inclusion */}
      <fieldset className="mb-5">
        <legend className="block text-xs font-semibold uppercase tracking-wide text-subtle mb-2">
          Chapters
        </legend>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {ALL_CHAPTER_KEYS.map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={options.includedChapters[key] !== false}
                onChange={handleChapter(key)}
                className="h-4 w-4 accent-primary"
              />
              <span>{CHAPTER_LABELS[key] || key}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-between items-center border-t border-border pt-3 mt-2">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-medium text-subtle hover:text-body underline"
        >
          Reset to defaults
        </button>
        <span className="text-xs text-subtle">
          Changes apply live to the preview.
        </span>
      </div>
    </div>
  )
}
