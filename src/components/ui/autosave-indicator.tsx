"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Save, Check, RefreshCw, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface AutosaveIndicatorProps {
  isSaving: boolean
  lastSaved: Date | null
  className?: string
}

export function AutosaveIndicator({
  isSaving,
  lastSaved,
  className = ""
}: AutosaveIndicatorProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    if (lastSaved && !isSaving) {
      setShowSuccessMessage(true)
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [lastSaved, isSaving])

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) return "agora"
    if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  if (!isSaving && !lastSaved && !showSuccessMessage) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`flex items-center gap-2 text-xs ${className}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {isSaving ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4 text-yellow-400" />
            </motion.div>
            <span className="text-yellow-400 font-medium">Salvando...</span>
          </>
        ) : showSuccessMessage ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{
                backgroundColor: ["#10b981", "#34d399", "#10b981"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-1 rounded-full"
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
            <span className="text-green-400 font-medium">Salvo automaticamente</span>
          </motion.div>
        ) : lastSaved ? (
          <>
            <Save className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">
              Salvo {formatLastSaved(lastSaved)}
            </span>
          </>
        ) : null}
      </motion.div>
    </AnimatePresence>
  )
}

interface AutosaveRecoveryBannerProps {
  onRecover: () => void
  onDiscard: () => void
  className?: string
}

export function AutosaveRecoveryBanner({
  onRecover,
  onDiscard,
  className = ""
}: AutosaveRecoveryBannerProps) {
  return (
    <motion.div
      className={`bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6 ${className}`}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start gap-3">
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
          <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-300 mb-1">
            📋 Dados salvos encontrados
          </h3>
          <p className="text-xs text-blue-200 mb-3 leading-relaxed">
            Encontramos um formulário salvo automaticamente. Deseja continuar de onde parou?
          </p>

          <div className="flex gap-2">
            <motion.button
              onClick={onRecover}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Recuperar dados
            </motion.button>
            <motion.button
              onClick={onDiscard}
              className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs font-medium rounded-md transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Começar novo
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}