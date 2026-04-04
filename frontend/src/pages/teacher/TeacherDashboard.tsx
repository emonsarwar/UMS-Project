import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, CalendarDays, GraduationCap, NotebookTabs } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import Loader from '../../components/ui/Loader'
import PortalMetricCard from '../../components/shared/PortalMetricCard'
import api from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import type { Course, EventItem } from '../../types'

const TeacherDashboard = () => {
  const { user } = useAuth()

  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ['teacher-dashboard', user?.id],
    queryFn: () => api.get(`/teachers/${user?.id}/dashboard`),
    enabled: !!user?.id,
  })

  const { data: coursesData, isLoading: coursesLoading } = useQuery({
    queryKey: ['teacher-courses'],
    queryFn: () => api.get('/courses'),
  })

  const { data: eventsData } = useQuery({
    queryKey: ['events'],
    queryFn: () => api.get('/events'),
    staleTime: 1000 * 60 * 5,
  })

  const assignedCourses = useMemo(() => coursesData?.data || [], [coursesData])
  const stats = dashboardData?.data || {}
  const upcomingEvents = useMemo(() => {
    const raw = eventsData?.data || []
    return Array.isArray(raw) ? raw.slice(0, 4) : []
  }, [eventsData])

  if (dashboardLoading || coursesLoading) {
    return <Loader />
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <PortalMetricCard title="Total Courses" value={String(assignedCourses.length)} icon={BookOpen} />
        <PortalMetricCard title="Total Students" value={String(stats.totalStudents || 0)} icon={GraduationCap} />
        <PortalMetricCard title="Pending Results" value={String(stats.pendingResults || 0)} icon={NotebookTabs} />
        <PortalMetricCard title="Today Classes" value={String(stats.todayClasses || 0)} icon={CalendarDays} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <GlassCard className="bg-white">
          <h2 className="font-display text-3xl text-[var(--text-primary)]">My Courses</h2>
          <div className="mt-4 space-y-3">
            {assignedCourses.slice(0, 3).map((course: Course) => (
              <div key={course.id} className="rounded-2xl bg-[var(--surface)] p-4">
                <p className="font-semibold text-[var(--text-primary)]">{course.code} - {course.title}</p>
                <p className="text-sm text-slate-600">{course.section} • {course.credits} credits</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="bg-white">
          <h2 className="font-display text-3xl text-[var(--text-primary)]">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            {assignedCourses.slice(0, 4).map((course: Course) => (
              <Link key={course.id} to={`/portal/teacher/mark-attendance/${course.id}`} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 text-sm hover:bg-slate-50">
                <span>{course.code} Attendance</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">Mark</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to="/portal/admin/students" className="rounded-full bg-[var(--accent)] px-3 py-2 text-center text-xs font-semibold text-[var(--primary)]">Request Add Student</Link>
            <Link to="/portal/admin/teachers" className="rounded-full bg-[var(--accent)] px-3 py-2 text-center text-xs font-semibold text-[var(--primary)]">Request Add Teacher</Link>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="bg-white">
        <h2 className="font-display text-3xl text-[var(--text-primary)]">Upcoming Events</h2>
        <div className="mt-4 grid gap-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event: EventItem) => (
              <div key={event.id} className="rounded-2xl border border-slate-200 p-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{event.title}</p>
                <p className="mt-1 text-xs text-slate-500">{event.date ? new Date(event.date).toLocaleDateString() : 'TBA'}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No upcoming events at the moment.</p>
          )}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default TeacherDashboard
