"use client"

import { useEffect, useState } from "react"
import { UseFormWatch } from "react-hook-form"

interface UseFormAutosaveProps {
  watch: UseFormWatch<any>
  formId: string
  debounceMs?: number
}

export function useFormAutosave({
  watch,
  formId,
  debounceMs = 2000
}: UseFormAutosaveProps) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const watchedValues = watch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only save if there's actual data
      const hasData = Object.values(watchedValues).some(value =>
        value !== undefined && value !== "" && value !== null
      )

      if (hasData) {
        setIsSaving(true)

        try {
          localStorage.setItem(
            `form-autosave-${formId}`,
            JSON.stringify({
              data: watchedValues,
              timestamp: new Date().toISOString()
            })
          )
          setLastSaved(new Date())
        } catch (error) {
          console.error("Erro ao salvar formulário:", error)
        } finally {
          setTimeout(() => setIsSaving(false), 500)
        }
      }
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [watchedValues, formId, debounceMs])

  const loadSavedData = (): any => {
    try {
      const saved = localStorage.getItem(`form-autosave-${formId}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.data
      }
    } catch (error) {
      console.error("Erro ao carregar dados salvos:", error)
    }
    return null
  }

  const clearSavedData = () => {
    try {
      localStorage.removeItem(`form-autosave-${formId}`)
      setLastSaved(null)
    } catch (error) {
      console.error("Erro ao limpar dados salvos:", error)
    }
  }

  const hasSavedData = (): boolean => {
    try {
      const saved = localStorage.getItem(`form-autosave-${formId}`)
      return !!saved
    } catch {
      return false
    }
  }

  return {
    lastSaved,
    isSaving,
    loadSavedData,
    clearSavedData,
    hasSavedData
  }
}