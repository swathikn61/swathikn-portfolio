import Reveal from './Reveal'

/** `lead` is set in tall serif capitals, `accent` in the block's italic pop color. */
export default function SectionHeading({ lead, accent, description, compact = false }) {
  const size = compact ? 'text-[clamp(3rem,6vw,4.5rem)]' : 'text-[clamp(3.5rem,10vw,7.5rem)]'

  return (
    <Reveal className={compact ? 'mb-9' : 'mb-12 sm:mb-16'}>
      <h2 className={`display ${size} uppercase text-balance`}>
        {lead} <em>{accent}</em>
      </h2>
      {description && <p className="mt-3 max-w-3xl text-lg text-pretty">{description}</p>}
    </Reveal>
  )
}
