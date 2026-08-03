import { Download, ExternalLink } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/content'

export default function Resume() {
  return (
    <Section id="resume" className="bg-cream dark:bg-ink-950">
      <SectionHeading
        eyebrow="Resume"
        title="Download my resume"
        description="Open the PDF in a new tab or save a copy."
      />

      <Reveal>
        <div className="border-ink-200 dark:border-ink-800 flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-6 py-5 sm:px-8">
          <div>
            <p className="text-ink-900 dark:text-ink-50 text-sm font-semibold">
              {profile.resumeFileName}
            </p>
            <p className="text-ink-500 mt-0.5 text-xs">PDF · Updated {new Date().getFullYear()}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button href={profile.resumeUrl} size="sm" download>
              <Download size={15} strokeWidth={1.75} />
              Download
            </Button>
            <Button href={profile.resumeUrl} variant="secondary" size="sm" target="_blank">
              <ExternalLink size={15} strokeWidth={1.75} />
              Open
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
