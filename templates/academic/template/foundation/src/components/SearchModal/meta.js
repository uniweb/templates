export default {
  title: 'Search Modal',
  description: 'Full-text search interface for the site. Requires fuse.js to be installed.',
  category: 'Navigation',

  // This is a utility component, not directly used in content
  hidden: true,

  notes: `
    This component is typically used by the Navbar, not directly in content.

    To enable search:
    1. Install fuse.js: pnpm add fuse.js
    2. The Navbar will automatically show the search button
    3. Site content is indexed at build time
  `
}
