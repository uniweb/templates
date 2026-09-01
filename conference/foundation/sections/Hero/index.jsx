import { SafeHtml } from '@uniweb/kit'

export default function Hero({ content }) {
  const { title, subtitle, pretitle } = content
  return (
    <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] text-center">
      <div className="mx-auto max-w-[var(--max-content-width)]">
        {pretitle && <p className="mb-3 text-sm uppercase tracking-widest opacity-70">{pretitle}</p>}
        {title && <h1 className="text-4xl font-semibold text-heading sm:text-5xl">{title}</h1>}
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg opacity-80">{subtitle}</p>}
        {content.body && <SafeHtml className="prose mx-auto mt-6" html={content.body} />}
      </div>
    </section>
  )
}
