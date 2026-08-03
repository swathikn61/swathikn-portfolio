import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { about } from '../data/content'

export default function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="A little more about me" />

      <div className="max-w-3xl space-y-5">
        {about.paragraphs.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.08} as="p">
            <span className="text-ink-600 dark:text-ink-400 block text-base leading-[1.75] text-pretty">
              {paragraph}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
