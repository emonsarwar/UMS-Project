import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export interface Teacher {
  id: string
  teacherId: string
  fullName: string
  designation: string
  department: { name: string }
  email: string
  photo?: string
  researchArea?: string
}

// Fetch all teachers
export const useTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data } = await api.get<{ data: Teacher[] }>('/teachers')
      return data.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Fetch single teacher
export const useTeacher = (id: string) => {
  return useQuery({
    queryKey: ['teacher', id],
    queryFn: async () => {
      const { data } = await api.get<{ data: Teacher }>(`/teachers/${id}`)
      return data.data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Fetch teacher dashboard
export const useTeacherDashboard = (id: string) => {
  return useQuery({
    queryKey: ['teacher-dashboard', id],
    queryFn: async () => {
      const { data } = await api.get(`/teachers/${id}/dashboard`)
      return data.data
    },
    enabled: !!id,
    staleTime: 3 * 60 * 1000,
  })
}

// Create teacher
export const useCreateTeacher = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (teacherData: any) => {
      const { data } = await api.post('/teachers', teacherData)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
  })
}

// Update teacher
export const useUpdateTeacher = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updates: Partial<Teacher>) => {
      const { data } = await api.put(`/teachers/${id}`, updates)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher', id] })
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
  })
}

// Delete teacher
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/teachers/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
    },
  })
}

// Get teachers by department
export const useTeachersByDepartment = (departmentId: string) => {
  return useQuery({
    queryKey: ['teachers-by-dept', departmentId],
    queryFn: async () => {
      const { data } = await api.get(`/teachers/department/${departmentId}`)
      return data.data
    },
    enabled: !!departmentId,
  })
}

// Get teacher courses
export const useTeacherCourses = (teacherId: string) => {
  return useQuery({
    queryKey: ['teacher-courses', teacherId],
    queryFn: async () => {
      const { data } = await api.get(`/teachers/${teacherId}/courses`)
      return data.data
    },
    enabled: !!teacherId,
  })
}

// Get teacher students
export const useTeacherStudents = (teacherId: string) => {
  return useQuery({
    queryKey: ['teacher-students', teacherId],
    queryFn: async () => {
      const { data } = await api.get(`/teachers/${teacherId}/students`)
      return data.data
    },
    enabled: !!teacherId,
  })
}
