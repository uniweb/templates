/**
 * ReportOptions — date range (start required, end optional), refereed-only,
 * and citation-style controls. Rendered by Cover below the Query + Section
 * toggles. Changing any option re-renders subscribed sections, which
 * re-register their xlsx + docx fragments — the next download reflects
 * the new choices.
 */
import { CITATION_STYLES, useReportOptions } from './query-context.jsx'

export default function ReportOptions() {
  const [opts, setReportOption] = useReportOptions()
  const { dateRange, refereedOnly, citationStyle } = opts

  const handleStartChange = (e) => {
    const v = e.target.value
    setReportOption({
      dateRange: {
        ...dateRange,
        start: v === '' ? null : Number(v),
      },
    })
  }

  const handleEndChange = (e) => {
    const v = e.target.value
    setReportOption({
      dateRange: {
        ...dateRange,
        end: v === '' ? null : Number(v),
      },
    })
  }

  const handleRefereedToggle = (e) => {
    setReportOption({ refereedOnly: e.target.checked })
  }

  const handleStyleChange = (e) => {
    setReportOption({ citationStyle: e.target.value })
  }

  return (
    <fieldset className="report-options">
      <legend className="report-options-legend">Report options</legend>

      <div className="report-options-row">
        <label className="report-options-field">
          <span className="report-options-label">From year</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="any"
            value={dateRange.start ?? ''}
            onChange={handleStartChange}
            className="report-options-input"
          />
        </label>
        <label className="report-options-field">
          <span className="report-options-label">To year</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="open"
            value={dateRange.end ?? ''}
            onChange={handleEndChange}
            className="report-options-input"
          />
        </label>
        <label className="report-options-field">
          <span className="report-options-label">Citation style</span>
          <select
            value={citationStyle}
            onChange={handleStyleChange}
            className="report-options-input"
          >
            {CITATION_STYLES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="report-options-item">
        <input
          type="checkbox"
          checked={refereedOnly}
          onChange={handleRefereedToggle}
        />
        <span>Refereed only</span>
      </label>
    </fieldset>
  )
}
