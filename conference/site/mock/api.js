/**
 * The site's app backend, for local development.
 *
 * `site.yml::$devApi` points here and the dev server mounts what this exports at
 * the site's own `api:` address — so the site is a real app on your machine with
 * nothing installed, no account, and no network.
 *
 * ⭐ **The address is the same in development and in production.** `site.yml` says
 * `api: /_api` either way; only what answers it changes. Nothing in the foundation
 * knows which one it is talking to, which is the point.
 *
 * ⛔ **This file is development only.** `$devApi` is stripped from the published
 * site — the `$` says so — so a build cannot carry it and a visitor can never reach
 * this. Delete the key and the site still works: it just has no backend, and every
 * signed-in feature disappears rather than breaking.
 */
import { createMockBackend } from '@uniweb/api/mock'
import { seed } from './seed.js'

export default createMockBackend({ seed }).fetch
