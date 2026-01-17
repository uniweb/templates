import React from 'react'

export function CTA({ content, params }) {
  const { title } = content.main?.header || {}
  const { paragraphs = [], links = [] } = content.main?.body || {}
  const { theme = 'primary', alignment = 'center' } = params || {}

  const cta = links[0]
  const secondaryCta = links[1]

  const themeStyles = {
    primary: 'bg-primary text-white',
    gradient: 'bg-gradient-to-r from-primary to-blue-700 text-white',
    dark: 'bg-gray-900 text-white',
    light: 'bg-gray-100 text-gray-900',
  }

  const buttonStyles = {
    primary: 'bg-white text-primary hover:bg-blue-50',
    gradient: 'bg-white text-primary hover:bg-blue-50',
    dark: 'bg-white text-gray-900 hover:bg-gray-100',
    light: 'bg-primary text-white hover:bg-blue-700',
  }

  const secondaryStyles = {
    primary: 'border-2 border-white text-white hover:bg-white/10',
    gradient: 'border-2 border-white text-white hover:bg-white/10',
    dark: 'border-2 border-gray-600 text-white hover:bg-gray-800',
    light: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-200',
  }

  const descStyles = {
    primary: 'text-blue-100',
    gradient: 'text-blue-100',
    dark: 'text-gray-400',
    light: 'text-gray-600',
  }

  return (
    <section className={`py-20 px-6 ${themeStyles[theme]}`}>
      <div className={`max-w-4xl mx-auto ${alignment === 'center' ? 'text-center' : ''}`}>
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        )}
        {paragraphs[0] && (
          <p className={`text-lg mb-8 max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''} ${descStyles[theme]}`}>
            {paragraphs[0]}
          </p>
        )}
        {(cta || secondaryCta) && (
          <div className={`flex gap-4 ${alignment === 'center' ? 'justify-center' : ''} flex-wrap`}>
            {cta && (
              <a
                href={cta.url}
                className={`inline-block px-8 py-4 font-semibold rounded-lg transition-colors ${buttonStyles[theme]}`}
              >
                {cta.text}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.url}
                className={`inline-block px-8 py-4 font-semibold rounded-lg transition-colors ${secondaryStyles[theme]}`}
              >
                {secondaryCta.text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default CTA
