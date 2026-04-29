import LessonHeader from '#components/LessonHeader'
import LessonFooter from '#components/LessonFooter'
import MaterialContent from '#components/MaterialContent'
import QuizContent from '#components/QuizContent'
import CodeChallengeContent from '#components/CodeChallengeContent'
import OpenEndedContent from '#components/OpenEndedContent'

// Collect all tagged data blocks from content.sequence.
// Authors embed structured YAML in fenced code blocks with a tag:
//
//   ```yaml:quiz
//   question: "What is HTML?"
//   options: [...]
//   ```
//
// The content-reader parses these as dataBlock nodes. This function
// extracts them into a flat lookup keyed by tag name.
function collectData(content) {
  const data = {}
  for (const el of content.sequence || []) {
    if (el.type === 'dataBlock') data[el.tag] = el.data
  }
  return data
}

// Detect which lesson variant to render based on content shape.
// No explicit "variant" param needed — the content drives the UI.
function detectVariant(data, content) {
  if (data.quiz?.options) return 'quiz'
  if (content.snippets?.length > 0 && (data.requirements || data.rubric)) return 'code'
  if (data.rubric && !data.quiz) return 'open-ended'
  return 'material'
}

const variants = {
  material: MaterialContent,
  quiz: QuizContent,
  code: CodeChallengeContent,
  'open-ended': OpenEndedContent,
}

function Lesson({ content, block, params }) {
  const data = collectData(content)
  const variant = detectVariant(data, content)
  const Content = variants[variant]

  return (
    <>
      <LessonHeader block={block} />
      <Content key={block.key} content={content} block={block} params={params} data={data} />
      <LessonFooter block={block} />
    </>
  )
}

Lesson.className = 'p-0'

export default Lesson
