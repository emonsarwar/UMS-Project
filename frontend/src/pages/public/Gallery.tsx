import PageHero from '../../components/shared/PageHero'
import SectionReveal from '../../components/ui/SectionReveal'
import { galleryItems } from '../../services/muMockData'

const Gallery = () => {
  return (
    <div>
      <PageHero title="Gallery" subtitle="Moments of scholarship, discovery, and campus elegance." />
      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <SectionReveal key={item.id} delay={index * 0.04}>
              <div className={`group flex min-h-[250px] items-end rounded-3xl bg-gradient-to-br ${item.gradient} p-5 text-white`}>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/75">{item.category}</p>
                  <h2 className="mt-2 font-display text-3xl">{item.title}</h2>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Gallery
