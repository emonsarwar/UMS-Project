import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import DataTable from '../../components/ui/DataTable'
import { students } from '../../services/muMockData'

const routes = [
  { id: 'R1', route: 'Temuki', bus: 'MU-12', capacity: 42, driver: 'Farid Alom', schedule: '07:10 AM' },
  { id: 'R2', route: 'City Center', bus: 'MU-18', capacity: 36, driver: 'Sajib Mia', schedule: '07:35 AM' },
]

const ManageTransport = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <GlassCard className="bg-white">
          <h2 className="font-display text-3xl text-[var(--text-primary)]">Route overview</h2>
          <div className="mt-4 flex min-h-[260px] items-end rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-800 to-amber-400 p-5 text-white">
            <p className="text-sm">Interactive route planning placeholder for Google Maps / Leaflet integration.</p>
          </div>
        </GlassCard>
        <DataTable
          title="Bus assignments"
          data={routes}
          rowKey={(row) => row.id}
          searchKeys={['route', 'bus', 'driver']}
          columns={[
            { header: 'Route', accessor: 'route' },
            { header: 'Bus', accessor: 'bus' },
            { header: 'Capacity', accessor: 'capacity' },
            { header: 'Driver', accessor: 'driver' },
            { header: 'Schedule', accessor: 'schedule' },
          ]}
        />
      </div>

      <DataTable
        title="Transport enrollments"
        data={students.slice(0, 10)}
        rowKey={(row) => row.id}
        searchKeys={['id', 'name', 'transportRoute']}
        columns={[
          { header: 'Student', accessor: 'name' },
          { header: 'ID', accessor: 'id' },
          { header: 'Route', accessor: 'transportRoute' },
          { header: 'Phone', accessor: 'phone' },
        ]}
      />
    </motion.div>
  )
}

export default ManageTransport
