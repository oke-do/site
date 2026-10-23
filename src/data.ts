export type ModelId = 'outsourcing' | 'outstaffing' | 'leasing'
export type Status = 'ok' | 'limited' | 'banned'

export interface Stat {
  value: string
  label: string
}

export interface Model {
  id: ModelId
  num: string
  name: string
  /** Heading split: plain part + italic accent */
  headline: [string, string]
  body: string
  note: string
  stats: Stat[]
  /** Label on the line between customer and provider */
  contract: string
  /** Who gives day-to-day orders to the worker */
  director: 'provider' | 'customer'
  workplace: string
  status: Status
  statusLabel: string
}

export const MODELS: Record<ModelId, Model> = {
  outsourcing: {
    id: 'outsourcing',
    num: '01',
    name: 'Аутсорсинг',
    headline: ['Вы покупаете', 'результат'],
    body: 'Заказчик передаёт подрядчику целую функцию: бухгалтерию, охрану, клининг, колл-центр. Подрядчик сам нанимает людей, ставит им задачи и отвечает за итог.',
    note: 'Заказчику важен результат по договору услуг или подряда — а не то, кто и как его выполняет.',
    stats: [
      { value: 'провайдер', label: 'работодатель' },
      { value: 'провайдер', label: 'руководит' },
      { value: 'допустим', label: 'статус в РФ' },
    ],
    contract: 'услуги / подряд',
    director: 'provider',
    workplace: 'рабочее место — как правило у провайдера',
    status: 'ok',
    statusLabel: 'Допустим',
  },
  outstaffing: {
    id: 'outstaffing',
    num: '02',
    name: 'Аутстаффинг',
    headline: ['Те же люди,', 'другой работодатель'],
    body: 'Действующих сотрудников оформляют в штат компании-провайдера, но работают они там же и под тем же руководителем. Провайдер ведёт кадры и платит зарплату, заказчик по-прежнему даёт задания.',
    note: 'Именно такая схема, как правило, подпадает под запрет заёмного труда (ст. 56.1 ТК РФ): меняется оформление, а не суть.',
    stats: [
      { value: 'провайдер', label: 'работодатель' },
      { value: 'заказчик', label: 'руководит' },
      { value: 'запрещён', label: 'как правило' },
    ],
    contract: 'аутстаффинг',
    director: 'customer',
    workplace: 'рабочее место — у заказчика',
    status: 'banned',
    statusLabel: 'Как правило запрещён',
  },
  leasing: {
    id: 'leasing',
    num: '03',
    name: 'Лизинг персонала',
    headline: ['Люди', 'на время'],
    body: 'Агентство предоставляет заказчику своих работников на определённый срок: заменить отсутствующего, закрыть пик нагрузки. Работники остаются сотрудниками агентства, но выполняют задачи заказчика.',
    note: 'В России это возможно только через аккредитованное частное агентство занятости и в ограниченных законом случаях (гл. 53.1 ТК РФ).',
    stats: [
      { value: 'агентство', label: 'работодатель' },
      { value: 'заказчик', label: 'руководит' },
      { value: 'с аккредитацией', label: 'статус в РФ' },
    ],
    contract: 'предоставление труда',
    director: 'customer',
    workplace: 'рабочее место — у заказчика',
    status: 'limited',
    statusLabel: 'Только с аккредитацией',
  },
}

export const MODEL_ORDER: ModelId[] = ['outsourcing', 'outstaffing', 'leasing']

export const STATUS_STYLE: Record<Status, string> = {
  ok: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200',
  limited: 'border-[#e8a04a]/40 bg-[#e8a04a]/10 text-[#f0b46a]',
  banned: 'border-rose-300/30 bg-rose-300/10 text-rose-200',
}
