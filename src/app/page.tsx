import { ScrollToTop } from "@/components/layout/scroll-to-top"
import { HeroSection } from "@/components/sections/hero-section"
import { MentorSection } from "@/components/sections/mentor-section"
import { AchievementsSection } from "@/components/sections/achievements-section"
import { ScheduleSection } from "@/components/sections/schedule-section"
import { IncludesSection } from "@/components/sections/includes-section"
import { TargetAudienceSection } from "@/components/sections/target-audience-section"
import { CtaSection } from "@/components/sections/cta-section"

export default function Home() {
  return (
    <div className="antialiased selection:bg-white selection:text-black text-white bg-black min-h-screen">
      <div className="absolute w-full h-[816px] left-0 top-0 -z-10"></div>

      <HeroSection />
      <MentorSection />
      <AchievementsSection />
      <ScheduleSection />
      <IncludesSection />
      <TargetAudienceSection />
      <CtaSection />

      <ScrollToTop />
    </div>
  )
}