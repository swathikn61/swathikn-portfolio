import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the navbar can highlight it.
 * Picks the section whose top is closest to (just above) the navbar line.
 */
export default function useActiveSection(ids, offset = 96) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      // Bottom of the page always resolves to the last section, otherwise
      // short trailing sections can never become active.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setActive(ids[ids.length - 1])
        return
      }

      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return active
}
