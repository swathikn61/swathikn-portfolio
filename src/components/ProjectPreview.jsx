/**
 * Illustrated app windows for projects without a screenshot yet. The data in them is
 * sample data that shows what each app does, not real results.
 */

function Window({ title, children }) {
  return (
    <div className="keep tone tone-plain border-fg w-full overflow-hidden rounded-xl border text-left shadow-[6px_6px_0_rgba(0,0,0,0.18)]">
      <div className="border-line flex items-center gap-1.5 border-b px-3 py-2">
        <span className="bg-wine h-2.5 w-2.5" />
        <span className="bg-marigold h-2.5 w-2.5" />
        <span className="h-2.5 w-2.5 bg-[#6f9a52]" />
        <span className="label ml-2 text-[0.625rem]">{title}</span>
      </div>
      <div className="p-4 text-sm">{children}</div>
    </div>
  )
}

function Bar({ value, className = 'bg-fg' }) {
  return (
    <span className="bg-line block h-2 w-full overflow-hidden rounded-full">
      <span className={`block h-full rounded-full ${className}`} style={{ width: `${value}%` }} />
    </span>
  )
}

function EvalPreview() {
  const models = [
    { name: 'Llama 3', score: 82, color: 'bg-wine' },
    { name: 'Mistral', score: 68, color: 'bg-marigold' },
    { name: 'Phi-3', score: 74, color: 'bg-[#6f9a52]' },
  ]

  return (
    <Window title="model-eval">
      <p className="label text-[0.625rem]">Prompt</p>
      <p className="border-line mt-1 rounded-lg border px-3 py-2">Explain RAG in two sentences.</p>

      <p className="label mt-4 text-[0.625rem]">Judge score</p>
      <ul className="mt-2 space-y-2.5">
        {models.map((model) => (
          <li key={model.name} className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
            <span className="font-semibold">{model.name}</span>
            <Bar value={model.score} className={model.color} />
          </li>
        ))}
      </ul>
    </Window>
  )
}

function ShortenerPreview() {
  const clicks = [30, 52, 41, 70, 58, 88, 64]

  return (
    <Window title="url-shortener">
      <p className="border-line truncate rounded-lg border px-3 py-2 opacity-70">
        https://example.com/blog/how-caching-works
      </p>
      <div className="bg-fg text-bg mt-2 flex items-center justify-between rounded-lg px-3 py-2">
        <span className="font-mono font-semibold">sho.rt/aZ3x9Q</span>
        <span className="label text-[0.625rem]">Copy</span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-1.5" style={{ height: '4.5rem' }}>
        {clicks.map((value, i) => (
          <span key={i} className="bg-sky w-full rounded-t" style={{ height: `${value}%` }} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="border-line rounded-full border px-2 py-0.5 text-xs">Click analytics</span>
        <span className="border-line rounded-full border px-2 py-0.5 text-xs">Expires in 7 days</span>
      </div>
    </Window>
  )
}

function FinancePreview() {
  const entries = [
    { label: 'Salary', amount: '+ ₹42,000', tone: 'text-[#3f6b2a]' },
    { label: 'Rent', amount: '− ₹14,000', tone: 'text-wine' },
    { label: 'Groceries', amount: '− ₹3,250', tone: 'text-wine' },
  ]

  return (
    <Window title="finance-tracker">
      <p className="label text-[0.625rem]">Balance</p>
      <p className="display mt-1 text-4xl">₹24,750</p>

      <svg viewBox="0 0 200 50" className="mt-2 h-12 w-full" preserveAspectRatio="none">
        <polyline
          points="0,40 30,34 60,38 90,24 120,28 150,14 200,10"
          fill="none"
          stroke="var(--color-wine)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>

      <ul className="mt-3">
        {entries.map((entry) => (
          <li key={entry.label} className="border-line flex justify-between border-t py-1.5">
            <span>{entry.label}</span>
            <span className={`font-semibold ${entry.tone}`}>{entry.amount}</span>
          </li>
        ))}
      </ul>
    </Window>
  )
}

function WastePreview() {
  const bins = [
    { name: 'Bin A', level: 86, color: 'bg-wine' },
    { name: 'Bin B', level: 42, color: 'bg-marigold' },
    { name: 'Bin C', level: 18, color: 'bg-[#6f9a52]' },
    { name: 'Bin D', level: 64, color: 'bg-marigold' },
  ]

  return (
    <Window title="waste-dashboard">
      <p className="label text-[0.625rem]">Live bin levels</p>
      <ul className="mt-2 grid grid-cols-2 gap-2">
        {bins.map((bin) => (
          <li key={bin.name} className="border-line rounded-lg border p-2.5">
            <div className="flex justify-between">
              <span className="font-semibold">{bin.name}</span>
              <span>{bin.level}%</span>
            </div>
            <div className="mt-2">
              <Bar value={bin.level} className={bin.color} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {['Admin', 'Driver', 'User'].map((role) => (
          <span key={role} className="border-line rounded-full border px-2 py-0.5 text-xs">
            {role} view
          </span>
        ))}
      </div>
    </Window>
  )
}

const PREVIEWS = {
  eval: EvalPreview,
  shortener: ShortenerPreview,
  finance: FinancePreview,
  waste: WastePreview,
}

/** A project's picture: its screenshot when there is one, otherwise the illustration. */
export default function ProjectPreview({ project, compact = false }) {
  const Preview = PREVIEWS[project.preview]
  const frame = compact ? 'aspect-[16/10] p-3 sm:p-4' : 'aspect-[4/3] p-6 sm:p-10'
  const inset = compact ? 'inset-3 sm:inset-4' : 'inset-6 sm:inset-10'

  return (
    <div
      className={`keep tone tone-${project.tone} pixel-corners relative grid place-items-center ${frame}`}
    >
      {project.image ? (
        <div className={`absolute ${inset}`}>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="border-fg h-full w-full rounded-xl border object-cover object-top shadow-[6px_6px_0_rgba(0,0,0,0.18)]"
          />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <Preview />
        </div>
      )}
    </div>
  )
}
