import { useDocumentCompile, triggerDownload } from '@uniweb/press'

/**
 * Floating download button that compiles all registered Press sections
 * to a .docx file. Must be rendered inside a <DocumentProvider>.
 *
 * @param {Object} props
 * @param {string} props.filename - Downloaded file name (e.g. 'curriculum-vitae.docx')
 */
export default function DownloadBar({ filename = 'document.docx' }) {
  const { compile, isCompiling } = useDocumentCompile()

  const handleDownload = async () => {
    const blob = await compile('docx', {
      title: 'Curriculum Vitae',
      creator: 'Uniweb',
      paragraphStyles: [
        {
          id: 'cover-title',
          name: 'Cover Title',
          basedOn: 'Normal',
          next: 'Normal',
          run: { size: 72, bold: true },
          paragraph: {
            alignment: 'center',
            spacing: { before: 960, after: 240 },
          },
        },
        {
          id: 'cover-subtitle',
          name: 'Cover Subtitle',
          basedOn: 'Normal',
          next: 'Normal',
          run: { size: 40, color: '555555' },
          paragraph: {
            alignment: 'center',
            spacing: { before: 0, after: 480 },
          },
        },
      ],
    })
    triggerDownload(blob, filename)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleDownload}
        disabled={isCompiling}
        className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm font-medium"
      >
        {isCompiling ? 'Generating\u2026' : '\u2193 Download .docx'}
      </button>
    </div>
  )
}
