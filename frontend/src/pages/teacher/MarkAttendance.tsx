import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import { courses, students, teachers } from '../../services/muMockData'
import { useAuth } from '../../hooks/useAuth'

const statuses = ['Present', 'Late', 'Absent'] as const

type Status = (typeof statuses)[number]

const MarkAttendance = () => {
  const { user } = useAuth()
  const teacher = teachers.find((item) => item.id === user?.id) ?? teachers[0]
  const assigned = courses.filter((course) => course.teacher === teacher.name)
  const [courseCode, setCourseCode] = useState(assigned[0]?.code ?? '')
  const [date, setDate] = useState('2026-03-30')
  const [attendance, setAttendance] = useState<Record<string, Status>>(
    Object.fromEntries(students.slice(0, 8).map((student) => [student.id, 'Present'])),
  )

  const visibleStudents = useMemo(() => students.slice(0, 8), [])

  const submit = () => {
    toast.success(`Attendance submitted for ${courseCode} on ${date}.`)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <GlassCard className="bg-white">
        <div className="flex flex-wrap gap-3">
          <select value={courseCode} onChange={(event) => setCourseCode(event.target.value)} className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none">
            {assigned.map((course) => <option key={course.code} value={course.code}>{course.code}</option>)}
          </select>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none" />
          <button type="button" onClick={() => setAttendance(Object.fromEntries(visibleStudents.map((student) => [student.id, 'Present'])))} className="rounded-full bg-[var(--secondary)] px-4 py-2 text-sm font-semibold text-white">
            Mark all present
          </button>
        </div>
      </GlassCard>

      <GlassCard className="bg-white">
        <h2 className="font-display text-3xl text-[var(--text-primary)]">Student attendance list</h2>
        <div className="mt-4 space-y-3">
          {visibleStudents.map((student) => (
            <div key={student.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{student.name}</p>
                <p className="text-sm text-slate-500">{student.id}</p>
              </div>
              <div className="flex gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setAttendance((current) => ({ ...current, [student.id]: status }))}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${attendance[student.id] === status ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] text-slate-600'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={submit} className="mt-5 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--primary)]">
          Submit Attendance
        </button>
      </GlassCard>
    </motion.div>
  )
}

export default MarkAttendance
