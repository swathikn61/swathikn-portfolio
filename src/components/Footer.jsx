import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content'

/**
 * A slim sign-off strip on the same raspberry as the Contact section, so the two read as one
 * closing page. The ways to reach out live in Contact; this only adds the credit line and a
 * back-to-top tab.
 */
export default function Footer() {
  return (
    <footer className="tone tone-wine">
      <div className="wrap flex flex-col items-center gap-4 border-t-2 border-dashed border-current/25 py-7 sm:flex-row sm:justify-between">
        <p className="label opacity-80">
          © {new Date().getFullYear()} {profile.name} · thanks for stopping by
        </p>
        <a
          href="#home"
          className="hand keep tone tone-marigold sticker inline-flex -rotate-3 items-center gap-1.5 rounded-md px-3.5 py-1.5 text-lg transition-transform hover:rotate-0"
        >
          <ArrowUp size={16} strokeWidth={2.25} />
          back to the first page
        </a>
      </div>
    </footer>
  )
}
