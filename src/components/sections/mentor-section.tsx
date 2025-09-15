import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { User, AlertCircle } from "lucide-react"
import { IMAGES, STATS, SECTORS } from "@/lib/constants"

export function MentorSection() {
  return (
    <section id="mentor" className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20 pt-10 border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <div className="relative aspect-[16/12] md:aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 bg-gray-900 shadow-[0_8px_30px_rgba(255,255,255,0.12)]">
            <Image
              src={IMAGES.alfredo.mentor}
              alt="Alfredo em reunião de negócios - Mentor especialista em comércio exterior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent"></div>
          </div>
        </div>
        <div className="md:col-span-7 md:pl-8 md:border-l md:border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-yellow-600" strokeWidth={1.5} />
            <h2 className="text-2xl sm:text-3xl tracking-tight text-white">Quem sou eu e por que criei essa mentoria?</h2>
          </div>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-300">
            Meu nome é <strong className="text-white">Alfredo</strong>, sou fundador da <strong className="text-white">ABN8 Trading</strong>, uma das maiores importadoras e exportadoras do Brasil. Em mais de {STATS.yearsExperience.replace('+', '')} anos de estrada, já movimentei mais de <span className="text-red-400 font-semibold">{STATS.billionMoved}</span> em operações internacionais, com mais de {STATS.productsImported.replace('+', '')} produtos importados.
          </p>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-300">
            Já atendi setores como moda, construção, alimentos, agronegócio e indústria pesada. Tudo isso com uma missão: descomplicar o comércio exterior e abrir esse mercado pra quem quer crescer de verdade. Depois de anos vendo empresários travarem no começo, resolvi criar essa mentoria — <span className="text-red-400 font-medium">prática, direta e com acompanhamento real</span>.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium tracking-tight text-white">Setores de Atuação</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {SECTORS.map((sector) => (
                  <Badge
                    key={sector}
                    variant="outline"
                    className="px-3 py-1 text-xs bg-yellow-900/50 text-yellow-400 rounded-full border border-yellow-800"
                  >
                    {sector}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-900 rounded-xl border border-yellow-800/50">
            <h3 className="text-sm font-medium tracking-tight text-white mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" strokeWidth={1.5} />
              Não é mais um curso gravado
            </h3>
            <p className="text-sm text-gray-400">É mentoria com foco em execução. Você talvez já tenha assistido vídeos, feito cursos... mas na hora de dar o primeiro passo, bate a dúvida. Foi pensando nisso que criei essa mentoria: pra andar do seu lado, passo a passo.</p>
          </div>
        </div>
      </div>
    </section>
  )
}