import { useQuery } from '@tanstack/react-query'
import { Activity, BookOpen, Building2, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import GlassCard from '../../components/ui/GlassCard'
import PortalMetricCard from '../../components/shared/PortalMetricCard'
import api from '../../services/api'

const AdminDashboard = () => {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/analytics/overview'),
  })

  const { data: departmentsData } = useQuery({
    queryKey: ['departments'],
    queryFn: () => api.get('/departments'),
  })

  const { data: enrollmentTrend } = useQuery({
    queryKey: ['enrollment-trends'],
    queryFn: () => api.get('/analytics/enrollment-trends'),
  })

  const feeCollection = statsData?.data?.feeCollection || []

  if (statsLoading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <PortalMetricCard title="Total Students" value={statsData?.data?.students || 0} icon={Users} />
        <PortalMetricCard title="Teachers" value={statsData?.data?.teachers || 0} icon={Activity} />
        <PortalMetricCard title="Departments" value={(departmentsData?.data?.length || 0)} icon={Building2} />
        <PortalMetricCard title="Active Courses" value={statsData?.data?.courses || 0} icon={BookOpen} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <GlassCard className="bg-white">
          <h3 className="font-display text-xl text-[var(--text-primary)]">Quick Actions</h3>
          <div className="mt-4 grid gap-2">
            <a href="/portal/admin/students" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-slate-50">Manage Students</a>
            <a href="/portal/admin/teachers" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-slate-50">Manage Teachers</a>
            <a href="/portal/admin/courses" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-slate-50">Manage Courses</a>
            <a href="/portal/admin/notices" className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-slate-50">Create Announcement</a>
          </div>
        </GlassCard>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <GlassCard className="bg-white">
          <h2 className="font-display text-2xl text-[var(--text-primary)]">Monthly Enrollment Trend</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentTrend?.data || []}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1B2A6B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="bg-white">
          <h2 className="font-display text-2xl text-[var(--text-primary)]">Fee Collection by Dept</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeCollection}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#C9A84C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}

export default AdminDashboard
