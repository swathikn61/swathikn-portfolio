import { motion, useReducedMotion } from 'framer-motion'

const OFFSETS = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Fades content in the first time it scrolls into view.
 * Collapses to a plain fade (or nothing at all) when the user prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.55,
  className = '',
  as = 'div',
}) {
  const reduceMotion = useReducedMotion()
  const offset = reduceMotion ? OFFSETS.none : (OFFSETS[direction] ?? OFFSETS.up)
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: reduceMotion ? 0.01 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
