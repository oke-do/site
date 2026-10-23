import { Reveal, Section, SectionHead } from './ui'

const CASES: { place: string; title: string; text: string }[] = [
  {
    place: 'Европейский союз',
    title: 'Равные условия',
    text: 'Директива 2008/104/EC о временной работе через агентства признаёт такую занятость легальной, но требует, чтобы агентские работники получали как минимум те же основные условия труда и оплаты, что и штатные сотрудники заказчика.',
  },
  {
    place: 'США',
    title: 'Рынок и доктрина совместного работодателя',
    text: 'Агентства временного персонала и PEO (professional employer organization) работают открыто: PEO берёт на себя кадры, зарплату, налоги и льготы. Но если заказчик фактически руководит работником, ответственность может быть разделена между ними.',
  },
  {
    place: 'Международная практика',
    title: 'Баланс гибкости и защиты',
    text: 'Конвенция МОТ № 181 (1997) о частных агентствах занятости признаёт их роль на рынке труда, но требует защищать права работников, которых они предоставляют.',
  },
]

export default function World() {
  return (
    <Section id="world">
      <SectionHead
        kicker="Опыт других стран"
        plain="Как это устроено"
        accent="в мире"
        lead="Там, где модель легализована, рынок не получил свободу без условий: везде действует принцип «равенство условий» и разделённая ответственность."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {CASES.map((c, i) => (
          <Reveal key={c.place} delay={i * 80} className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">{c.place}</p>
            <h3 className="mt-4 font-display text-2xl italic leading-snug text-white">{c.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/65">{c.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
