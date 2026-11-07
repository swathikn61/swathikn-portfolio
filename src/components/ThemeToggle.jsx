import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

/**
 * Light/dark switch. The initial class is set by the inline script in index.html
 * so there is no flash — this component only reads and updates it.
 */
export default function ThemeToggle({ className = '' }) {
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false,
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* storage unavailable (private mode) — theme just won't persist */
    }
  }, [dark])

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`hover:bg-fg hover:text-bg grid h-10 w-10 place-items-center rounded-full transition-colors ${className}`}
    >
      {dark ? <Sun size={17} strokeWidth={1.75} /> : <Moon size={17} strokeWidth={1.75} />}
    </button>
  )
}
