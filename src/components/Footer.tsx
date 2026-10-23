const SOURCES = [
  'Трудовой кодекс РФ: ст. 19.1, ст. 56.1, глава 53.1',
  'Закон РФ «О занятости населения в Российской Федерации»: ст. 18.1',
  'Федеральный закон от 05.05.2014 № 116-ФЗ',
  'Налоговый кодекс РФ: ст. 54.1',
  'Кодекс РФ об административных правонарушениях: ст. 5.27',
  'Directive 2008/104/EC on temporary agency work',
  'ILO Convention No. 181 on Private Employment Agencies (1997)',
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.2fr_1fr] md:px-10">
        <div>
          <p className="font-display text-3xl italic text-white">
            Кадры <span className="text-[#e8a04a]">·</span> модели
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50">
            Материал носит справочный характер и не является юридической консультацией. Нормы меняются, а
            споры о квалификации решаются по обстоятельствам конкретного дела — перед заключением договора
            сверьтесь с актуальной редакцией законов и проконсультируйтесь с юристом.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Нормативная база</p>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            {SOURCES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
