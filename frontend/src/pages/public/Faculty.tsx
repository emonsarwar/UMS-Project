import PageHero from '../../components/shared/PageHero'
import GlassCard from '../../components/ui/GlassCard'
import SectionReveal from '../../components/ui/SectionReveal'
import { teachers } from '../../services/muMockData'

const Faculty = () => {
  return (
    <div>
      <PageHero title="Faculty" subtitle="Meet Metropolitan University's distinguished educators, researchers, and mentors." />
      <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {teachers.map((teacher, index) => (
            <SectionReveal key={teacher.id} delay={index * 0.03}>
              <GlassCard className="bg-white">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-hero text-xl text-[var(--accent-light)]">
                    {teacher.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-[var(--text-primary)]">{teacher.name}</h2>
                    <p className="text-sm font-semibold text-[var(--secondary)]">{teacher.designation}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">Department: {teacher.department}</p>
                <p className="mt-1 text-sm text-slate-500">Research Focus: {teacher.researchArea}</p>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Faculty
