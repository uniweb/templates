import React from 'react'

export function Hero({ content, params }) {
  const { title } = content.main?.header || {}
  const { paragraphs = [], links = [] } = content.main?.body || {}
  const { theme = 'gradient', alignment = 'center' } = params || {}

  const cta = links[0]
  const secondaryCta = links[1]

  const themeStyles = {
    gradient: 'bg-gradient-to-br from-primary to-blue-700 text-white',
    light: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-white',
  }

  const buttonStyles = {
    gradient: 'bg-white text-primary hover:bg-blue-50',
    light: 'bg-primary text-white hover:bg-blue-700',
    dark: 'bg-primary text-white hover:bg-blue-700',
  }

  const secondaryButtonStyles = {
    gradient: 'border-2 border-white text-white hover:bg-white/10',
    light: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100',
    dark: 'border-2 border-gray-600 text-gray-300 hover:bg-gray-800',
  }

  const descStyles = {
    gradient: 'text-blue-100',
    light: 'text-gray-600',
    dark: 'text-gray-400',
  }

  return (
    <section className={`py-24 px-6 ${themeStyles[theme]}`}>
      <div className={`max-w-4xl mx-auto ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
        )}
        {paragraphs[0] && (
          <p className={`text-xl md:text-2xl mb-10 max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''} ${descStyles[theme]}`}>
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
                className={`inline-block px-8 py-4 font-semibold rounded-lg transition-colors ${secondaryButtonStyles[theme]}`}
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

export default Hero
