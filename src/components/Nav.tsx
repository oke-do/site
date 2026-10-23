import { useEffect, useState } from 'react'

const LINKS: { label: string; href: string }[] = [
  { label: 'Модели', href: '#models' },
  { label: 'Сравнение', href: '#compare' },
  { label: 'Право', href: '#law' },
  { label: 'Проблемы', href: '#problems' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 flex items-center justify-between px-6 py-4 transition-colors duration-500 md:px-10 md:py-5 ${
        scrolled ? 'bg-black/60 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <a href="#models" className="font-display text-xl italic text-white md:text-2xl">
        Кадры <span className="text-[#e8a04a]">·</span> модели
      </a>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-white/20 bg-white/10 px-2 py-2 backdrop-blur-md md:flex">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#picker"
        className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900 transition-colors hover:bg-gray-100 md:px-6 md:py-2.5 md:text-sm"
      >
        Подобрать модель
      </a>
    </header>
  )
}
