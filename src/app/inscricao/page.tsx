"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedInput, AnimatedTextarea, AnimatedRadioGroup, AnimatedCheckbox } from "@/components/ui/animated-form"
import { AnimatedProgress, LoadingOverlay, PageTransition } from "@/components/ui/page-transition"
import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"
import {
  formSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  type FormData
} from "@/lib/validations/form"
import { submitToGoogleSheets, checkEnvironmentVariables } from "@/lib/services/google-sheets"

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

export default function InscricaoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [direction, setDirection] = useState(0)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      terms: false
    }
  })

  const watchedValues = watch()

  const validateCurrentStep = async () => {
    const schemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema]
    const currentSchema = schemas[currentStep - 1]

    if (currentSchema) {
      const result = await trigger(Object.keys(currentSchema.shape) as (keyof FormData)[])
      return result
    }
    return true
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < 5) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: FormData) => {
    console.log('🚀 Iniciando submissão do formulário...')
    console.log('📊 Dados do formulário coletados:', data)

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Verificar configuração das variáveis de ambiente
      const envCheck = checkEnvironmentVariables()
      console.log('🔍 Verificação das variáveis de ambiente:', envCheck)

      if (!envCheck.configured) {
        const errorMsg = `Configuração incompleta: ${envCheck.errors.join(', ')}`
        console.error('❌', errorMsg)
        throw new Error(errorMsg)
      }

      console.log('✅ Variáveis de ambiente configuradas corretamente')
      console.log('🔗 URL do Google Apps Script:', envCheck.url)

      console.log('📤 Enviando dados para Google Sheets...')
      const result = await submitToGoogleSheets(data)

      console.log('📥 Resultado do envio:', result)

      if (result.success) {
        console.log('✅ Formulário enviado com sucesso!')

        // Track conversion success
        if (typeof window !== 'undefined' && (window as any).trackFormSubmission) {
          (window as any).trackFormSubmission()
        }

        // Redirecionar para página de agradecimento
        router.push("/inscricao/obrigado")
      } else {
        console.error('❌ Erro no envio:', result.error)
        setSubmitError(result.error || 'Erro desconhecido ao enviar formulário')
      }
    } catch (error) {
      console.error("💥 Erro ao enviar formulário:", error)

      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao enviar formulário'
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <motion.div
      key="step1"
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="space-y-6"
    >
      <FadeIn>
        <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/10 pb-2">
          Passo 1 — Dados Pessoais
        </h2>
      </FadeIn>

      <AnimatedInput
        id="fullName"
        label="Qual é o seu nome completo?"
        required
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      <AnimatedInput
        id="email"
        label="Qual seu melhor e-mail?"
        type="email"
        required
        error={errors.email?.message}
        {...register("email")}
      />

      <AnimatedInput
        id="social"
        label="Qual seu perfil no Instagram ou LinkedIn?"
        required
        error={errors.social?.message}
        {...register("social")}
      />
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      key="step2"
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="space-y-6"
    >
      <FadeIn>
        <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/10 pb-2">
          Passo 2 — Perfil do Negócio
        </h2>
      </FadeIn>

      <AnimatedRadioGroup
        label="Você já possui CNPJ?"
        required
        value={watchedValues.cnpj}
        onValueChange={(value) => setValue("cnpj", value as "sim" | "nao")}
        error={errors.cnpj?.message}
        options={[
          { value: "sim", label: "Sim", id: "cnpj-yes" },
          { value: "nao", label: "Não", id: "cnpj-no" }
        ]}
      />

      <AnimatedInput
        id="sector"
        label="Em qual setor você atua ou pretende atuar?"
        required
        error={errors.sector?.message}
        {...register("sector")}
      />

      <AnimatedRadioGroup
        label="Você já tentou importar antes?"
        required
        value={watchedValues.importExperience}
        onValueChange={(value) => setValue("importExperience", value as "sim" | "nao")}
        error={errors.importExperience?.message}
        options={[
          { value: "sim", label: "Sim", id: "import-yes" },
          { value: "nao", label: "Não", id: "import-no" }
        ]}
      />

      <AnimatedTextarea
        id="whyImport"
        label="Por que você quer aprender a importar?"
        rows={4}
        required
        error={errors.whyImport?.message}
        {...register("whyImport")}
      />
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      key="step3"
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="space-y-6"
    >
      <FadeIn>
        <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/10 pb-2">
          Passo 3 — Nível de Comprometimento
        </h2>
      </FadeIn>

      <AnimatedRadioGroup
        label="Qual dessas frases mais te representa?"
        required
        value={watchedValues.phrase}
        onValueChange={(value) => setValue("phrase", value as "pronto" | "orientacao" | "executo")}
        error={errors.phrase?.message}
        options={[
          { value: "pronto", label: "Quero algo pronto, sem ter trabalho", id: "phrase-1" },
          { value: "orientacao", label: "Gosto de aprender e executar com orientação", id: "phrase-2" },
          { value: "executo", label: "Se tiver clareza e acompanhamento, eu executo sem medo", id: "phrase-3" }
        ]}
      />

      <AnimatedRadioGroup
        label="Você consegue participar da mentoria ao vivo nas 6 semanas?"
        required
        value={watchedValues.participation}
        onValueChange={(value) => setValue("participation", value as "sim" | "depende" | "restricoes")}
        error={errors.participation?.message}
        options={[
          { value: "sim", label: "Sim, 100%", id: "participation-yes" },
          { value: "depende", label: "Depende dos horários", id: "participation-maybe" },
          { value: "restricoes", label: "Tenho restrições", id: "participation-no" }
        ]}
      />
    </motion.div>
  )

  const renderStep4 = () => (
    <motion.div
      key="step4"
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="space-y-6"
    >
      <FadeIn>
        <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/10 pb-2">
          Passo 4 — Seleção e Confirmação
        </h2>
      </FadeIn>

      <AnimatedTextarea
        id="whySelected"
        label="Por que você acredita que deve ser selecionado?"
        rows={4}
        required
        error={errors.whySelected?.message}
        {...register("whySelected")}
      />

      <AnimatedRadioGroup
        label="Sabendo que são apenas 10 vagas nesta primeira turma, você gostaria de garantir a sua se for aprovado?"
        required
        value={watchedValues.secure}
        onValueChange={(value) => setValue("secure", value as "sim" | "interesse" | "incerto")}
        error={errors.secure?.message}
        options={[
          { value: "sim", label: "Sim, estou pronto", id: "secure-yes" },
          { value: "interesse", label: "Tenho interesse, mas preciso entender melhor", id: "secure-maybe" },
          { value: "incerto", label: "Ainda não tenho certeza", id: "secure-no" }
        ]}
      />
    </motion.div>
  )

  const renderStep5 = () => (
    <motion.div
      key="step5"
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      custom={direction}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      className="space-y-6"
    >
      <FadeIn>
        <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/10 pb-2">
          Passo Final — Confirmação de Investimento
        </h2>
      </FadeIn>

      <AnimatedRadioGroup
        label="O investimento da mentoria é de R$ 5.000. Você está preparado para esse passo agora?"
        required
        value={watchedValues.investment}
        onValueChange={(value) => setValue("investment", value as "sim" | "avaliar" | "nao")}
        error={errors.investment?.message}
        options={[
          { value: "sim", label: "Sim, pronto pra investir em mim", id: "investment-yes" },
          { value: "avaliar", label: "Tenho interesse, mas preciso avaliar condições", id: "investment-maybe" },
          { value: "nao", label: "Não posso neste momento", id: "investment-no" }
        ]}
      />

      <AnimatedCheckbox
        id="terms"
        checked={watchedValues.terms || false}
        onCheckedChange={(checked) => setValue("terms", checked)}
        error={errors.terms?.message}
        required
        label={
          <span>
            Aceito os{" "}
            <Link
              href="/termos"
              className="text-yellow-400 hover:text-yellow-300 underline transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              termos e condições
            </Link>{" "}
            e concordo em receber comunicações sobre a mentoria "Do Zero ao Primeiro Contêiner" com Alfredo ABN8 Trading.
          </span>
        }
      />

      {/* Mostrar erro de submissão se houver */}
      {submitError && (
        <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
          <p className="text-red-200 text-sm">
            <strong>Erro ao enviar:</strong> {submitError}
          </p>
          <p className="text-red-300 text-xs mt-2">
            Por favor, tente novamente. Se o problema persistir, entre em contato conosco.
          </p>
        </div>
      )}
    </motion.div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      default: return renderStep1()
    }
  }

  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        backgroundImage: "url('https://i.ibb.co/k2jYDptr/Gemini-Generated-Image-7n8acu7n8acu7n8a-1.webp?w=800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1f2937" // Fallback color
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Content */}
      <PageTransition className="relative z-10">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <FadeIn className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
            Formulário de Inscrição
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Queremos conhecer melhor você e seu projeto. Preencha o formulário abaixo para se candidatar à mentoria{" "}
            <span className="text-yellow-400 font-medium">Do Zero ao Primeiro Contêiner</span>.
          </p>
        </FadeIn>

        {/* Progress indicator animado com labels - responsivo */}
        <FadeIn delay={0.2} className="mb-8">
          <div className="flex justify-between items-center mb-4 px-2 sm:px-0">
            {[
              { step: 1, label: "Dados" },
              { step: 2, label: "Negócio" },
              { step: 3, label: "Compromisso" },
              { step: 4, label: "Seleção" },
              { step: 5, label: "Final" }
            ].map(({ step, label }) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <motion.div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-500 border-2",
                    step < currentStep
                      ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/30"
                      : step === currentStep
                      ? "bg-yellow-600 text-white border-yellow-600 shadow-lg shadow-yellow-600/30"
                      : "bg-gray-700 text-gray-400 border-gray-600"
                  )}
                  animate={{
                    scale: step === currentStep ? [1, 1.15, 1] : 1,
                    boxShadow: step === currentStep
                      ? "0 0 20px rgba(202, 138, 4, 0.4)"
                      : step < currentStep
                      ? "0 0 15px rgba(34, 197, 94, 0.3)"
                      : "0 0 0px rgba(0, 0, 0, 0)"
                  }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {step < currentStep ? (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      ✓
                    </motion.span>
                  ) : step === currentStep ? (
                    <motion.span
                      animate={{
                        color: ["#ffffff", "#fbbf24", "#ffffff"],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {step}
                    </motion.span>
                  ) : (
                    step
                  )}
                </motion.div>
                <motion.span
                  className={cn(
                    "text-xs mt-1 sm:mt-2 font-medium transition-all duration-300 text-center max-w-[60px] sm:max-w-none",
                    step <= currentStep ? "text-white" : "text-gray-500"
                  )}
                  animate={{
                    opacity: step === currentStep ? [0.7, 1, 0.7] : 1
                  }}
                  transition={step === currentStep ? { duration: 2, repeat: Infinity } : {}}
                >
                  {label}
                </motion.span>
              </div>
            ))}
          </div>

          <AnimatedProgress
            value={currentStep}
            max={5}
            showPercentage
          />

          {/* Mensagem motivacional baseada no progresso */}
          <motion.div
            className="mt-4 text-center"
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-400">
              {currentStep === 1 && "Vamos começar! Primeiros dados pessoais 👤"}
              {currentStep === 2 && "Agora queremos conhecer seu negócio 🏢"}
              {currentStep === 3 && "Entendendo seu nível de comprometimento 💪"}
              {currentStep === 4 && "Quase lá! Seleção e confirmação ✨"}
              {currentStep === 5 && "Última etapa! Vamos finalizar sua inscrição 🚀"}
            </p>
          </motion.div>
        </FadeIn>

        {/* Formulário */}
        <motion.div
          className="bg-black/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-lg mb-8"
          layout
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="min-h-[400px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                {renderCurrentStep()}
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <motion.div
              className="flex justify-between items-center mt-8 pt-6 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentStep > 1 ? (
                <AnimatedButton
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </AnimatedButton>
              ) : (
                <div></div>
              )}

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">
                  {currentStep} de 5
                </span>

                {currentStep < 5 ? (
                  <AnimatedButton
                    type="button"
                    onClick={nextStep}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    Próximo
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Enviando..." : "Enviar Inscrição"}
                  </AnimatedButton>
                )}
              </div>
            </motion.div>
          </form>
        </motion.div>

        <LoadingOverlay isVisible={isSubmitting} message="Enviando sua inscrição..." />
        </section>
      </PageTransition>
    </div>
  )
}