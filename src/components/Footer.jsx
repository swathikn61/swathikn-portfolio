import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-ink-200 dark:border-ink-800 border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-6 py-8 text-center sm:px-8">
        <p className="text-ink-500 text-sm">
          © {new Date().getFullYear()} {profile.name}. Thanks for stopping by.
        </p>

        <a
          href="#home"
          className="text-ink-500 hover:text-accent-800 dark:hover:text-accent-400 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          Back to top
          <ArrowUp size={14} strokeWidth={1.75} />
        </a>
      </div>
    </footer>
  )
}
