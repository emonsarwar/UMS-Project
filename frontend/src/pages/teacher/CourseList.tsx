import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import { courses, students, teachers } from '../../services/muMockData'
import { useAuth } from '../../hooks/useAuth'

const CourseList = () => {
  const { user } = useAuth()
  const teacher = teachers.find((item) => item.id === user?.id) ?? teachers[0]
  const assigned = courses.filter((course) => course.teacher === teacher.name)
  const [expanded, setExpanded] = useState<string | null>(assigned[0]?.code ?? null)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {assigned.map((course) => (
        <GlassCard key={course.code} className="bg-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl text-[var(--text-primary)]">{course.title}</h2>
              <p className="text-sm text-slate-500">{course.code} • {course.schedule} • Section {course.section}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setExpanded((current) => current === course.code ? null : course.code)} className="rounded-full border border-slate-200 px-4 py-2 text-sm">
                {expanded === course.code ? 'Hide details' : 'Expand details'}
              </button>
              <button type="button" className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">Export roster</button>
            </div>
          </div>
          {expanded === course.code ? (
            <div className="mt-4 rounded-2xl bg-[var(--surface)] p-4 text-sm text-slate-600">
              <p className="mb-2 font-semibold text-[var(--secondary)]">Sample roster</p>
              <ul className="space-y-1">
                {students.slice(0, 5).map((student) => (
                  <li key={`${course.code}-${student.id}`}>{student.name} • {student.id}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </GlassCard>
      ))}
    </motion.div>
  )
}

export default CourseList
