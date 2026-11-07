const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full border-2 border-fg px-6 py-3 text-[0.9375rem] font-semibold transition-all duration-200 hover:-translate-y-0.5'

const VARIANTS = {
  primary: 'bg-fg text-bg',
  secondary: 'bg-transparent text-fg hover:bg-fg hover:text-bg',
}

/**
 * Renders an <a> when `href` is given, otherwise a <button>.
 * Colors come from the surrounding block, so it works on any tone.
 */
export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`

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
