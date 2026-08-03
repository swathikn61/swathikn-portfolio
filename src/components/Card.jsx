/** Neutral surface used by project, education and contact blocks. */
export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`border-ink-200 dark:border-ink-800 dark:bg-ink-900/40 rounded-2xl border bg-cream ${
        hover
          ? 'hover:border-ink-300 dark:hover:border-ink-700 transition-all duration-300 hover:shadow-[0_2px_24px_-8px_rgb(0_0_0/0.12)] dark:hover:shadow-none'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
