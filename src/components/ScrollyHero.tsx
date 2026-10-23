import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { MODEL_ORDER, MODELS, type Model } from '../data'
import Diagram from './Diagram'
import { StatusChip } from './ui'

const clamp01 = (t: number) => Math.min(1, Math.max(0, t))

/** Pinned-section progress at which each next scene begins:
 *  intro → аутсорсинг → аутстаффинг → лизинг → итог */
const BOUNDS = [0.1, 0.37, 0.64, 0.9]
const SCENES = ['Введение', 'Аутсорсинг', 'Аутстаффинг', 'Лизинг', 'Итог']

/** One scene's text. All layers share one grid cell, so the tallest sets the height. */
function Layer({ on, children }: { on: boolean; children: ReactNode }) {
  const style: CSSProperties = {
    gridArea: '1 / 1',
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(18px)',
    filter: on ? 'blur(0)' : 'blur(8px)',
    visibility: on ? 'visible' : 'hidden',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s cubic-bezier(0.16,1,0.3,1), visibility 0s linear ${on ? '0s' : '0.7s'}`,
  }
  return (
    <div style={style} aria-hidden={!on} className="self-center">
      {children}
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-lg italic text-white md:text-xl">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wide text-white/40">{label}</div>
    </div>
  )
}

function ModelText({ m }: { m: Model }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          {m.num} — {m.name}
        </p>
        <StatusChip status={m.status} label={m.statusLabel} />
      </div>
      <h2 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">
        {m.headline[0]} <span className="font-display italic text-[#e8a04a]">{m.headline[1]}</span>
      </h2>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 md:text-base">{m.body}</p>
      <p className="mt-3 hidden max-w-md text-sm leading-relaxed text-white/50 md:block">{m.note}</p>
      <div className="mt-5 h-px w-12 bg-white/20" />
      <div className="mt-4 flex gap-6 md:gap-10">
        {m.stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </>
  )
}

export default function ScrollyHero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const wrapper = wrapperRef.current
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        const scrollable = rect.height - window.innerHeight
        const progress = clamp01(-rect.top / scrollable)
        // quantized so React only re-renders when progress visibly moves
        setP(Math.round(progress * 1000) / 1000)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const scene = BOUNDS.filter((b) => p >= b).length // 0..4
  const model = scene >= 1 && scene <= 3 ? MODEL_ORDER[scene - 1] : null
  const center = scene === 4 ? 'суть важнее названия' : undefined

  return (
    <div ref={wrapperRef} id="models" className="relative h-[560vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-black grain">
        {/* warm glow behind the diagram */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_74%_52%,rgba(232,160,74,0.10),transparent_70%)]" />
        {/* faint blueprint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 60% 50%, #000, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 60% 50%, #000, transparent)',
          }}
        />

        <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-rows-[36dvh_1fr] items-center gap-2 px-6 pb-20 pt-20 md:grid-cols-[1fr_1.05fr] md:grid-rows-1 md:gap-10 md:px-10 md:pb-24 md:pt-24">
          {/* diagram */}
          <div className="order-1 h-full min-h-0 md:order-2">
            <Diagram model={model} center={center} className="h-full w-full" />
          </div>

          {/* text layers */}
          <div className="order-2 grid md:order-1">
            <Layer on={scene === 0}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Опыт и проблемы использования</p>
              <h1 className="mt-4 text-[34px] font-light leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Лизинг, <span className="font-display italic text-[#e8a04a]">аутстаффинг</span> и аутсорсинг
                персонала
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                Три способа привлечь людей, которых нет в вашем штате. Выглядят похоже, но юридически и по
                последствиям — это разные вещи. Прокрутите, чтобы разобраться.
              </p>
            </Layer>

            {MODEL_ORDER.map((id, i) => (
              <Layer key={id} on={scene === i + 1}>
                <ModelText m={MODELS[id]} />
              </Layer>
            ))}

            <Layer on={scene === 4}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Главное</p>
              <h2 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">
                Важно не название, а <span className="font-display italic text-[#e8a04a]">кто руководит</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                Суды и инспекции смотрят на суть: кто ставит задачи, кто контролирует, где рабочее место. Договор
                с красивым названием этого не меняет.
              </p>
              <div className={`mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 ${scene === 4 ? 'pointer-events-auto' : ''}`}>
                <a
                  href="#compare"
                  className="group flex items-center gap-3 rounded-full bg-[#e8a04a] py-2 pl-7 pr-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-[#d68d35] hover:shadow-[0_10px_40px_-10px_rgba(232,160,74,0.5)]"
                >
                  К сравнению
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/85 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={16} className="text-[#e8a04a]" />
                  </span>
                </a>
                <a href="#law" className="text-xs text-white/50 transition-colors hover:text-white">
                  Что говорит закон →
                </a>
              </div>
            </Layer>
          </div>
        </div>

        {/* scene progress */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-3">
          <ChevronDown
            className={`h-5 w-5 animate-bounce-slow text-white/50 transition-opacity duration-700 ${scene === 0 ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="flex items-center gap-2 md:gap-3">
            {SCENES.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === scene ? 'w-8 bg-[#e8a04a]' : i < scene ? 'w-3 bg-white/50' : 'w-3 bg-white/20'
                  }`}
                />
                <span
                  className={`hidden text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 md:inline ${
                    i === scene ? 'text-white/80' : 'text-white/30'
                  }`}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
