import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { contact } from '../data/content'

const ICONS = { mail: Mail, linkedin: Linkedin, github: Github, location: MapPin }

function ChannelCard({ channel }) {
  const Icon = ICONS[channel.icon]
  const isLink = Boolean(channel.href)
  const Tag = isLink ? 'a' : 'div'
  const external = isLink && channel.href.startsWith('http')

  return (
    <Tag
      {...(isLink ? { href: channel.href } : {})}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={`group border-ink-200 dark:border-ink-800 dark:bg-ink-900/40 flex items-center gap-4 rounded-xl border bg-cream px-4 py-3.5 transition-all duration-200 ${
        isLink
          ? 'hover:border-accent-300 dark:hover:border-accent-500/40 hover:shadow-[0_2px_20px_-8px_rgb(0_0_0/0.15)] dark:hover:shadow-none'
          : ''
      }`}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-100 dark:bg-accent-500/10 dark:text-accent-400 dark:group-hover:bg-accent-500/20">
        <Icon size={17} strokeWidth={1.75} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="text-ink-400 dark:text-ink-500 block font-mono text-[0.625rem] tracking-widest uppercase">
          {channel.label}
        </span>
        <span className="text-ink-800 dark:text-ink-200 block truncate text-sm font-medium">
          {channel.value}
        </span>
      </span>

      {isLink && (
        <ArrowUpRight
          size={15}
          strokeWidth={1.75}
          aria-hidden="true"
          className="text-ink-300 dark:text-ink-600 shrink-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-500 dark:group-hover:text-accent-400"
        />
      )}
    </Tag>
  )
}

export default function Contact() {
  return (
    <Section id="contact">
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <SectionHeading
          eyebrow="Contact"
          title={contact.heading}
          description={contact.description}
          align="center"
        />

        <div className="w-full space-y-3">
          {contact.channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 0.06}>
              <ChannelCard channel={channel} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
