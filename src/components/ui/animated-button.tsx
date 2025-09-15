"use client"

import { motion, HTMLMotionProps, Variants } from "framer-motion"
import { ReactNode, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  pulseEffect?: boolean
  className?: string
}

const buttonVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: 0.1,
      ease: "easeInOut"
    }
  }
}

const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3
    }
  }
}

const loadingVariants: Variants = {
  loading: {
    opacity: 0.7,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    pulseEffect = false,
    className,
    ...props
  }, ref) => {
    const baseClasses = "relative inline-flex items-center justify-center font-medium tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    const variantClasses = {
      primary: "bg-red-600 hover:bg-red-700 text-white border border-red-600 focus:ring-red-500",
      secondary: "bg-yellow-600 hover:bg-yellow-700 text-white border border-yellow-600 focus:ring-yellow-500",
      outline: "border border-gray-600 text-gray-300 hover:bg-gray-800 focus:ring-gray-500"
    }

    const sizeClasses = {
      sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
      md: "px-6 py-3 text-base rounded-full gap-2",
      lg: "px-8 py-4 text-lg rounded-full gap-2.5"
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        animate={[
          isLoading ? "loading" : "rest",
          pulseEffect ? "pulse" : ""
        ].filter(Boolean)}
        disabled={isLoading}
        {...props}
      >
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                ease: "linear",
                repeat: Infinity
              }}
            />
          </motion.div>
        )}

        <motion.span
          className={isLoading ? "opacity-0" : "opacity-100"}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </motion.button>
    )
  }
)

AnimatedButton.displayName = "AnimatedButton"

// Componente CTA com efeito especial de call attention
export function CTAButton({
  children,
  className,
  callAttention = false,
  ...props
}: AnimatedButtonProps & { callAttention?: boolean }) {
  return (
    <motion.div
      className="relative"
      animate={callAttention ? {
        scale: [1, 1.02, 1],
        transition: {
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 4
        }
      } : {}}
    >
      {callAttention && (
        <motion.div
          className="absolute inset-0 rounded-full bg-red-600/30 blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 4
          }}
        />
      )}

      <AnimatedButton
        variant="primary"
        className={className}
        {...props}
      >
        {children}
      </AnimatedButton>
    </motion.div>
  )
}