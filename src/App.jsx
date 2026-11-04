import useSmoothScroll from './hooks/useSmoothScroll'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './sections/About'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Projects from './sections/Projects'

export default function App() {
  useSmoothScroll()

  return (
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
  )
}
