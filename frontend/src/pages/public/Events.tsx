import PageHero from '../../components/shared/PageHero'
import GlassCard from '../../components/ui/GlassCard'
import SectionReveal from '../../components/ui/SectionReveal'
import { events } from '../../services/muMockData'

const Events = () => {
  return (
    <div>
      <PageHero title="Events" subtitle="A curated calendar of academic, cultural, and innovation experiences." />
      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-4">
          {events.map((event, index) => (
            <SectionReveal key={event.id} delay={index * 0.05}>
              <GlassCard className="bg-white">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-accent text-xs uppercase tracking-[0.3em] text-[var(--accent)]">{event.date}</p>
                    <h2 className="mt-2 font-display text-3xl text-[var(--text-primary)]">{event.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{event.description}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--surface)] px-4 py-3 text-sm text-slate-600">{event.location}</div>
                </div>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Events
