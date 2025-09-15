"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  )
}

// Loading overlay com animação
export function LoadingOverlay({ isVisible, message = "Carregando..." }: {
  isVisible: boolean
  message?: string
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl border border-white/10 p-8 flex flex-col items-center gap-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.div
              className="w-8 h-8 border-2 border-yellow-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                ease: "linear",
                repeat: Infinity
              }}
            />

            <motion.p
              className="text-white text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Progress indicator animado
export function AnimatedProgress({
  value,
  max = 100,
  className = "",
  showPercentage = false
}: {
  value: number
  max?: number
  className?: string
  showPercentage?: boolean
}) {
  const percentage = (value / max) * 100

  return (
    <div className={`relative ${className}`}>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-yellow-600 to-red-600 h-2 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        >
          {/* Efeito de brilho */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </motion.div>
      </div>

      {showPercentage && (
        <motion.span
          className="absolute -top-6 right-0 text-xs text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(percentage)}%
        </motion.span>
      )}
    </div>
  )
}