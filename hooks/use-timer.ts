'use client'

import { useState, useEffect, useRef } from 'react'

interface UseTimerOptions {
  duration: number
  onExpire?: () => void
  autoStart?: boolean
}

export function useTimer({ duration, onExpire, autoStart = true }: UseTimerOptions) {
  const [remaining, setRemaining] = useState(duration)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          const next = prev - 1
          if (next <= 0) {
            setIsRunning(false)
            if (onExpire) onExpire()
            return 0
          }
          return next
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, remaining, onExpire])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = () => {
    setRemaining(duration)
    setIsRunning(autoStart)
  }

  return {
    remaining,
    isRunning,
    start,
    pause,
    reset,
    percentage: ((duration - remaining) / duration) * 100
  }
}
