import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import Modal from '../../components/ui/Modal'
import DataTable from '../../components/ui/DataTable'
import { courses } from '../../services/muMockData'

const CourseRegistration = () => {
  const [selectedCodes, setSelectedCodes] = useState<string[]>(courses.slice(0, 4).map((course) => course.code))
  const [pending, setPending] = useState<{ code: string; mode: 'add' | 'drop' } | null>(null)

  const registeredCourses = useMemo(
    () => courses.filter((course) => selectedCodes.includes(course.code)),
    [selectedCodes],
  )
  const totalCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0)

  const confirmAction = () => {
    if (!pending) return
    const course = courses.find((item) => item.code === pending.code)
    if (!course) return

    if (pending.mode === 'add') {
      if (totalCredits + course.credits > 18) {
        toast('Credit hour limit exceeded.', { icon: '⚠️' })
      } else {
        setSelectedCodes((current) => [...current, course.code])
        toast.success(`${course.code} added successfully.`)
      }
    } else {
      setSelectedCodes((current) => current.filter((code) => code !== course.code))
      toast.success(`${course.code} removed successfully.`)
    }

    setPending(null)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <DataTable
        title="Semester course registration"
        data={courses}
        rowKey={(row) => row.code}
        searchKeys={['code', 'title', 'department', 'teacher']}
        columns={[
          { header: 'Code', accessor: 'code' },
          { header: 'Title', accessor: 'title' },
          { header: 'Credits', accessor: 'credits' },
          { header: 'Teacher', accessor: 'teacher' },
          { header: 'Slots', accessor: 'slots' },
          {
            header: 'Action',
            accessor: 'code',
            sortable: false,
            render: (_, row) => {
              const selected = selectedCodes.includes(row.code)
              return (
                <button
                  type="button"
                  onClick={() => setPending({ code: row.code, mode: selected ? 'drop' : 'add' })}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${selected ? 'bg-red-50 text-red-600' : 'bg-[var(--primary)] text-white'}`}
                >
                  {selected ? 'Drop' : 'Add'}
                </button>
              )
            },
          },
        ]}
      />

      <GlassCard className="bg-white">
        <h2 className="font-display text-3xl text-[var(--text-primary)]">Registration summary</h2>
        <p className="mt-2 text-sm text-slate-500">Total credit hours: {totalCredits}</p>
        <div className="mt-4 space-y-3">
          {registeredCourses.map((course) => (
            <div key={course.code} className="rounded-2xl bg-[var(--surface)] p-4 text-sm text-slate-600">
              <p className="font-semibold text-[var(--text-primary)]">{course.code} — {course.title}</p>
              <p>{course.credits} credits • {course.schedule}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <Modal
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        title="Confirm action"
        description="Please confirm your registration update."
      >
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => setPending(null)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
            Cancel
          </button>
          <button type="button" onClick={confirmAction} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">
            Confirm
          </button>
        </div>
      </Modal>
    </motion.div>
  )
}

export default CourseRegistration
