"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Componente para inputs animados
interface AnimatedInputProps {
  id: string
  label: string
  type?: string
  error?: string
  className?: string
  required?: boolean
  [key: string]: any
}

export function AnimatedInput({
  id,
  label,
  type = "text",
  error,
  className = "",
  required = false,
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue)

  // Monitor changes in value prop
  useEffect(() => {
    setHasValue(!!props.value || !!props.defaultValue)
  }, [props.value, props.defaultValue])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.input
          id={id}
          type={type}
          className={cn(
            "w-full px-4 py-3 pt-6 bg-gray-800 border rounded-lg text-white focus:outline-none transition-all duration-300",
            error
              ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
              : "border-gray-700 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false)
            setHasValue(e.target.value !== "")
          }}
          onChange={(e) => setHasValue(e.target.value !== "")}
          {...props}
        />

        {/* Label animado */}
        <motion.label
          htmlFor={id}
          className="absolute left-4 text-gray-400 pointer-events-none transition-all duration-300 px-2 rounded"
          animate={{
            y: isFocused || hasValue ? -8 : 8,
            scale: isFocused || hasValue ? 0.85 : 1,
            color: isFocused
              ? error ? "#ef4444" : "#ca8a04"
              : "#9ca3af"
          }}
          style={{
            transformOrigin: "left center",
            backgroundColor: isFocused || hasValue ? 'rgb(31, 41, 55)' : 'transparent',
            zIndex: 10
          }}
        >
          {label} {required && <span className="text-red-400">*</span>}
        </motion.label>

        {/* Indicador de foco */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-600 to-red-600"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? "100%" : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Mensagem de erro animada */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-400 flex items-center gap-2"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              ⚠️
            </motion.span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Componente para textarea animado
export function AnimatedTextarea({
  id,
  label,
  error,
  className = "",
  required = false,
  ...props
}: {
  id: string
  label: string
  error?: string
  className?: string
  required?: boolean
  [key: string]: any
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue)

  // Monitor changes in value prop
  useEffect(() => {
    setHasValue(!!props.value || !!props.defaultValue)
  }, [props.value, props.defaultValue])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.textarea
          id={id}
          className={cn(
            "w-full px-4 py-3 pt-6 bg-gray-800 border rounded-lg text-white focus:outline-none resize-none transition-all duration-300",
            error
              ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
              : "border-gray-700 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/20",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false)
            setHasValue(e.target.value !== "")
          }}
          onChange={(e) => setHasValue(e.target.value !== "")}
          {...props}
        />

        <motion.label
          htmlFor={id}
          className="absolute left-4 text-gray-400 pointer-events-none transition-all duration-300 px-2 rounded"
          animate={{
            y: isFocused || hasValue ? -8 : 16,
            scale: isFocused || hasValue ? 0.85 : 1,
            color: isFocused
              ? error ? "#ef4444" : "#ca8a04"
              : "#9ca3af"
          }}
          style={{
            transformOrigin: "left center",
            backgroundColor: isFocused || hasValue ? 'rgb(31, 41, 55)' : 'transparent',
            zIndex: 10
          }}
        >
          {label} {required && <span className="text-red-400">*</span>}
        </motion.label>

        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-600 to-red-600"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? "100%" : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-400 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span>⚠️</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Componente para grupo de radio animado
interface AnimatedRadioGroupProps {
  label: string
  options: { value: string; label: string; id: string }[]
  value?: string
  onValueChange: (value: string) => void
  error?: string
  required?: boolean
}

export function AnimatedRadioGroup({
  label,
  options,
  value,
  onValueChange,
  error,
  required = false
}: AnimatedRadioGroupProps) {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.div
            key={option.value}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.label
              htmlFor={option.id}
              className="flex items-center space-x-3 cursor-pointer group w-full py-2 px-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={(e) => {
                e.preventDefault()
                onValueChange(option.value)
              }}
            >
              <input
                type="radio"
                id={option.id}
                name={`radio-group-${label.replace(/\s+/g, '-').toLowerCase()}`}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onValueChange(e.target.value)}
                className="sr-only"
              />
              <motion.div
                className={cn(
                  "w-5 h-5 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center flex-shrink-0",
                  value === option.value
                    ? "border-yellow-600 bg-yellow-600 shadow-lg shadow-yellow-600/30"
                    : "border-gray-600 hover:border-yellow-600 group-hover:border-yellow-500"
                )}
                animate={{
                  scale: value === option.value ? [1, 1.15, 1] : 1,
                  boxShadow: value === option.value
                    ? "0 0 20px rgba(202, 138, 4, 0.3)"
                    : "0 0 0px rgba(202, 138, 4, 0)"
                }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {value === option.value && (
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 select-none flex-1">
                {option.label}
              </span>
            </motion.label>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            className="text-sm text-red-400 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span>⚠️</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Componente para checkbox animado
export function AnimatedCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
  error,
  required = false
}: {
  id: string
  label: ReactNode
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string
  required?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.label
        htmlFor={id}
        className="flex items-start space-x-3 cursor-pointer group py-2 px-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={(e) => {
          e.preventDefault()
          onCheckedChange(!checked)
        }}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="sr-only"
        />
        <motion.div
          className={cn(
            "w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center transition-all duration-300 mt-1 flex-shrink-0",
            checked
              ? "border-yellow-600 bg-yellow-600 shadow-lg shadow-yellow-600/30"
              : "border-gray-600 hover:border-yellow-600 group-hover:border-yellow-500"
          )}
          animate={{
            scale: checked ? [1, 1.15, 1] : 1,
            boxShadow: checked
              ? "0 0 20px rgba(202, 138, 4, 0.3)"
              : "0 0 0px rgba(202, 138, 4, 0)"
          }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {checked && (
              <motion.svg
                className="w-3 h-3 text-white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>

        <span className="text-sm text-gray-300 group-hover:text-white leading-relaxed transition-colors duration-200 select-none flex-1">
          {label}
        </span>
      </motion.label>

      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-400 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span>⚠️</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}