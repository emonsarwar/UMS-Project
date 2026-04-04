import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export interface Course {
  id: string
  code: string
  title: string
  credits: number
  semester: number
  department: { name: string }
  description?: string
  assignments?: Array<{ teacher: { fullName: string } }>
}

// Fetch all courses
export const useCourses = (departmentId?: string) => {
  return useQuery({
    queryKey: ['courses', departmentId],
    queryFn: async () => {
      const { data } = await api.get<{ data: Course[] }>('/courses', {
        params: { departmentId },
      })
      return data.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Fetch single course
export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data } = await api.get<{ data: Course }>(`/courses/${id}`)
      return data.data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Create course
export const useCreateCourse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (courseData: Omit<Course, 'id'>) => {
      const { data } = await api.post('/courses', courseData)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })
}

// Update course
export const useUpdateCourse = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updates: Partial<Course>) => {
      const { data } = await api.put(`/courses/${id}`, updates)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', id] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })
}

// Delete course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/courses/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })
}

// Get courses by department
export const useCoursesByDepartment = (departmentId: string) => {
  return useQuery({
    queryKey: ['courses-by-dept', departmentId],
    queryFn: async () => {
      const { data } = await api.get(`/courses/department/${departmentId}`)
      return data.data
    },
    enabled: !!departmentId,
  })
}

// Get course enrollments
export const useCourseEnrollments = (courseId: string) => {
  return useQuery({
    queryKey: ['course-enrollments', courseId],
    queryFn: async () => {
      const { data } = await api.get(`/courses/${courseId}/enrollments`)
      return data.data
    },
    enabled: !!courseId,
  })
}

// Get course statistics
export const useCourseStats = (courseId: string) => {
  return useQuery({
    queryKey: ['course-stats', courseId],
    queryFn: async () => {
      const { data } = await api.get(`/courses/${courseId}/stats`)
      return data.data
    },
    enabled: !!courseId,
  })
}

// Assign teacher to course
export const useAssignTeacher = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (teacherId: string) => {
      const { data } = await api.post(`/courses/${courseId}/assign-teacher`, { teacherId })
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', courseId] })
    },
  })
}
