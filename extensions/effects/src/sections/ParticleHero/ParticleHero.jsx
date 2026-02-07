import React, { useRef, useEffect } from 'react'
import { H1, P, Link, cn } from '@uniweb/kit'

/**
 * ParticleHero — Extension section type
 *
 * A hero section with animated floating particles on a canvas.
 * Demonstrates an extension providing a specialized visual component
 * that doesn't belong in a general-purpose foundation.
 */
function ParticleHero({ content, params }) {
  const { title, subtitle, paragraphs, links } = content
  const { particleCount = 40, speed = 1 } = params
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId

    // Resize canvas to fill container
    function resize() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5 * speed,
      speedY: (Math.random() - 0.5) * 0.5 * speed,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around edges
        if (p.x < 0) p.x = canvas.offsetWidth
        if (p.x > canvas.offsetWidth) p.x = 0
        if (p.y < 0) p.y = canvas.offsetHeight
        if (p.y > canvas.offsetHeight) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [particleCount, speed])

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 px-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {title && (
          <H1
            text={title}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          />
        )}
        {subtitle && (
          <p className="text-xl sm:text-2xl font-medium mb-4 text-slate-300">
            {subtitle}
          </p>
        )}
        {paragraphs[0] && (
          <P
            text={paragraphs[0]}
            className="text-lg mb-10 leading-relaxed text-slate-300 max-w-2xl mx-auto"
          />
        )}
        {links.length > 0 && (
          <div className="flex gap-4 flex-wrap justify-center">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all',
                  i === 0
                    ? 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/30'
                    : 'border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ParticleHero
