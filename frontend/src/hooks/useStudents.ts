import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export interface Student {
  id: string
  studentId: string
  fullName: string
  email: string
  department: { name: string; shortName: string }
  semester: number
  cgpa?: number
  photo?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
}

// Fetch all students
export const useStudents = (page = 1, limit = 10, search = '', department = '') => {
  return useQuery({
    queryKey: ['students', page, limit, search, department],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Student>>('/students', {
        params: { page, limit, search, department },
      })
      return data.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Fetch single student
export const useStudent = (id: string) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const { data } = await api.get<{ data: Student }>(`/students/${id}`)
      return data.data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Fetch student dashboard
export const useStudentDashboard = (id: string) => {
  return useQuery({
    queryKey: ['student-dashboard', id],
    queryFn: async () => {
      const { data } = await api.get(`/students/${id}/dashboard`)
      return data.data
    },
    enabled: !!id,
    staleTime: 3 * 60 * 1000,
  })
}

// Create student
export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (studentData: any) => {
      const { data } = await api.post('/students', studentData)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Update student
export const useUpdateStudent = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updates: Partial<Student>) => {
      const { data } = await api.put(`/students/${id}`, updates)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', id] })
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Delete student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/students/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Get students by department
export const useStudentsByDepartment = (departmentId: string) => {
  return useQuery({
    queryKey: ['students-by-dept', departmentId],
    queryFn: async () => {
      const { data } = await api.get(`/students/department/${departmentId}`)
      return data.data
    },
    enabled: !!departmentId,
  })
}

// Get student enrollments
export const useStudentEnrollments = (studentId: string) => {
  return useQuery({
    queryKey: ['student-enrollments', studentId],
    queryFn: async () => {
      const { data } = await api.get(`/students/${studentId}/enrollments`)
      return data.data
    },
    enabled: !!studentId,
  })
}

// Get student attendance
export const useStudentAttendance = (studentId: string, courseId?: string) => {
  return useQuery({
    queryKey: ['student-attendance', studentId, courseId],
    queryFn: async () => {
      const { data } = await api.get(`/students/${studentId}/attendance`, {
        params: { courseId },
      })
      return data.data
    },
    enabled: !!studentId,
  })
}

// Get student results
export const useStudentResults = (studentId: string, courseId?: string) => {
  return useQuery({
    queryKey: ['student-results', studentId, courseId],
    queryFn: async () => {
      const { data } = await api.get(`/students/${studentId}/results`, {
        params: { courseId },
      })
      return data.data
    },
    enabled: !!studentId,
  })
}
