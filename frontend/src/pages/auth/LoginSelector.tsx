import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, ShieldCheck, UserRoundCog } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlassCard from '../../components/ui/GlassCard'

const roles = [
  { title: 'Student Portal', description: 'Access your courses, attendance, results & fees.', icon: GraduationCap, to: '/login/student' },
  { title: 'Teacher Panel', description: 'Manage courses, mark attendance, and upload results.', icon: UserRoundCog, to: '/login/teacher' },
  { title: 'Admin Dashboard', description: 'Full university management, notices, analytics, and admissions.', icon: ShieldCheck, to: '/login/admin' },
]

const LoginSelector = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero px-4 py-16 text-white">
      <div className="mesh-background absolute inset-0 opacity-75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl text-center">
        <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent-light)]">Welcome to MU Portal</p>
        <h1 className="mt-3 font-display text-5xl">Education. Not Just a Degree.</h1>
        <p className="mt-3 text-slate-200">Secure access for students, teachers, and university administrators.</p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {roles.map(({ title, description, icon: Icon, to }, index) => (
            <motion.div key={title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
              <GlassCard className="h-full bg-white/5 text-left text-white">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-light)] ring-1 ring-[rgba(240,208,106,0.4)]">
                  <Icon size={24} />
                </div>
                <h2 className="font-display text-3xl">{title}</h2>
                <p className="mt-3 text-sm text-slate-300">{description}</p>
                <Link to={to} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-light))] px-5 py-3 font-semibold text-[var(--primary)] transition hover:-translate-y-0.5">
                  Login as {title.split(' ')[0]} <ArrowRight size={16} />
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoginSelector
