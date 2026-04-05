// Internal component — used by the Testimonials section type.
// Authors don't select this; they write items inside a Testimonials section.

import { H3, P } from '@uniweb/kit'

export default function TestimonialCard({ item }) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border h-full">
      {item.paragraphs[0] && (
        <P text={item.paragraphs[0]} className="text-body italic" />
      )}
      {item.title && (
        <H3 text={item.title} className="text-heading font-semibold text-sm mt-4" />
      )}
    </div>
  )
}
