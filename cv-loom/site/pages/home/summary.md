---
type: Summary
data: profile
theme: light
---

# Career Summary: {first_name} {family_name}, {career_start}–{career_end}

{first_name} {family_name} is a {role} based at **{affiliation}**. Over a career spanning {career_start} to {career_end}, his work has addressed {SHOW research_areas JOINED BY ', '}.

He has authored **{COUNT OF publications} published works**, including {COUNT OF publications WHERE type = 'book'} books and {COUNT OF publications WHERE type = 'article-journal'} journal articles. The {COUNT OF publications WHERE year > '1870'} works from the last decade of his career: {SHOW publications.title WHERE year > '1870' JOINED BY ' • '}.

His research has been supported by **{COUNT OF funding} grants totalling £{TOTAL OF funding.amount}**, averaging £{AVERAGE OF funding.amount} per grant. The largest was **£{funding.0.amount}** from {funding.0.source}, in support of the {funding.0.purpose}.

He has mentored **{COUNT OF teaching} students and junior colleagues** ({SHOW teaching.mentee JOINED BY ', '}), served on {COUNT OF service} learned societies ({SHOW service.organization JOINED BY ', '}), and received **{COUNT OF awards} formal honours**, including {SHOW awards.title JOINED BY ' • '}.
