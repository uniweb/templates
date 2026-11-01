import { useEffect, useState } from 'react'

const NARROW = '(max-width: 40rem)'

/**
 * Whether the screen is phone-sized, for what CSS can't reach: a chart's axis takes its width as a
 * number. Read it in a part that renders only in the browser, as the charts do once mounted.
 */
export function useNarrowScreen() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(NARROW).matches,
  )
  useEffect(() => {
    const query = window.matchMedia(NARROW)
    const onChange = () => setNarrow(query.matches)
    onChange()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return narrow
}
