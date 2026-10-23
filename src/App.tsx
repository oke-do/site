import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import ScrollyHero from './components/ScrollyHero'
import StaticHero from './components/StaticHero'
import Compare from './components/Compare'
import Law from './components/Law'
import World from './components/World'
import Problems from './components/Problems'
import Picker from './components/Picker'
import Footer from './components/Footer'

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis()
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // smooth-scroll to #id links (nav, buttons) through Lenis
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: id === 'models' ? 0 : -64 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reducedMotion])

  return (
    <div className="bg-black">
      <Nav />
      {reducedMotion ? <StaticHero /> : <ScrollyHero />}
      <Compare />
      <Law />
      <World />
      <Problems />
      <Picker />
      <Footer />
    </div>
  )
}
