"use client"

import { motion } from "framer-motion"
import { Target, Check, Users, Ship, ShoppingCart } from "lucide-react"
import { ACHIEVEMENTS } from "@/lib/constants"
import { AchievementCard } from "@/components/ui/animated-card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in"

const iconMap = {
  "Produto Validado": Check,
  "Fornecedores Confiáveis": Users,
  "Primeiro Pedido": Ship,
  "Estrutura de Vendas": ShoppingCart,
}

export function AchievementsSection() {
  return (
    <section id="programa" className="max-w-7xl sm:px-6 sm:mt-20 border-white/10 border-t mt-16 mr-auto ml-auto pt-10 pr-4 pl-4">
      {/* Header animado */}
      <FadeIn className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <Target className="w-5 h-5 text-yellow-600" strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-xl sm:text-2xl tracking-tight text-white">O que você vai conquistar</h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="text-sm sm:text-base text-gray-300 mb-8">
        Ao final das 6 semanas, você vai:
      </FadeIn>

      {/* Grid de conquistas com stagger animation */}
      <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACHIEVEMENTS.map((achievement, index) => {
          const Icon = iconMap[achievement.title as keyof typeof iconMap]
          return (
            <StaggerItem key={achievement.title}>
              <AchievementCard
                icon={<Icon className="w-5 h-5 text-yellow-400" strokeWidth={1.5} />}
                title={achievement.title}
                description={achievement.description}
                delay={index * 0.1}
              />
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      {/* Card de destaque */}
      <FadeIn delay={1} className="mt-8">
        <motion.div
          className="p-6 bg-gradient-to-r from-yellow-900/20 to-red-900/20 rounded-2xl border border-yellow-800/50 text-center relative overflow-hidden"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
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

          <motion.h3
            className="text-lg font-semibold tracking-tight text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            E o melhor:
          </motion.h3>
          <motion.p
            className="text-sm text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            Tudo isso com clareza, sem enrolação e com um plano de ação real.
          </motion.p>
        </motion.div>
      </FadeIn>
    </section>
  )
}