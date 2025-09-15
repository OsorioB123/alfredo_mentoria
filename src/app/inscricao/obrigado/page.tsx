"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, ArrowLeft, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { AnimatedButton } from "@/components/ui/animated-button"
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in"

// Componente para confetti/celebração
function Confetti() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  useEffect(() => {
    const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6']
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setParticles(newParticles)

    // Remove confetti após 3 segundos
    const timer = setTimeout(() => setParticles([]), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`
            }}
            initial={{
              scale: 0,
              y: -20,
              opacity: 1
            }}
            animate={{
              scale: [0, 1, 0],
              y: [0, 100, 200],
              x: [0, Math.random() * 100 - 50],
              opacity: [1, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 3,
              ease: "easeOut",
              delay: Math.random() * 0.5
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function ObrigadoPage() {
  return (
    <PageTransition className="min-h-screen text-white bg-black">
      <Confetti />

      <div
        className="fixed top-0 w-full h-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('https://i.ibb.co/k2jYDptr/Gemini-Generated-Image-7n8acu7n8acu7n8a-1.webp?w=800&q=80')"
        }}
      />
      <div className="absolute w-full h-[400px] left-0 top-0 -z-10 bg-gradient-to-b from-gray-900/80 to-transparent" />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          className="bg-black/60 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-center py-12">
            {/* Ícone de sucesso animado */}
            <FadeIn className="mb-6">
              <motion.div
                className="relative inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
              >
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />

                {/* Efeito de brilho */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.4)",
                      "0 0 0 20px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              </motion.div>
            </FadeIn>

            {/* Título principal */}
            <FadeIn delay={0.4}>
              <motion.h1
                className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4"
                animate={{
                  backgroundImage: [
                    "linear-gradient(45deg, #ffffff, #ffffff)",
                    "linear-gradient(45deg, #f59e0b, #ef4444)",
                    "linear-gradient(45deg, #ffffff, #ffffff)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text"
                }}
              >
                Inscrição Enviada com Sucesso!
              </motion.h1>
            </FadeIn>

            {/* Descrição */}
            <FadeIn delay={0.6}>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Obrigado pelo seu interesse na mentoria{" "}
                <motion.span
                  className="text-yellow-400 font-medium"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(251, 191, 36, 0)",
                      "0 0 10px rgba(251, 191, 36, 0.5)",
                      "0 0 0px rgba(251, 191, 36, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  Do Zero ao Primeiro Contêiner
                </motion.span>
                . Recebemos sua inscrição e entraremos em contato em breve.
              </p>
            </FadeIn>

            {/* Próximos passos */}
            <FadeIn delay={0.8} className="mb-8">
              <motion.div
                className="bg-gray-900/50 rounded-lg p-6 max-w-2xl mx-auto relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Efeito de brilho de fundo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />

                <motion.h2
                  className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Próximos Passos:
                </motion.h2>

                <StaggerContainer staggerDelay={0.1}>
                  {[
                    "Analisaremos sua inscrição cuidadosamente",
                    "Entraremos em contato em até 48 horas",
                    "Se aprovado, enviaremos os detalhes da mentoria",
                    "Você receberá as instruções para garantir sua vaga"
                  ].map((step, index) => (
                    <StaggerItem key={index} className="text-left text-gray-300">
                      <motion.li
                        className="flex items-start mb-2"
                        whileHover={{
                          x: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.span
                          className="text-yellow-400 mr-3 font-semibold"
                          animate={{
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatDelay: 2,
                            delay: index * 0.5
                          }}
                        >
                          {index + 1}.
                        </motion.span>
                        {step}
                      </motion.li>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </motion.div>
            </FadeIn>

            {/* Contato e voltar */}
            <FadeIn delay={1.2} className="space-y-4">
              <motion.p
                className="text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                Tem alguma dúvida? Entre em contato conosco através do{" "}
                <motion.a
                  href="#"
                  className="text-yellow-500 hover:underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  WhatsApp
                </motion.a>{" "}
                ou{" "}
                <motion.a
                  href="#"
                  className="text-yellow-500 hover:underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  e-mail
                </motion.a>
                .
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <Link href="/">
                  <AnimatedButton
                    variant="outline"
                    className="inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar ao Início
                  </AnimatedButton>
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}