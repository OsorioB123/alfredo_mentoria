import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import { WEEKLY_SCHEDULE } from "@/lib/constants"

export function ScheduleSection() {
  return (
    <section id="cronograma" className="max-w-7xl sm:px-6 sm:mt-20 border-white/10 border-t mt-16 mr-auto ml-auto pt-10 pr-4 pl-4">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-yellow-600" strokeWidth={1.5} />
        <h2 className="text-xl sm:text-2xl tracking-tight text-white">O caminho das 6 semanas</h2>
      </div>

      <div className="space-y-6">
        {WEEKLY_SCHEDULE.map((week) => (
          <Card key={week.week} className="rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-sm">
            <CardContent className="p-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-semibold">
                  {week.week}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold tracking-tight mb-2 text-white">{week.title}</h3>
                  <ul className="space-y-1 text-sm text-gray-400">
                    {week.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-yellow-600" strokeWidth={1.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}