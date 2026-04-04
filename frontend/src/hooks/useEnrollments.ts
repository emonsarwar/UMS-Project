import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  course: any
  enrolledAt: string
}

// Get student enrollments
export const useStudentEnrollments = (studentId: string) => {
  return useQuery({
    queryKey: ['enrollments', studentId],
    queryFn: async () => {
      const { data } = await api.get<{ data: Enrollment[] }>(`/enrollments/student/${studentId}`)
      return data.data
    },
    enabled: !!studentId,
  })
}

// Get course enrollments
export const useCourseEnrollments = (courseId: string) => {
  return useQuery({
    queryKey: ['course-enrollments', courseId],
    queryFn: async () => {
      const { data } = await api.get<{ data: Enrollment[] }>(`/enrollments/course/${courseId}`)
      return data.data
    },
    enabled: !!courseId,
  })
}

// Enroll student
export const useEnrollStudent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: { studentId: string; courseId: string }) => {
      const response = await api.post('/enrollments', data)
      return response.data.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['enrollments', variables.studentId] })
      queryClient.invalidateQueries({ queryKey: ['course-enrollments', variables.courseId] })
    },
  })
}

// Unenroll student
export const useUnenrollStudent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (enrollmentId: string) => {
      await api.delete(`/enrollments/${enrollmentId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
      queryClient.invalidateQueries({ queryKey: ['course-enrollments'] })
    },
  })
}

// Bulk enroll
export const useBulkEnroll = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: { courseId: string; studentIds: string[] }) => {
      const response = await api.post(`/enrollments/bulk/${data.courseId}`, { studentIds: data.studentIds })
      return response.data.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['course-enrollments', variables.courseId] })
    },
  })
}

// Get enrollment stats
export const useEnrollmentStats = (courseId: string) => {
  return useQuery({
    queryKey: ['enrollment-stats', courseId],
    queryFn: async () => {
      const { data } = await api.get(`/enrollments/${courseId}/stats`)
      return data.data
    },
    enabled: !!courseId,
  })
}
