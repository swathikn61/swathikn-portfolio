import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowDown, ArrowUpRight, FileText, MapPin } from 'lucide-react'
import Button from '../components/Button'
import SocialLinks from '../components/SocialLinks'
import useTypewriter from '../hooks/useTypewriter'
import { profile } from '../data/content'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { text: typedName, done: typingDone } = useTypewriter(profile.name, {
    speed: 85,
    startDelay: 500,
    enabled: !reduceMotion,
  })

  const rise = (delay) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.01 : 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  })

  // Dot layers drift a few pixels toward the cursor — springed so it trails
  // smoothly instead of snapping to every mousemove tick.
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const springConfig = { stiffness: 50, damping: 20, mass: 0.6 }
  const dotSpringX = useSpring(dotX, springConfig)
  const dotSpringY = useSpring(dotY, springConfig)

  const handlePointerMove = (e) => {
    if (reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5
    dotX.set(relX * 24)
    dotY.set(relY * 24)
  }

  const handlePointerLeave = () => {
    dotX.set(0)
    dotY.set(0)
  }

  return (
    <section
      id="home"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="from-buttermilk via-cream to-accent-100/50 dark:from-ink-950 dark:via-ink-900 dark:to-accent-900/30 relative flex min-h-svh items-center overflow-hidden bg-gradient-to-br pt-16"
    >
      {/* Backdrop: pixel-dot texture (same pattern in both themes, CSS swaps its color), plus a soft glow.
          Oversized (-inset-6) so the cursor-driven drift never reveals an edge. */}
      <motion.div
        aria-hidden="true"
        style={{ x: dotSpringX, y: dotSpringY }}
        className="bg-pixels pointer-events-none absolute -inset-6 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)] dark:opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[32rem] w-[40rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent-400/10 blur-[120px] dark:bg-accent-400/15"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-20 text-center sm:px-8">
        <motion.div
          {...rise(0)}
          className="border-ink-200 text-ink-600 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-300 mb-7 inline-flex items-center gap-2 rounded-full border bg-cream/70 px-3.5 py-1.5 text-xs font-medium backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {profile.availability}
        </motion.div>

        <motion.h1
          {...rise(0.08)}
          aria-label={profile.name}
          className="text-accent-800 dark:text-accent-400 font-mono text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          <span aria-hidden="true">
            {typedName}
            {!typingDone && <span className="typewriter-cursor">|</span>}
          </span>
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="text-ink-500 dark:text-ink-400 mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-lg sm:text-xl"
        >
          <span className="text-ink-700 dark:text-ink-200 font-medium">{profile.role}</span>
          <span className="bg-ink-300 dark:bg-ink-700 hidden h-1 w-1 rounded-full sm:block" />
          <span>{profile.tagline}</span>
        </motion.p>

        <motion.p
          {...rise(0.24)}
          className="text-ink-600 dark:text-ink-400 mt-6 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          {...rise(0.32)}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="#projects" size="lg">
            View projects
            <ArrowUpRight size={17} strokeWidth={2} />
          </Button>
          <Button href={profile.resumeUrl} variant="secondary" size="lg" download>
            <FileText size={16} strokeWidth={1.75} />
            Resume
          </Button>
          <SocialLinks className="sm:ml-1" />
        </motion.div>

        <motion.div
          {...rise(0.4)}
          className="text-ink-500 dark:text-ink-500 mt-8 flex items-center justify-center gap-1.5 text-sm"
        >
          <MapPin size={14} strokeWidth={1.75} />
          {profile.location}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 absolute bottom-7 left-1/2 hidden -translate-x-1/2 transition-colors lg:block"
      >
        <ArrowDown size={18} strokeWidth={1.5} className="animate-bounce" />
      </motion.a>
    </section>
  )
}
