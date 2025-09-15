"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
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
import { submitToGoogleSheets, getGoogleSheetsConfig } from "@/lib/services/google-sheets"

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
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
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
    setIsSubmitting(true)

    try {
      const config = getGoogleSheetsConfig()

      if (config) {
        const result = await submitToGoogleSheets(data, config)

        if (!result.success) {
          console.error("Erro ao enviar para Google Sheets:", result.error)
        }
      } else {
        console.log("Google Sheets não configurado, dados do formulário:", data)
      }

      router.push("/inscricao/obrigado")
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
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
            Concordo em receber comunicações sobre a mentoria e entendo que meus dados serão utilizados conforme a{" "}
            <a href="#" className="text-yellow-500 hover:underline">
              Política de Privacidade
            </a>
            .
          </span>
        }
      />
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
    <PageTransition className="min-h-screen text-white bg-black">
      <div
        className="fixed top-0 w-full h-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('https://i.ibb.co/k2jYDptr/Gemini-Generated-Image-7n8acu7n8acu7n8a-1.webp?w=800&q=80')"
        }}
      />
      <div className="absolute w-full h-[400px] left-0 top-0 -z-10 bg-gradient-to-b from-gray-900/80 to-transparent" />

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

        {/* Progress indicator animado */}
        <FadeIn delay={0.2} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <motion.div
                key={step}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500",
                  step <= currentStep
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-700 text-gray-400"
                )}
                animate={{
                  scale: step === currentStep ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {step <= currentStep ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓
                  </motion.span>
                ) : (
                  step
                )}
              </motion.div>
            ))}
          </div>

          <AnimatedProgress
            value={currentStep}
            max={5}
            showPercentage
          />
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
                    Próximo
                    <ChevronRight className="w-4 h-4" />
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {!isSubmitting && <Send className="w-4 h-4" />}
                    <span>{isSubmitting ? "Enviando..." : "Enviar Inscrição"}</span>
                  </AnimatedButton>
                )}
              </div>
            </motion.div>
          </form>
        </motion.div>
      </section>

      <LoadingOverlay isVisible={isSubmitting} message="Enviando sua inscrição..." />
    </PageTransition>
  )
}