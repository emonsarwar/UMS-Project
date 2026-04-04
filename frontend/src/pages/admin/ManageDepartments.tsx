import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import Modal from '../../components/ui/Modal'
import { departments as initialDepartments } from '../../services/muMockData'

const ManageDepartments = () => {
  const [departments, setDepartments] = useState(initialDepartments)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', head: '', icon: '🏛️' })

  const begin = (id?: string) => {
    if (id) {
      const department = departments.find((item) => item.id === id)
      if (!department) return
      setEditingId(id)
      setForm({ name: department.name, head: department.head, icon: department.icon })
    } else {
      setEditingId(null)
      setForm({ name: '', head: '', icon: '🏛️' })
    }
    setOpen(true)
  }

  const save = () => {
    if (!form.name.trim() || !form.head.trim()) {
      toast.error('Department information is required.')
      return
    }

    if (editingId) {
      setDepartments((current) => current.map((item) => item.id === editingId ? { ...item, ...form } : item))
    } else {
      setDepartments((current) => [{ ...current[0], ...form, id: `D${current.length + 1}` }, ...current])
    }

    toast.success('Department saved.')
    setOpen(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <button type="button" onClick={() => begin()} className="rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white">Add Department</button>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((department) => (
          <GlassCard key={department.id} className="bg-white">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-3xl">{department.icon}</span>
              <button type="button" onClick={() => begin(department.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">Edit</button>
            </div>
            <h2 className="font-display text-2xl text-[var(--text-primary)]">{department.name}</h2>
            <p className="mt-2 text-sm text-slate-600">Head: {department.head}</p>
            <p className="mt-1 text-sm text-slate-500">{department.students} students • {department.teachers} teachers • {department.courses} courses</p>
          </GlassCard>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editingId ? 'Edit department' : 'Add department'}>
        <div className="space-y-4">
          <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Department name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={form.head} onChange={(event) => setForm((current) => ({ ...current, head: event.target.value }))} placeholder="Head of department" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <input value={form.icon} onChange={(event) => setForm((current) => ({ ...current, icon: event.target.value }))} placeholder="Icon" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Cancel</button>
            <button type="button" onClick={save} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">Save</button>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default ManageDepartments
