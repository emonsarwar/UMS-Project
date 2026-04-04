import PageHero from '../../components/shared/PageHero'
import SectionReveal from '../../components/ui/SectionReveal'
import GlassCard from '../../components/ui/GlassCard'
import { clubs, facilities } from '../../services/muMockData'

const CampusLife = () => {
  return (
    <div>
      <PageHero title="Student Life" subtitle="Clubs, facilities, and a vibrant campus community built for holistic growth." />
      <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div>
            <SectionReveal className="mb-6">
              <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]">13 Clubs & Organizations</p>
              <h2 className="mt-2 font-display text-4xl text-[var(--text-primary)]">Co-curricular excellence at MU</h2>
            </SectionReveal>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {clubs.map((club, index) => (
                <SectionReveal key={club} delay={index * 0.03}>
                  <GlassCard className="bg-[var(--surface)]">
                    <h3 className="font-display text-2xl text-[var(--text-primary)]">{club}</h3>
                    <p className="mt-2 text-sm text-slate-600">Student-led engagement, leadership, and community building.</p>
                  </GlassCard>
                </SectionReveal>
              ))}
            </div>
          </div>

          <div>
            <SectionReveal className="mb-6">
              <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]">Facilities</p>
              <h2 className="mt-2 font-display text-4xl text-[var(--text-primary)]">Support systems for modern campus life</h2>
            </SectionReveal>
            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
              {facilities.map((facility) => (
                <div key={facility} className="min-w-[220px] rounded-3xl border border-slate-200 bg-[var(--surface)] px-5 py-4 text-sm font-medium text-[var(--text-primary)] shadow-sm">
                  {facility}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CampusLife
