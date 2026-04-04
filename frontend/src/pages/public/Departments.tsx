import PageHero from '../../components/shared/PageHero'
import SectionReveal from '../../components/ui/SectionReveal'
import { departments } from '../../services/muMockData'

const Departments = () => {
  return (
    <div>
      <PageHero title="Departments" subtitle="Explore premium programs across technology, arts, business, medicine, and beyond." />
      <section className="bg-[var(--surface)] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {departments.map((department, index) => (
            <SectionReveal key={department.id} delay={index * 0.03}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-gold">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-3xl">{department.icon}</span>
                  <span className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs text-white">{department.courses} courses</span>
                </div>
                <h2 className="font-display text-2xl text-[var(--text-primary)]">{department.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{department.shortDesc}</p>
                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>Head: {department.head}</p>
                  <p>{department.students} students • {department.teachers} teachers</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Departments
