import PageHero from '../../components/shared/PageHero'
import GlassCard from '../../components/ui/GlassCard'
import SectionReveal from '../../components/ui/SectionReveal'

const researchItems = [
  {
    title: 'Research Cell',
    text: 'Centre for Research & Publication (CRP) encourages, conducts, and publicises research across disciplines.',
  },
  {
    title: 'MU Journal',
    text: 'Peer-reviewed publications showcasing scholarly excellence and interdisciplinary inquiry.',
  },
  {
    title: 'Newsletter',
    text: 'Quarterly updates share campus programmes, student activities, and faculty news across Bangladesh.',
  },
]

const Research = () => {
  return (
    <div>
      <PageHero title="Research" subtitle="Transforming ideas into real-world impact through collaborative research." />
      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <SectionReveal>
            <div className="rounded-[28px] bg-hero p-8 text-white">
              <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent-light)]">Research at MU</p>
              <h2 className="mt-3 font-display text-4xl">A culture of inquiry, publication, and public impact</h2>
            </div>
          </SectionReveal>
          <div className="grid gap-5 md:grid-cols-3">
            {researchItems.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.05}>
                <GlassCard className="h-full bg-white">
                  <h3 className="font-display text-3xl text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{item.text}</p>
                </GlassCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Research
