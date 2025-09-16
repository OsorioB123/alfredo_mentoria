"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, ArrowLeft, Clock, Shield, Mail, Phone, Instagram, LinkedinIcon, Twitter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { AnimatedButton } from "@/components/ui/animated-button"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in"
import { PageTransition } from "@/components/ui/page-transition"
import { STATS, SITE_CONFIG, IMAGES } from "@/lib/constants"

// Componente para confetti elegante
function ElegantConfetti() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([])

  useEffect(() => {
    const colors = ['#f59e0b', '#fbbf24', '#fcd34d'] // Tons de dourado/amarelo
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 20, // Concentrar no topo
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 4
    }))
    setParticles(newParticles)

    // Remove confetti após 4 segundos
    const timer = setTimeout(() => setParticles([]), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`
            }}
            initial={{
              scale: 0,
              y: -50,
              opacity: 1
            }}
            animate={{
              scale: [0, 1, 0.8, 0],
              y: [0, 100, 200, 300],
              x: [0, Math.random() * 50 - 25],
              opacity: [1, 1, 0.7, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: Math.random() * 0.8
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Componente para linha do tempo
function Timeline() {
  const steps = [
    {
      title: "Análise da Inscrição",
      description: "Nossa equipe avalia cuidadosamente seu perfil e motivação",
      time: "Até 24h",
      icon: Shield
    },
    {
      title: "Processo Seletivo",
      description: "Verificamos se você se encaixa no perfil ideal da mentoria",
      time: "1-2 dias",
      icon: CheckCircle
    },
    {
      title: "Contato Oficial",
      description: "Se aprovado, enviaremos os detalhes e próximos passos",
      time: "Em até 7 dias",
      icon: Mail
    }
  ]

  return (
    <div className="relative">
      {/* Linha central */}
      <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-600" />

      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="relative flex items-start mb-8 last:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + index * 0.2 }}
        >
          {/* Ícone */}
          <motion.div
            className="relative z-10 flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full mr-4"
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(245, 158, 11, 0.4)",
                "0 0 0 10px rgba(245, 158, 11, 0)",
                "0 0 0 0 rgba(245, 158, 11, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              delay: index * 0.5
            }}
          >
            <step.icon className="w-4 h-4 text-black" />
          </motion.div>

          {/* Conteúdo */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <span className="text-sm text-yellow-400 font-medium">{step.time}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Componente para estatísticas
function StatsSection() {
  const stats = [
    { label: "Vagas Disponíveis", value: STATS.maxStudents, suffix: "" },
    { label: "Duração", value: STATS.programDuration, suffix: " semanas" },
    { label: "Investimento", value: `R$ ${STATS.investment.toLocaleString()}`, suffix: "" }
  ]

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center p-4 bg-gray-900/30 rounded-lg border border-gray-700/50"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(17, 24, 39, 0.5)",
            transition: { duration: 0.2 }
          }}
        >
          <motion.div
            className="text-2xl font-bold text-yellow-400 mb-1"
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2,
              delay: index * 0.3
            }}
          >
            {stat.value}{stat.suffix}
          </motion.div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Links sociais
function SocialLinks() {
  const socialLinks = [
    { icon: Instagram, href: SITE_CONFIG.links.instagram, label: "Instagram" },
    { icon: LinkedinIcon, href: SITE_CONFIG.links.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: SITE_CONFIG.links.twitter, label: "Twitter" }
  ]

  return (
    <motion.div
      className="flex justify-center space-x-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:bg-gray-700 transition-colors"
          whileHover={{
            scale: 1.1,
            y: -2
          }}
          whileTap={{ scale: 0.95 }}
          title={social.label}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </motion.div>
  )
}

export default function ObrigadoPage() {
  return (
    <PageTransition className="min-h-screen text-white bg-black">
      <ElegantConfetti />

      {/* Background com overlay */}
      <div
        className="fixed top-0 w-full h-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url('${IMAGES.alfredo.background}')`
        }}
      />
      <div className="absolute w-full h-full left-0 top-0 -z-10 bg-gradient-to-b from-black/90 via-black/80 to-black/95" />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          className="bg-black/70 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12 shadow-2xl"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="text-center">
            {/* Ícone de sucesso principal */}
            <FadeIn className="mb-6">
              <motion.div
                className="relative inline-block"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2
                }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.4)",
                      "0 0 0 25px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1.5
                  }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
            </FadeIn>

            {/* Título principal */}
            <FadeIn delay={0.4}>
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f59e0b 50%, #ffffff 100%)",
                  backgroundSize: "200% 100%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Inscrição Enviada com Sucesso!
              </motion.h1>
            </FadeIn>

            {/* Subtítulo */}
            <FadeIn delay={0.6}>
              <motion.p
                className="text-xl sm:text-2xl text-gray-300 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Obrigado pelo seu interesse na mentoria
              </motion.p>
              <motion.p
                className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-8"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(251, 191, 36, 0.3)",
                    "0 0 20px rgba(251, 191, 36, 0.6)",
                    "0 0 5px rgba(251, 191, 36, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                "Do Zero ao Primeiro Contêiner"
              </motion.p>
            </FadeIn>

            {/* Estatísticas */}
            <StatsSection />

            {/* Mensagem principal */}
            <FadeIn delay={0.8} className="mb-12">
              <motion.div
                className="bg-gradient-to-r from-gray-900/60 via-gray-800/60 to-gray-900/60 rounded-2xl p-6 sm:p-8 border border-yellow-500/20 relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(245, 158, 11, 0.4)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Efeito de brilho animado */}
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

                <div className="relative z-10">
                  <motion.h2
                    className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <Clock className="w-6 h-6 text-yellow-400" />
                    Próximos Passos
                  </motion.h2>

                  <Timeline />

                  <motion.div
                    className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    <p className="text-yellow-300 font-medium mb-2">
                      🔥 Processo Seletivo Rigoroso
                    </p>
                    <p className="text-gray-300 text-sm">
                      Apenas candidatos que demonstrarem real comprometimento e potencial serão selecionados para esta primeira turma exclusiva.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Informações de contato */}
            <FadeIn delay={1.4} className="mb-8">
              <motion.div
                className="bg-gray-900/40 rounded-xl p-6 border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  Dúvidas ou Questões?
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-300">
                  <motion.a
                    href="mailto:contato@abn8trading.com"
                    className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-4 h-4" />
                    contato@abn8trading.com
                  </motion.a>

                  <span className="hidden sm:block text-gray-600">|</span>

                  <motion.a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </motion.a>
                </div>
              </motion.div>
            </FadeIn>

            {/* Redes sociais */}
            <SocialLinks />

            {/* Botão voltar ao início */}
            <FadeIn delay={1.8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <Link href={SITE_CONFIG.links.home}>
                  <AnimatedButton
                    variant="outline"
                    size="lg"
                    className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar ao Início
                  </AnimatedButton>
                </Link>
              </motion.div>
            </FadeIn>
          </div>
        </motion.div>

        {/* Rodapé com informação adicional */}
        <motion.div
          className="text-center mt-8 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p>
            © 2024 Alfredo ABN8 Trading - Mentoria de Importação Exclusiva
          </p>
          <p className="mt-1">
            Transformando iniciantes em importadores de sucesso
          </p>
        </motion.div>
      </section>
    </PageTransition>
  )
}