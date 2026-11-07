import { useCallback, useState } from 'react'
import useSmoothScroll from './hooks/useSmoothScroll'
import Footer from './components/Footer'
import Intro, { shouldSkipIntro } from './components/Intro'
import Navbar from './components/Navbar'
import About from './sections/About'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Projects from './sections/Projects'

export default function App() {
  useSmoothScroll()
  // Show the intro once per tab session. The page mounts as the intro's curtain lifts, so the
  // hero's entrance animations play as it is revealed.
  const [showIntro] = useState(() => !shouldSkipIntro())
  const [ready, setReady] = useState(!showIntro)
  const reveal = useCallback(() => setReady(true), [])

  return (
    <>
      {showIntro && <Intro onReveal={reveal} />}
      {ready && (
        <>
          <Navbar />
          <main id="main">
            <Hero />
            <Projects />
            <About />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
