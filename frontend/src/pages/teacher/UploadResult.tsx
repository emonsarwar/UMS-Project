import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import { courses, students, teachers } from '../../services/muMockData'
import { useAuth } from '../../hooks/useAuth'

const UploadResult = () => {
  const { user } = useAuth()
  const teacher = teachers.find((item) => item.id === user?.id) ?? teachers[0]
  const assigned = courses.filter((course) => course.teacher === teacher.name)
  const [courseCode, setCourseCode] = useState(assigned[0]?.code ?? '')
  const [examType, setExamType] = useState('Midterm')
  const [published, setPublished] = useState(false)
  const [grades, setGrades] = useState<Record<string, string>>(
    Object.fromEntries(students.slice(0, 8).map((student) => [student.id, ''])),
  )

  const handleSubmit = () => {
    const hasEmpty = Object.values(grades).some((value) => !value.trim())
    if (hasEmpty) {
      toast.error('Please provide grades for all students.')
      return
    }
    toast.success(`${examType} result saved for ${courseCode} as ${published ? 'published' : 'draft'}.`)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <GlassCard className="bg-white">
        <div className="flex flex-wrap gap-3">
          <select value={courseCode} onChange={(event) => setCourseCode(event.target.value)} className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none">
            {assigned.map((course) => <option key={course.code}>{course.code}</option>)}
          </select>
          <select value={examType} onChange={(event) => setExamType(event.target.value)} className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none">
            {['Midterm', 'Final', 'Assignment'].map((type) => <option key={type}>{type}</option>)}
          </select>
          <button type="button" className="rounded-full border border-slate-200 px-4 py-2 text-sm">Import CSV</button>
          <button type="button" onClick={() => setPublished((current) => !current)} className={`rounded-full px-4 py-2 text-sm font-semibold ${published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
            {published ? 'Published' : 'Draft'}
          </button>
        </div>
      </GlassCard>

      <GlassCard className="bg-white">
        <h2 className="font-display text-3xl text-[var(--text-primary)]">Grade entry</h2>
        <div className="mt-4 space-y-3">
          {students.slice(0, 8).map((student) => (
            <div key={student.id} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_180px] md:items-center">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{student.name}</p>
                <p className="text-sm text-slate-500">{student.id}</p>
              </div>
              <input
                value={grades[student.id]}
                onChange={(event) => setGrades((current) => ({ ...current, [student.id]: event.target.value }))}
                placeholder="Grade / score"
                className="rounded-2xl border border-slate-200 px-4 py-2 outline-none focus:border-[var(--accent)]"
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={handleSubmit} className="mt-5 rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--primary)]">
          Save Results
        </button>
      </GlassCard>
    </motion.div>
  )
}

export default UploadResult
