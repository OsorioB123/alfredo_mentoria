import { ThumbsUp, ThumbsDown, Check, X } from "lucide-react"
import { FOR_YOU, NOT_FOR_YOU } from "@/lib/constants"

export function TargetAudienceSection() {
  return (
    <section className="max-w-7xl sm:px-6 sm:mt-20 border-white/10 border-t mt-16 mr-auto ml-auto pt-10 pr-4 pl-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Para você */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <ThumbsUp className="w-5 h-5 text-yellow-600" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold tracking-tight text-white">Essa mentoria é pra você que:</h3>
          </div>
          <div className="space-y-3">
            {FOR_YOU.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-yellow-900/20 rounded-xl border border-yellow-800/50">
                <Check className="w-5 h-5 text-yellow-400 mt-0.5" strokeWidth={1.5} />
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Não é para você */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <ThumbsDown className="w-5 h-5 text-red-400" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold tracking-tight text-white">E não é pra você se:</h3>
          </div>
          <div className="space-y-3">
            {NOT_FOR_YOU.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-red-900/20 rounded-xl border border-red-800/50">
                <X className="w-5 h-5 text-red-400 mt-0.5" strokeWidth={1.5} />
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}