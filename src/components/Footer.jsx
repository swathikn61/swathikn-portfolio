import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="tone tone-wine">
      <div className="wrap border-line flex flex-col items-center gap-2 border-t py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} {profile.name}. Thanks for stopping by.
        </p>

        <a href="#home" className="inline-flex items-center gap-1.5 text-sm hover:underline">
          Back to top
          <ArrowUp size={14} strokeWidth={2} />
        </a>
      </div>
    </footer>
  )
}
