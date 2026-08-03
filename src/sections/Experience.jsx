import Badge from '../components/Badge'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <Section id="experience" className="bg-cream dark:bg-ink-950">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />

      <div className="border-ink-200 dark:border-ink-800 relative border-l pl-8 sm:pl-10">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.08}>
            <article className="relative pb-4">
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className="dark:ring-ink-950 absolute top-1.5 -left-[2.3125rem] h-3 w-3 rounded-full bg-accent-500 ring-4 ring-cream sm:-left-[2.8125rem]"
              />

              <p className="text-ink-400 dark:text-ink-500 font-mono text-[0.6875rem] tracking-widest uppercase">
                {job.period}
              </p>

              <h3 className="text-accent-800 dark:text-accent-400 mt-2 text-xl font-semibold tracking-tight">
                {job.role}
              </h3>
              <p className="text-ink-600 dark:text-ink-400 mt-1 text-sm">
                <span className="text-accent-600 dark:text-accent-400">{job.company}</span>
                <span className="text-ink-400 dark:text-ink-600 mx-2">·</span>
                {job.location}
              </p>

              <ul className="mt-5 space-y-3">
                {job.points.map((point, j) => (
                  <li
                    key={j}
                    className="text-ink-600 dark:text-ink-400 flex gap-3 text-sm leading-relaxed"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500"
                      aria-hidden="true"
                    />
                    <span className="text-pretty">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <Badge key={tech} variant="ghost">
                    {tech}
                  </Badge>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

    </Section>
  )
}
