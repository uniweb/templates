/**
 * ProfileHero Component Metadata
 *
 * Purpose-driven hero for academic profiles.
 * Parameters are specific to academic contexts, not generic theme/style.
 */
export default {
  title: 'Profile Hero',
  description: 'Hero section for researcher, lab, or department profiles',
  category: 'Headers',

  elements: {
    pretitle: {
      label: 'Affiliation',
      description: 'Institutional affiliation (H3 before H1) - e.g., "Department of Computer Science"',
    },
    title: {
      label: 'Name',
      required: true,
      description: 'Person or lab name',
    },
    subtitle: {
      label: 'Role/Title',
      description: 'Academic role (H2 after H1) - e.g., "Associate Professor"',
    },
    paragraphs: {
      label: 'Bio',
      description: 'Brief biography or description',
    },
    links: {
      label: 'Actions',
      description: 'Contact, CV download, lab website links',
    },
    imgs: {
      label: 'Photo',
      description: 'Profile photo or lab image',
    },
  },

  properties: {
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
      description: 'Individual researcher with circular photo',
      properties: { variant: 'researcher', photoPosition: 'right' },
    },
    labDirector: {
      label: 'Lab Director',
      description: 'Researcher with photo on left',
      properties: { variant: 'researcher', photoPosition: 'left' },
    },
    lab: {
      label: 'Research Lab',
      description: 'Lab profile with prominent branding',
      properties: { variant: 'lab', photoPosition: 'right' },
    },
    department: {
      label: 'Department',
      description: 'Department with banner image',
      properties: { variant: 'department' },
    },
  },
}
