import { Award, Building2, GraduationCap, ShieldCheck, Users } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter'
import { dashboardStats } from '../../services/muMockData'

const stats = [
  { icon: GraduationCap, value: dashboardStats.students, suffix: '+', label: 'Students' },
  { icon: Users, value: dashboardStats.faculty, suffix: '+', label: 'Faculty' },
  { icon: Building2, value: dashboardStats.departments, suffix: '', label: 'Departments' },
  { icon: Award, value: dashboardStats.years, suffix: '+', label: 'Years' },
  { icon: ShieldCheck, value: dashboardStats.clubs, suffix: '', label: 'Clubs' },
]

const StatsBar = () => {
  return (
    <section className="bg-[var(--primary)] px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ icon: Icon, value, suffix, label }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
            <div className="rounded-2xl bg-[var(--accent)]/15 p-3 text-[var(--accent-light)]">
              <Icon size={24} />
            </div>
            <div>
              <p className="font-display text-3xl">
                <AnimatedCounter value={value} suffix={suffix} />
              </p>
              <p className="font-accent text-xs uppercase tracking-[0.32em] text-slate-300">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsBar
