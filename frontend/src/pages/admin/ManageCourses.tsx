import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
import { courses as initialCourses } from '../../services/muMockData'

const ManageCourses = () => {
  const [courses, setCourses] = useState(initialCourses)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ code: '', title: '', department: '', teacher: '', credits: 3 })

  const start = (id?: string) => {
    if (id) {
      const course = courses.find((item) => item.id === id)
      if (!course) return
      setEditingId(id)
      setForm({ code: course.code, title: course.title, department: course.department, teacher: course.teacher, credits: course.credits })
    } else {
      setEditingId(null)
      setForm({ code: '', title: '', department: '', teacher: '', credits: 3 })
    }
    setOpen(true)
  }

  const save = () => {
    if (!form.code.trim() || !form.title.trim() || !form.department.trim()) {
      toast.error('Complete all course details.')
      return
    }

    if (editingId) {
      setCourses((current) => current.map((item) => item.id === editingId ? { ...item, ...form } : item))
    } else {
      setCourses((current) => [{ ...current[0], ...form, id: `CRS${current.length + 1}` }, ...current])
    }

    toast.success('Course saved.')
    setOpen(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <button type="button" onClick={() => start()} className="rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white">Add Course</button>
      <DataTable
        title="Course management"
        data={courses}
        rowKey={(row) => row.id}
        searchKeys={['code', 'title', 'department', 'teacher']}
        columns={[
          { header: 'Code', accessor: 'code' },
          { header: 'Title', accessor: 'title' },
          { header: 'Credits', accessor: 'credits' },
          { header: 'Dept', accessor: 'department' },
          { header: 'Teacher', accessor: 'teacher' },
          { header: 'Capacity', accessor: 'capacity' },
          {
            header: 'Action',
            accessor: 'id',
            sortable: false,
            render: (_, row) => <button type="button" onClick={() => start(row.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">Edit</button>,
          },
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={editingId ? 'Edit course' : 'Add course'} description="Includes full course metadata and pre-requisites.">
        <div className="space-y-4">
          <input value={form.code} onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))} placeholder="Course code" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Title" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={form.department} onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))} placeholder="Department" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={form.teacher} onChange={(event) => setForm((current) => ({ ...current, teacher: event.target.value }))} placeholder="Teacher" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Cancel</button>
            <button type="button" onClick={save} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">Save</button>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default ManageCourses
