"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Users, Target } from "lucide-react"
import { IMAGES, STATS, SITE_CONFIG } from "@/lib/constants"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { UrgencyBanner } from "@/components/ui/urgency-banner"
// import { AnimatedStat } from "@/components/ui/animated-number"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in"

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
} as any

export function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          {/* Título animado com efeito sequencial */}
          <motion.h1
            className="leading-none text-white tracking-tight"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="block text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-semibold">
              <motion.span
                className="tracking-tighter inline-block"
                variants={wordVariants}
                style={{ transformOrigin: "50% 100%" }}
              >
                Do Zero ao
              </motion.span>
              <span className="block"></span>
              <motion.span
                className="tracking-tighter inline-block"
                variants={wordVariants}
                style={{ transformOrigin: "50% 100%" }}
              >
                Primeiro
              </motion.span>
              <span className="block"></span>
              <motion.span
                className="tracking-tighter inline-block bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent"
                variants={wordVariants}
                style={{ transformOrigin: "50% 100%" }}
              >
                Contêiner
              </motion.span>
            </span>
          </motion.h1>

          {/* Descrição com fade in */}
          <FadeIn delay={1.2} className="sm:mt-5 sm:text-3xl leading-relaxed max-w-2xl text-base text-gray-300 tracking-tight mt-4">
            {SITE_CONFIG.description}
          </FadeIn>

          {/* CTA Button com efeito especial */}
          <FadeIn delay={1.5} className="mt-6 flex flex-col sm:flex-row gap-3">
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.02, 1],
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 4
                }
              }}
            >
              {/* Efeito de brilho de call attention */}
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

              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() => window.location.href = SITE_CONFIG.links.application}
                className="flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Garantir Minha Vaga Agora
              </AnimatedButton>
            </motion.div>
          </FadeIn>

          {/* Urgency Banner */}
          <FadeIn delay={1.8} className="mt-6">
            <UrgencyBanner
              totalSpots={10}
              spotsRemaining={7}
              showTimer={true}
            />
          </FadeIn>

          {/* Features com stagger animation */}
          <StaggerContainer staggerDelay={0.15} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StaggerItem className="flex items-start gap-3 border-t border-white/10 pt-4">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <Clock className="w-[18px] h-[18px] text-yellow-600 mt-0.5" strokeWidth={1.5} />
              </motion.div>
              <div>
                <p className="text-sm font-medium tracking-tight text-white">
                  <span>{STATS.programDuration} semanas intensivas</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Mentoria ao vivo</p>
              </div>
            </StaggerItem>

            <StaggerItem className="flex items-start gap-3 border-t border-white/10 pt-4">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Users className="w-[18px] h-[18px] text-yellow-600 mt-0.5" strokeWidth={1.5} />
              </motion.div>
              <div>
                <p className="text-sm font-medium tracking-tight text-white">
                  Apenas <span className="text-red-400 font-semibold">
                    <span>{STATS.maxStudents} vagas</span>
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Primeira turma</p>
              </div>
            </StaggerItem>

            <StaggerItem className="flex gap-3 border-white/10 border-t pt-4 items-start">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <Target className="w-[18px] h-[18px] text-yellow-600 mt-0.5" strokeWidth={1.5} />
              </motion.div>
              <div>
                <p className="text-sm font-medium tracking-tight text-white">Foco na execução</p>
                <p className="text-xs text-gray-500 mt-0.5">Resultado real</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Imagem do Alfredo com stats animados */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <FadeIn delay={0.8} direction="right">
            <motion.div
              className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden shadow-[0_8px_30px_rgba(255,255,255,0.12)] bg-gray-900 rounded-3xl border border-white/5"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <Image
                src={IMAGES.alfredo.hero}
                alt="Alfredo em ambiente empresarial - Fundador da ABN8 Trading"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              {/* Stats cards animados */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                <AnimatedCard className="rounded-xl bg-black/20 backdrop-blur-md border border-yellow-600/30 p-3 shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-lg font-semibold text-white tracking-tight">
                      {STATS.billionMoved}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70">Movimentado</p>
                </AnimatedCard>
                <AnimatedCard className="rounded-xl bg-black/20 backdrop-blur-md border border-yellow-600/30 p-3 shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-lg font-semibold tracking-tight text-white">
                      {STATS.yearsExperience}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70">Anos</p>
                </AnimatedCard>
                <AnimatedCard className="rounded-xl bg-black/20 backdrop-blur-md border border-yellow-600/30 p-3 shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-lg font-semibold tracking-tight text-white">
                      {STATS.productsImported}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70">Produtos</p>
                </AnimatedCard>
              </motion.div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}