/**
 * FinchMeasurements — a numeric table of beak morphometrics.
 *
 * Reads `content.data.monograph[0].finchMeasurements`. Columns:
 * Species (italic) | Island | Beak depth (mm) | Beak length (mm) | Count.
 * Renders in both the web preview and the docx.
 */
import React from 'react'
import { useDocumentOutput } from '@uniweb/press'
import {
  Paragraph,
  Table,
  Tr,
  Td,
  TextRun,
} from '@uniweb/press/docx'
import { useDocumentOptions } from '#components/document-options.jsx'
import { SP } from '#utils/docx-spacing.js'
import { fmtNumber } from '#utils/formatters.js'

const CHAPTER_KEY = 'measurements'
const COLS = [28, 20, 17, 17, 18]

export default function FinchMeasurements({ content, block }) {
  const [options] = useDocumentOptions()
  const chapterIncluded =
    options.includedChapters[CHAPTER_KEY] !== false

  const measurements = content?.data?.monograph?.[0]?.finchMeasurements || []
  const heading = content?.title || 'Finch beak morphometrics'

  const body = chapterIncluded && measurements.length > 0 ? (
    <>
      <Paragraph
        as="h1"
        data={heading}
        className="chapter-title"
        data-heading="HEADING_1"
        data-numbering-reference="heading-numbering"
        data-numbering-level={0}
        data-page-break-before="true"
        data-spacing-before={SP.chapterBefore}
        data-spacing-after={SP.chapterAfter}
      />

      {(content?.paragraphs || []).map((p, i) => (
        <Paragraph
          key={`lead-${i}`}
          data={p}
          className="chapter-body"
          data-spacing-after={SP.paraAfter}
        />
      ))}

      <Table
        widths={COLS}
        borderColor="c9bfae"
        className="monograph-table"
        data-spacing-before={SP.tableBefore}
        data-spacing-after={SP.tableAfter}
      >
        <Tr header className="monograph-table-row monograph-table-row-head">
          <Td className="monograph-table-cell">Species</Td>
          <Td className="monograph-table-cell">Island</Td>
          <Td className="monograph-table-cell monograph-table-cell-numeric">
            Beak depth
          </Td>
          <Td className="monograph-table-cell monograph-table-cell-numeric">
            Beak length
          </Td>
          <Td className="monograph-table-cell monograph-table-cell-numeric">
            n
          </Td>
        </Tr>
        {measurements.map((m, i) => (
          <Tr key={`${m.species}-${i}`} className="monograph-table-row">
            <Td className="monograph-table-cell">
              <Paragraph>
                <TextRun italics>{m.species || ''}</TextRun>
              </Paragraph>
            </Td>
            <Td className="monograph-table-cell">{m.island || ''}</Td>
            <Td className="monograph-table-cell monograph-table-cell-numeric">
              {fmtNumber(m.beakDepth, 1)}
            </Td>
            <Td className="monograph-table-cell monograph-table-cell-numeric">
              {fmtNumber(m.beakLength, 1)}
            </Td>
            <Td className="monograph-table-cell monograph-table-cell-numeric">
              {String(m.count ?? '')}
            </Td>
          </Tr>
        ))}
      </Table>

      <Paragraph
        className="fig-caption"
        data-style="caption"
        data-spacing-before={SP.captionAfter}
        data-spacing-after={SP.paraAfter}
        data="Measurements in millimetres; n indicates the number of specimens averaged."
      />
    </>
  ) : (
    <></>
  )

  useDocumentOutput(block, 'docx', body)

  if (!chapterIncluded || measurements.length === 0) return null

  return <section className="chapter">{body}</section>
}
