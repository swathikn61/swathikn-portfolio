import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/content'
import useActiveSection from '../hooks/useActiveSection'
import ThemeToggle from './ThemeToggle'

const SECTION_IDS = navLinks.map((l) => l.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="focus:bg-accent-600 dark:focus:bg-accent-500 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-ink-200/70 dark:border-ink-800/70 dark:bg-ink-950/80 border-b bg-cream/80 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 sm:px-8">
          <a href="#home" aria-label={profile.name} className="font-mono text-sm tracking-tight">
            <span aria-hidden="true">
              <span className="text-ink-400 dark:text-ink-600">&lt;</span>
              <span className="text-accent-600 dark:text-accent-400 font-medium">
                {profile.firstName.toLowerCase()}
              </span>
              <span className="text-ink-400 dark:text-ink-600"> /&gt;</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === link.id
                    ? 'text-accent-800 dark:text-accent-400'
                    : 'text-ink-500 hover:text-accent-800 dark:text-ink-400 dark:hover:text-accent-400'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="bg-ink-100 dark:bg-ink-800/80 absolute inset-0 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800 grid h-9 w-9 place-items-center rounded-full transition-colors md:hidden"
            >
              {open ? <X size={19} strokeWidth={1.75} /> : <Menu size={19} strokeWidth={1.75} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="dark:bg-ink-950/95 fixed inset-0 z-40 bg-cream/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex h-full flex-col justify-center gap-1 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                  className={`border-ink-100 dark:border-ink-900 border-b py-4 text-2xl font-medium tracking-tight transition-colors ${
                    active === link.id
                      ? 'text-accent-600 dark:text-accent-400'
                      : 'text-ink-800 dark:text-ink-200'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
