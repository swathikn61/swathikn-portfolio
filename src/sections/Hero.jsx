import { useLayoutEffect, useRef } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, FileText, MapPin } from 'lucide-react'
import Button from '../components/Button'
import CutoutWord from '../components/CutoutWord'
import Sticker from '../components/Sticker'
import SocialLinks from '../components/SocialLinks'
import TechStack from '../components/TechStack'
import { profile } from '../data/content'

const rise = (delay) => ({ style: { animationDelay: delay } })

// Two mirrored zigzags of die-cut tech stickers. `inner` ones sit closer to the headline, so they
// wait for wider screens. `w` is the sticker width.
const STICKERS = [
  { shape: 'terminal', color: 'var(--color-forest)', accent: 'var(--color-marigold)', side: 'left', x: '4%', top: '13%', w: 'w-20' },
  { shape: 'braces', color: 'var(--color-wine)', side: 'left', x: '14%', top: '30%', w: 'w-12', inner: true },
  { shape: 'database', color: 'var(--color-sky)', accent: 'var(--color-forest)', side: 'left', x: '5%', top: '45%', w: 'w-16' },
  { shape: 'cursor', color: 'var(--color-pink)', side: 'left', x: '14%', top: '61%', w: 'w-12', inner: true },
  { shape: 'bug', color: 'var(--color-sage)', accent: 'var(--color-forest)', side: 'left', x: '5%', top: '75%', w: 'w-16' },
  { shape: 'code', color: 'var(--color-marigold)', accent: 'var(--color-forest)', side: 'right', x: '5%', top: '13%', w: 'w-20' },
  { shape: 'gear', color: 'var(--color-sage)', accent: 'var(--color-wine)', side: 'right', x: '14%', top: '30%', w: 'w-12', inner: true },
  { shape: 'branch', color: 'var(--color-pink)', accent: 'var(--color-forest)', side: 'right', x: '4%', top: '44%', w: 'w-16' },
  { shape: 'chip', color: 'var(--color-sky)', accent: 'var(--color-forest)', side: 'right', x: '15%', top: '60%', w: 'w-12', inner: true },
  { shape: 'tech', side: 'right', x: '5%', top: '75%' },
]

const PHONE_STICKERS = [
  { shape: 'tech' },
  { shape: 'terminal', color: 'var(--color-forest)', accent: 'var(--color-marigold)' },
  { shape: 'code', color: 'var(--color-marigold)', accent: 'var(--color-forest)' },
  { shape: 'database', color: 'var(--color-sky)', accent: 'var(--color-forest)' },
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

// The one sticker that does something: a mustard tag that opens the tech stack.
function StackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label="Open my tech stack"
      className="group relative block"
    >
      {/* Sits left of the tag on desktop, above it on phones where the left is screen edge. */}
      <span
        aria-hidden="true"
        className="text-pop font-hand absolute bottom-full left-1/2 mb-1 flex -translate-x-1/2 flex-col items-center text-2xl leading-none whitespace-nowrap lg:top-1/2 lg:right-full lg:bottom-auto lg:left-auto lg:mr-1 lg:mb-0 lg:translate-x-0 lg:-translate-y-1/2 lg:flex-row lg:gap-1"
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

      <span className="keep tone tone-marigold sticker relative block -rotate-6 rounded-md px-3.5 py-2 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105">
        <span className="tape -top-3 left-1/2 w-12 -translate-x-1/2 rotate-3 [--tape:var(--color-pink)]" />
        <span className="hand block text-xl leading-none whitespace-nowrap">my tech stack</span>
      </span>
    </button>
  )
}

function StickerOrButton({ item, onOpenStack, className = '' }) {
  return item.shape === 'tech' ? (
    <StackButton onClick={onOpenStack} />
  ) : (
    <Sticker shape={item.shape} color={item.color} accent={item.accent} className={className || item.w} />
  )
}

function FloatingSprites({ onOpenStack }) {
  return STICKERS.map((item, i) => (
    <Burst
      key={`${item.shape}-${item.side}-${item.top}`}
      index={i}
      style={{ [item.side]: item.x, top: item.top, animationDelay: `${i * -0.45}s` }}
      className={`float absolute hidden ${item.inner ? 'xl:block' : 'lg:block'}`}
    >
      <StickerOrButton item={item} onOpenStack={onOpenStack} />
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
          className="rise label keep tone tone-pink relative z-10 flex -rotate-2 items-center gap-2 rounded-sm px-4 py-2 text-[0.6875rem] whitespace-nowrap shadow-[2px_3px_0_rgba(60,40,20,0.15)] sm:text-xs"
        >
          <span aria-hidden="true" className="bg-pop h-2 w-2 rounded-full" />
          {profile.availability}
        </p>

        <h1 aria-label={`Hi, I'm ${profile.firstName}`} className="relative mt-6 grid place-items-center">
          {/* A mint starburst pinned behind the name, turning very slowly. */}
          <Sticker
            shape="burst"
            color="var(--color-sky)"
            className="spin-slow pointer-events-none absolute top-1/2 left-1/2 w-[min(80vw,30rem)] max-w-none -translate-x-1/2 -translate-y-[46%] opacity-90"
          />
          <span
            aria-hidden="true"
            {...rise('0.15s')}
            className="rise hand relative -mb-2 -rotate-3 text-[clamp(1.75rem,4vw,2.75rem)] leading-none"
          >
            Hi, I&rsquo;m
          </span>
          <CutoutWord
            text={profile.firstName.toUpperCase()}
            delay={0.25}
            className="relative text-[clamp(3.75rem,min(13vw,19svh),8.75rem)]"
          />
        </h1>

        <p
          {...rise('0.22s')}
          className="rise display relative mt-10 max-w-3xl text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.45] font-normal text-balance"
        >
          {profile.heroLine.map((part, i) =>
            typeof part === 'string' ? (
              part
            ) : (
              <span key={i} className="whitespace-nowrap">
                <mark
                  className={`keep tone tone-${part.tone} relative mr-0.5 ml-1 inline-block px-3 pb-0.5 shadow-[2px_3px_0_rgba(60,40,20,0.15)] ${
                    i % 2 ? 'rotate-1' : '-rotate-1'
                  }`}
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
        <div className="mt-16 mb-3 flex items-end gap-5 lg:hidden">
          {PHONE_STICKERS.map((item, i) => (
            <Burst key={item.shape} index={i} style={{ animationDelay: `${i * -0.6}s` }} className="float">
              <StickerOrButton item={item} onOpenStack={openStack} className="w-10" />
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
