import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
import { teachers as initialTeachers } from '../../services/muMockData'

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', department: '', designation: '' })

  const startEdit = (id?: string) => {
    if (id) {
      const teacher = teachers.find((item) => item.id === id)
      if (!teacher) return
      setEditingId(id)
      setForm({ name: teacher.name, department: teacher.department, designation: teacher.designation })
    } else {
      setEditingId(null)
      setForm({ name: '', department: '', designation: '' })
    }
    setOpen(true)
  }

  const save = () => {
    if (!form.name.trim() || !form.department.trim()) {
      toast.error('Teacher details are required.')
      return
    }

    if (editingId) {
      setTeachers((current) => current.map((item) => item.id === editingId ? { ...item, ...form } : item))
    } else {
      setTeachers((current) => [
        { ...current[0], ...form, id: `TCH${String(current.length + 1).padStart(3, '0')}` },
        ...current,
      ])
    }

    toast.success('Teacher saved successfully.')
    setOpen(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <button type="button" onClick={() => startEdit()} className="rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white">Add Teacher</button>
      <DataTable
        title="Teacher management"
        data={teachers}
        rowKey={(row) => row.id}
        searchKeys={['id', 'name', 'department', 'designation']}
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Dept', accessor: 'department' },
          { header: 'Designation', accessor: 'designation' },
          { header: 'Courses', accessor: 'courses', render: (value) => Array.isArray(value) ? value.join(', ') : '' },
          {
            header: 'Actions',
            accessor: 'id',
            sortable: false,
            render: (_, row) => <button type="button" onClick={() => startEdit(row.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">Edit</button>,
          },
        ]}
      />

      <Modal open={open} onClose={() => setOpen(false)} title={editingId ? 'Edit teacher' : 'Add teacher'}>
        <div className="space-y-4">
          <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={form.department} onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))} placeholder="Department" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={form.designation} onChange={(event) => setForm((current) => ({ ...current, designation: event.target.value }))} placeholder="Designation" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Cancel</button>
            <button type="button" onClick={save} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">Save</button>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default ManageTeachers
