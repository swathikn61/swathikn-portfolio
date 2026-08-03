import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center'

  return (
    <Reveal className={`mb-12 sm:mb-14 ${centered ? 'flex flex-col items-center text-center' : ''}`}>
      {eyebrow && (
        <div className={`mb-3 flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-accent-500" aria-hidden="true" />
          <span className="font-mono text-xs font-medium tracking-widest text-accent-600 uppercase dark:text-accent-400">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-accent-800 dark:text-accent-400 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`text-ink-600 dark:text-ink-400 mt-4 max-w-2xl text-base leading-relaxed text-pretty ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
