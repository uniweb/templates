# CLAUDE.md - Academic Template Instructions

This file provides guidance for AI assistants working with this academic Uniweb project.

## Project Overview

This is an **academic-focused Uniweb** project designed for researchers, labs, and departments. The foundation includes specialized components for academic content.

```
{{projectName}}/
├── foundation/     # Academic component library
├── site/           # Content and pages
├── package.json    # Root workspace config
└── pnpm-workspace.yaml
```

### Quick Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start development server
cd foundation && pnpm build  # Build foundation
cd site && pnpm build        # Build site
```

## Academic Components

### ProfileHero

Profile header for researchers, labs, or departments.

**Parameters:**
- `variant`: researcher | lab | department
- `photoPosition`: left | right | top
- `showAffiliation`: true | false

```markdown
---
type: ProfileHero
variant: researcher
photoPosition: left
---

# Dr. Sarah Chen

## Associate Professor of Computer Science

Specializing in NLP and healthcare AI.

![Photo](photo.jpg)
```

### PublicationList

Display academic publications with proper citation formatting.

**Parameters:**
- `citationStyle`: detailed | apa
- `groupBy`: year | type | none
- `showType`: true | false (shows journal/conference badges)
- `showSearch`: true | false
- `limit`: number (0 for all)

**Content Structure:**

```markdown
---
type: PublicationList
citationStyle: detailed
groupBy: year
showSearch: true
---

## Publications

#### 2024

### Paper Title Here

**Author One**, Author Two, Author Three

*Nature Machine Intelligence*

This is the abstract or description.

[PDF](paper.pdf)
[arXiv](https://arxiv.org)
```

Use H4 (####) for group headers (years), H3 (###) for paper titles.

### ResearchAreas

Showcase research focus areas.

**Parameters:**
- `layout`: cards | list | compact
- `showNumbers`: true | false
- `accentPosition`: left | top | none

```markdown
---
type: ResearchAreas
layout: cards
showNumbers: true
---

## Research Areas

### Natural Language Processing

Description of the research area...

### Machine Learning for Healthcare

Another research area...
```

### TeamGrid

Display team members grouped by role.

**Parameters:**
- `groupByRole`: true | false
- `cardStyle`: photo | compact | detailed | minimal
- `columns`: 2 | 3 | 4

**Content Structure:**

```markdown
---
type: TeamGrid
groupByRole: true
cardStyle: photo
columns: 3
---

## Team

#### Faculty

### Dr. Sarah Chen

Principal Investigator

Bio text here.

![Photo](photo.jpg)

[Website](https://...)
[Google Scholar](https://...)

#### PhD Student

### James Kim

PhD Student (2nd year)

Research focus...

![Photo](photo.jpg)
```

Use H4 (####) for role groups, H3 (###) for member names.

### Timeline

Display education, career, or project milestones.

**Parameters:**
- `orientation`: vertical | horizontal
- `showLine`: true | false
- `datePosition`: inline | side

```markdown
---
type: Timeline
orientation: vertical
datePosition: inline
---

## Career

#### 2020-present

### Associate Professor

Stanford University

Description...

#### 2016-2020

### Assistant Professor

MIT
```

Use H4 (####) for dates, H3 (###) for position titles.

### ContactCard

Contact information display.

**Parameters:**
- `layout`: sidebar | card | inline
- `showIcon`: true | false

```markdown
---
type: ContactCard
layout: sidebar
showIcon: true
---

## Contact

- Email: email@university.edu
- Office: Building 123, Room 456
- Phone: (555) 123-4567
- Website: https://example.com
```

### Text

Flexible text block with typography controls.

**Parameters:**
- `textScale`: small | normal | large | xlarge
- `textDensity`: compact | normal | spacious
- `headingStyle`: bold | light | serif | slab
- `textWidth`: narrow | regular | wide | full
- `textAlign`: left | center | right

### Section

Wrapper for layout and background control.

**Parameters:**
- `background`: white | gray | primary | dark
- `padding`: small | normal | large
- `maxWidth`: narrow | normal | wide | full

## Color Palette

The academic theme uses these colors:

```css
--color-primary: #1e40af;      /* Deep institutional blue */
--color-accent: #b45309;       /* Warm amber */
--color-muted: #64748b;        /* Slate gray */

/* Publication type badges */
--color-journal: #1e40af;
--color-conference: #7c3aed;
--color-book: #059669;
--color-preprint: #d97706;
```

## Content Philosophy

### Purpose-Driven Parameters

Each component has parameters specific to its academic use case:

| Component | Purpose-Driven | NOT Generic Theme |
|-----------|---------------|-------------------|
| ProfileHero | `variant: researcher` | ~~`theme: light`~~ |
| PublicationList | `citationStyle: apa` | ~~`cardStyle: bordered`~~ |
| TeamGrid | `groupByRole: true` | ~~`layout: grid`~~ |

### Semantic Content Structure

Use markdown headings semantically:
- H4 (####) for grouping/categorization (years, roles)
- H3 (###) for item titles (papers, people)
- H2 (##) for section headers
- H1 (#) for page/profile title

## Troubleshooting

### Publications not grouping
Ensure years use H4 (`####`) and paper titles use H3 (`###`).

### Team members not in groups
Check that role headers use H4 (`#### Faculty`) before member H3s.

### Component not rendering
1. Verify `type:` matches component name exactly
2. Check component is exported in `foundation/src/index.js`
3. Rebuild: `cd foundation && pnpm build`
