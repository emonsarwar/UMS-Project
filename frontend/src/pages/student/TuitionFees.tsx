import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import Modal from '../../components/ui/Modal'
import DataTable from '../../components/ui/DataTable'
import { feeRecords, students } from '../../services/muMockData'
import { useAuth } from '../../hooks/useAuth'

const TuitionFees = () => {
  const { user } = useAuth()
  const student = students.find((item) => item.id === user?.id) ?? students[0]
  const record = feeRecords.find((item) => item.studentId === student.id) ?? feeRecords[0]
  const [open, setOpen] = useState(false)
  const [card, setCard] = useState({ name: '', number: '' })

  const handlePayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!card.name.trim() || card.number.replace(/\D/g, '').length < 12) {
      toast.error('Enter valid payment details.')
      return
    }
    toast.success('Mock payment submitted successfully.')
    setOpen(false)
    setCard({ name: '', number: '' })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total', `$${record.total}`],
          ['Paid', `$${record.paid}`],
          ['Due', `$${record.due}`],
          ['Waiver', `$${record.waiver}`],
        ].map(([label, value]) => (
          <GlassCard key={label} className="bg-white">
            <p className="text-sm text-slate-500">{label}</p>
            <h3 className="mt-2 font-display text-3xl text-[var(--text-primary)]">{value}</h3>
          </GlassCard>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-[var(--primary)] px-5 py-3 font-semibold text-white">
          Pay Now
        </button>
        <button type="button" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">
          Download Receipt
        </button>
      </div>

      <DataTable
        title="Payment history"
        data={feeRecords.filter((item) => item.studentId === student.id)}
        rowKey={(row) => row.id}
        searchKeys={['status', 'lastPayment']}
        columns={[
          { header: 'Status', accessor: 'status' },
          { header: 'Last Payment', accessor: 'lastPayment' },
          { header: 'Paid', accessor: 'paid' },
          { header: 'Due', accessor: 'due' },
        ]}
      />

      <Modal open={open} onClose={() => setOpen(false)} title="Mock card payment" description="Use demo card information for this prototype.">
        <form onSubmit={handlePayment} className="space-y-4">
          <input
            value={card.name}
            onChange={(event) => setCard((current) => ({ ...current, name: event.target.value }))}
            placeholder="Cardholder name"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <input
            value={card.number}
            onChange={(event) => setCard((current) => ({ ...current, number: event.target.value }))}
            placeholder="Card number"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Cancel</button>
            <button type="submit" className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">Submit</button>
          </div>
        </form>
      </Modal>
    </motion.div>
  )
}

export default TuitionFees
