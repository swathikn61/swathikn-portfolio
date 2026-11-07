import { motion, useReducedMotion } from 'framer-motion'

// Each letter is snipped from a different magazine: its own paper, ink, typeface and tilt.
const SCRAPS = [
  { bg: 'var(--color-pink)', ink: 'var(--color-wine)', font: 'display italic', tilt: -6 },
  { bg: '#fffaf0', ink: 'var(--color-forest)', font: 'display', tilt: 4 },
  { bg: 'var(--color-marigold)', ink: 'var(--color-forest)', font: 'hand', tilt: -3 },
  { bg: 'var(--color-wine)', ink: '#fffaf0', font: 'display italic', tilt: 5 },
  { bg: 'var(--color-sage)', ink: 'var(--color-forest)', font: 'sans', tilt: -4 },
  { bg: '#fffaf0', ink: 'var(--color-wine)', font: 'display', tilt: 3 },
  { bg: 'var(--color-forest)', ink: 'var(--color-pink)', font: 'display italic', tilt: -5 },
]

const FONT = {
  display: 'display not-italic font-semibold',
  'display italic': 'display italic font-normal',
  hand: 'hand',
  sans: 'font-sans font-extrabold',
}

// Uneven corners, so no two scraps look machine-cut.
const CORNERS = ['8px 14px 6px 12px', '14px 6px 12px 8px', '6px 10px 14px 6px', '12px 8px 6px 14px']

/**
 * A word spelled in ransom-note cut-out letters. Each scrap drops in and settles at its tilt,
 * one after another, starting at `delay` seconds.
 */
export default function CutoutWord({ text, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  // Words stay together; lines only break between words. `n` counts letters across words,
  // so the scrap styles and the drop-in order run on continuously.
  let n = 0
  const words = text.split(' ').map((word) => [...word].map((char) => ({ char, i: n++ })))

  return (
    <span
      aria-label={text}
      role="img"
      className={`inline-flex flex-wrap items-center justify-center gap-x-[0.32em] gap-y-[0.12em] ${className}`}
    >
      {words.map((letters, w) => (
        <span key={w} className="inline-flex gap-[0.06em] whitespace-nowrap">
          {letters.map(({ char, i }) => {
            const scrap = SCRAPS[i % SCRAPS.length]
            return (
              <motion.span
                key={i}
                aria-hidden="true"
                className={`${FONT[scrap.font]} inline-grid min-w-[0.72em] place-items-center px-[0.1em] pt-[0.04em] pb-[0.1em] leading-[0.9] shadow-[2px_4px_0_rgba(60,40,20,0.18)]`}
                style={{ background: scrap.bg, color: scrap.ink, borderRadius: CORNERS[i % CORNERS.length] }}
                initial={reduce ? false : { opacity: 0, y: -60, rotate: scrap.tilt * 4, scale: 1.25 }}
                animate={{ opacity: 1, y: 0, rotate: scrap.tilt, scale: 1 }}
                whileHover={
                  reduce ? undefined : { rotate: -scrap.tilt, y: -6, transition: { type: 'spring', stiffness: 300, damping: 12 } }
                }
                transition={{ type: 'spring', stiffness: 260, damping: 15, delay: delay + i * 0.08 }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
