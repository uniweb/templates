export default {
  title: 'Programme',
  description:
    'The conference programme. Reads the live tracks when the site has an app backend, ' +
    'and falls back to the authored content when it does not.',
  // The section renders from live data when a backend is there. It declares NO
  // `data:` keys: those are filled from the site's own content — its queries'
  // records, the same for every visitor — and this content is per-viewer: what an
  // organiser sees is not what an attendee sees.
  params: {
    emptyMessage: {
      type: 'string',
      label: 'Shown when the programme has no sessions yet',
      default: 'The programme will be announced soon.',
    },
  },
}
