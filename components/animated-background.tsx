"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface AnimatedBackgroundProps {
  children: React.ReactNode
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !bubblesRef.current) return

    // Create bubbles
    const bubbleCount = 15
    const bubbleColors = [
      "rgba(76, 175, 255, 0.2)",
      "rgba(147, 112, 219, 0.2)",
      "rgba(255, 192, 203, 0.2)",
      "rgba(152, 251, 152, 0.2)",
    ]

    const bubbles = []
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div")
      const size = gsap.utils.random(50, 200)
      const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)]

      gsap.set(bubble, {
        position: "absolute",
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: "50%",
        x: gsap.utils.random(0, window.innerWidth),
        y: gsap.utils.random(0, window.innerHeight),
        scale: 0,
        opacity: 0,
      })

      bubblesRef.current.appendChild(bubble)
      bubbles.push(bubble)
    }

    // Animate bubbles
    bubbles.forEach((bubble) => {
      const timeline = gsap.timeline({
        repeat: -1,
        delay: gsap.utils.random(0, 5),
        onRepeat: () => {
          gsap.set(bubble, {
            x: gsap.utils.random(0, window.innerWidth),
            y: gsap.utils.random(0, window.innerHeight),
          })
        },
      })

      timeline
        .to(bubble, {
          scale: 1,
          opacity: 1,
          duration: gsap.utils.random(2, 4),
          ease: "power1.inOut",
        })
        .to(
          bubble,
          {
            x: `+=${gsap.utils.random(-200, 200)}`,
            y: `+=${gsap.utils.random(-200, 200)}`,
            duration: gsap.utils.random(10, 20),
            ease: "none",
          },
          "-=2",
        )
        .to(
          bubble,
          {
            scale: 0,
            opacity: 0,
            duration: gsap.utils.random(2, 4),
            ease: "power1.in",
          },
          "-=5",
        )
    })

    // Clean up
    return () => {
      const bubblesElement = bubblesRef.current;
      bubbles.forEach((bubble) => {
        gsap.killTweensOf(bubble)
        if (bubblesElement && bubblesElement.contains(bubble)) {
          bubblesElement.removeChild(bubble)
        }
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <div ref={bubblesRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true"></div>
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  )
}
