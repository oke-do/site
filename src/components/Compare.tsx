import { MODEL_ORDER, MODELS } from '../data'
import { Reveal, Section, SectionHead, StatusChip } from './ui'

const ROWS: { label: string; cells: [string, string, string] }[] = [
  {
    label: 'Что получает заказчик',
    cells: ['Результат или услугу', 'Своих же сотрудников «на чужом балансе»', 'Работников на ограниченное время'],
  },
  { label: 'Кто работодатель', cells: ['Провайдер', 'Провайдер', 'Частное агентство занятости'] },
  { label: 'Кто руководит работником', cells: ['Провайдер', 'Заказчик', 'Заказчик'] },
  { label: 'Где работает человек', cells: ['Как правило у провайдера', 'У заказчика', 'У заказчика'] },
  {
    label: 'Договор между сторонами',
    cells: [
      'Оказание услуг или подряд (ГК РФ)',
      'Формально — услуги; по сути — предоставление людей',
      'Договор о предоставлении труда работников (персонала)',
    ],
  },
  {
    label: 'Главный риск',
    cells: [
      'Переквалификация в заёмный труд, если провайдер лишь номинальный',
      'Штрафы, признание отношений трудовыми, налоговые доначисления',
      'Выход за рамки разрешённых случаев и сроков',
    ],
  },
]

export default function Compare() {
  return (
    <Section id="compare">
      <SectionHead
        kicker="Сравнение"
        plain="Три модели —"
        accent="одна таблица"
        lead="Все три схемы вовлекают три стороны: заказчика, провайдера и работника. Отличаются они ответом на два вопроса — кто работодатель и кто руководит."
      />

      {/* desktop: table */}
      <Reveal className="mt-14 hidden md:block">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="w-[22%] px-6 py-5 text-[11px] font-normal uppercase tracking-[0.25em] text-white/40" />
                {MODEL_ORDER.map((id) => (
                  <th key={id} className="px-6 py-5 align-top">
                    <div className="font-display text-2xl font-normal italic text-white">{MODELS[id].name}</div>
                    <div className="mt-3">
                      <StatusChip status={MODELS[id].status} label={MODELS[id].statusLabel} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-white/5 last:border-0">
                  <th className="px-6 py-5 align-top text-[11px] font-normal uppercase tracking-[0.2em] text-white/40">
                    {row.label}
                  </th>
                  {row.cells.map((c, i) => (
                    <td key={i} className="px-6 py-5 align-top leading-relaxed text-white/80">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* mobile: one card per model */}
      <div className="mt-12 grid gap-5 md:hidden">
        {MODEL_ORDER.map((id, col) => (
          <Reveal key={id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="font-display text-2xl italic text-white">{MODELS[id].name}</div>
            <div className="mt-3">
              <StatusChip status={MODELS[id].status} label={MODELS[id].statusLabel} />
            </div>
            <dl className="mt-5 space-y-4">
              {ROWS.map((row) => (
                <div key={row.label}>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">{row.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-white/80">{row.cells[col]}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <p className="max-w-3xl text-sm leading-relaxed text-white/50">
          Терминология на практике плавает. «Лизинг персонала» — рыночное название, в Трудовом кодексе его нет:
          юридически это «предоставление труда работников (персонала)». «Аутстаффинг» тоже не термин закона —
          так называют вывод сотрудников за штат.
        </p>
      </Reveal>
    </Section>
  )
}
