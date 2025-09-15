"use client"

import { motion, HTMLMotionProps, Variants } from "framer-motion"
import { ReactNode, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  hoverEffect?: boolean
  clickEffect?: boolean
  glowEffect?: boolean
  className?: string
}

const cardVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  hover: {
    scale: 1.02,
    y: -4,
    rotateX: 2,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeInOut"
    }
  }
}

const glowVariants: Variants = {
  glow: {
    filter: [
      "drop-shadow(0 0 0px rgba(234, 179, 8, 0))",
      "drop-shadow(0 0 8px rgba(234, 179, 8, 0.3))",
      "drop-shadow(0 0 0px rgba(234, 179, 8, 0))"
    ],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3
    }
  }
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({
    children,
    hoverEffect = true,
    clickEffect = true,
    glowEffect = false,
    className,
    ...props
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-sm",
          className
        )}
        variants={cardVariants}
        initial="rest"
        whileHover={hoverEffect ? "hover" : undefined}
        whileTap={clickEffect ? "tap" : undefined}
        animate={glowEffect ? "glow" : "rest"}
        style={{ perspective: 1000 }}
        {...props}
      >
        <motion.div
          className="relative"
          variants={glowVariants}
          animate={glowEffect ? "glow" : undefined}
        >
          {children}
        </motion.div>
      </motion.div>
    )
  }
)

AnimatedCard.displayName = "AnimatedCard"

// Card específico para estatísticas
export function StatCard({
  icon,
  value,
  label,
  delay = 0,
  className,
  ...props
}: {
  icon: ReactNode
  value: ReactNode
  label: string
  delay?: number
  className?: string
  [key: string]: any
}) {
  return (
    <motion.div
      className={cn(
        "rounded-xl bg-black/20 backdrop-blur-md border border-yellow-600/30 p-3 shadow-lg",
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      <div className="flex items-center gap-2 mb-1">
        <motion.div
          className="w-2 h-2 rounded-full bg-yellow-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: delay + 0.5
          }}
        />
        <div className="text-lg font-semibold text-white tracking-tight">
          {value}
        </div>
      </div>
      <p className="text-[11px] text-white/70">{label}</p>
    </motion.div>
  )
}

// Card para conquistas/achievements
export function AchievementCard({
  icon,
  title,
  description,
  delay = 0,
  className,
  ...props
}: {
  icon: ReactNode
  title: string
  description: string
  delay?: number
  className?: string
  [key: string]: any
}) {
  return (
    <AnimatedCard
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut"
      }}
      {...props}
    >
      <div className="flex items-start gap-4">
        <motion.div
          className="w-10 h-10 rounded-full bg-yellow-900/50 flex items-center justify-center"
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
        >
          {icon}
        </motion.div>
        <div>
          <h3 className="text-base font-semibold tracking-tight mb-2 text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </AnimatedCard>
  )
}