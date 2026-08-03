const VARIANTS = {
  default: 'border-ink-200 bg-cream text-ink-600 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300',
  accent:
    'border-accent-200 bg-accent-50 text-accent-700 dark:border-accent-500/25 dark:bg-accent-500/10 dark:text-accent-300',
  ghost: 'border-transparent bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
}

/** Small pill used for skills, tech stacks and section tags. */
export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
