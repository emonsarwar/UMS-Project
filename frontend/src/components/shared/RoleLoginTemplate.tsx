import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import type { Role } from '../../types'

interface RoleLoginTemplateProps {
  role: Role
  heading: string
}

const quotes: Record<Role, string[]> = {
  student: ['“Education. Not Just a Degree.”', '“Your next chapter begins at Metropolitan University.”'],
  teacher: ['“Teaching is leadership in motion.”', '“Academic excellence grows through mentorship.”'],
  admin: ['“Operational excellence sustains academic excellence.”', '“Systems create trust across the university.”'],
}

const redirectByRole: Record<Role, string> = {
  student: '/portal/student/dashboard',
  teacher: '/portal/teacher/dashboard',
  admin: '/portal/admin/dashboard',
}

const helpText: Record<Role, string> = {
  student: 'Demo: STU-2024-CSE-001 / student@123',
  teacher: 'Demo: TCH-001 / teacher@123',
  admin: 'Demo: ADM-001 / admin@123',
}

const RoleLoginTemplate = ({ role, heading }: RoleLoginTemplateProps) => {
  const [form, setForm] = useState({ id: '', password: '' })
  const [errors, setErrors] = useState<{ id?: string; password?: string }>({})
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [shake, setShake] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes[role].length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [role])

  const quote = useMemo(() => quotes[role][quoteIndex], [quoteIndex, role])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: typeof errors = {}

    if (!form.id.trim()) nextErrors.id = 'ID or email is required.'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setShake(false)
    const user = await login(form.id, form.password, role)
    setSubmitting(false)

    if (!user) {
      setShake(true)
      toast.error('Invalid credentials. Please try again.')
      return
    }

    toast.success(`Welcome back, ${user.name}.`)
    navigate(redirectByRole[role])
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] lg:grid lg:grid-cols-2">
      <div className="relative flex items-center overflow-hidden bg-hero px-6 py-12 text-white">
        <div className="mesh-background absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-xl">
          <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent-light)]">Metropolitan University</p>
          <h1 className="mt-3 font-display text-5xl">Education. Not Just a Degree.</h1>
          <p className="mt-4 max-w-lg text-slate-200">A refined digital portal for students, educators, and administrators at MU.</p>
          <motion.blockquote
            key={quote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-md border-l-2 border-[var(--accent)] pl-4 font-display text-2xl text-[var(--accent-light)]"
          >
            {quote}
          </motion.blockquote>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl ${shake ? 'animate-shake' : ''}`}>
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-[var(--secondary)]">
            <ArrowLeft size={16} /> Back to role selector
          </Link>
          <h2 className="mt-5 font-display text-4xl text-[var(--text-primary)]">{heading}</h2>
          <p className="mt-2 text-sm text-slate-500">{helpText[role]}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <input
                value={form.id}
                onChange={(event) => setForm((current) => ({ ...current, id: event.target.value }))}
                placeholder="ID or email"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(201,168,76,0.15)]"
              />
              {errors.id ? <p className="mt-1 text-xs text-red-500">{errors.id}</p> : null}
            </div>
            <div>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Password"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[rgba(201,168,76,0.15)]"
              />
              {errors.password ? <p className="mt-1 text-xs text-red-500">{errors.password}</p> : null}
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-[var(--secondary)]">Forgot Password?</a>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-light))] px-4 py-3 font-semibold text-[var(--primary)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
              Login
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default RoleLoginTemplate
