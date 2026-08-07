import React from 'react'
import { H2, P, useFormSubmit, useFormValues, valueAt } from '@uniweb/kit'
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
 * ## Two kit hooks own everything that is not this foundation's design
 *
 * `useFormValues()` holds the answers — seeding declared defaults, tracking
 * edits, listing what is still `missing`, and keeping `File` objects out of
 * `formData` (they would serialize to `{}` and report an attachment nobody
 * received). `useFormSubmit()` resolves the destination and runs the request.
 *
 * What is left is the only part that should live in a foundation: which control
 * a `type` draws, and how it looks. Everything this component used to hold by
 * hand — a values map, a flatten, the file/formData split — was a second
 * implementation of kit's, differing from it in ways nobody had compared.
 *
 * ## A form is a LIST of controls (`@std/form` v2)
 *
 * `content.data.form` is a bare array; each record carries its own `name`. There
 * is no envelope — a form's heading and intro are the SECTION's own markdown,
 * read from `content.title` / `content.paragraphs` like any other section, and
 * drawn above the form below.
 */
export default function QuoteForm({ content, block }) {
  const definition = readDefinition(content.data?.form)

  const { controls, values, setValue, reset, missing, formData, files } =
    useFormValues(definition)

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

  async function handleSubmit(e) {
    e.preventDefault()
    if (disabled) return

    // `formData` is what is submitted and `files` are the attachments, already
    // tagged with the control each came from — kit derives the manifest, sends
    // the bytes and finalizes.
    try {
      await submit(formData, files.length ? { files } : {})
      reset()
    } catch {
      /* captured into `error` by the hook — including a partial upload failure,
         whose message says the submission landed and the attachment did not */
    }
  }

  // The controls to draw, top level only: a group renders its own children.
  const topLevel = controls.filter((c) => !c.path.includes('.'))

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
        {topLevel.map((control) => (
          <Control
            key={control.path}
            control={control}
            controls={controls}
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
            {/* `missing` is kit's computed fact; whether it blocks is this
                component's design decision, and here it does not — the browser's
                own `required` handles that, and a nag before anyone has typed
                reads as an error the visitor caused. */}
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
 * A control may carry `children` — a fieldset, a wizard step. Kit flattens the
 * tree and gives every control a dotted `path`; a group's children are the
 * controls whose path is the group's plus one segment. Drawing them nested
 * rather than flat is this foundation's choice, and it is why a group that
 * arrives is drawn instead of quietly taking its author's fields off the page.
 */
function Control({ control, controls, values, setValue, disabled, canUploadFiles }) {
  if (control.isGroup) {
    const depth = control.path.split('.').length
    const children = controls.filter(
      (c) => c.path.startsWith(`${control.path}.`) && c.path.split('.').length === depth + 1,
    )

    return (
      <fieldset className="space-y-6 border border-border rounded-xl p-5">
        {control.label && (
          <legend className="px-2 text-sm font-semibold text-heading">{control.label}</legend>
        )}
        {control.description && <p className="text-sm text-subtle">{control.description}</p>}
        {children.map((child) => (
          <Control
            key={child.path}
            control={child}
            controls={controls}
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
  const isUpload = control.type === 'file' || control.type === 'image'
  if (isUpload && !canUploadFiles) return null

  return (
    <FormField
      name={control.path}
      field={control}
      value={valueAt(values, control.path)}
      onChange={(v) => setValue(control.path, v)}
      disabled={disabled}
    />
  )
}

let warnedAboutEnvelope = false

/**
 * The authored form.
 *
 * Kit accepts a list, and also the older map keyed by control name. What it
 * cannot read is the v1 ENVELOPE — `{title, description, fields: <map>}` —
 * whose `fields` key would be taken for a control called "fields". That draws a
 * junk input rather than a form, so it is reported and refused here. There is
 * no migration path from v1 by design; this exists so the failure is legible,
 * not to support it.
 */
function readDefinition(form) {
  if (form && !Array.isArray(form) && typeof form === 'object' && form.fields) {
    if (!warnedAboutEnvelope) {
      warnedAboutEnvelope = true
      console.warn(
        '[QuoteForm] This `yaml:form` block is the v1 envelope (`title`/`description`/`fields`). ' +
        '`@std/form` v2 is a bare list of controls, each with its own `name`, and there is no ' +
        'migration path — re-author the block as a list. Nothing is rendered until then.',
      )
    }
    return []
  }
  return form
}
