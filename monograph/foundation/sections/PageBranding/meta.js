export default {
  title: 'Document Header',
  description:
    'The running header of the Word document, from layout/header.md: the document\'s name on the left of each page and a line on the right. It shows nothing on the web page.',

  content: {
    title: 'Name, on the left of each page\'s header',
    subtitle: 'Line on the right of each page\'s header [0-1]',
  },

  // Meant for the layout's header area: an editor offers it there, not among a page's sections.
  area: 'header',
}
