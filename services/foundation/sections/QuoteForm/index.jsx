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
 *
 * ## A form is a LIST of controls (`@std/form` v2)
 *
 * `content.data.form` is a bare array; each record carries its own `name`. There
 * is no envelope — a form's heading and intro are the SECTION's own markdown,
 * read from `content.title` / `content.paragraphs` like any other section, and
 * drawn above the form below.
 *
 * The v1 shape (`{title, description, fields: <map>}`) is deliberately NOT
 * accepted. `@std/form` states there is no migration path from it; tolerating
 * both here would be the compatibility branch that decision exists to avoid. A
 * v1 block is reported once to the console rather than silently drawing nothing,
 * because "the section vanished" is the least diagnosable failure this component
 * has.
 */
export default function QuoteForm({ content, block }) {
  const controls = readControls(content.data?.form)
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

  // A section with no form renders nothing rather than an empty shell — the
  // author has not designed one yet.
  if (controls.length === 0) return null

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
    for (const control of flatten(controls)) {
      const { name } = control
      const value = values[name]
      if (isFileControl(control)) {
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
        {controls.map((control) => (
          <Control
            key={control.name}
            control={control}
            values={values}
            setValue={setValue}
            disabled={disabled}
            canUploadFiles={canUploadFiles}
          />
        ))}

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

/**
 * One control, or a group of them.
 *
 * `@std/form` declares the control list as a tree — a control may carry
 * `children`, which is how a fieldset or a wizard step is expressed. Nothing
 * authors one today, but a group that arrived and was not drawn would take the
 * author's fields off the page with no error anywhere, so it is rendered rather
 * than ignored. Children keep their own `name`, so answers stay flat.
 */
function Control({ control, values, setValue, disabled, canUploadFiles }) {
  const children = Array.isArray(control.children) ? control.children : []

  if (children.length > 0) {
    return (
      <fieldset className="space-y-6 border border-border rounded-xl p-5">
        {control.label && (
          <legend className="px-2 text-sm font-semibold text-heading">{control.label}</legend>
        )}
        {control.description && <p className="text-sm text-subtle">{control.description}</p>}
        {children.map((child) => (
          <Control
            key={child.name}
            control={child}
            values={values}
            setValue={setValue}
            disabled={disabled}
            canUploadFiles={canUploadFiles}
          />
        ))}
      </fieldset>
    )
  }

  // A file input is a promise to deliver the bytes. Kit sends the manifest, the
  // bytes and the finalize call, so this holds wherever a target resolves —
  // the guard is what keeps a file input off a form that has nowhere to post.
  if (isFileControl(control) && !canUploadFiles) return null

  return (
    <FormField
      name={control.name}
      field={control}
      value={values[control.name]}
      onChange={setValue(control.name)}
      disabled={disabled}
    />
  )
}

const isFileControl = (control) => control.type === 'file' || control.type === 'image'

/** Every control in the tree, in document order — what a submission is built from. */
function flatten(controls) {
  return controls.flatMap((control) =>
    Array.isArray(control.children) && control.children.length > 0
      ? [control, ...flatten(control.children)]
      : [control],
  )
}

let warnedAboutV1 = false

/**
 * The authored form, as a list of controls.
 *
 * Anything without a `name` is dropped — it is what a submission would be keyed
 * by, and a control that cannot be keyed cannot be answered.
 */
function readControls(form) {
  if (Array.isArray(form)) return form.filter((c) => c && typeof c === 'object' && c.name)

  if (form && typeof form === 'object' && form.fields && !warnedAboutV1) {
    warnedAboutV1 = true
    console.warn(
      '[QuoteForm] This `yaml:form` block is the v1 shape (an envelope with a `fields` map). ' +
      '`@std/form` v2 is a bare list of controls, each with its own `name`, and there is no ' +
      'migration path — re-author the block as a list. Nothing is rendered until then.',
    )
  }

  return []
}
