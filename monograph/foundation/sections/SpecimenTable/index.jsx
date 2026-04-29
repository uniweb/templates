/**
 * SpecimenTable — bordered table of tortoise specimens collected.
 *
 * Reads from `content.data.monograph[0].specimens`. Uses Press's
 * <Table>/<Tr>/<Td> builders so the same JSX serves the flex-layout
 * web preview and the docx table walker. Columns: Island | Species
 * | Count | Notes.
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

const CHAPTER_KEY = 'specimens'
const COLS = [18, 28, 12, 42]

export default function SpecimenTable({ content, block }) {
  const [options] = useDocumentOptions()
  const chapterIncluded =
    options.includedChapters[CHAPTER_KEY] !== false

  const specimens = content?.data?.monograph?.[0]?.specimens || []
  const heading = content?.title || 'Specimens collected'
  const totalCount = specimens.reduce(
    (sum, s) => sum + (Number(s.count) || 0),
    0,
  )

  const body = chapterIncluded && specimens.length > 0 ? (
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
          <Td className="monograph-table-cell">Island</Td>
          <Td className="monograph-table-cell">Species</Td>
          <Td className="monograph-table-cell monograph-table-cell-numeric">Count</Td>
          <Td className="monograph-table-cell">Notes</Td>
        </Tr>

        {specimens.map((s, i) => (
          <Tr key={s.island || i} className="monograph-table-row">
            <Td className="monograph-table-cell">{s.island || ''}</Td>
            <Td className="monograph-table-cell">
              <Paragraph>
                <TextRun italics>{s.species || ''}</TextRun>
              </Paragraph>
            </Td>
            <Td className="monograph-table-cell monograph-table-cell-numeric">
              {String(s.count ?? '')}
            </Td>
            <Td className="monograph-table-cell">{s.notes || ''}</Td>
          </Tr>
        ))}

        <Tr className="monograph-table-row monograph-table-row-head">
          <Td borderBottom="none" className="monograph-table-cell" emphasis>
            Total
          </Td>
          <Td borderBottom="none" className="monograph-table-cell" />
          <Td
            borderBottom="none"
            className="monograph-table-cell monograph-table-cell-numeric"
            emphasis
          >
            {String(totalCount)}
          </Td>
          <Td borderBottom="none" className="monograph-table-cell" />
        </Tr>
      </Table>
    </>
  ) : (
    <></>
  )

  useDocumentOutput(block, 'docx', body)

  if (!chapterIncluded || specimens.length === 0) return null

  return <section className="chapter">{body}</section>
}
