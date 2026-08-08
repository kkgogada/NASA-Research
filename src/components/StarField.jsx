/**
 * Restrained star field. Deliberately quiet: a fixed, low-density scatter of
 * small points drawn once to a canvas, with no animation loop. It should read as
 * texture behind the content, never as decoration competing with it.
 * Respects prefers-reduced-motion by simply never moving in the first place.
 */

import { useEffect, useRef } from 'react'

export default function StarField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Density scaled to viewport area, capped so large screens stay restrained.
      const count = Math.min(220, Math.round((w * h) / 9000))

      // Deterministic pseudo-random so the field does not reshuffle on resize.
      let seed = 20200730
      const rand = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296
        return seed / 4294967296
      }

      for (let i = 0; i < count; i++) {
        const x = rand() * w
        const y = rand() * h
        const r = rand()
        const size = r > 0.965 ? 1.5 : r > 0.82 ? 1.05 : 0.65
        const alpha = r > 0.965 ? 0.75 : r > 0.82 ? 0.42 : 0.24

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        // A few stars take a faint blue or warm cast, most stay neutral.
        const tint = rand()
        ctx.fillStyle =
          tint > 0.93
            ? `rgba(150, 190, 255, ${alpha})`
            : tint < 0.05
              ? `rgba(255, 205, 180, ${alpha})`
              : `rgba(233, 240, 255, ${alpha})`
        ctx.fill()
      }
    }

    draw()
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(draw)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="starfield" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  )
}
