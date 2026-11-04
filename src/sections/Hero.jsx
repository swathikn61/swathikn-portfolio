import { useLayoutEffect, useRef } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, FileText, MapPin } from 'lucide-react'
import Button from '../components/Button'
import PixelSprite from '../components/PixelSprite'
import SocialLinks from '../components/SocialLinks'
import TechStack from '../components/TechStack'
import { profile } from '../data/content'

const rise = (delay) => ({ style: { animationDelay: delay } })

// Two mirrored zigzags. `inner` sprites sit closer to the headline, so they wait for wider screens.
const SPRITES = [
  { name: 'flower', side: 'left', x: '5%', top: '14%', size: 'h-12' },
  { name: 'robot', side: 'left', x: '13%', top: '29%', size: 'h-12', inner: true },
  { name: 'sparkle', side: 'left', x: '5%', top: '44%', size: 'h-7', color: 'text-sky' },
  { name: 'database', side: 'left', x: '13%', top: '59%', size: 'h-12', inner: true },
  { name: 'bug', side: 'left', x: '5%', top: '74%', size: 'h-10' },
  { name: 'sparkle', side: 'right', x: '5%', top: '14%', size: 'h-7', color: 'text-marigold' },
  { name: 'code', side: 'right', x: '13%', top: '29%', size: 'h-8', color: 'text-pop', inner: true },
  { name: 'branch', side: 'right', x: '5%', top: '44%', size: 'h-12' },
  { name: 'coffee', side: 'right', x: '13%', top: '59%', size: 'h-11', inner: true },
  { name: 'terminal', side: 'right', x: '5%', top: '74%', size: 'h-11' },
]

/**
 * Wraps a sprite so it starts bunched up at the middle of the hero, then springs out to its
 * own spot. The outer span keeps the position and the CSS float; the inner one does the burst.
 */
function Burst({ index, className = '', style, children }) {
  const ref = useRef(null)
  const controls = useAnimationControls()
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    if (reduce) return
    const box = ref.current.getBoundingClientRect()
    if (!box.width) return // hidden at this screen size
    const hero = ref.current.closest('section').getBoundingClientRect()
    const x = hero.left + hero.width / 2 - (box.left + box.width / 2)
    const y = hero.top + hero.height / 2 - (box.top + box.height / 2)
    // Tiny jitter so the pile looks loose, not stacked exactly.
    const jitter = (n) => Math.sin(index * 12.9898 + n) * 14

    controls.set({ x: x + jitter(1), y: y + jitter(2), scale: 0.35, rotate: jitter(3) })
    controls.start({
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 55, damping: 10, mass: 1, delay: 0.7 + index * 0.07 },
    })
  }, [controls, index, reduce])

  return (
    <span ref={ref} style={style} className={className}>
      <motion.span animate={controls} className="block">
        {children}
      </motion.span>
    </span>
  )
}

const PHONE_SPRITES = ['terminal', 'robot', 'database', 'bug', 'coffee']

// The terminal is the one sprite that does something: it opens the tech stack.
function StackButton({ size, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label="Open my tech stack"
      className="group relative block"
    >
      {/* Sits left of the terminal on desktop, above it on phones where the left is screen edge. */}
      <span
        aria-hidden="true"
        className="text-pop font-hand absolute bottom-full left-1/2 mb-0.5 flex -translate-x-1/2 flex-col items-center text-2xl leading-none whitespace-nowrap lg:top-1/2 lg:right-full lg:bottom-auto lg:left-auto lg:mr-1 lg:mb-0 lg:translate-x-0 lg:-translate-y-1/2 lg:flex-row lg:gap-1"
      >
        <span className="-rotate-6">click me</span>
        <span className="grid h-9 w-6 place-items-center lg:h-6 lg:w-9">
          <svg viewBox="0 0 36 20" fill="none" className="w-9 shrink-0 rotate-90 lg:rotate-0">
            <path
              d="M2 5C10 15 21 16 33 9M26 5l8 3-5 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>

      <PixelSprite name="terminal" className={`${size} w-auto transition-transform group-hover:scale-110`} />
      <span className="label absolute top-full left-1/2 mt-1.5 -translate-x-1/2 text-[0.625rem] whitespace-nowrap group-hover:underline">
        Tech stack
      </span>
    </button>
  )
}

function FloatingSprites({ onOpenStack }) {
  return SPRITES.map(({ name, side, x, top, size, color = '', inner }, i) => (
    <Burst
      key={`${name}-${side}-${top}`}
      index={i}
      style={{ [side]: x, top, animationDelay: `${i * -0.45}s` }}
      className={`float absolute hidden ${inner ? 'xl:block' : 'lg:block'}`}
    >
      {name === 'terminal' ? (
        <StackButton size={size} onClick={onOpenStack} />
      ) : (
        <PixelSprite name={name} className={`${size} w-auto ${color}`} />
      )}
    </Burst>
  ))
}

export default function Hero() {
  const stack = useRef(null)
  const openStack = () => stack.current.showModal()

  return (
    <section
      id="home"
      className="tone tone-butter relative flex min-h-svh flex-col overflow-hidden pt-24"
    >
      <FloatingSprites onOpenStack={openStack} />
      <TechStack ref={stack} />

      <div className="wrap relative flex flex-1 flex-col items-center justify-center pb-20 text-center">
        <p
          {...rise('0.05s')}
          className="rise label border-fg flex items-center gap-2 rounded-full border px-4 py-2 text-[0.6875rem] whitespace-nowrap sm:text-xs"
        >
          <span aria-hidden="true" className="bg-pop h-2 w-2" />
          {profile.availability}
        </p>

        <h1
          {...rise('0.12s')}
          aria-label={`Hi, I'm ${profile.firstName}`}
          className="rise display mt-6 text-[clamp(4.75rem,min(13vw,20svh),9.5rem)]"
        >
          Hi, I'm <em>{profile.firstName}</em>
        </h1>

        <p
          {...rise('0.22s')}
          className="rise display mt-6 max-w-3xl text-[clamp(1.75rem,3.4vw,2.625rem)] leading-[1.35] text-balance"
        >
          {profile.heroLine.map((part, i) =>
            typeof part === 'string' ? (
              part
            ) : (
              <span key={i} className="whitespace-nowrap">
                <mark
                  className={`pixel-corners keep tone tone-${part.tone} mr-0.5 ml-1 inline-block px-3 pb-0.5`}
                >
                  {part.mark}
                </mark>
                {part.after}
              </span>
            ),
          )}
        </p>

        <div {...rise('0.32s')} className="rise mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="#projects">
            View projects
            <ArrowUpRight size={17} strokeWidth={2.25} />
          </Button>
          <Button href={profile.resumeUrl} variant="secondary" download>
            <FileText size={16} strokeWidth={2} />
            Resume
          </Button>
          <SocialLinks />
        </div>

        <p {...rise('0.4s')} className="rise label mt-6 flex items-center gap-1.5">
          <MapPin size={14} strokeWidth={2} />
          {profile.location}
        </p>

        {/* No side margins on small screens, so the sprites line up here instead. */}
        <div className="mt-14 mb-3 flex items-end gap-5 lg:hidden">
          {PHONE_SPRITES.map((name, i) => (
            <Burst key={name} index={i} style={{ animationDelay: `${i * -0.6}s` }} className="float">
              {name === 'terminal' ? (
                <StackButton size="h-8" onClick={openStack} />
              ) : (
                <PixelSprite name={name} className="h-8 w-auto" />
              )}
            </Burst>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 flex justify-center">
        <a
          href="#projects"
          {...rise('0.5s')}
          className="rise label flex flex-col items-center gap-1 hover:underline"
        >
          Scroll
          <span className="float">
            <ArrowDown size={16} strokeWidth={2} />
          </span>
        </a>
      </div>
    </section>
  )
}
