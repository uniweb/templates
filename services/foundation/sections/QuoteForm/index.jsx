import React, { useState } from 'react'
import { H2, P, useFormSubmit } from '@uniweb/kit'
import FormField from '#components/FormField'

/**
 * QuoteForm
 *
 * Renders a form the AUTHOR designed, and sends it wherever the SITE says.
 *
 * Both halves of that sentence matter, and they are what make this section
 * different from an ordinary one:
 *
 *  - The fields are content. They arrive as a `yaml:form` block at
 *    `content.data.form`, so this component cannot declare them in meta.js and
 *    must not try — it draws whatever it is handed, including field names it
 *    has never seen.
 *  - The destination is configuration. `useFormSubmit()` resolves it from the
 *    site (or its host); nothing here names an endpoint. When there is none,
 *    `canSubmit` is false and the form renders disabled with the reason, rather
 *    than collecting answers it cannot deliver.
 */
export default function QuoteForm({ content, block }) {
  const form = content.data?.form
  const [values, setValues] = useState({})

  const { submit, status, error, canSubmit, unavailableReason, canUploadFiles } = useFormSubmit({
    block,
    context: { formId: 'quote' },
    // Built from the values just submitted, so whoever reads these can tell
    // one from another without opening it.
    summary: (v) => {
      const text = Object.values(v).filter((x) => typeof x === 'string' && x.trim())
      return { title: text[0] || 'Quote request', subtitle: text[1] || '', tag: 'quote' }
    },
  })

  // A section with no form block renders nothing rather than an empty shell —
  // the author has not designed one yet.
  if (!form?.fields) return null

  const fields = Object.entries(form.fields)
  const disabled = !canSubmit || status === 'submitting' || status === 'success'

  const setValue = (name) => (v) => setValues((prev) => ({ ...prev, [name]: v }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (disabled) return

    // Answers ride in the JSON body; attachments do not. Pass the File objects
    // as `files` and kit derives the manifest, sends the bytes and finalizes —
    // handing it `fileSlots` instead would declare attachments without
    // delivering them.
    //
    // Tagged with the field they came from, so a form with more than one file
    // input stays legible to whoever reads the submission.
    const formData = {}
    const files = []
    for (const [name, field] of fields) {
      const value = values[name]
      if (field.type === 'file' || field.type === 'image') {
        if (!canUploadFiles) continue
        for (const file of value || []) files.push({ file, field: name })
      } else if (value !== undefined && value !== '') {
        formData[name] = value
      }
    }

    try {
      await submit(formData, files.length ? { files } : {})
      setValues({})
    } catch {
      /* captured into `error` by the hook — including a partial upload failure,
         whose message says the submission landed and the attachment did not */
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6">
      {content.title && (
        <H2 text={content.title} className="text-3xl sm:text-4xl font-bold text-heading mb-3" />
      )}
      {content.paragraphs[0] && (
        <P text={content.paragraphs[0]} className="text-lg text-subtle mb-10" />
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
      >
        {/* The form definition carries its own heading, separate from the
            section's — an author can title the section and the form apart. */}
        {form.title && (
          <h3 className="text-xl font-bold text-heading">{form.title}</h3>
        )}
        {form.description && (
          <p className="text-subtle -mt-4">{form.description}</p>
        )}

        {fields.map(([name, field]) => {
          // A file input is a promise to deliver the bytes, and the framework
          // cannot yet. Rendering one anyway would take a visitor's attachment
          // and discard it on a submission that reports success — so the field
          // is skipped rather than shown broken. Drops out on its own when
          // `canUploadFiles` becomes true.
          const isFile = field.type === 'file' || field.type === 'image'
          if (isFile && !canUploadFiles) return null

          return (
            <FormField
              key={name}
              name={name}
              field={field}
              value={values[name]}
              onChange={setValue(name)}
              disabled={disabled}
            />
          )
        })}

        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={disabled}
            className="w-full px-6 py-3.5 font-semibold rounded-[var(--control-radius)] bg-primary text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : status === 'success' ? 'Sent' : 'Send request'}
          </button>

          <div className="min-h-6 text-sm" role="status" aria-live="polite">
            {/* Why the control is disabled, in the site's own words — this is
                the state that exists so a visitor is never invited to fill in a
                form whose answers have nowhere to go. */}
            {!canSubmit && <p className="text-subtle">{unavailableReason}</p>}
            {status === 'success' && (
              <p className="text-success font-medium">Thanks — we'll be in touch shortly.</p>
            )}
            {status === 'error' && (
              <p className="text-error font-medium" role="alert">
                {error?.message || 'Something went wrong. Please try again.'}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
