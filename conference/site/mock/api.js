/**
 * The site's app backend, for local development.
 *
 * `site.yml::$devBackend` points here, and in `uniweb dev` the dev server answers the
 * site's `backend` service with what this exports — at an address of its own — so the
 * site is a real app on your machine with nothing installed, no account, and no
 * network.
 *
 * ⭐ **The site never names the address.** In development the dev server supplies it;
 * in production the host does, for the `backend` service `site.yml` asks for. Nothing in
 * the foundation knows which one it is talking to, which is the point.
 *
 * ⛔ **This file is development only.** `$devBackend` is stripped from the published
 * site — the `$` says so — so a build cannot carry it and a visitor can never reach
 * this. Delete the key and the site still works: it just has no backend, and every
 * signed-in feature disappears rather than breaking.
 */
import { fileURLToPath } from 'node:url'
import { createMockBackend } from '@uniweb/api/mock'
import { readBlueprint } from '@uniweb/build/blueprint'
import { seed } from './seed.js'

// ⭐ It begins as a backend started from this site does: `blueprint.yml`, beside `site.yml`, says
// who may sign up, who adds each type and who reads what — the organiser's tracks for every member,
// and each attendee's own attendance.
const blueprint = readBlueprint(fileURLToPath(new URL('..', import.meta.url)))

export default createMockBackend({ seed, blueprint }).fetch
