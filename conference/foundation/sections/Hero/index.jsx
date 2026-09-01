import { SafeHtml } from '@uniweb/kit'

export default function Hero({ content }) {
  const { title, subtitle, pretitle } = content
  return (
    <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] text-center">
      <div className="mx-auto max-w-[var(--max-content-width)]">
        {pretitle && <p className="mb-3 text-sm uppercase tracking-widest text-body opacity-70">{pretitle}</p>}
        {title && <h1 className="text-4xl font-semibold text-heading sm:text-5xl">{title}</h1>}
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-body opacity-90">{subtitle}</p>}
        {/* ⚠️ `paragraphs`, not `body` — the parser has no `body` — and the prop is
            `value`, not `html`. SafeHtml joins an array itself, so the whole list
            goes in as one. Both mistakes render nothing and report nothing. */}
        <SafeHtml className="mx-auto mt-4 max-w-2xl text-lg text-body opacity-90" value={content.paragraphs} />
      </div>
    </section>
  )
}
