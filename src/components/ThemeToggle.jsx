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
      className={`text-ink-500 hover:text-ink-900 hover:bg-ink-100 dark:text-ink-400 dark:hover:text-ink-50 dark:hover:bg-ink-800 grid h-9 w-9 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 ${className}`}
    >
      {dark ? <Sun size={17} strokeWidth={1.75} /> : <Moon size={17} strokeWidth={1.75} />}
    </button>
  )
}
