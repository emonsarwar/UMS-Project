import { useQuery } from '@tanstack/react-query'
import api from '../api'

export interface AnalyticsStats {
  totalStudents: number
  totalTeachers: number
  totalCourses: number
  totalEnrollments: number
  totalDepartments: number
}

export interface DepartmentAnalytics {
  id: string
  name: string
  shortName: string
  students: number
  teachers: number
  courses: number
}

export interface PerformanceStats {
  averageScore: number
  highestScore: number
  lowestScore: number
  passRate: number
}

export interface AttendanceStats {
  totalRecords: number
  present: number
  absent: number
  late: number
  presentPercentage: number
}

// Fetch dashboard stats
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await api.get<{ data: AnalyticsStats }>('/analytics/dashboard')
      return data.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Fetch department analytics
export const useDepartmentAnalytics = () => {
  return useQuery({
    queryKey: ['department-analytics'],
    queryFn: async () => {
      const { data } = await api.get<{ data: DepartmentAnalytics[] }>('/analytics/departments')
      return data.data
    },
    staleTime: 10 * 60 * 1000,
  })
}

// Fetch enrollment trend
export const useEnrollmentTrend = (days = 30) => {
  return useQuery({
    queryKey: ['enrollment-trend', days],
    queryFn: async () => {
      const { data } = await api.get<{ data: Array<{ date: string; count: number }> }>(
        '/analytics/enrollment-trend',
        { params: { days } },
      )
      return data.data
    },
    staleTime: 10 * 60 * 1000,
  })
}

// Fetch performance stats
export const usePerformanceStats = () => {
  return useQuery({
    queryKey: ['performance-stats'],
    queryFn: async () => {
      const { data } = await api.get<{ data: PerformanceStats }>('/analytics/performance')
      return data.data
    },
    staleTime: 10 * 60 * 1000,
  })
}

// Fetch attendance stats
export const useAttendanceStats = () => {
  return useQuery({
    queryKey: ['attendance-stats'],
    queryFn: async () => {
      const { data } = await api.get<{ data: AttendanceStats }>('/analytics/attendance')
      return data.data
    },
    staleTime: 10 * 60 * 1000,
  })
}
