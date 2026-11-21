export default {
  title: 'Course Catalog',
  family: 'card-grid',
  description:
    'A heading over a grid of course cards, one for each of the site\'s other top-level pages, each linking to its course. A card takes its page\'s title and description; an entry whose link names a course\'s route gives that card its own description and button label.',

  content: {
    title: 'Catalog heading',
    paragraphs: 'Intro [0-1]',
    items: {
      label: 'Card overrides, one per course to change [0+]',
      content: {
        links: 'Link to the course\'s page: its route, and the button\'s label [1]',
        paragraphs: 'The card\'s description [0-1]',
      },
    },
  },
}
