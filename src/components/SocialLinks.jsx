import { Github, Linkedin, Mail } from 'lucide-react'
import { socials } from '../data/content'

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail }

export default function SocialLinks({ size = 18, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {socials.map((social) => {
        const Icon = ICONS[social.icon]
        const external = social.href.startsWith('http')
        return (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            title={social.label}
            {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            className="text-ink-500 hover:text-accent-800 hover:bg-ink-100 dark:hover:text-accent-400 dark:hover:bg-ink-800 grid h-10 w-10 place-items-center rounded-full transition-colors"
          >
            <Icon size={size} strokeWidth={1.75} />
          </a>
        )
      })}
    </div>
  )
}
