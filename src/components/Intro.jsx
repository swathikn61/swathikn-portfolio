import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import Sticker from './Sticker'

const SEEN_KEY = 'intro-seen'
const LINE = 'booting up my corner of the internet…'
const LOAD_S = 2.1 // how long the tape takes to unroll

/** Skip the intro for reduced motion and for repeat visits in the same tab session. */
export function shouldSkipIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

// Stickers in a loose ring around the line. `fly` is where each one escapes to at the end.
const STICKERS = [
  { shape: 'rocket', color: 'var(--color-pink)', accent: 'var(--color-wine)', pos: 'left-[8%] top-[16%] w-14', tilt: -14, fly: [-260, -220] },
  { shape: 'bulb', color: 'var(--color-marigold)', accent: 'var(--color-forest)', pos: 'right-[12%] top-[13%] w-12', tilt: 12, fly: [240, -220] },
  { shape: 'wifi', color: 'var(--color-sky)', pos: 'right-[7%] top-[46%] w-14', tilt: 8, fly: [300, 20] },
  { shape: 'coffee', color: 'var(--color-sage)', accent: 'var(--color-forest)', pos: 'left-[11%] bottom-[18%] w-16', tilt: -6, fly: [-240, 220] },
  { shape: 'laptop', color: 'var(--color-forest)', accent: 'var(--color-sky)', pos: 'right-[15%] bottom-[14%] w-16', tilt: 6, fly: [220, 240] },
  { shape: 'key', color: 'var(--color-marigold)', accent: 'var(--color-wine)', pos: 'left-[5%] top-[50%] w-12', tilt: -20, fly: [-300, 0] },
]

/**
 * The line writes itself across the page in handwriting while a strip of washi tape unrolls
 * beneath it as the loading bar. Tech stickers pop on around the edges; when the tape reaches
 * the end they scatter off the page and the portfolio fades in. `onReveal` fires as they go.
 */
export default function Intro({ onReveal }) {
  const progress = useMotionValue(0)
  const tapeWidth = useTransform(progress, (p) => `${p * 100}%`)
  const percent = useTransform(progress, (p) => `${String(Math.round(p * 100)).padStart(3, '0')}%`)
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    let timer
    // Starts slow, rushes the middle, eases into 100 like a real loader.
    const controls = animate(progress, 1, { duration: LOAD_S, delay: 0.5, ease: [0.65, 0, 0.35, 1] })
    controls.then(() => {
      timer = setTimeout(() => {
        try {
          sessionStorage.setItem(SEEN_KEY, '1')
        } catch {
          /* private mode: the intro just plays again next visit */
        }
        document.documentElement.style.overflow = ''
        onReveal()
        setLeaving(true)
      }, 350)
    })
    return () => {
      controls.stop()
      clearTimeout(timer)
      document.documentElement.style.overflow = ''
    }
  }, [progress, onReveal])

  if (done) return null

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="tone tone-butter keep fixed inset-0 z-[100] overflow-hidden"
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.5, delay: leaving ? 0.3 : 0, ease: 'easeInOut' }}
      onAnimationComplete={() => leaving && setDone(true)}
    >
      {STICKERS.map((s, i) => (
        <motion.span
          key={s.shape}
          className={`absolute ${s.pos}`}
          initial={{ scale: 0, rotate: s.tilt - 40, x: 0, y: 0 }}
          animate={
            leaving
              ? { scale: 1.3, rotate: s.tilt + 30, x: s.fly[0], y: s.fly[1], opacity: 0 }
              : { scale: 1, rotate: s.tilt, x: 0, y: 0, opacity: 1 }
          }
          transition={
            leaving
              ? { duration: 0.7, ease: [0.5, 0, 0.75, 0] }
              : { type: 'spring', stiffness: 260, damping: 13, delay: 0.3 + i * 0.18 }
          }
        >
          <Sticker shape={s.shape} color={s.color} accent={s.accent} className="w-full" />
        </motion.span>
      ))}

      <motion.div
        className="absolute inset-0 grid place-items-center px-6"
        animate={leaving ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeIn' }}
      >
        <div className="flex w-full max-w-3xl flex-col items-center">
          {/* The line "writes" from left to right as a mask uncovers it. */}
          <motion.p
            className="hand text-forest -rotate-2 text-center text-[clamp(2.1rem,6vw,4.25rem)] leading-tight"
            initial={{ clipPath: 'inset(-20% 100% -20% 0)' }}
            animate={{ clipPath: 'inset(-20% 0% -20% 0)' }}
            transition={{ duration: 1.7, delay: 0.25, ease: [0.45, 0.05, 0.4, 1] }}
          >
            {LINE}
          </motion.p>

          {/* Washi-tape loading bar. */}
          <div className="mt-10 w-[min(100%,26rem)] -rotate-1">
            <div className="mb-2 flex justify-between font-mono text-[0.7rem] tracking-wider uppercase opacity-60">
              <span>loading portfolio</span>
              <motion.span>{percent}</motion.span>
            </div>
            <div className="relative h-7 rounded-sm border-2 border-dashed border-current/20">
              <motion.span
                className="tape top-[-2px]! left-[-2px] h-7! [--tape:var(--color-pink)]"
                style={{ width: tapeWidth }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
