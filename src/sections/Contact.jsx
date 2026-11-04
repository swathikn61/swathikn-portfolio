import { ArrowUpRight, Download, ExternalLink, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import Button from '../components/Button'
import PixelSprite from '../components/PixelSprite'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { contact, profile } from '../data/content'

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail, location: MapPin }

function Channel({ channel }) {
  const Icon = ICONS[channel.icon]
  const external = channel.href?.startsWith('http')
  const body = (
    <>
      <span className="flex items-center justify-between">
        <Icon size={20} strokeWidth={1.75} />
        {channel.href && <ArrowUpRight size={17} strokeWidth={2} />}
      </span>
      <span className="label mt-4 block">{channel.label}</span>
      <span className="mt-1 block text-[0.9375rem] font-medium break-words">{channel.value}</span>
    </>
  )
  const card = 'block h-full rounded-xl p-4'

  return (
    <li className="border-fg rounded-xl border">
      {channel.href ? (
        <a
          href={channel.href}
          className={`${card} hover:bg-fg hover:text-bg transition-colors`}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
          {body}
        </a>
      ) : (
        <div className={card}>{body}</div>
      )}
    </li>
  )
}

export default function Contact() {
  const words = contact.heading.split(' ')
  const accent = words.pop()

  return (
    <Section
      id="contact"
      tone="wine"
      compact
      // With the footer it exactly fills the screen below the navbar (4.125rem) and the
      // pixel edge (1rem), whether reached by scrolling or by the Contact link.
      className="flex min-h-[calc(100svh-11.25rem)] scroll-mt-[5.125rem]! flex-col justify-center overflow-x-clip"
    >
      <PixelSprite
        name="flower"
        className="absolute top-14 right-[6%] hidden h-14 w-14 rotate-12 sm:block"
      />

      <Reveal className="text-center">
        <h2 className="display text-[clamp(3rem,6vw,4.5rem)] uppercase">
          {words.join(' ')} <em>{accent}</em>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-pretty">{contact.description}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contact.channels.map((channel) => (
            <Channel key={channel.label} channel={channel} />
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15} className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href={profile.resumeUrl} download>
          <Download size={16} strokeWidth={2} />
          Download resume
        </Button>
        <Button href={profile.resumeUrl} variant="secondary" target="_blank" rel="noreferrer noopener">
          <ExternalLink size={16} strokeWidth={2} />
          Open PDF
        </Button>
      </Reveal>
    </Section>
  )
}
