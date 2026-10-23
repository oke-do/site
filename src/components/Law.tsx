import { Reveal, Section, SectionHead } from './ui'

const TIMELINE: { when: string; title: string; text: string }[] = [
  {
    when: 'До 2016',
    title: 'Эпоха «серых» схем',
    text: 'Вывод персонала за штат и лизинг людей применялись массово при почти полном отсутствии специального регулирования. Многие компании строили на этом кадровую политику.',
  },
  {
    when: '1 января 2016',
    title: 'Запрет заёмного труда',
    text: 'По Федеральному закону от 05.05.2014 № 116-ФЗ в Трудовой кодекс вводится ст. 56.1: запрещён труд лиц, направляемых работодателем выполнять работу по распоряжению и под контролем другого лица, не являющегося работодателем.',
  },
  {
    when: 'Исключение',
    title: 'Аккредитованные агентства',
    text: 'Предоставлять работников можно только через частные агентства занятости, получившие аккредитацию (ст. 18.1 Закона о занятости населения; гл. 53.1 ТК РФ), и лишь в строго ограниченных случаях — например, для временного замещения или временного расширения производства или объёма услуг.',
  },
  {
    when: 'Последствия',
    title: 'Цена нарушения',
    text: 'Признание отношений трудовыми (ст. 19.1 ТК РФ), административные штрафы (ст. 5.27 КоАП РФ), доначисление налогов и взносов при необоснованной налоговой выгоде (ст. 54.1 НК РФ).',
  },
]

const SIGNS = [
  'Работники сидят в офисе заказчика и встроены в его структуру',
  'Задачи ставит и порядок работы определяет заказчик, а не подрядчик',
  'Заказчик оценивает не итог, а работу конкретных людей',
  'Требования в договоре предъявляются к отдельным работникам, а не к результату',
  'Услуга существует только на бумаге: нет отчётов, актов, реального объёма',
]

export default function Law() {
  return (
    <Section id="law">
      <SectionHead
        kicker="Правовая рамка · Россия"
        plain="Где проходит"
        accent="граница"
        lead="Аутсорсинг — обычная гражданско-правовая сделка. Аутстаффинг и лизинг затрагивают трудовое право, и именно здесь возникает большинство споров."
      />

      <div className="mt-16 grid gap-16 md:grid-cols-[1.2fr_1fr] md:gap-20">
        {/* timeline */}
        <ol className="relative space-y-10 border-l border-white/15 pl-8">
          {TIMELINE.map((t, i) => (
            <li key={t.when} className="relative">
              <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#e8a04a] shadow-[0_0_16px_rgba(232,160,74,0.7)]" />
              <Reveal delay={i * 60}>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#e8a04a]">{t.when}</p>
                <h3 className="mt-2 text-2xl font-light tracking-[-0.02em] text-white">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65 md:text-base">{t.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* signs */}
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:sticky md:top-28">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Красные флаги</p>
            <h3 className="mt-3 font-display text-2xl italic text-white">Когда аутсорсинг считают заёмным трудом</h3>
            <ul className="mt-6 space-y-4">
              {SIGNS.map((s) => (
                <li key={s} className="flex gap-3 text-sm leading-relaxed text-white/75">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e8a04a]" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/40">
              Чем больше признаков совпадает, тем выше риск переквалификации при проверке или в суде.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
