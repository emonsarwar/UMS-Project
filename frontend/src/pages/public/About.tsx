import PageHero from '../../components/shared/PageHero'
import GlassCard from '../../components/ui/GlassCard'
import SectionReveal from '../../components/ui/SectionReveal'
import { committees, leadership, offices, universityInfo } from '../../services/muMockData'

const About = () => {
  return (
    <div>
      <PageHero title="About Metropolitan University" subtitle="A future-focused university rooted in quality education, leadership, and innovation." />
      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionReveal>
            <GlassCard className="bg-white">
              <p className="font-accent text-xs uppercase tracking-[0.32em] text-[var(--accent)]">Institutional Vision</p>
              <h2 className="mt-3 font-display text-4xl text-[var(--text-primary)]">Education. Not Just a Degree.</h2>
              <p className="mt-4 max-w-3xl text-slate-600">
                {universityInfo.name} was founded in {universityInfo.founded} to shape principled thinkers, capable builders, and visionary leaders across disciplines.
              </p>
            </GlassCard>
          </SectionReveal>

          <div id="leadership" className="grid gap-6 lg:grid-cols-3">
            {leadership.map((item, index) => (
              <SectionReveal key={item.id} delay={index * 0.05}>
                <GlassCard className="bg-white">
                  <p className="font-accent text-xs uppercase tracking-[0.3em] text-[var(--accent)]">{item.title}</p>
                  <h3 className="mt-3 font-display text-2xl text-[var(--text-primary)]">{item.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>

          <div id="committees" className="grid gap-6 lg:grid-cols-2">
            <SectionReveal>
              <GlassCard className="bg-[var(--surface-dark)] text-white">
                <h3 className="font-display text-2xl">Key Committees</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  {committees.slice(0, 6).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </GlassCard>
            </SectionReveal>
            <SectionReveal>
              <GlassCard className="bg-white">
                <h3 className="font-display text-2xl text-[var(--text-primary)]">Accreditation & Standards</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Metropolitan University operates under the University Grants Commission of Bangladesh and continues its quality enhancement through academic oversight and IQAC-led continuous improvement.
                </p>
              </GlassCard>
            </SectionReveal>
          </div>

          <SectionReveal id="offices">
            <GlassCard className="bg-white">
              <h3 className="font-display text-2xl text-[var(--text-primary)]">Campus Offices</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {offices.slice(0, 6).map((office) => (
                  <div key={office} className="rounded-2xl bg-[var(--surface)] p-4 text-sm text-slate-600">
                    <p className="font-semibold text-[var(--secondary)]">{office}</p>
                    <p className="mt-1">Open Sunday to Thursday during regular university hours.</p>
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

export default About
