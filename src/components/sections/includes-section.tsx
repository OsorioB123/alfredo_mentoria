import { Card, CardContent } from "@/components/ui/card"
import { Package, Video, FileText, Users } from "lucide-react"
import { INCLUDES } from "@/lib/constants"

const iconMap = {
  "6 Encontros ao Vivo": Video,
  "Material Completo": FileText,
  "Comunidade Fechada": Users,
}

export function IncludesSection() {
  return (
    <section className="max-w-7xl sm:px-6 sm:mt-20 border-white/10 border-t mt-16 mr-auto ml-auto pt-10 pr-4 pl-4">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-5 h-5 text-yellow-600" strokeWidth={1.5} />
        <h2 className="text-xl sm:text-2xl tracking-tight text-white">O que está incluído</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INCLUDES.map((include) => {
          const Icon = iconMap[include.title as keyof typeof iconMap]
          return (
            <Card key={include.title} className="rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-sm">
              <CardContent className="p-0">
                <div className="w-12 h-12 rounded-full bg-yellow-900/50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-yellow-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2 text-white">{include.title}</h3>
                <p className="text-sm text-gray-400">{include.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}