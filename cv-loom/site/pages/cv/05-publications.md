---
type: Section
theme: light
---

# Publications ({COUNT OF publications})

A corpus of {COUNT OF publications WHERE type = 'book'} books and {COUNT OF publications WHERE type = 'article-journal'} journal articles spanning four decades of research. The {COUNT OF publications WHERE year > '1870'} works published after 1870 reflect the breadth of Darwin's later programme.

## Books ({COUNT OF publications WHERE type = 'book'})

{SHOW publications.title WHERE type = 'book' JOINED BY ' · '}

## Journal Articles ({COUNT OF publications WHERE type = 'article-journal'})

{SHOW publications.title WHERE type = 'article-journal' JOINED BY ' · '}
