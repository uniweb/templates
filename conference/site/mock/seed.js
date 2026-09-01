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
    // ⭐ The two accounts are the demo. `organiser` belongs to a unit, so the
    // schemas' `creatable_by: unit_members` lets them author the programme.
    { username: 'organiser', password: 'organiser', handle: 'Sam (organiser)', units: ['conf'] },
    // `attendee` belongs to none, so the SERVER refuses their writes — not the UI.
    { username: 'attendee', password: 'attendee', handle: 'Alex (attendee)', units: [] },
  ],

  // What the store enforces. It mirrors the two rules the real schemas declare —
  // see `foundation/schemas/` — and enforces nothing else: a mock validates
  // permissions, not content.
  schemas: {
    '@/track': { creatable_by: 'unit_members' },
    '@/session': { creatable_by: 'unit_members' },
    '@/attendance': { creatable_by: 'any_user', append_only: ['checkins'] },
  },

  entities: [
    {
      uuid: 'track-main',
      model: '@/track',
      data: { name: 'Main hall', summary: 'Keynotes and plenary sessions.' },
      items: [
        { id: 'sess-1', section: 'sessions', data: { title: 'Opening keynote', speaker: 'Ada Lovelace', room: 'Hall A', minutes: 45 } },
        { id: 'sess-2', section: 'sessions', data: { title: 'Designing for the edge', speaker: 'Grace Hopper', room: 'Hall A', minutes: 30 } },
        { id: 'sess-3', section: 'sessions', data: { title: 'Closing panel', speaker: 'The programme committee', room: 'Hall A', minutes: 60 } },
      ],
    },
    {
      uuid: 'track-workshops',
      model: '@/track',
      data: { name: 'Workshops', summary: 'Hands-on, limited places.' },
      items: [
        { id: 'sess-4', section: 'sessions', data: { title: 'Hands-on: building a foundation', speaker: 'Alan Turing', room: 'Room 2', minutes: 90 } },
        { id: 'sess-5', section: 'sessions', data: { title: 'Content modelling clinic', speaker: 'Barbara Liskov', room: 'Room 2', minutes: 60 } },
      ],
    },
  ],
}

export default seed
