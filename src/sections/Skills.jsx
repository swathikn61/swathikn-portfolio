import { ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { certifications, skills } from '../data/content'
import { skillIcons } from '../data/skillIcons'

function SkillChip({ label }) {
  const entry = skillIcons[label]
  const Icon = entry?.Icon
  const brandColor = entry?.color

  return (
    <span className="border-ink-200 bg-cream hover:border-accent-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-accent-500/40 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors">
      {Icon && (
        <Icon
          size={14}
          style={brandColor ? { color: brandColor } : undefined}
          className={brandColor ? 'shrink-0' : 'text-accent-500 shrink-0'}
        />
      )}
      <span className="text-ink-700 dark:text-ink-200">{label}</span>
    </span>
  )
}

function SkillRow({ group, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="grid gap-2.5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
        <h3 className="text-ink-400 dark:text-ink-500 pt-1.5 font-mono text-[0.6875rem] tracking-widest uppercase">
          {group.category}
        </h3>
        <div className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <SkillChip key={item} label={item} />
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export default function Skills() {
  return (
    <Section id="skills" className="bg-cream dark:bg-ink-950">
      <SectionHeading
        eyebrow="Skills"
        title="Building With"
        description="Technologies I've used to design, build, and deploy real-world projects."
      />

      <div className="border-ink-200 divide-ink-100 dark:border-ink-800 dark:divide-ink-800/70 divide-y border-y">
        {skills.map((group, i) => (
          <SkillRow key={group.category} group={group} delay={i * 0.04} />
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8">
          <h3 className="text-ink-400 dark:text-ink-500 mb-3 font-mono text-[0.6875rem] tracking-widest uppercase">
            Certifications
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {certifications.map((cert) => {
              const content = (
                <>
                  <p className="text-ink-800 group-hover:text-accent-700 dark:text-ink-100 dark:group-hover:text-accent-400 text-sm font-medium transition-colors">
                    {cert.name}
                  </p>
                  <p className="text-ink-500 mt-0.5 text-xs">
                    {cert.issuer}
                    {cert.detail && ` · ${cert.detail}`}
                  </p>
                </>
              )

              if (cert.certificateUrl) {
                return (
                  <li key={cert.name}>
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="border-ink-200 hover:border-accent-300 dark:border-ink-800 dark:hover:border-accent-500/40 group flex items-start justify-between gap-3 rounded-xl border px-4 py-3.5 transition-colors"
                    >
                      <span>{content}</span>
                      <ExternalLink
                        size={15}
                        strokeWidth={1.75}
                        className="text-ink-300 group-hover:text-accent-600 dark:text-ink-600 dark:group-hover:text-accent-400 mt-0.5 shrink-0 transition-colors"
                      />
                    </a>
                  </li>
                )
              }

              return (
                <li
                  key={cert.name}
                  className="border-ink-200 dark:border-ink-800 rounded-xl border px-4 py-3.5"
                >
                  {content}
                </li>
              )
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
