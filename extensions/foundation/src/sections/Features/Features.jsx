import React from 'react'
import { H1, H2, P, cn } from '@uniweb/kit'

function Features({ content }) {
  const { title, subtitle, items = [] } = content

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {title && (
            <H1 text={title} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" />
          )}
          {subtitle && (
            <H2 text={subtitle} className="text-xl text-gray-600 max-w-2xl mx-auto" />
          )}
        </div>
        {items.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                {item.title && (
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                )}
                {item.paragraphs?.[0] && (
                  <P text={item.paragraphs[0]} className="text-gray-600" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Features
