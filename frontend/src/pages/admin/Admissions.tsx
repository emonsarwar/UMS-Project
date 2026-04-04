import { useState } from 'react'
import { motion } from 'framer-motion'
import DataTable from '../../components/ui/DataTable'

const applications = [
  { id: 'APP-001', name: 'Rahat Ahmed', programme: 'BSc CSE', department: 'CSE', email: 'rahat@example.com', date: '2026-03-28', status: 'Pending' },
  { id: 'APP-002', name: 'Sumaiya Islam', programme: 'BBA', department: 'BBA', email: 'sumaiya@example.com', date: '2026-03-27', status: 'Approved' },
  { id: 'APP-003', name: 'Anamika Sarker', programme: 'LLB', department: 'LAW', email: 'anamika@example.com', date: '2026-03-25', status: 'Rejected' },
]

const Admissions = () => {
  const [status, setStatus] = useState('All')
  const visibleApplications = applications.filter((item) => status === 'All' || item.status === status)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none">
          {['All', 'Pending', 'Approved', 'Rejected'].map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <DataTable
        title="Admission applications"
        data={visibleApplications}
        rowKey={(row) => row.id}
        searchKeys={['name', 'programme', 'department', 'email', 'status']}
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Programme', accessor: 'programme' },
          { header: 'Dept', accessor: 'department' },
          { header: 'Email', accessor: 'email' },
          { header: 'Date', accessor: 'date' },
          { header: 'Status', accessor: 'status' },
        ]}
      />
    </motion.div>
  )
}

export default Admissions
