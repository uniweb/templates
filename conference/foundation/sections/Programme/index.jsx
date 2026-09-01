import { useState } from 'react'
import { SafeHtml } from '@uniweb/kit'
import { useRecords, useEntityWriter, useSession, SignedIn } from '@uniweb/api'

/**
 * The conference programme — the whole point of this template.
 *
 * ## ⭐ One section, three behaviours, and the site chooses none of them
 *
 * | the visitor | what they get |
 * |---|---|
 * | no app backend at all | the authored programme below the fold — a static site |
 * | signed out, or an attendee | the live programme, read-only |
 * | an organiser | the same, plus editing and reordering |
 *
 * Nothing here asks *which deployment am I on*. It asks what the data layer says,
 * and the data layer answers from the site's own config.
 */
export default function Programme({ content, params }) {
  const { status, records, refresh } = useRecords({ schema: '@/track' })

  // ⭐ `absent` is NOT an empty list, and the difference decides what renders.
  // `absent` means there is no live source — so show the authored content, which
  // is a complete, useful page. An empty `ready` means the backend answered and the
  // programme really is empty, which is a different sentence.
  if (status === 'absent') return <Authored content={content} />
  if (status === 'loading') return <Frame content={content}><p className="opacity-60">Loading the programme…</p></Frame>
  if (status === 'error') {
    return (
      <Frame content={content}>
        <p className="opacity-70">The live programme could not be loaded. Here is the published version:</p>
        <Authored content={content} bare />
      </Frame>
    )
  }
  if (records.length === 0) return <Frame content={content}><p className="opacity-60">{params.emptyMessage}</p></Frame>

  return (
    <Frame content={content}>
      {records.map((track) => (
        <Track key={track.uuid} track={track} onChanged={refresh} />
      ))}
    </Frame>
  )
}

function Frame({ content, children }) {
  return (
    <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--max-content-width)] space-y-8">
        {content.title && <h2 className="text-3xl font-semibold text-heading">{content.title}</h2>}
        {children}
      </div>
    </section>
  )
}

/** The programme as the author wrote it — what a site with no backend serves. */
function Authored({ content, bare = false }) {
  const body = <SafeHtml className="prose" html={content.body} />
  return bare ? body : <Frame content={content}>{body}</Frame>
}

function Track({ track, onChanged }) {
  const sessions = (track.items || []).filter((item) => item.section === 'sessions')
  const writer = useEntityWriter({ schema: '@/track', uuid: track.uuid })
  const { viewer } = useSession()

  // ⛔ This decides what to DRAW, never what is allowed. The rule lives in the
  // schema (`creatable_by: unit_members`) and is enforced by the store, so an
  // attendee who calls the write anyway is refused there. Showing the controls to
  // the wrong person would be untidy; relying on hiding them would be a security
  // model made of CSS.
  const mayEdit = (viewer?.units || viewer?.account?.units || []).length > 0

  return (
    <article className="rounded-[var(--radius-lg)] border border-[var(--border)] p-5">
      <header className="mb-4">
        <h3 className="text-xl font-semibold text-heading">{track.name}</h3>
        {track.summary && <p className="opacity-70">{track.summary}</p>}
      </header>

      <ol className="space-y-2">
        {sessions.map((item, index) => (
          <li key={item.item_id} className="flex items-start gap-3 rounded-[var(--radius-md)] bg-[var(--section)] p-3">
            <span className="w-6 shrink-0 text-right opacity-50">{index + 1}</span>
            <div className="grow">
              <p className="font-medium">{item.data.title}</p>
              <p className="text-sm opacity-70">
                {[item.data.speaker, item.data.room, item.data.minutes && `${item.data.minutes} min`]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
            <CheckIn session={item} />
            <SignedIn>
              {mayEdit && (
                <SessionControls
                  writer={writer}
                  item={item}
                  previous={sessions[index - 1]}
                  onChanged={onChanged}
                />
              )}
            </SignedIn>
          </li>
        ))}
      </ol>

      <SignedIn>{mayEdit && <AddSession writer={writer} onChanged={onChanged} />}</SignedIn>

      {writer.conflict && (
        // ⭐ A conflict is reported, never resolved. Someone else changed this while
        // it was on screen, and only a person can decide what that means — a retry
        // would "succeed" by overwriting a change nobody looked at.
        <p className="mt-3 text-sm text-amber-700">
          Someone else changed this session while you were editing. Reload to see their version.
        </p>
      )}
    </article>
  )
}

function SessionControls({ writer, item, previous, onChanged }) {
  const [editing, setEditing] = useState(false)

  const save = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    // ⚠️ Whole-data replace — round-trip every field you are not editing, or it is
    // gone. The writer sends what you give it.
    await writer.update(item.item_id, {
      ...item.data,
      title: form.get('title'),
      speaker: form.get('speaker'),
    })
    setEditing(false)
    onChanged()
  }

  if (editing) {
    return (
      <form onSubmit={save} className="flex shrink-0 items-center gap-2">
        <input name="title" defaultValue={item.data.title} className="rounded border border-[var(--border)] px-2 py-1" />
        <input name="speaker" defaultValue={item.data.speaker} className="w-32 rounded border border-[var(--border)] px-2 py-1" />
        <button type="submit" className="rounded bg-[var(--primary)] px-2 py-1 text-white">Save</button>
        <button type="button" onClick={() => setEditing(false)} className="opacity-60">Cancel</button>
      </form>
    )
  }

  return (
    <div className="flex shrink-0 items-center gap-2 text-sm">
      <button type="button" onClick={() => setEditing(true)} className="opacity-70 hover:opacity-100">Edit</button>
      {previous && (
        // ⭐ Reordering names a NEIGHBOUR, never an index. The client does not
        // compute an order number — two organisers arranging one list from local
        // sequence numbers is how a programme ends up in an order neither chose.
        <button
          type="button"
          onClick={async () => {
            await writer.move(item.item_id, { after: previous.item_id })
            onChanged()
          }}
          className="opacity-70 hover:opacity-100"
          title="Move up"
        >
          ↑
        </button>
      )}
      <button
        type="button"
        onClick={async () => {
          await writer.remove(item.item_id)
          onChanged()
        }}
        className="opacity-70 hover:opacity-100"
      >
        Remove
      </button>
    </div>
  )
}

function AddSession({ writer, onChanged }) {
  return (
    <form
      className="mt-4 flex items-center gap-2 border-t border-[var(--border)] pt-4"
      onSubmit={async (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        await writer.create(
          { title: form.get('title'), speaker: form.get('speaker') },
          { position: 'last' },
        )
        event.currentTarget.reset()
        onChanged()
      }}
    >
      <input name="title" required placeholder="Session title" className="grow rounded border border-[var(--border)] px-2 py-1" />
      <input name="speaker" placeholder="Speaker" className="w-40 rounded border border-[var(--border)] px-2 py-1" />
      <button type="submit" disabled={writer.status === 'saving'} className="rounded bg-[var(--primary)] px-3 py-1 text-white">
        Add session
      </button>
    </form>
  )
}

/**
 * ⭐ The check-in — the sharpest thing in this template.
 *
 * The record is written to an `append_only` section, so once it exists **nobody can
 * edit or remove it**: not another attendee, not the organiser, and not the person
 * who wrote it. That is not a hidden button. A foundation runs with exactly the
 * viewer's authority, and the store refuses the write.
 */
function CheckIn({ session }) {
  const { viewer } = useSession()
  const { records } = useRecords(viewer ? { schema: '@/attendance' } : null)
  const mine = records[0]
  const writer = useEntityWriter(mine ? { schema: '@/attendance', uuid: mine.uuid } : null)
  const already = (mine?.items || []).some((i) => i.data?.session === session.item_id)

  if (!viewer || !mine) return null
  if (already) return <span className="shrink-0 text-sm opacity-60" title="Recorded — and it cannot be unmade">✓ attended</span>

  return (
    <button
      type="button"
      onClick={() => writer.create({ session: session.item_id, at: new Date().toISOString() })}
      className="shrink-0 rounded border border-[var(--border)] px-2 py-1 text-sm"
    >
      I attended
    </button>
  )
}
