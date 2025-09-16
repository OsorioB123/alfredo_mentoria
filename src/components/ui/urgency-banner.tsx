"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Clock, Users, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface UrgencyBannerProps {
  className?: string
  totalSpots?: number
  spotsRemaining?: number
  showTimer?: boolean
}

export function UrgencyBanner({
  className = "",
  totalSpots = 10,
  spotsRemaining = 7,
  showTimer = true
}: UrgencyBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 14,
    minutes: 32,
    seconds: 45
  })

  useEffect(() => {
    if (!showTimer) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev

        seconds--

        if (seconds < 0) {
          seconds = 59
          minutes--
        }

        if (minutes < 0) {
          minutes = 59
          hours--
        }

        if (hours < 0) {
          hours = 23
          days--
        }

        if (days < 0) {
          days = 0
          hours = 0
          minutes = 0
          seconds = 0
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showTimer])

  const spotsProgress = ((totalSpots - spotsRemaining) / totalSpots) * 100

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-r from-red-900/20 via-red-800/10 to-orange-900/20 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background pulse effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-orange-600/5"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Urgency message */}
          <div className="flex items-start gap-3 flex-1">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            </motion.div>

            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                🔥 Vagas Limitadas - Primeira Turma
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Apenas <span className="text-red-400 font-semibold">{spotsRemaining} vagas restantes</span> de {totalSpots} disponíveis
              </p>
            </div>
          </div>

          {/* Timer (if enabled) */}
          {showTimer && (
            <div className="flex items-center justify-center sm:justify-start gap-2 bg-black/20 rounded-lg px-3 py-2 border border-red-500/20 self-start">
              <Clock className="w-4 h-4 text-red-400" />
              <div className="flex items-center gap-1 text-xs font-mono">
                <span className="text-white font-semibold">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="text-gray-400">:</span>
                <span className="text-white font-semibold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-gray-400">:</span>
                <span className="text-white font-semibold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-gray-400">:</span>
                <motion.span
                  className="text-red-400 font-semibold"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </motion.span>
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Vagas preenchidas</span>
            <span className="text-xs text-white font-semibold">{totalSpots - spotsRemaining}/{totalSpots}</span>
          </div>

          <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${spotsProgress}%` }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 3
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Social proof hint */}
        <motion.div
          className="mt-3 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Users className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-gray-300">
            <span className="text-yellow-400 font-semibold">47 pessoas</span> visualizaram esta página nas últimas 2 horas
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}