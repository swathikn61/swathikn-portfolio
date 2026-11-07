import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/content'
import useActiveSection from '../hooks/useActiveSection'
import ThemeToggle from './ThemeToggle'

const SECTION_IDS = ['home', ...navLinks.map((l) => l.id)]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS, 100)

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
        className="focus:bg-wine sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`tone tone-butter fixed inset-x-0 top-0 z-50 border-b-2 transition-colors duration-300 ${
          scrolled ? 'border-fg' : 'border-transparent'
        }`}
      >
        <nav className="wrap flex h-16 items-center">
          {/* No logo: the hero spells the name. This spacer keeps the links centred. */}
          <span aria-hidden="true" className="flex-1" />

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="relative py-1.5 text-[0.9375rem] font-medium">
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-mark"
                    className="bg-pop absolute inset-x-0 -bottom-0.5 h-1"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-end gap-1">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="label bg-fg text-bg mr-1 hidden rounded-full px-4 py-2 sm:block"
            >
              Resume
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="hover:bg-fg hover:text-bg grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden"
            >
              {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
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
            className="tone tone-pink fixed inset-0 z-40 lg:hidden"
          >
            <nav className="flex h-full flex-col justify-center px-6">
              {[...navLinks, { id: 'resume', label: 'Resume', href: profile.resumeUrl }].map(
                (link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href ?? `#${link.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                    className={`display border-line border-b py-3 text-5xl uppercase ${
                      active === link.id ? 'text-pop' : ''
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
