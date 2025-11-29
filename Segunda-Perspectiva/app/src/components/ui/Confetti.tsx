'use client'

import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export function Confetti({ active, duration = 3000 }: { active: boolean; duration?: number }) {
  const { width, height } = useWindowSize()
  const [isActive, setIsActive] = useState(active)

  useEffect(() => {
    setIsActive(active)
    if (active) {
      const timer = setTimeout(() => setIsActive(false), duration)
      return () => clearTimeout(timer)
    }
  }, [active, duration])

  if (!isActive) return null

  return (
    <ReactConfetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
    />
  )
}
