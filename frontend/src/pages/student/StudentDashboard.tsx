import { useQuery } from '@tanstack/react-query'
import { CalendarRange, CreditCard, GraduationCap, NotebookTabs, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import Loader from '../../components/ui/Loader'
import PortalMetricCard from '../../components/shared/PortalMetricCard'
import { useAuth } from '../../hooks/useAuth'
import { studentService } from '../../services/studentService'
import api from '../../services/api'
import type { Notice, ResultRecord, EventItem } from '../../types'

const StudentDashboard = () => {
  const { user } = useAuth()
  
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ['student-dashboard', user?.id],
    queryFn: () => studentService.getDashboard(user?.id ?? ''),
    enabled: !!user?.id,
  })

  const { data: noticesData, isLoading: noticesLoading } = useQuery({
    queryKey: ['notices'],
    queryFn: () => api.get('/notices'),
  })

  const { data: eventsData } = useQuery({
    queryKey: ['events'],
    queryFn: () => api.get('/events'),
    staleTime: 1000 * 60 * 5,
  })

  const student = dashboardData?.data?.student
  const metrics = dashboardData?.data
  const notices = (noticesData?.data as Notice[]) ?? []
  const upcomingEvents = ((eventsData?.data as EventItem[]) ?? [])?.slice(0, 4)

  if (dashboardLoading || noticesLoading) {
    return <Loader />
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-[28px] bg-hero p-6 text-white shadow-glass">
        <p className="font-accent text-xs uppercase tracking-[0.32em] text-[var(--accent-light)]">Welcome back</p>
        <h2 className="mt-2 font-display text-4xl">{student?.fullName}</h2>
        <p className="mt-2 text-slate-200">{student?.department?.name} • Semester {student?.semester}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <PortalMetricCard title="CGPA" value={metrics?.cgpa?.toFixed(2) || '0.00'} subtitle="Current standing" icon={GraduationCap} />
        <PortalMetricCard title="Attendance" value={`${metrics?.attendancePercentage || 0}%`} subtitle="This semester" icon={CalendarRange} />
        <PortalMetricCard title="Pending Fees" value={`BDT ${metrics?.totalDue || 0}`} subtitle="Outstanding balance" icon={CreditCard} />
        <PortalMetricCard title="Courses" value={String(metrics?.enrolledCourses || 0)} subtitle="Registered now" icon={NotebookTabs} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="bg-white">
          <h3 className="font-display text-2xl text-[var(--text-primary)]">Today's schedule</h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-[var(--surface)] px-4 py-3 text-sm text-slate-600">
              CSE101 Programming • 9:00 AM
            </div>
          </div>
        </GlassCard>

        <GlassCard className="bg-white">
          <h3 className="font-display text-2xl text-[var(--text-primary)]">Upcoming Events</h3>
          <div className="mt-4 space-y-3">
            {upcomingEvents.length ? (
              upcomingEvents.map((event: EventItem) => (
                <div key={event.id} className="rounded-2xl border border-slate-200 p-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{event.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{event.date ? new Date(event.date).toLocaleDateString() : 'Date TBD'}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No upcoming events available.</p>
            )}
          </div>

          <h3 className="mt-6 font-display text-2xl text-[var(--text-primary)]">Latest Notices</h3>
          <div className="mt-4 space-y-3">
            {notices.length ? (
              notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="rounded-2xl border border-slate-200 p-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{notice.title}</p>
                  <p className="text-xs text-slate-500">{notice.category} • {new Date(notice.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No notices at the moment.</p>
            )}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <GlassCard className="bg-white">
          <h3 className="font-display text-2xl text-[var(--text-primary)]">Recent grades</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-3 py-2">Course</th>
                  <th className="px-3 py-2">Grade</th>
                  <th className="px-3 py-2">Point</th>
                </tr>
              </thead>
              <tbody>
                {student?.results?.slice(0, 5).map((result: ResultRecord) => (
                  <tr key={result.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-3 py-2">{result.courseTitle}</td>
                    <td className="px-3 py-2">{result.grade}</td>
                    <td className="px-3 py-2">{result.gradePoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="bg-[var(--surface-dark)] text-white">
          <h3 className="font-display text-2xl">Quick actions</h3>
          <div className="mt-4 grid gap-3">
            {[
              ['Register Course', '/portal/student/courses'],
              ['View Results', '/portal/student/results'],
              ['Pay Fees', '/portal/student/fees'],
            ].map(([label, to]) => (
              <Link key={label} to={to} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-[var(--accent)] hover:text-[var(--accent-light)]">
                {label} <Sparkles size={16} />
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}

export default StudentDashboard


