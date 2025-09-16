"use client"

import { motion, HTMLMotionProps, Variants } from "framer-motion"
import { ReactNode, forwardRef } from "react"
import { useScrollAnimation } from "@/lib/hooks/use-animation"

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
  className?: string
}

const fadeVariants = (direction: string, distance: number): Variants => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  }

  return {
    hidden: {
      opacity: 0,
      ...directions[direction as keyof typeof directions]
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    distance = 20,
    threshold = 0.1,
    className,
    ...props
  }, ref) => {
    const { ref: animationRef, controls } = useScrollAnimation(threshold)

    const variants = fadeVariants(direction, distance)

    // Ajusta a duração e delay nas variantes
    variants.visible.transition = {
      ...variants.visible.transition,
      duration,
      delay
    }

    return (
      <motion.div
        ref={ref || animationRef}
        className={className}
        variants={variants}
        initial="hidden"
        animate={controls}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

FadeIn.displayName = "FadeIn"

// Componente para animação stagger (sequencial)
interface StaggerContainerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
  ...props
}: StaggerContainerProps) {
  const { ref, controls, containerVariants } = useScrollAnimation()

  const customContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: staggerDelay
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={customContainerVariants}
      initial="hidden"
      animate={controls}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Item para usar dentro do StaggerContainer
export function StaggerItem({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
  [key: string]: any
}) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}

