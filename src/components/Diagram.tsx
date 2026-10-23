import { MODEL_ORDER, MODELS, type ModelId } from '../data'

const AMBER = '#e8a04a'
const LINE = 'rgba(255,255,255,0.28)'

interface Props {
  /** Which scheme to show; null = bare nodes with a caption in the middle. */
  model: ModelId | null
  /** Caption between the nodes when no model is selected. */
  center?: string
  className?: string
}

const fade = (on: boolean) => ({
  opacity: on ? 1 : 0,
  transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
})

/** Three-party scheme: Customer — Provider — Workers.
 *  Lines and tags appear per model, so scrolling "morphs" one scheme into another. */
export default function Diagram({ model, center = 'кто работодатель — и кто руководит?', className }: Props) {
  const director = model ? MODELS[model].director : null

  return (
    <svg
      viewBox="0 0 600 520"
      className={className}
      role="img"
      aria-label="Схема отношений заказчика, провайдера и работников"
    >
      <defs>
        <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={AMBER} />
        </marker>
      </defs>

      {/* ——— caption in the empty middle ——— */}
      <text
        x="300"
        y="262"
        textAnchor="middle"
        fill="rgba(255,255,255,0.55)"
        className="text-[27px] md:text-[22px]"
        fontStyle="italic"
        fontFamily='"Playfair Display", serif'
        style={fade(!model)}
      >
        {center}
      </text>

      {/* ——— contract line customer ↔ provider ——— */}
      <line x1="185" y1="132" x2="415" y2="132" stroke={LINE} strokeWidth="1.5" strokeDasharray="3 6" style={fade(!!model)} />
      {MODEL_ORDER.map((id) => (
        <text key={id} x="300" y="118" textAnchor="middle" fill="rgba(255,255,255,0.6)" className="text-[17px] md:text-[14px]" style={fade(model === id)}>
          {MODELS[id].contract}
        </text>
      ))}

      {/* ——— employment line provider → worker ——— */}
      <line x1="500" y1="164" x2="345" y2="380" stroke="#fff" strokeOpacity="0.75" strokeWidth="1.75" style={fade(!!model)} />
      <text x="440" y="282" fill="rgba(255,255,255,0.6)" className="text-[17px] md:text-[14px]" style={fade(!!model)}>
        трудовой договор
      </text>

      {/* ——— management arrow ——— */}
      {/* provider manages (outsourcing) */}
      <g style={fade(director === 'provider')}>
        <path d="M 455 164 Q 388 268 308 376" fill="none" stroke={AMBER} strokeWidth="2" className="flow" markerEnd="url(#arrow-amber)" />
        <text x="368" y="262" textAnchor="end" fill={AMBER} className="text-[17px] md:text-[14px]">
          указания и контроль
        </text>
      </g>
      {/* customer manages (outstaffing, leasing) */}
      <g style={fade(director === 'customer')}>
        <path d="M 135 164 L 262 376" fill="none" stroke={AMBER} strokeWidth="2" className="flow" markerEnd="url(#arrow-amber)" />
        <text x="172" y="262" textAnchor="end" fill={AMBER} className="text-[17px] md:text-[14px]">
          указания и контроль
        </text>
      </g>

      {/* ——— nodes ——— */}
      <Node x={35} y={100} label="Заказчик" hot={director === 'customer'} />
      <Node x={415} y={100} label="Провайдер" hot={director === 'provider'} />
      <Node x={225} y={380} label="Работники" />

      {/* ——— tags above nodes ——— */}
      <text x="110" y="88" textAnchor="middle" fill={AMBER} className="text-[13px] md:text-[10px]" letterSpacing="1.8" style={fade(director === 'customer')}>
        РУКОВОДИТ
      </text>
      <text x="490" y="88" textAnchor="middle" fill="rgba(255,255,255,0.5)" className="text-[13px] md:text-[10px]" letterSpacing="1.8" style={fade(!!model)}>
        РАБОТОДАТЕЛЬ
        <tspan fill={AMBER} style={fade(director === 'provider')}>
          {' · РУКОВОДИТ'}
        </tspan>
      </text>

      {/* ——— where the worker sits ——— */}
      {MODEL_ORDER.map((id) => (
        <text key={id} x="300" y="478" textAnchor="middle" fill="rgba(255,255,255,0.45)" className="text-[17px] md:text-[14px]" fontStyle="italic" style={fade(model === id)}>
          {MODELS[id].workplace}
        </text>
      ))}
    </svg>
  )
}

function Node({ x, y, label, hot = false }: { x: number; y: number; label: string; hot?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="150"
        height="64"
        rx="32"
        fill={hot ? 'rgba(232,160,74,0.10)' : 'rgba(255,255,255,0.05)'}
        stroke={hot ? AMBER : 'rgba(255,255,255,0.28)'}
        strokeWidth="1.5"
        style={{ transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      <text x={x + 75} y={y + 38} textAnchor="middle" fill="#fff" className="text-[21px] md:text-[17px]" fontWeight="500">
        {label}
      </text>
    </g>
  )
}
