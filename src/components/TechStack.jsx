import { X } from 'lucide-react'
import PixelTile from './PixelTile'
import { skills, skillsIntro } from '../data/content'

// Two wide cards, three narrow, two wide, so the grid reads as a bento box.
const SPANS = [3, 3, 2, 2, 2, 3, 3]
const SPAN_CLASS = { 2: 'sm:col-span-2', 3: 'sm:col-span-3' }

const SKILL_COUNT = skills.reduce((total, group) => total + group.items.length, 0)

function SkillCard({ group, span, index }) {
  return (
    <article
      style={{ animationDelay: `${0.08 + index * 0.05}s` }}
      className={`rise border-fg rounded-xl border p-4 ${SPAN_CLASS[span]}`}
    >
      <div className="flex items-center gap-3">
        <PixelTile sprite={group.sprite} tone={group.tone} />
        <h3 className="leading-snug font-bold tracking-tight">{group.category}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-pretty">{group.items.join(' · ')}</p>
    </article>
  )
}

/**
 * Opened from the hero's terminal sprite. A native <dialog>, so the caller opens it
 * with `ref.current.showModal()` and Esc and focus handling come for free.
 */
export default function TechStack({ ref }) {
  const close = () => ref.current.close()

  return (
    <dialog
      ref={ref}
      aria-labelledby="tech-stack-title"
      data-lenis-prevent
      onClick={(event) => event.target === event.currentTarget && close()}
      className="tone tone-plain border-fg rise m-auto max-h-[calc(100svh-2rem)] w-[min(56rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border p-0 backdrop:bg-black/50"
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label">
              {skills.length} areas · {SKILL_COUNT} skills
            </p>
            <h2
              id="tech-stack-title"
              className="display mt-2 text-[clamp(2.25rem,5vw,3.25rem)] uppercase"
            >
              Building <em>with</em>
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close tech stack"
            className="hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors outline-none"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>
        <p className="mt-2 text-pretty">{skillsIntro}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-6">
          {skills.map((group, i) => (
            <SkillCard key={group.category} group={group} span={SPANS[i]} index={i} />
          ))}
        </div>
      </div>
    </dialog>
  )
}
