import PageHero from '../../components/shared/PageHero'
import GlassCard from '../../components/ui/GlassCard'
import SectionReveal from '../../components/ui/SectionReveal'
import { newsItems } from '../../services/muMockData'

const News = () => {
  return (
    <div>
      <PageHero title="News" subtitle="Latest stories, achievements, and institutional highlights from campus." />
      <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {newsItems.map((item, index) => (
            <SectionReveal key={item.id} delay={index * 0.05}>
              <GlassCard className="bg-white">
                <span className="inline-flex rounded-full bg-[var(--accent)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  {item.category}
                </span>
                <p className="mt-4 text-sm text-slate-500">{item.date}</p>
                <h2 className="mt-2 font-display text-2xl text-[var(--text-primary)]">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{item.excerpt}</p>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default News
