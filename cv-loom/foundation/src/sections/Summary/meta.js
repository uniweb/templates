export default {
  title: 'Career Summary',
  description:
    'Narrative prose section that instantiates Loom {placeholder} expressions against the site profile. Inherits the `profile` collection — the runtime attaches it automatically so pages only need `type: Summary`, not `data:`.',
  category: 'content',

  data: {
    // Inherit the whole `profile` collection. The foundation's content
    // handler (see `foundation.js`) flattens `data.profile[0]` into
    // Loom's variable namespace at render time.
    inherit: ['profile'],
  },

  content: {
    description:
      'Narrative markdown. Any `{expression}` in headings or paragraphs is evaluated by Loom at render time against the inherited profile data.',
  },

  params: {},
}
