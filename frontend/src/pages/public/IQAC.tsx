import PageHero from '../../components/shared/PageHero'
import GlassCard from '../../components/ui/GlassCard'
import SectionReveal from '../../components/ui/SectionReveal'
import { policies } from '../../services/muMockData'

const IQAC = () => {
  return (
    <div>
      <PageHero title="IQAC" subtitle="Institutional Quality Assurance Cell supporting academic standards and continuous improvement." />
      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionReveal>
            <GlassCard className="bg-hero text-white">
              <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent-light)]">Quality Framework</p>
              <h2 className="mt-3 font-display text-4xl">Academic integrity, review, and enhancement</h2>
              <p className="mt-4 text-sm text-slate-200">IQAC coordinates quality initiatives, policy reviews, and evidence-based academic improvement across the university.</p>
            </GlassCard>
          </SectionReveal>
          <SectionReveal>
            <GlassCard className="bg-white">
              <h2 className="font-display text-3xl text-[var(--text-primary)]">Policies & resources</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {policies.map((policy) => (
                  <div key={policy} className="rounded-2xl bg-[var(--surface)] px-4 py-3 text-sm text-slate-600">
                    {policy}
                  </div>
                ))}
              </div>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>
    </div>
  )
}

export default IQAC
