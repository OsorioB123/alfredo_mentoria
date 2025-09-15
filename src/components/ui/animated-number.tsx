"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  format?: (value: number) => string
  duration?: number
  className?: string
}

export function AnimatedNumber({
  value,
  format = (n) => n.toString(),
  duration = 2000,
  className = ""
}: AnimatedNumberProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.3, once: true })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration: duration / 1000,
        ease: "easeOut"
      })
      return controls.stop
    }
  }, [inView, motionValue, value, duration])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  )
}

// Componente específico para estatísticas com formatação
export function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = ""
}: {
  value: string | number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.3, once: true })

  // Se for string (como "R$ 1bi"), apenas anima a entrada
  if (typeof value === "string") {
    return (
      <motion.span
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2
        }}
      >
        {prefix}{value}{suffix}
      </motion.span>
    )
  }

  // Se for número, anima o contador
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {prefix}
      <AnimatedNumber value={value} duration={duration} />
      {suffix}
    </motion.span>
  )
}