/**
 * Members — roster of the currently-filtered member set.
 *
 * Reads the already-filtered list from `content.data.members` (see
 * foundation.js for the simulated-backend explanation). Renders a web
 * preview as a styled HTML table and registers an xlsx sheet with the
 * same rows.
 *
 * When the active query changes, the layout re-renders, every
 * BlockRenderer re-runs the data handler, and this section receives a
 * fresh `content.data.members`; the new rows replace the previous
 * useDocumentOutput registration, so the next compile('xlsx') reflects
 * the selection.
 */
import { useDocumentOutput } from '@uniweb/press'
import { Paragraph, Table, Tr, Td } from '@uniweb/press/docx'
import { useSectionIncluded, useFilteredMembers } from '#components/query-context.jsx'

const SECTION_KEY = 'members'
const HEADERS = ['Name', 'Rank', 'Department', 'Tenured', 'Start year']
const COLUMN_WIDTHS = [28, 14, 18, 10, 12]
const NUMBER_FORMATS = ['text', 'text', 'text', 'text', 'number']

export default function Members({ content, block }) {
  const included = useSectionIncluded(SECTION_KEY)
  // useFilteredMembers fetches the active selection via @uniweb/kit's
  // useFetched. Source = framework default fetcher; pushdown vs. local
  // evaluation is governed by `fetcher.supports:` in site.yml.
  const { members, activeLabel } = useFilteredMembers(content)
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

  useDocumentOutput(
    block,
    'xlsx',
    included
      ? {
          title: 'Members',
          headers: HEADERS,
          data: rows,
          columnWidths: COLUMN_WIDTHS,
          numberFormats: NUMBER_FORMATS,
        }
      : null,
  )

  // Docx companion: heading + roster Table. Columns as percentages.
  useDocumentOutput(
    block,
    'docx',
    included ? (
      <>
        <Paragraph
          as="h2"
          data={heading}
          data-heading="HEADING_2"
          data-spacing-before={240}
          data-spacing-after={160}
        />
        <Table widths={[32, 16, 22, 12, 18]} borderColor="cbd5e1">
          <Tr header>
            {HEADERS.map((h) => (
              <Td key={h}>{h}</Td>
            ))}
          </Tr>
          {rows.map((r, i) => (
            <Tr key={i}>
              {r.map((cell, j) => (
                <Td key={j}>{cell == null ? '' : String(cell)}</Td>
              ))}
            </Tr>
          ))}
        </Table>
      </>
    ) : null,
  )

  if (!included) return null

  return (
    <section className="members">
      <h2 className="members-title">{heading}</h2>
      {activeLabel && (
        <p className="members-query-note">
          Showing {members.length} members matching <em>{activeLabel}</em>.
        </p>
      )}
      {members.length === 0 ? (
        <p className="members-empty">No members match the selected population.</p>
      ) : (
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
      )}
    </section>
  )
}
