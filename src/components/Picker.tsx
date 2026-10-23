import { useState } from 'react'
import type { Status } from '../data'
import { Reveal, Section, SectionHead, StatusChip } from './ui'

type Need = 'result' | 'people'
type Term = 'temp' | 'perm'
type Existing = 'yes' | 'no'

interface Outcome {
  title: string
  status: Status
  statusLabel: string
  text: string
  tips: string[]
}

const OUTCOMES: Record<'outsourcing' | 'leasing' | 'outstaffing' | 'direct', Outcome> = {
  outsourcing: {
    title: 'Аутсорсинг',
    status: 'ok',
    statusLabel: 'Допустим',
    text: 'Вам нужна функция или результат — это ровно то, для чего аутсорсинг и существует.',
    tips: [
      'Договор — на результат или услугу с измеримыми показателями (SLA), а не на «предоставление людей».',
      'Задачи работникам ставит и качество контролирует подрядчик, а не вы.',
      'Проверьте контрагента: штат, опыт, уплату налогов и взносов.',
    ],
  },
  leasing: {
    title: 'Лизинг персонала',
    status: 'limited',
    statusLabel: 'Только с аккредитацией',
    text: 'Временная потребность в людях под вашим руководством — единственный случай, когда предоставление работников допускается законом, и то с условиями.',
    tips: [
      'Работайте только с частным агентством занятости, аккредитованным в установленном порядке, и проверьте это до подписания.',
      'Убедитесь, что ваша ситуация входит в перечень разрешённых случаев (например, замещение или временное расширение объёма работ).',
      'Зафиксируйте срок и распределение ответственности, в том числе за охрану труда.',
    ],
  },
  direct: {
    title: 'Прямой найм',
    status: 'ok',
    statusLabel: 'Самый прозрачный путь',
    text: 'Если люди нужны постоянно и под вашим руководством, обходные схемы почти всегда дороже, чем штатный сотрудник.',
    tips: [
      'Принять в штат — никаких рисков переквалификации и споров о подчинении.',
      'Нужна помощь в поиске? Договор на подбор персонала (рекрутинг) законен: агентство находит, нанимаете вы.',
      'Для разовых задач возможны ГПХ или самозанятые, но без признаков трудовых отношений (ст. 19.1 ТК РФ).',
    ],
  },
  outstaffing: {
    title: 'Вывод за штат (аутстаффинг)',
    status: 'banned',
    statusLabel: 'Как правило запрещён',
    text: 'Перевод действующих сотрудников на баланс провайдера при сохранении вашего руководства — классическая схема заёмного труда.',
    tips: [
      'Риски: признание отношений трудовыми, штрафы по ст. 5.27 КоАП РФ, налоговые доначисления.',
      'Законные альтернативы: оставить людей в штате или передать провайдеру функцию целиком (настоящий аутсорсинг).',
      'Если потребность временная — рассмотрите лизинг через аккредитованное агентство.',
    ],
  },
}

function Choice({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 text-left text-sm leading-snug text-white/85 transition-all duration-300 hover:border-[#e8a04a]/60 hover:bg-[#e8a04a]/10 hover:text-white"
    >
      {children}
    </button>
  )
}

export default function Picker() {
  const [need, setNeed] = useState<Need | null>(null)
  const [term, setTerm] = useState<Term | null>(null)
  const [existing, setExisting] = useState<Existing | null>(null)

  const reset = () => {
    setNeed(null)
    setTerm(null)
    setExisting(null)
  }

  let outcome: Outcome | null = null
  if (need === 'result') outcome = OUTCOMES.outsourcing
  else if (need === 'people' && term === 'temp') outcome = OUTCOMES.leasing
  else if (need === 'people' && term === 'perm' && existing === 'yes') outcome = OUTCOMES.outstaffing
  else if (need === 'people' && term === 'perm' && existing === 'no') outcome = OUTCOMES.direct

  const step = outcome ? 4 : !need ? 1 : !term ? 2 : 3

  return (
    <Section id="picker">
      <SectionHead
        kicker="Подбор модели"
        plain="Что подходит"
        accent="вашему случаю"
        lead="Три вопроса — и ориентир, в какую сторону смотреть. Это не юридическая консультация, а способ быстро сузить выбор."
      />

      <Reveal className="mt-12 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
        {!outcome ? (
          <>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Вопрос {step} из 3</p>

            {step === 1 && (
              <>
                <h3 className="mt-4 text-2xl font-light tracking-[-0.02em] text-white md:text-3xl">
                  Что вам нужно получить?
                </h3>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <Choice onClick={() => setNeed('result')}>Результат или функцию целиком: бухгалтерию, охрану, клининг</Choice>
                  <Choice onClick={() => setNeed('people')}>Людей в свою команду, которыми я буду руководить</Choice>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="mt-4 text-2xl font-light tracking-[-0.02em] text-white md:text-3xl">На какой срок нужны люди?</h3>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <Choice onClick={() => setTerm('temp')}>Временно: заменить отсутствующего или закрыть пик нагрузки</Choice>
                  <Choice onClick={() => setTerm('perm')}>Постоянно, на неопределённый срок</Choice>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="mt-4 text-2xl font-light tracking-[-0.02em] text-white md:text-3xl">
                  Это ваши действующие сотрудники?
                </h3>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <Choice onClick={() => setExisting('yes')}>Да, хочу «вывести» их за штат к провайдеру</Choice>
                  <Choice onClick={() => setExisting('no')}>Нет, ищу новых людей</Choice>
                </div>
              </>
            )}

            {step > 1 && (
              <button onClick={reset} className="mt-6 text-xs text-white/40 transition-colors hover:text-white">
                ← Начать заново
              </button>
            )}
          </>
        ) : (
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Ориентир</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <h3 className="font-display text-4xl italic text-[#e8a04a] md:text-5xl">{outcome.title}</h3>
              <StatusChip status={outcome.status} label={outcome.statusLabel} />
            </div>
            <p className="mt-5 text-base leading-relaxed text-white/80">{outcome.text}</p>
            <ul className="mt-6 space-y-3">
              {outcome.tips.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-white/70">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e8a04a]" />
                  {t}
                </li>
              ))}
            </ul>
            <button
              onClick={reset}
              className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              Пройти заново
            </button>
          </div>
        )}
      </Reveal>
    </Section>
  )
}
