import { useLayoutEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { projects, projectsIntro } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.22, 1, 0.36, 1]
const pad = (n) => String(n).padStart(2, '0')

/** Title words rise out of a mask as the card scrolls into view. */
function SplitWords({ text }) {
  return (
    <span aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.06 }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: EASE, delay },
})

/** Screenshot in a retro window: tilts toward the cursor in 3D, zooms slowly on hover. */
function Screenshot({ project }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 150, damping: 18, mass: 0.6 }
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), spring)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring)

  const onMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - box.left) / box.width - 0.5)
    py.set((event.clientY - box.top) / box.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      className="group w-full"
      style={{ perspective: 1100 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: reduce ? 0 : 1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY }}
      >
        <figure className="border-forest overflow-hidden rounded-xl border-[3px] shadow-[10px_10px_0_var(--color-forest),0_30px_60px_-20px_rgba(0,0,0,0.45)] transition-shadow duration-300 group-hover:shadow-[16px_16px_0_var(--color-forest),0_40px_70px_-20px_rgba(0,0,0,0.5)]">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              draggable="false"
              className="h-full w-full object-cover object-top transition-[scale] duration-[900ms] ease-out group-hover:scale-[1.07]"
            />
          </div>
        </figure>
      </motion.div>
    </div>
  )
}

function Link({ href, label, title, filled }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${title}: ${label}`}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`border-fg inline-flex items-center gap-1.5 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
        filled ? 'bg-fg text-bg hover:bg-transparent hover:text-fg' : 'hover:bg-fg hover:text-bg'
      }`}
    >
      {label}
      <ArrowUpRight size={16} strokeWidth={2.25} />
    </motion.a>
  )
}

function ProjectCard({ project, index }) {
  return (
    <div data-card className="lg:sticky" style={{ top: `calc(5.5rem + ${index * 0.9}rem)` }}>
      <article
        data-inner
        className={`keep tone tone-${project.tone} pixel-corners relative origin-top overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:min-h-[28rem]`}
      >
        <span
          aria-hidden="true"
          data-numeral
          className="display pointer-events-none absolute -right-2 -bottom-10 text-[clamp(9rem,22vw,18rem)] leading-none opacity-[0.12] select-none"
        >
          {pad(index + 1)}
        </span>

        <div className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <motion.p {...fadeUp()} className="label flex items-center gap-3">
              <span>{pad(index + 1)}</span>
              <span className="bg-fg/50 h-px w-8" />
              <span>{project.tag}</span>
            </motion.p>

            <h3 className="display mt-3 text-[clamp(2.25rem,4vw,3.25rem)] text-balance">
              <SplitWords text={project.title} />
            </h3>

            <motion.p {...fadeUp(0.2)} className="mt-4 leading-relaxed text-pretty">
              {project.description}
            </motion.p>

            <motion.ul {...fadeUp(0.3)} className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item} className="border-fg rounded-full border px-3 py-0.5 text-sm">
                  {item}
                </li>
              ))}
            </motion.ul>

            {(project.repo || project.demo) && (
              <motion.div {...fadeUp(0.4)} className="mt-6 flex flex-wrap gap-3">
                {project.demo && <Link href={project.demo} label="Live Demo" title={project.title} filled />}
                {project.repo && (
                  <Link href={project.repo} label="GitHub" title={project.title} filled={!project.demo} />
                )}
              </motion.div>
            )}
            {project.note && (
              <motion.p {...fadeUp(0.45)} className="mt-3 text-sm opacity-80">
                {project.note}
              </motion.p>
            )}
          </div>

          <div className="lg:col-span-8 lg:-mr-4 xl:-mr-8">
            <Screenshot project={project} />
          </div>
        </div>
      </article>
    </div>
  )
}

export default function Projects() {
  const root = useRef(null)
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    if (reduce) return undefined

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const cards = gsap.utils.toArray('[data-card]', root.current)

      cards.forEach((card, i) => {
        const inner = card.querySelector('[data-inner]')
        const numeral = card.querySelector('[data-numeral]')

        // As the next card slides over this one, it recedes: smaller and a touch dimmer.
        const next = cards[i + 1]
        if (next) {
          gsap.to(inner, {
            scale: 0.94,
            filter: 'brightness(0.88)',
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top 80%', end: 'top 20%', scrub: true },
          })
        }

        // The big numeral drifts slower than the card for depth.
        gsap.fromTo(
          numeral,
          { yPercent: -18 },
          {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    })

    return () => mm.revert()
  }, [reduce])

  return (
    <Section id="projects" tone="plain" compact>
      <SectionHeading lead="Things I've" accent="built" description={projectsIntro} compact />
      <div ref={root} className="flex flex-col gap-8 lg:gap-[18vh]">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
