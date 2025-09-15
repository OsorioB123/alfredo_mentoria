import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { SITE_CONFIG, STATS } from "@/lib/constants"

export function CtaSection() {
  return (
    <section id="aplicacao" className="max-w-7xl sm:px-6 sm:mt-24 mt-16 mr-auto mb-16 ml-auto pt-10 pr-4 pl-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gray-900 text-white p-6 sm:p-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(255,215,0,0.07),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(255,215,0,0.06),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffd70020_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>
        </div>

        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Como funciona a seleção
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Essa mentoria não é pra todo mundo — e não tô dizendo isso por marketing. São apenas <span className="text-red-400 font-semibold">{STATS.maxStudents} vagas</span> nessa primeira turma, justamente pra eu acompanhar cada pessoa de perto e garantir resultado real.
            </p>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/80 mb-8">O processo de seleção é feito através de um formulário detalhado, onde você responderá algumas perguntas para avaliarmos se seu perfil é compatível com a mentoria.</p>

            <Button asChild className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold tracking-tight text-white bg-red-600 hover:bg-red-700 transition-colors border border-red-600">
              <a href={SITE_CONFIG.links.application}>
                <Send className="w-5 h-5" strokeWidth={1.5} />
                <span>Quero Me Inscrever</span>
              </a>
            </Button>

            <p className="mt-4 text-sm text-white/60">
              Se ainda tiver vaga, nossa equipe vai entrar em contato direto com você.
            </p>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
              Bora tirar sua ideia do papel?
            </h3>
            <p className="text-white/70">
              Faz parte da primeira turma do Do Zero ao Primeiro Contêiner.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}