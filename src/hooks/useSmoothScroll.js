import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Slower, eased page scrolling. Each wheel tick travels less far and glides to a stop.
 * Skipped for reduced-motion users. Kept in step with GSAP ScrollTrigger.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = new Lenis({
      lerp: 0.06, // lower = longer glide
      wheelMultiplier: 0.6, // lower = slower wheel
      touchMultiplier: 1,
      anchors: { offset: -80 }, // nav links stop below the fixed navbar
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
