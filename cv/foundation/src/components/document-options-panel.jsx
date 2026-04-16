/**
 * DocumentOptionsPanel — the popover form that lets users adjust
 * download options before clicking Download.
 *
 * Three groups of controls:
 *   1. Date range: start year + end year inputs. Bounded publications,
 *      funding, and teaching filter against this.
 *   2. Citation style: dropdown of the nine pre-compiled citestyle
 *      styles. The Publications section swaps its style live.
 *   3. Section inclusion: one checkbox per section. Unchecked sections
 *      are hidden in the preview AND excluded from the compiled file.
 *
 * The panel is a controlled component — it doesn't hold its own state.
 * State lives in the DocumentOptionsProvider and is mutated via the
 * setOptions returned from useDocumentOptions().
 */

import React from 'react'
import {
  useDocumentOptions,
  updateOptions,
  CITATION_STYLES,
  ALL_SECTION_KEYS,
} from './document-options.jsx'

const SECTION_LABELS = {
  cover: 'Cover',
  education: 'Education',
  employment: 'Employment',
  funding: 'Research funding',
  publications: 'Publications',
  teaching: 'Supervision & mentoring',
  service: 'Professional service',
  awards: 'Awards & honours',
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

  const handleYear = (field) => (e) => {
    const raw = e.target.value
    const value = raw === '' ? null : parseInt(raw, 10)
    updateOptions(setOptions, { dateRange: { [field]: value } })
  }

  const handleStyle = (e) => {
    updateOptions(setOptions, { citationStyle: e.target.value })
  }

  const handleSection = (key) => (e) => {
    updateOptions(setOptions, {
      includedSections: { [key]: e.target.checked },
    })
  }

  const handleReset = () => {
    setOptions((prev) => ({
      ...prev,
      dateRange: { start: null, end: null },
      citationStyle: 'apa',
      includedSections: Object.fromEntries(
        ALL_SECTION_KEYS.map((k) => [k, true]),
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

      {/* Date range */}
      <fieldset className="mb-5">
        <legend className="block text-xs font-semibold uppercase tracking-wide text-subtle mb-2">
          Date range
        </legend>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <FieldLabel htmlFor="opt-start-year">Start year</FieldLabel>
            <input
              id="opt-start-year"
              type="number"
              placeholder="—"
              value={options.dateRange.start ?? ''}
              onChange={handleYear('start')}
              className="w-full rounded border border-border bg-section px-2 py-1 text-sm"
            />
          </div>
          <div className="flex-1">
            <FieldLabel htmlFor="opt-end-year">End year</FieldLabel>
            <input
              id="opt-end-year"
              type="number"
              placeholder="—"
              value={options.dateRange.end ?? ''}
              onChange={handleYear('end')}
              className="w-full rounded border border-border bg-section px-2 py-1 text-sm"
            />
          </div>
        </div>
        <p className="text-xs text-subtle mt-1">
          Leave either field blank for no bound.
        </p>
      </fieldset>

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

      {/* Section inclusion */}
      <fieldset className="mb-5">
        <legend className="block text-xs font-semibold uppercase tracking-wide text-subtle mb-2">
          Sections
        </legend>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {ALL_SECTION_KEYS.map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={options.includedSections[key] !== false}
                onChange={handleSection(key)}
                className="h-4 w-4 accent-primary"
              />
              <span>{SECTION_LABELS[key] || key}</span>
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
