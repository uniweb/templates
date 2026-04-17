/**
 * Members — roster of selected members.
 *
 * Reads from content.data.members. Renders a web preview as a styled
 * HTML table, and registers an xlsx sheet with the same data laid out
 * as plain rows.
 *
 * In slice 1 every member is included. Slice 2b will filter by the
 * active query from the options panel before this section runs.
 */
import { useDocumentOutput } from '@uniweb/press'

const HEADERS = ['Name', 'Rank', 'Department', 'Tenured', 'Start year']
const COLUMN_WIDTHS = [28, 14, 18, 10, 12]
const NUMBER_FORMATS = ['text', 'text', 'text', 'text', 'number']

export default function Members({ content, block }) {
  const members = content?.data?.members || []
  const heading = content?.title || 'Members'

  const sorted = [...members].sort((a, b) => {
    const aName = a?.name || ''
    const bName = b?.name || ''
    return aName.localeCompare(bName)
  })

  const rows = sorted.map((m) => [
    m.name || '',
    m.rank || '',
    m.department || '',
    m.tenured ? 'Yes' : 'No',
    Number(m.start_year) || null,
  ])

  useDocumentOutput(block, 'xlsx', {
    title: 'Members',
    headers: HEADERS,
    data: rows,
    columnWidths: COLUMN_WIDTHS,
    numberFormats: NUMBER_FORMATS,
  })

  return (
    <section className="members">
      <h2 className="members-title">{heading}</h2>
      <table className="members-table">
        <thead>
          <tr>
            {HEADERS.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((m) => (
            <tr key={m.slug || m.name}>
              <td>{m.name}</td>
              <td>{m.rank}</td>
              <td>{m.department}</td>
              <td className={m.tenured ? 'status-yes' : 'status-no'}>
                {m.tenured ? 'Yes' : 'No'}
              </td>
              <td className="numeric">{m.start_year || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
