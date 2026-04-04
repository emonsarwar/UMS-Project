import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export interface Attendance {
  id: string
  studentId: string
  courseId: string
  status: 'PRESENT' | 'ABSENT' | 'LATE'
  createdAt: string
}

export interface AttendanceReport {
  total: number
  present: number
  absent: number
  late: number
  percentage: number
}

// Fetch student attendance
export const useStudentAttendance = (studentId: string, courseId?: string) => {
  return useQuery({
    queryKey: ['attendance', studentId, courseId],
    queryFn: async () => {
      const { data } = await api.get<{ data: Attendance[] }>(`/attendance/student/${studentId}`, {
        params: { courseId },
      })
      return data.data
    },
    enabled: !!studentId,
  })
}

// Fetch course attendance
export const useCourseAttendance = (courseId: string) => {
  return useQuery({
    queryKey: ['course-attendance', courseId],
    queryFn: async () => {
      const { data } = await api.get<{ data: Attendance[] }>(`/attendance/course/${courseId}`)
      return data.data
    },
    enabled: !!courseId,
  })
}

// Get attendance report
export const useAttendanceReport = (studentId: string, courseId: string) => {
  return useQuery({
    queryKey: ['attendance-report', studentId, courseId],
    queryFn: async () => {
      const { data } = await api.get<{ data: AttendanceReport }>(
        `/attendance/${studentId}/${courseId}/report`,
      )
      return data.data
    },
    enabled: !!studentId && !!courseId,
  })
}

// Mark attendance
export const useMarkAttendance = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (attendanceData: {
      courseId: string
      date: string
      attendances: Array<{ studentId: string; status: string }>
    }) => {
      const { data } = await api.post('/attendance', attendanceData)
      return data.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['course-attendance', variables.courseId] })
    },
  })
}

// Update attendance
export const useUpdateAttendance = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (status: string) => {
      const { data } = await api.put(`/attendance/${id}`, { status })
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
    },
  })
}

// Get course attendance report
export const useCourseAttendanceReport = (courseId: string) => {
  return useQuery({
    queryKey: ['course-attendance-report', courseId],
    queryFn: async () => {
      const { data } = await api.get(`/attendance/course/${courseId}/report`)
      return data.data
    },
    enabled: !!courseId,
  })
}
