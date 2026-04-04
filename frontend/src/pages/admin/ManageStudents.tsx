import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
import { students as initialStudents } from '../../services/muMockData'

const ManageStudents = () => {
  const [students, setStudents] = useState(initialStudents)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', department: '' })

  const startAdd = () => {
    setEditingId(null)
    setForm({ name: '', email: '', department: '' })
    setOpen(true)
  }

  const startEdit = (id: string) => {
    const student = students.find((item) => item.id === id)
    if (!student) return
    setEditingId(id)
    setForm({ name: student.name, email: student.email, department: student.department ?? '' })
    setOpen(true)
  }

  const save = () => {
    if (!form.name.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      toast.error('Enter valid student information.')
      return
    }

    if (editingId) {
      setStudents((current) => current.map((item) => item.id === editingId ? { ...item, ...form } : item))
      toast.success('Student updated.')
    } else {
      setStudents((current) => [
        {
          ...current[0],
          ...form,
          id: `STU${String(current.length + 1).padStart(3, '0')}`,
          rollNumber: `2025-${2000 + current.length}`,
        },
        ...current,
      ])
      toast.success('Student added.')
    }

    setOpen(false)
  }

  const remove = (id: string) => {
    setStudents((current) => current.filter((item) => item.id !== id))
    toast.success('Student removed.')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={startAdd} className="rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white">Add Student</button>
        <button type="button" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">Export CSV/PDF</button>
      </div>

      <DataTable
        title="Student management"
        data={students}
        rowKey={(row) => row.id}
        searchKeys={['id', 'name', 'email', 'department']}
        columns={[
          { header: 'ID', accessor: 'id' },
          { header: 'Name', accessor: 'name' },
          { header: 'Dept', accessor: 'department' },
          { header: 'Semester', accessor: 'semester' },
          {
            header: 'Actions',
            accessor: 'id',
            sortable: false,
            render: (_, row) => (
              <div className="flex gap-2">
                <button type="button" onClick={() => startEdit(row.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">Edit</button>
                <button type="button" onClick={() => remove(row.id)} className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">Delete</button>
              </div>
            ),
          },
        ]}
      />

      <Modal open={open} onClose={() => setOpen(false)} title={editingId ? 'Edit student' : 'Add student'} description="Personal → Academic → Contact">
        <div className="space-y-4">
          <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Full name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={form.department} onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))} placeholder="Department" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Cancel</button>
            <button type="button" onClick={save} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">Save</button>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default ManageStudents
