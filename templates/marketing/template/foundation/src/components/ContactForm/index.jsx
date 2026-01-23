import React, { useState } from 'react'
import { cn } from '@uniweb/kit'

/**
 * ContactForm Component
 *
 * Contact form with customizable fields via dataBlock.
 * Form config is defined in a tagged yaml:form or json:form block.
 */
export function ContactForm({ content, params }) {
  const { title, paragraphs } = content
  const { theme, layout } = params

  // Form config from dataBlock
  const formConfig = content.data?.form || {}
  const fields = formConfig.fields || []
  const submitLabel = formConfig.submitLabel || 'Submit'
  const successMessage = formConfig.successMessage || 'Thank you for your message!'
  const actionUrl = formConfig.action

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const themes = {
    light: {
      bg: 'bg-white',
      text: 'text-gray-900',
      muted: 'text-gray-600',
      input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
      inputFocus: 'focus:border-primary focus:ring-primary',
      button: 'bg-primary text-white hover:bg-primary/90',
      error: 'text-red-600',
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-white',
      muted: 'text-gray-400',
      input: 'bg-gray-800 border-gray-700 text-white placeholder-gray-500',
      inputFocus: 'focus:border-primary focus:ring-primary',
      button: 'bg-primary text-white hover:bg-primary/90',
      error: 'text-red-400',
    },
  }
  const t = themes[theme] || themes.light

  const validate = () => {
    const newErrors = {}
    fields.forEach(field => {
      const value = formData[field.name] || ''
      if (field.required && !value.trim()) {
        newErrors[field.name] = 'This field is required'
      } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field.name] = 'Please enter a valid email'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)

    if (actionUrl) {
      try {
        await fetch(actionUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      } catch (err) {
        // Silent fail for demo
      }
    }

    // Simulate brief delay
    await new Promise(r => setTimeout(r, 500))
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const renderField = (field) => {
    const { name, label, type = 'text', placeholder, required } = field
    const value = formData[name] || ''
    const error = errors[name]

    const baseInputClass = cn(
      'w-full px-4 py-3 rounded-lg border transition-colors',
      t.input,
      t.inputFocus,
      error && 'border-red-500'
    )

    return (
      <div key={name} className={type === 'textarea' ? 'col-span-full' : ''}>
        <label className={cn('block text-sm font-medium mb-2', t.text)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className={baseInputClass}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            placeholder={placeholder}
            className={baseInputClass}
          />
        )}
        {error && <p className={cn('text-sm mt-1', t.error)}>{error}</p>}
      </div>
    )
  }

  // Success state
  if (submitted) {
    return (
      <section className={cn('py-20 px-6', t.bg)}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className={cn('text-2xl font-bold mb-4', t.text)}>{successMessage}</h2>
        </div>
      </section>
    )
  }

  // Split layout: info on left, form on right
  if (layout === 'split') {
    return (
      <section className={cn('py-20 px-6', t.bg)}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            {title && <h2 className={cn('text-3xl sm:text-4xl font-bold mb-6', t.text)}>{title}</h2>}
            {paragraphs[0] && <p className={cn('text-lg', t.muted)}>{paragraphs[0]}</p>}
          </div>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {fields.map(renderField)}
            <button
              type="submit"
              disabled={submitting}
              className={cn(
                'w-full py-3 px-6 rounded-lg font-medium transition-colors',
                t.button,
                submitting && 'opacity-70 cursor-not-allowed'
              )}
            >
              {submitting ? 'Sending...' : submitLabel}
            </button>
          </form>
        </div>
      </section>
    )
  }

  // Centered layout (default)
  return (
    <section className={cn('py-20 px-6', t.bg)}>
      <div className="max-w-2xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-12">
            {title && <h2 className={cn('text-3xl sm:text-4xl font-bold mb-4', t.text)}>{title}</h2>}
            {paragraphs[0] && <p className={cn('text-lg', t.muted)}>{paragraphs[0]}</p>}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
          {fields.map(renderField)}
          <div className="col-span-full">
            <button
              type="submit"
              disabled={submitting}
              className={cn(
                'w-full py-3 px-6 rounded-lg font-medium transition-colors',
                t.button,
                submitting && 'opacity-70 cursor-not-allowed'
              )}
            >
              {submitting ? 'Sending...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
