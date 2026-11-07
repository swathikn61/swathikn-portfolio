/**
 * One full-width color block. `tone` picks the palette; `.pixel-edge` steps its
 * top border up into the block above.
 */
export default function Section({ id, tone, compact = false, children, className = '' }) {
  return (
    <section id={id} className={`tone tone-${tone} pixel-edge relative scroll-mt-20 ${className}`}>
      <div className={`wrap ${compact ? 'py-14 sm:py-16' : 'py-20 sm:py-24 lg:py-28'}`}>{children}</div>
    </section>
  )
}
