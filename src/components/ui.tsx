import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { STATUS_STYLE, type Status } from '../data'

/** One-shot "entered the viewport" flag. */
export function useInView<T extends HTMLElement>(threshold = 0.15): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen]
}

/** Fade-up-and-unblur on scroll into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal ${seen ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

export function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative border-t border-white/10 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">{children}</div>
    </section>
  )
}

export function SectionHead({
  kicker,
  plain,
  accent,
  lead,
}: {
  kicker: string
  plain: string
  accent: string
  lead?: string
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">{kicker}</p>
      <h2 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">
        {plain} <span className="font-display italic text-[#e8a04a]">{accent}</span>
      </h2>
      {lead ? <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">{lead}</p> : null}
    </Reveal>
  )
}

export function StatusChip({ status, label }: { status: Status; label: string }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLE[status]}`}>
      {label}
    </span>
  )
}
