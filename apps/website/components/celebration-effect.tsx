"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

interface CelebrationEffectProps {
  duration?: number
  particleCount?: number
}

export function CelebrationEffect({ duration = 3000, particleCount = 50 }: CelebrationEffectProps) {
  useEffect(() => {
    // Trigger confetti celebration
    const animationEnd = Date.now() + duration

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      // Launch confetti from both sides
      confetti({
        particleCount,
        startVelocity: randomInRange(30, 50),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#FF0000", "#0000FF", "#FFFF00", "#00FF00", "#FF00FF"],
      })

      confetti({
        particleCount,
        startVelocity: randomInRange(30, 50),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#FF0000", "#0000FF", "#FFFF00", "#00FF00", "#FF00FF"],
      })
    }, 250)

    return () => clearInterval(interval)
  }, [duration, particleCount])

  return null
}


