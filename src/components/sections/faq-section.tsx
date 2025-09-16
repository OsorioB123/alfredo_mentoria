"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle } from "lucide-react"
import { useState } from "react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/fade-in"

const faqs = [
  {
    id: 1,
    question: "Preciso ter CNPJ para participar?",
    answer: "Não é obrigatório ter CNPJ para participar da mentoria. Durante as 6 semanas, eu vou te orientar sobre quando e como abrir, se for o caso. O importante é ter vontade de aprender e executar."
  },
  {
    id: 2,
    question: "Nunca importei nada. Consigo acompanhar?",
    answer: "Perfeitamente! A mentoria foi criada exatamente para quem está começando do zero. Vamos desde os conceitos básicos até você fazer seu primeiro pedido. É literalmente 'Do Zero ao Primeiro Contêiner'."
  },
  {
    id: 3,
    question: "Quanto capital preciso ter para começar?",
    answer: "O valor varia conforme o produto escolhido, mas em geral você consegue começar com R$ 15.000 a R$ 30.000 para seu primeiro contêiner. Durante a mentoria, vamos mapear exatamente quanto você vai precisar para SEU projeto específico."
  },
  {
    id: 4,
    question: "As aulas ficam gravadas?",
    answer: "Sim! Todos os encontros ao vivo ficam gravados e você tem acesso por 12 meses. Mas a magia acontece ao vivo, onde posso tirar suas dúvidas específicas e te ajudar na prática."
  },
  {
    id: 5,
    question: "E se eu não conseguir acompanhar ao vivo?",
    answer: "Não tem problema! As gravações ficam disponíveis e você pode tirar dúvidas no grupo da turma. Mas recomendo fortemente tentar participar ao vivo pelo menos de 4 dos 6 encontros para aproveitar melhor."
  },
  {
    id: 6,
    question: "Quais produtos posso importar?",
    answer: "Praticamente qualquer coisa! Eletrônicos, decoração, moda, utensílios, ferramentas... Durante a mentoria, vamos validar junto qual produto faz mais sentido para seu perfil e mercado."
  },
  {
    id: 7,
    question: "Tem suporte individual?",
    answer: "Além dos encontros semanais, você terá acesso ao grupo exclusivo da turma onde eu respondo dúvidas diariamente. Para casos mais complexos, posso abrir chamadas extras conforme a necessidade."
  },
  {
    id: 8,
    question: "E se eu não conseguir importar durante a mentoria?",
    answer: "Meu compromisso é que você saia com seu primeiro pedido em andamento. Se por algum motivo isso não acontecer por falha minha no acompanhamento, estendo seu acesso até conseguirmos."
  }
]

interface FAQItemProps {
  faq: typeof faqs[0]
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItem({ faq, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <StaggerItem>
      <motion.div
        className="border border-white/10 rounded-xl bg-gray-900/50 backdrop-blur-sm overflow-hidden"
        whileHover={{ borderColor: "rgba(202, 138, 4, 0.3)" }}
        transition={{ duration: 0.2 }}
      >
        <motion.button
          className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors duration-200"
          onClick={onToggle}
          whileTap={{ scale: 0.995 }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              className="w-8 h-8 rounded-full bg-yellow-600/20 border border-yellow-600/30 flex items-center justify-center flex-shrink-0 mt-0.5"
              animate={{
                backgroundColor: isOpen ? "rgba(202, 138, 4, 0.2)" : "rgba(202, 138, 4, 0.1)",
                borderColor: isOpen ? "rgba(202, 138, 4, 0.4)" : "rgba(202, 138, 4, 0.2)"
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-semibold text-yellow-400">
                {(index + 1).toString().padStart(2, '0')}
              </span>
            </motion.div>

            <h3 className="text-lg font-medium text-white leading-relaxed">
              {faq.question}
            </h3>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <Plus className="w-5 h-5 text-gray-400" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 pb-6">
                <div className="pl-12">
                  <motion.p
                    className="text-gray-300 leading-relaxed"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {faq.answer}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </StaggerItem>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <FadeIn className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <HelpCircle className="w-8 h-8 text-yellow-600" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Dúvidas Frequentes
          </h2>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Separei as principais dúvidas que sempre recebo sobre a mentoria. Se a sua não estiver aqui, pode me chamar!
        </p>
      </FadeIn>

      <StaggerContainer staggerDelay={0.1} className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openItems.includes(faq.id)}
              onToggle={() => toggleItem(faq.id)}
              index={index}
            />
          ))}
        </div>
      </StaggerContainer>

      {/* CTA adicional */}
      <FadeIn delay={0.8} className="text-center mt-12">
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600/10 border border-yellow-600/30 rounded-full text-yellow-400"
          whileHover={{ scale: 1.02, backgroundColor: "rgba(202, 138, 4, 0.15)" }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💬
          </motion.div>
          <span className="text-sm font-medium">
            Ainda tem dúvidas? Nossa equipe responde em até 2 horas
          </span>
        </motion.div>
      </FadeIn>
    </section>
  )
}