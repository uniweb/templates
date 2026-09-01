import { Link } from '@uniweb/kit'
import { useSession, useSignIn, SignedIn, SignedOut, isEnabled } from '@uniweb/api'

/**
 * The site header, with a sign-in affordance — but only where signing in means
 * something.
 *
 * ⭐ `isEnabled(website)` is a SYNCHRONOUS read, not a probe. Which services a site
 * has was settled when it was published and travels in its config, so there is no
 * handshake and no await. A site with no app backend draws no sign-in control at
 * all — not a disabled one, and not an explanation. A visitor has no stake in which
 * services the operator provisioned, and "sign-in is not available" reads like a
 * breakage when it is simply a feature the site does not have.
 */
export default function Header({ content, block }) {
  const website = block?.website
  const backend = isEnabled(website)

  return (
    <header className="border-b border-[var(--border)]">
      <div className="mx-auto flex h-[var(--header-height)] max-w-[var(--max-content-width)] items-center justify-between px-[var(--section-padding-x)]">
        <Link href="/" className="font-semibold text-heading no-underline">
          {content?.title || 'Conference'}
        </Link>
        {backend && <Account />}
      </div>
    </header>
  )
}

function Account() {
  const { viewer } = useSession()
  const { submit, status, error } = useSignIn()

  return (
    <div className="flex items-center gap-3 text-sm">
      <SignedIn>
        <span className="opacity-70">{viewer?.account?.handle || viewer?.account?.username}</span>
        <SignOutButton />
      </SignedIn>

      <SignedOut>
        <form
          className="flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            const form = new FormData(event.currentTarget)
            submit({ username: form.get('username'), password: form.get('password') })
          }}
        >
          <input name="username" placeholder="username" autoComplete="username" className="w-28 rounded border border-[var(--border)] px-2 py-1" />
          <input name="password" type="password" placeholder="password" autoComplete="current-password" className="w-28 rounded border border-[var(--border)] px-2 py-1" />
          <button type="submit" disabled={status === 'submitting'} className="rounded bg-[var(--primary)] px-3 py-1 text-white">
            {status === 'submitting' ? 'Signing in…' : 'Sign in'}
          </button>
          {/* The refusal is the server's own words, not a sentence invented here. */}
          {error && <span className="text-red-600">{error.detail || error.title}</span>}
        </form>
      </SignedOut>
    </div>
  )
}

function SignOutButton() {
  const { signOut } = useSession()
  return (
    <button type="button" onClick={() => signOut()} className="rounded border border-[var(--border)] px-3 py-1">
      Sign out
    </button>
  )
}
