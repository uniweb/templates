/**
 * ProfileHero Component Metadata (v2)
 *
 * Purpose-driven hero for academic profiles.
 */
export default {
  title: 'Profile Hero',
  description: 'Hero section for researcher, lab, or department profiles',
  category: 'impact',
  purpose: 'Impress',

  content: {
    pretitle: 'Institutional affiliation',
    title: 'Person or lab name',
    subtitle: 'Academic role or title',
    paragraphs: 'Brief biography or description',
    links: 'Contact, CV download, lab website links',
    image: 'Profile photo or lab image',
  },

  params: {
    variant: {
      type: 'select',
      label: 'Profile Type',
      description: 'Determines layout and styling appropriate for the profile type',
      options: [
        { value: 'researcher', label: 'Researcher' },
        { value: 'lab', label: 'Research Lab' },
        { value: 'department', label: 'Department' },
      ],
      default: 'researcher',
    },
    photoPosition: {
      type: 'select',
      label: 'Photo Position',
      description: 'Photo placement relative to content',
      options: [
        { value: 'right', label: 'Right' },
        { value: 'left', label: 'Left' },
      ],
      default: 'right',
    },
    showAffiliation: {
      type: 'boolean',
      label: 'Show Affiliation',
      description: 'Display institutional affiliation above name',
      default: true,
    },
  },

  presets: {
    researcher: {
      label: 'Researcher Profile',
      params: { variant: 'researcher', photoPosition: 'right' },
    },
    labDirector: {
      label: 'Lab Director',
      params: { variant: 'researcher', photoPosition: 'left' },
    },
    lab: {
      label: 'Research Lab',
      params: { variant: 'lab', photoPosition: 'right' },
    },
    department: {
      label: 'Department',
      params: { variant: 'department' },
    },
  },
}
