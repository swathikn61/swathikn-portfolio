import { useEffect, useState } from 'react'

/**
 * Reveals `text` one character at a time. Pass `enabled: false` (e.g. for
 * prefers-reduced-motion) to skip straight to the full string.
 */
export default function useTypewriter(text, { speed = 75, startDelay = 0, enabled = true } = {}) {
  const [output, setOutput] = useState(enabled ? '' : text)
  const [done, setDone] = useState(!enabled)

  useEffect(() => {
    if (!enabled) {
      setOutput(text)
      setDone(true)
      return
    }

    setOutput('')
    setDone(false)
    let i = 0
    let interval

    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOutput(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, speed, startDelay, enabled])

  return { text: output, done }
}
