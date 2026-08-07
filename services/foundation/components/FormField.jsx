import React from 'react'
import { cn } from '@uniweb/kit'

/**
 * One control, drawn from one field of an authored form definition.
 *
 * This is the inverse of every other component in a foundation: it does not
 * declare what it accepts, it *receives* a shape and draws whatever it is
 * given. The field names belong to the author, not to this code, so nothing
 * here can be hardcoded against them.
 *
 * The vocabulary is the framework's own data-schema vocabulary — `type` plus an
 * optional `format` that refines `string`. Everything below branches on that
 * and nothing else.
 */

/** A choice is either a bare value or `{ value, label }` when they differ. */
function normalizeChoice(choice) {
  if (choice && typeof choice === 'object') {
    return { value: choice.value ?? '', label: choice.label ?? String(choice.value ?? '') }
  }
  return { value: choice, label: String(choice) }
}

/**
 * Map a field to an `<input type>`. Only `email` is authored by the editor
 * today; `url` and `tel` are handled because a hand-written form may use them
 * and falling back to a plain text box would lose the keyboard on mobile.
 */
function inputType(field) {
  switch (field.type) {
    case 'int':
    case 'integer':
    case 'decimal':
    case 'number':
      return 'number'
    case 'date':
      return 'date'
    case 'datetime':
      return 'datetime-local'
    default:
      if (field.format === 'email') return 'email'
      if (field.format === 'url') return 'url'
      if (field.format === 'tel') return 'tel'
      return 'text'
  }
}

export default function FormField({ name, field, value, onChange, disabled }) {
  const label = field.label || name
  const id = `field-${name}`
  const describedBy = field.description ? `${id}-help` : undefined

  const labelEl = (
    <label htmlFor={id} className="block text-sm font-semibold text-heading mb-1.5">
      {label}
      {field.required && (
        <span className="text-error ml-1" aria-hidden="true">*</span>
      )}
    </label>
  )

  const help = field.description && (
    <p id={describedBy} className="mt-1.5 text-sm text-subtle">
      {field.description}
    </p>
  )

  // A choice list is a select whatever its underlying type is.
  if (Array.isArray(field.enum) && field.enum.length > 0) {
    const choices = field.enum.map(normalizeChoice)
    return (
      <div>
        {labelEl}
        <select
          id={id}
          className={cn('control', 'appearance-none cursor-pointer')}
          value={value ?? ''}
          required={!!field.required}
          disabled={disabled}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Choose…</option>
          {choices.map((c) => (
            <option key={String(c.value)} value={c.value}>{c.label}</option>
          ))}
        </select>
        {help}
      </div>
    )
  }

  if (field.type === 'bool' || field.type === 'boolean') {
    // The label sits beside the box rather than above it — a checkbox reads as
    // a statement you agree with, not as a question with an answer below.
    return (
      <div>
        <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
          <input
            id={id}
            type="checkbox"
            className="mt-1 h-5 w-5 rounded border-border accent-[var(--primary)]"
            checked={!!value}
            required={!!field.required}
            disabled={disabled}
            aria-describedby={describedBy}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="text-sm font-medium text-body">
            {label}
            {field.required && <span className="text-error ml-1" aria-hidden="true">*</span>}
          </span>
        </label>
        {help}
      </div>
    )
  }

  if (field.type === 'text') {
    return (
      <div>
        {labelEl}
        <textarea
          id={id}
          className={cn('control', 'min-h-32 resize-y')}
          placeholder={field.placeholder || undefined}
          value={value ?? ''}
          required={!!field.required}
          disabled={disabled}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
        />
        {help}
      </div>
    )
  }

  if (field.type === 'file' || field.type === 'image') {
    const files = Array.isArray(value) ? value : []
    return (
      <div>
        {labelEl}
        <input
          id={id}
          type="file"
          className={cn('control', 'cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-body')}
          // `accept` and `multiple` are the literal HTML attribute names in the
          // form definition, so they pass straight through.
          accept={field.accept || (field.type === 'image' ? 'image/*' : undefined)}
          multiple={!!field.multiple}
          required={!!field.required && files.length === 0}
          disabled={disabled}
          aria-describedby={describedBy}
          onChange={(e) => onChange(Array.from(e.target.files || []))}
        />
        {files.length > 0 && (
          <p className="mt-1.5 text-sm text-subtle">
            {files.map((f) => f.name).join(', ')}
          </p>
        )}
        {help}
      </div>
    )
  }

  return (
    <div>
      {labelEl}
      <input
        id={id}
        type={inputType(field)}
        className="control"
        placeholder={field.placeholder || undefined}
        step={field.type === 'int' || field.type === 'integer' ? 1 : undefined}
        value={value ?? ''}
        required={!!field.required}
        disabled={disabled}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
      />
      {help}
    </div>
  )
}
