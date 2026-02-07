import React, { useState } from 'react'
import { cn } from '@uniweb/kit'

/**
 * ContactForm Component
 *
 * Contact form with customizable fields via dataBlock.
 * Form config is defined in a tagged yaml:form or json:form block.
 */
function ContactForm({ content, params }) {
  const { title, paragraphs } = content
  const { layout } = params

  // Form config from dataBlock
  const form = content.data.form || {}
  const fields = form.fields || []
  const submitLabel = form.submitLabel || 'Submit'
  const successMessage = form.successMessage || 'Thank you for your message!'
  const action = form.action

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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

    if (action) {
      try {
        await fetch(action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      } catch (err) {
        // Silent fail for demo
      }
    }

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
      'w-full px-4 py-3 rounded-lg border transition-colors bg-white border-edge text-heading placeholder-gray-400 focus:border-primary focus:ring-primary',
      error && 'border-red-500'
    )

    return (
      <div key={name} className={type === 'textarea' ? 'col-span-full' : ''}>
        <label className="block text-sm font-medium mb-2 text-heading">
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
        {error && <p className="text-sm mt-1 text-red-600">{error}</p>}
      </div>
    )
  }

  // Success state
  if (submitted) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-heading">{successMessage}</h2>
        </div>
      </section>
    )
  }

  // Split layout
  if (layout === 'split') {
    return (
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            {title && <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-heading">{title}</h2>}
            {paragraphs[0] && <p className="text-lg text-muted">{paragraphs[0]}</p>}
          </div>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {fields.map(renderField)}
            <button
              type="submit"
              disabled={submitting}
              className={cn(
                'w-full py-3 px-6 rounded-lg font-medium transition-colors bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover',
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
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {(title || paragraphs[0]) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-heading">{title}</h2>}
            {paragraphs[0] && <p className="text-lg text-muted">{paragraphs[0]}</p>}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
          {fields.map(renderField)}
          <div className="col-span-full">
            <button
              type="submit"
              disabled={submitting}
              className={cn(
                'w-full py-3 px-6 rounded-lg font-medium transition-colors bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover',
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
