"use client"

import { useEffect, useRef } from "react"
import { useInView, useAnimation } from "framer-motion"

// Hook para animações que trigam quando o elemento entra no viewport
export function useScrollAnimation(threshold = 0.1) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, {
    threshold,
    once: true // Anima apenas uma vez
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return { ref, controls, inView, containerVariants }
}

// Hook para animação de contador/número crescente
export function useCountAnimation(end: number, duration = 2000, start = 0) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.3, once: true })

  useEffect(() => {
    if (inView) {
      controls.start({
        value: end,
        transition: {
          duration: duration / 1000,
          ease: "easeOut"
        }
      })
    }
  }, [controls, inView, end, duration])

  return { ref, controls, inView }
}

// Hook para stagger animation (animação sequencial)
export function useStaggerAnimation(delayChildren = 0.1, staggerChildren = 0.1) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.1, once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return { ref, controls, containerVariants, itemVariants }
}

// Hook para hover animations
export function useHoverAnimation() {
  const controls = useAnimation()

  const startHover = () => controls.start("hover")
  const endHover = () => controls.start("rest")

  const hoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return { controls, startHover, endHover, hoverVariants }
}