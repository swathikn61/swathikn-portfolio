/**
 * Consistent page section: full-width band + centered, padded container.
 */
export default function Section({ id, children, className = '', containerClassName = '' }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-24 lg:py-28 ${className}`}>
      <div className={`mx-auto w-full max-w-5xl px-6 sm:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  )
}
