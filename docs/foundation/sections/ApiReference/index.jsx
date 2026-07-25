import React, { useState } from 'react'
import { cn, Code } from '@uniweb/kit'

/**
 * ApiReference Component
 *
 * Displays API endpoint documentation with:
 * - HTTP method badge (GET, POST, PUT, DELETE, PATCH)
 * - Endpoint path with parameter highlighting
 * - Parameters table (path, query, header, body)
 * - Request/response examples with syntax highlighting
 *
 * Uses dataBlock (yaml:api or json:api) for structured definition.
 */
function ApiReference({ content, params }) {
  const { title, paragraphs } = content
  const { show_try_it, compact } = params

  // API config from dataBlock
  const api = content.data.api || {}
  const method = api.method || 'GET'
  const path = api.path || ''
  const parameters = api.parameters || []
  const requestBody = api.requestBody
  const response = api.response
  const responses = api.responses || []

  // HTTP method colours are conventional, not thematic — GET is green and
  // DELETE is red in every API reference on the web, and a site's palette has
  // no opinion about that. Deliberately left as fixed colours; the surrounding
  // chrome uses semantic tokens.
  const methodColors = {
    GET: 'bg-emerald-500',
    POST: 'bg-blue-500',
    PUT: 'bg-amber-500',
    PATCH: 'bg-orange-500',
    DELETE: 'bg-red-500',
  }

  // Highlight path parameters (e.g., {id} -> styled span)
  const renderPath = (pathStr) => {
    if (!pathStr) return null
    const parts = pathStr.split(/(\{[^}]+\})/)
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        return (
          <span key={i} className="text-warning">
            {part}
          </span>
        )
      }
      return part
    })
  }

  // Group parameters by location
  const paramsByLocation = parameters.reduce((acc, param) => {
    const loc = param.in || 'query'
    if (!acc[loc]) acc[loc] = []
    acc[loc].push(param)
    return acc
  }, {})

  const locationLabels = {
    path: 'Path Parameters',
    query: 'Query Parameters',
    header: 'Headers',
    body: 'Body Parameters',
  }

  return (
    <article className="py-8">
      {/* Header: Method + Path */}
      <div className="mb-6">
        {title && (
          <h2 className="text-2xl font-bold text-heading mb-3">{title}</h2>
        )}

        <div className="flex items-center gap-3 p-4 bg-section rounded-lg font-mono text-sm">
          <span
            className={cn(
              'px-3 py-1 rounded font-bold text-primary-foreground text-xs uppercase',
              methodColors[method.toUpperCase()] || 'bg-subtle'
            )}
          >
            {method}
          </span>
          <code className="text-heading">{renderPath(path)}</code>
          {show_try_it && (
            <button className="ml-auto px-3 py-1 text-xs bg-primary hover:bg-primary-dark text-primary-foreground rounded transition-colors">
              Try it
            </button>
          )}
        </div>

        {paragraphs[0] && (
          <p className="mt-4 text-subtle">{paragraphs[0]}</p>
        )}
      </div>

      {/* Parameters */}
      {parameters.length > 0 && (
        <div className="mb-8">
          {Object.entries(paramsByLocation).map(([location, params]) => (
            <div key={location} className="mb-6">
              <h3 className="text-lg font-semibold text-heading mb-3">
                {locationLabels[location] || location}
              </h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium text-body">Name</th>
                      <th className="text-left px-4 py-2 font-medium text-body">Type</th>
                      {!compact && (
                        <th className="text-left px-4 py-2 font-medium text-body">Description</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {params.map((param, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3">
                          <code className="text-sm font-mono text-heading">
                            {param.name}
                          </code>
                          {param.required && (
                            <span className="ml-2 text-xs text-error font-medium">
                              required
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-subtle">{param.type || 'string'}</span>
                        </td>
                        {!compact && (
                          <td className="px-4 py-3 text-subtle">
                            {param.description}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request Body */}
      {requestBody && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-heading mb-3">Request Body</h3>
          <CodeExample
            code={typeof requestBody === 'string' ? requestBody : JSON.stringify(requestBody, null, 2)}
            language="json"
          />
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-heading mb-3">
            Response
            {response.status && (
              <span className="ml-2 text-sm font-normal text-subtle">
                {response.status}
              </span>
            )}
          </h3>
          <CodeExample
            code={typeof response.body === 'string' ? response.body : JSON.stringify(response.body, null, 2)}
            language="json"
          />
        </div>
      )}

      {/* Multiple Responses */}
      {responses.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-heading mb-3">Responses</h3>
          <div className="space-y-4">
            {responses.map((res, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-xs font-medium',
                      res.status >= 200 && res.status < 300
                        ? 'bg-success-subtle text-success'
                        : res.status >= 400
                        ? 'bg-error-subtle text-error'
                        : 'bg-muted text-heading'
                    )}
                  >
                    {res.status}
                  </span>
                  {res.description && (
                    <span className="text-sm text-subtle">{res.description}</span>
                  )}
                </div>
                {res.body && (
                  <CodeExample
                    code={typeof res.body === 'string' ? res.body : JSON.stringify(res.body, null, 2)}
                    language="json"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

/**
 * CodeExample - Code block with header and copy button, using Shiki for syntax highlighting
 */
function CodeExample({ code, language = 'json' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Silent fail
    }
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <span className="text-xs font-mono text-subtle uppercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-subtle hover:text-primary-foreground transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <Code content={code} language={language} className="rounded-none" />
    </div>
  )
}

export default ApiReference
