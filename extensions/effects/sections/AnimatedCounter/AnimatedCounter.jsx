import React, { useRef, useState, useEffect } from 'react'
import { H1, H2, cn } from '@uniweb/kit'

/**
 * AnimatedCounter — Extension section type
 *
 * Displays numbers that count up from zero when scrolled into view.
 * Uses IntersectionObserver for scroll detection and requestAnimationFrame
 * for smooth counting animation.
 */
function AnimatedCounter({ content, params }) {
  const { title, subtitle, items = [] } = content
  const { duration = 2000 } = params
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <H1 text={title} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" />
            )}
            {subtitle && (
              <H2 text={subtitle} className="text-xl text-gray-600" />
            )}
          </div>
        )}
        {items.length > 0 && (
          <div className={cn(
            'grid gap-8',
            items.length === 2 && 'sm:grid-cols-2 max-w-2xl mx-auto',
            items.length === 3 && 'sm:grid-cols-3',
            items.length >= 4 && 'sm:grid-cols-2 lg:grid-cols-4'
          )}>
            {items.map((item, i) => (
              <CounterCard
                key={i}
                target={item.title}
                label={item.paragraphs?.[0] || item.subtitle}
                visible={visible}
                duration={duration}
                delay={i * 150}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function CounterCard({ target, label, visible, duration, delay }) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!visible || !target) return

    // Parse the target number — extract digits, keep prefix/suffix
    const match = target.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/)
    if (!match) {
      setDisplay(target)
      return
    }

    const prefix = match[1]
    const numStr = match[2].replace(/,/g, '')
    const suffix = match[3]
    const targetNum = parseFloat(numStr)
    const isFloat = numStr.includes('.')
    const decimals = isFloat ? (numStr.split('.')[1]?.length || 0) : 0

    const timer = setTimeout(() => {
      const start = performance.now()

      function tick() {
        const elapsed = performance.now() - start
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = targetNum * eased

        if (isFloat) {
          setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
        } else {
          setDisplay(`${prefix}${Math.round(current).toLocaleString()}${suffix}`)
        }

        if (progress < 1) {
          requestAnimationFrame(tick)
        }
      }

      requestAnimationFrame(tick)
    }, delay)

    return () => clearTimeout(timer)
  }, [visible, target, duration, delay])

  return (
    <div className="text-center p-6">
      <div className="text-4xl sm:text-5xl font-bold text-primary mb-2 tabular-nums">
        {display}
      </div>
      {label && (
        <p className="text-gray-600 text-sm">{label}</p>
      )}
    </div>
  )
}

export default AnimatedCounter
