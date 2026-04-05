# Learning Platform Template

A course-based learning site with structured lessons, quizzes, code challenges, and open-ended prompts.

## What Makes This Template Different

Most templates map pages to section types 1:1 — a Hero section, a Features section, a Pricing section. This template demonstrates a different pattern: **one section type that adapts its UI based on content shape.**

The `Lesson` component inspects its own content — tagged YAML data blocks embedded in the markdown — and auto-detects which variant to render:

| Content Shape | Detected Variant | UI |
|---|---|---|
| Prose only | Material | Reading lesson with optional video and resources |
| `yaml:quiz` block with options | Quiz | Multiple-choice with immediate feedback |
| Code snippets + `yaml:requirements` | Code Challenge | Editor + requirements sidebar + grading |
| `yaml:rubric` (no quiz/code) | Open-ended | Textarea + rubric display + grading |

Content authors switch between lesson types by changing what they write in markdown — no `variant` parameter needed.

### Other Patterns Showcased

- **Deep page hierarchy** (3+ levels) — course → module → lesson, navigated via `getPageHierarchy()`
- **Tagged YAML data blocks** — structured data (`yaml:quiz`, `yaml:rubric`, `yaml:resources`) embedded in fenced code blocks, extracted at the component level
- **Custom layout with sidebar** — `LearnLayout` with header + collapsible sidebar + scrollable main canvas
- **Course-aware navigation** — sidebar auto-groups lessons by module, footer provides prev/next across the flattened lesson sequence
- **Interactive content** — quizzes with immediate feedback (no backend needed)

### AI Grading (Integration Point)

The code challenge and open-ended variants include grading UI with a demo mode indicator. In production, replace the simulated grading in `CodeChallengeContent.jsx` and `OpenEndedContent.jsx` with calls to your own API (e.g., Claude, OpenAI, or a custom grader). The `AIFeedbackCard` component renders the result — it accepts `score`, `feedback`, and `breakdown` props and works with any backend.

## Structure

```
foundation/src/
├── sections/
│   ├── CourseCatalog/    # Home page — course cards from page hierarchy
│   ├── Header/           # Top bar with logo and theme toggle
│   ├── Lesson/           # Smart lesson router (auto-detects variant)
│   └── Sidebar/          # Course navigation with module grouping
├── layouts/
│   └── LearnLayout/      # Three-panel: header + sidebar + main canvas
└── components/           # Internal (not section types)
    ├── LessonHeader.jsx  # Sticky breadcrumb bar
    ├── LessonFooter.jsx  # Previous / Continue navigation
    ├── MaterialContent.jsx
    ├── QuizContent.jsx
    ├── CodeChallengeContent.jsx
    ├── OpenEndedContent.jsx
    └── AIFeedbackCard.jsx

site/pages/
├── home/                           # CourseCatalog
├── web-development-basics/         # Course (3 modules, 6 lessons)
│   ├── getting-started/            # Module
│   │   ├── what-is-web-development/  # Material lesson
│   │   └── how-the-web-works/        # Material + quiz
│   ├── building-with-html/
│   │   ├── html-structure/           # Material lesson
│   │   └── build-a-page/            # Code challenge
│   └── assessment/
│       ├── describe-your-approach/   # Open-ended prompt
│       └── final-quiz/              # Quiz
└── design-fundamentals/            # Course (1 module, 2 lessons)
    └── visual-principles/
        ├── color-theory/             # Material lesson
        └── layout-basics/            # Material + quiz
```

## Quick Start

```bash
uniweb create my-courses --template learning
cd my-courses
pnpm install
pnpm dev
```

## Customization

- **Add a course** — create a new folder under `pages/` with modules and lessons inside
- **Add a lesson** — create a folder with `page.yml` + `1-lesson.md` using `type: Lesson`
- **Switch lesson type** — add a `yaml:quiz`, `yaml:requirements`, or `yaml:rubric` block to the markdown
- **Theme** — edit `theme.yml` to change colors, fonts, and appearance
- **Grading API** — replace the `setTimeout` simulation in `CodeChallengeContent.jsx` and `OpenEndedContent.jsx` with real API calls
