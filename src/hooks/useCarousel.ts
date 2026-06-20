import { useState, useEffect } from 'react'

export function useCarousel(total: number, interval = 4500) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % total), interval)
    return () => clearInterval(timer)
  }, [paused, total, interval])

  return {
    current,
    paused,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
    prev: () => setCurrent(c => (c - 1 + total) % total),
    next: () => setCurrent(c => (c + 1) % total),
    goTo: (i: number) => setCurrent(i),
  }
}
