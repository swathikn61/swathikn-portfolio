const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500'

const VARIANTS = {
  primary: 'bg-accent-600 text-white hover:bg-accent-500',
  secondary:
    'border border-ink-200 bg-cream text-ink-700 hover:border-ink-300 hover:bg-ink-50 dark:border-ink-700 dark:bg-transparent dark:text-ink-200 dark:hover:border-ink-600 dark:hover:bg-ink-900',
  ghost: 'text-ink-600 hover:text-accent-600 dark:text-ink-400 dark:hover:text-accent-400',
}

const SIZES = {
  sm: 'px-4 py-2',
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3 text-[0.9375rem]',
}

/**
 * Renders an <a> when `href` is given, otherwise a <button>.
 * Keeps every call site on the same visual scale.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
