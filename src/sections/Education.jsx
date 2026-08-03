import { GraduationCap } from 'lucide-react'
import Card from '../components/Card'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { activities, education } from '../data/content'

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading eyebrow="Education" title="Academic background" />

      {/* Single entry reads better full-width than stranded in half a two-column grid. */}
      <div className={`grid gap-5 ${education.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {education.map((entry, i) => (
          <Reveal key={entry.institution} delay={i * 0.08}>
            <Card hover className="flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
                  <GraduationCap size={19} strokeWidth={1.75} />
                </span>
                <p className="text-ink-400 dark:text-ink-500 pt-1 font-mono text-[0.6875rem] tracking-widest uppercase">
                  {entry.period}
                </p>
              </div>

              <h3 className="text-accent-800 dark:text-accent-400 mt-5 text-base font-semibold tracking-tight">
                {entry.institution}
              </h3>
              <p className="text-ink-600 dark:text-ink-400 mt-1.5 text-sm text-pretty">
                {entry.credential}
              </p>
              <p className="text-ink-500 mt-1 text-sm">{entry.location}</p>

              {entry.score && (
                <p className="border-ink-100 dark:border-ink-800/70 mt-auto border-t pt-4 font-mono text-sm font-medium text-accent-600 dark:text-accent-400">
                  {entry.score}
                </p>
              )}
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="border-ink-200 dark:border-ink-800 mt-12 border-t pt-10">
          <h3 className="text-ink-400 dark:text-ink-500 mb-5 font-mono text-[0.6875rem] tracking-widest uppercase">
            Leadership & Activities
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {activities.map((activity, i) => (
              <li
                key={i}
                className="text-ink-600 dark:text-ink-400 flex gap-3 text-sm leading-relaxed"
              >
                <span
                  className="bg-ink-300 dark:bg-ink-700 mt-2 h-1 w-1 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <span className="text-pretty">{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
