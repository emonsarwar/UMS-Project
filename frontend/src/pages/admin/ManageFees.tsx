import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import DataTable from '../../components/ui/DataTable'
import { feeRecords } from '../../services/muMockData'

const ManageFees = () => {
  const [statusFilter, setStatusFilter] = useState('All')
  const visibleFees = feeRecords.filter((record) => statusFilter === 'All' || record.status === statusFilter)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Total Collection', '$4.9M'],
          ['Outstanding', '$0.3M'],
          ['Waivers', '$0.1M'],
        ].map(([label, value]) => (
          <GlassCard key={label} className="bg-white">
            <p className="text-sm text-slate-500">{label}</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--text-primary)]">{value}</h2>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-white">
        <div className="flex flex-wrap items-center gap-3">
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none">
            {['All', 'Paid', 'Partial', 'Due'].map((item) => <option key={item}>{item}</option>)}
          </select>
          <button type="button" className="rounded-full border border-slate-200 px-4 py-2 text-sm">Manual fee entry</button>
          <button type="button" className="rounded-full border border-slate-200 px-4 py-2 text-sm">Waiver management</button>
        </div>
      </GlassCard>

      <DataTable
        title="Fee records"
        data={visibleFees}
        rowKey={(row) => row.id}
        searchKeys={['studentId', 'status', 'lastPayment']}
        columns={[
          { header: 'Student', accessor: 'studentId' },
          { header: 'Status', accessor: 'status' },
          { header: 'Paid', accessor: 'paid' },
          { header: 'Due', accessor: 'due' },
          { header: 'Last Payment', accessor: 'lastPayment' },
        ]}
      />
    </motion.div>
  )
}

export default ManageFees
