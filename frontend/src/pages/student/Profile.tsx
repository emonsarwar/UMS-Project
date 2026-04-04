import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import { useAuth } from '../../hooks/useAuth'
import { students } from '../../services/muMockData'

const Profile = () => {
  const { user } = useAuth()
  const student = students.find((item) => item.id === user?.id) ?? students[0]
  const [form, setForm] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone ?? '',
    address: student.address,
    guardian: student.guardian,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}

    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (form.phone.trim().length < 8) nextErrors.phone = 'Enter a valid phone number.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    toast.success('Profile saved successfully.')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <GlassCard className="bg-white">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-hero text-2xl text-[var(--accent-light)]">
            {student.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
          </div>
          <h2 className="mt-4 font-display text-3xl text-[var(--text-primary)]">{student.name}</h2>
          <p className="text-sm text-slate-500">{student.department}</p>
        </div>
        <div className="mt-6 space-y-2 rounded-2xl bg-[var(--surface)] p-4 text-sm text-slate-600">
          <p>Roll: {student.rollNumber}</p>
          <p>Semester: {student.semester}</p>
          <p>Session: {student.session}</p>
          <p>Transport Route: {student.transportRoute}</p>
        </div>
      </GlassCard>

      <GlassCard className="bg-white">
        <h2 className="font-display text-3xl text-[var(--text-primary)]">Student profile</h2>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ['name', 'Full name'],
            ['email', 'Email'],
            ['phone', 'Phone'],
            ['guardian', 'Guardian'],
          ].map(([field, label]) => (
            <div key={field}>
              <input
                value={form[field as keyof typeof form]}
                onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
                placeholder={label}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[var(--accent)]"
              />
              {errors[field] ? <p className="mt-1 text-xs text-red-500">{errors[field]}</p> : null}
            </div>
          ))}
          <div className="md:col-span-2">
            <textarea
              rows={4}
              value={form.address}
              onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
              placeholder="Address"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <label className="rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-600">Upload NID</label>
            <label className="rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-600">Upload Certificates</label>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--secondary)]">
              Save Changes
            </button>
          </div>
        </form>
      </GlassCard>
    </motion.div>
  )
}

export default Profile
