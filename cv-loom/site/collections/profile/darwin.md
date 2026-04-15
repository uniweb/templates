---
name: Charles Darwin
first_name: Charles
family_name: Darwin
role: Naturalist and Independent Researcher
affiliation: Down House, Downe, Kent, England
career_start: '1831'
career_end: '1882'
research_areas:
  - transmutation of species
  - geology of coral reefs and volcanic islands
  - systematics of the Cirripedia
  - physiology of climbing and insectivorous plants
  - expression of emotions in animals and humans
  - role of earthworms in soil formation
publications:
  - title: Journal of Researches (Voyage of the Beagle)
    type: book
    year: '1839'
  - title: The Structure and Distribution of Coral Reefs
    type: book
    year: '1842'
  - title: Geological Observations on Volcanic Islands
    type: book
    year: '1844'
  - title: Geological Observations on South America
    type: book
    year: '1846'
  - title: A Monograph on the Sub-Class Cirripedia (Lepadidae)
    type: book
    year: '1851'
  - title: A Monograph on the Sub-Class Cirripedia (Balanidae)
    type: book
    year: '1854'
  - title: On the Tendency of Species to Form Varieties
    type: article-journal
    year: '1858'
  - title: On the Origin of Species by Means of Natural Selection
    type: book
    year: '1859'
  - title: On the Various Contrivances by which Orchids are Fertilised
    type: book
    year: '1862'
  - title: The Variation of Animals and Plants under Domestication
    type: book
    year: '1868'
  - title: The Descent of Man, and Selection in Relation to Sex
    type: book
    year: '1871'
  - title: The Expression of the Emotions in Man and Animals
    type: book
    year: '1872'
  - title: Insectivorous Plants
    type: book
    year: '1875'
  - title: The Movements and Habits of Climbing Plants
    type: book
    year: '1875'
  - title: The Effects of Cross and Self-Fertilisation in the Vegetable Kingdom
    type: book
    year: '1876'
  - title: The Different Forms of Flowers on Plants of the Same Species
    type: book
    year: '1877'
  - title: The Power of Movement in Plants
    type: book
    year: '1880'
  - title: The Formation of Vegetable Mould through the Action of Worms
    type: book
    year: '1881'
funding:
  - source: HM Treasury
    purpose: Zoology of the Voyage of H.M.S. Beagle
    amount: 1000
    year: '1837'
  - source: Royal Society
    purpose: earthworm habitat studies
    amount: 200
    year: '1879'
  - source: John Murray
    purpose: advance on Origin of Species
    amount: 180
    year: '1859'
  - source: Royal Society
    purpose: orchid cross-pollination experiments
    amount: 100
    year: '1863'
  - source: Linnean Society
    purpose: climbing plant publication subsidy
    amount: 50
    year: '1865'
awards:
  - title: Royal Medal (Royal Society)
    year: '1853'
  - title: Wollaston Medal (Geological Society)
    year: '1859'
  - title: Copley Medal (Royal Society)
    year: '1864'
  - title: Pour le Mérite (Prussia)
    year: '1867'
  - title: Honorary Doctorate (Cambridge)
    year: '1877'
  - title: Baly Medal (Royal College of Physicians)
    year: '1879'
teaching:
  - mentee: Joseph Dalton Hooker
    role: scientific correspondent at Kew Gardens
  - mentee: Thomas Henry Huxley
    role: scientific correspondent at the Royal School of Mines
  - mentee: Sir John Lubbock
    role: neighbour and protégé at Down Village
  - mentee: George Romanes
    role: researcher in comparative psychology
  - mentee: Edward Bagnall Poulton
    role: Oxford protégé in natural selection
  - mentee: Francis Darwin
    role: son and collaborator on plant physiology
service:
  - organization: Geological Society of London
    role: Secretary and Fellow
  - organization: Linnean Society of London
    role: Fellow
  - organization: Zoological Society of London
    role: Fellow
  - organization: Royal Society of London
    role: Fellow (elected 1839)
---

The single profile item that the Career Summary page instantiates
against. Loom expressions in the summary markdown reference the
frontmatter fields above — `{first_name}`, `{COUNT OF publications}`,
`{TOTAL OF funding.amount}`, and so on — and the framework's content
handler rewrites them at render time.

Note that every `year` field is quoted. YAML would otherwise parse
four-digit numbers as integers, and Loom's default formatter applies
locale grouping to numeric results (turning `1859` into `1,859`). Keep
year fields as strings; keep currency-like fields as numbers so the
grouping does the right thing for totals.

The `funding` list is pre-sorted from largest to smallest grant so
that `funding.0` is always the top grant. Plain-form `SORTED BY field`
is reliable for sorting homogeneous lists of primitives (all the
`year` values, for instance), but does not currently sort a list of
source names "by amount" — that's a known Loom limitation. When you
need the top / bottom item of a list sorted by a different field,
pre-sort the source data.
