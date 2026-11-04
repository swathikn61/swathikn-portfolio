import { useLayoutEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import StackList from '../components/StackList'
import { about, activities, certifications, education, experience } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.22, 1, 0.36, 1]
const [job] = experience
const [school] = education

const HOVER = {
  pink: 'hover:bg-pink/60',
  sage: 'hover:bg-sage/50',
  marigold: 'hover:bg-marigold/35',
  sky: 'hover:bg-sky/50',
}

/** One editorial row: a rule draws in, the title sits left, the content right; hover tints it. */
function Row({ n, tone, title, children }) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-80px' }}
      className={`group relative -mx-4 px-4 transition-colors duration-500 sm:-mx-6 sm:px-6 ${HOVER[tone]}`}
    >
      <motion.span
        aria-hidden="true"
        variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
        transition={{ duration: 1.1, ease: EASE }}
        className="bg-fg absolute inset-x-0 top-0 h-0.5 origin-left"
      />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: reduce ? 0 : 28 },
          shown: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="grid gap-5 py-9 sm:py-12 lg:grid-cols-12 lg:gap-10"
      >
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <p
            aria-hidden="true"
            className="display text-pop text-[clamp(3.5rem,7vw,6rem)] leading-none italic transition-transform duration-500 group-hover:-translate-y-1"
          >
            {String(n).padStart(2, '0')}
          </p>
          <h3 className="display mt-2 text-[clamp(2rem,3.6vw,3rem)] text-balance transition-transform duration-500 group-hover:translate-x-2">
            {title}
          </h3>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </motion.div>
    </motion.article>
  )
}

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5 leading-relaxed text-pretty">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/** Big editorial statement whose words light up as you scroll through it. */
function Statement({ text }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    if (reduce) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-w]',
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 55%', scrub: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [reduce])

  return (
    <p
      ref={ref}
      aria-label={text}
      className="display mb-12 max-w-5xl text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.12] normal-case text-pretty sm:mb-16"
    >
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden="true" data-w>
          {word}{' '}
        </span>
      ))}
    </p>
  )
}

export default function About() {
  const [intro, tools, , looking] = about.paragraphs

  return (
    <Section id="about" tone="plain" compact className="before:hidden">
      <SectionHeading lead="A bit more" accent="about me" compact />
      <Statement text={intro} />

      <div className="border-fg border-b-2">
        <Row n={1} tone="pink" title="Me">
          <p className="max-w-2xl leading-relaxed text-pretty">{tools}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-pretty">{looking}</p>
        </Row>

        <Row n={2} tone="marigold" title="Work experience">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="text-xl font-semibold">
              {job.role} · {job.company}
            </p>
            <p className="label">{job.period}</p>
          </div>
          <p className="text-sm">{job.location}</p>
          <div className="mt-4">
            <BulletList items={job.points} />
          </div>
          <div className="mt-5">
            <StackList items={job.stack} />
          </div>
        </Row>

        <Row n={3} tone="sage" title="Education">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p className="text-xl font-semibold">{school.institution}</p>
            <p className="label">{school.period}</p>
          </div>
          <p className="mt-1">{school.credential}</p>
          <p>{school.location}</p>
          <p className="display mt-4 text-5xl">
            {school.score.replace('CGPA ', '').split(' ')[0]}
            <span className="label ml-2 align-middle">CGPA / 10</span>
          </p>
        </Row>

        <Row n={4} tone="sky" title="Certificates">
          <ul>
            {certifications.map((cert) => (
              <li key={cert.name} className="border-fg/25 border-b py-3 first:pt-0 last:border-b-0 last:pb-0">
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/link flex items-start justify-between gap-3"
                >
                  <span>
                    <span className="block leading-snug font-semibold group-hover/link:underline">
                      {cert.name}
                    </span>
                    <span className="block text-sm">{cert.issuer}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Row>

        <Row n={5} tone="sage" title="Leadership & activities">
          <BulletList items={activities} />
        </Row>
      </div>
    </Section>
  )
}
