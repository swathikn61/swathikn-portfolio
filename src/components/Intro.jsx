import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { profile } from '../data/content'

const EASE = [0.22, 1, 0.36, 1]
const SEEN_KEY = 'intro-seen'

/** Skip the intro for reduced motion and for repeat visits in the same tab session. */
export function shouldSkipIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * One burgundy dot on cream, the same dot as the site's cursor. After a beat it opens like an
 * iris: a circular hole grows from the dot until the page behind is fully revealed.
 * `onReveal` fires as the hole starts to open, so the hero animates in underneath.
 */
export default function Intro({ onReveal }) {
  const [done, setDone] = useState(false)
  const radius = useMotionValue(0) // hole radius, in vmax
  const mask = useTransform(
    radius,
    (r) => `radial-gradient(circle at 50% 50%, transparent ${r}vmax, #000 ${r + 0.15}vmax)`,
  )

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        /* private mode: the intro just plays again next visit */
      }
      onReveal()
      animate(radius, 90, { duration: 1.3, ease: [0.76, 0, 0.24, 1] }).then(() => {
        document.documentElement.style.overflow = ''
        setDone(true)
      })
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.documentElement.style.overflow = ''
    }
  }, [onReveal, radius])

  if (done) return null

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="tone tone-butter keep fixed inset-0 z-[100] grid place-items-center"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <div className="flex flex-col items-center">
        <span className="relative grid h-6 w-6 place-items-center">
          {/* Slow ripple behind the dot, so it reads as alive rather than frozen. */}
          <motion.span
            aria-hidden="true"
            className="bg-pop absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0.35 }}
            animate={{ scale: 3.2, opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut', repeat: Infinity, delay: 0.5 }}
          />
          <motion.span
            className="bg-pop block h-4 w-4 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
          />
        </span>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
          className="label mt-6"
        >
          {profile.name} · Portfolio {new Date().getFullYear()}
        </motion.p>
      </div>
    </motion.div>
  )
}
