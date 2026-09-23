/**
 * What the local backend starts with. Edit it, restart, done.
 *
 * ⭐ A plain object rather than a database, on purpose: you can read it, diff it
 * and commit it, and a teammate gets the same starting state you have.
 *
 * ⚠️ State lives in memory. A restart resets everything — which is a feature while
 * you are building, and the reason not to keep anything here you would miss.
 */
export const seed = {
  accounts: [
    // ⭐ The two accounts are the demo. `organiser` runs the site, and the
    // programme's tracks are theirs to edit.
    { username: 'organiser', password: 'organiser', handle: 'Sam (organiser)', operator: true },
    // `attendee` is a member: the SERVER refuses their writes to the organiser's
    // tracks — not the UI — and lets them record attending.
    { username: 'attendee', password: 'attendee', handle: 'Alex (attendee)' },
  ],

  // The Models' sections, as `foundation/schemas/` declares them — so a write names
  // the same sections here as in production, and the store checks it against them,
  // `append_only` included.
  schemas: {
    '@/track': {
      sections: {
        identity: { kind: 'single', brief: true, fields: { name: { type: 'string', required: true }, summary: { type: 'string' } } },
        sessions: {
          kind: 'multi',
          fields: {
            title: { type: 'string', required: true },
            speaker: { type: 'string' },
            room: { type: 'string' },
            minutes: { type: 'number' },
          },
        },
      },
    },
    '@/attendance': {
      sections: {
        identity: { kind: 'single', brief: true, fields: { note: { type: 'string' } } },
        checkins: {
          kind: 'multi',
          append_only: true,
          fields: { session: { type: 'string', required: true }, at: { type: 'string' } },
        },
      },
    },
  },

  entities: [
    {
      uuid: '01926d5e-0000-7000-8000-00000000c001',
      model: '@/track',
      items: [
        { section: 'identity', data: { name: 'Main hall', summary: 'Keynotes and plenary sessions.' } },
        { section: 'sessions', data: { title: 'Opening keynote', speaker: 'Ada Lovelace', room: 'Hall A', minutes: 45 } },
        { section: 'sessions', data: { title: 'Designing for the edge', speaker: 'Grace Hopper', room: 'Hall A', minutes: 30 } },
        { section: 'sessions', data: { title: 'Closing panel', speaker: 'The programme committee', room: 'Hall A', minutes: 60 } },
      ],
    },
    {
      uuid: '01926d5e-0000-7000-8000-00000000c002',
      model: '@/track',
      items: [
        { section: 'identity', data: { name: 'Workshops', summary: 'Hands-on, limited places.' } },
        { section: 'sessions', data: { title: 'Hands-on: building a foundation', speaker: 'Alan Turing', room: 'Room 2', minutes: 90 } },
        { section: 'sessions', data: { title: 'Content modelling clinic', speaker: 'Barbara Liskov', room: 'Room 2', minutes: 60 } },
      ],
    },
  ],
}

export default seed
