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
import { createMockBackend } from '@uniweb/api/mock'
import { seed } from './seed.js'

export default createMockBackend({ seed }).fetch
