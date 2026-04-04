import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export interface Department {
  id: string
  name: string
  shortName: string
  school: string
  studentCount?: number
  teacherCount?: number
  courseCount?: number
}

// Fetch all departments
export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data } = await api.get<{ data: Department[] }>('/departments')
      return data.data
    },
    staleTime: 10 * 60 * 1000,
  })
}

// Fetch single department
export const useDepartment = (id: string) => {
  return useQuery({
    queryKey: ['department', id],
    queryFn: async () => {
      const { data } = await api.get<{ data: Department }>(`/departments/${id}`)
      return data.data
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  })
}

// Create department
export const useCreateDepartment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (deptData: Omit<Department, 'id'>) => {
      const { data } = await api.post('/departments', deptData)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    },
  })
}

// Update department
export const useUpdateDepartment = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updates: Partial<Department>) => {
      const { data } = await api.put(`/departments/${id}`, updates)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department', id] })
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    },
  })
}

// Delete department
export const useDeleteDepartment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/departments/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    },
  })
}

// Get department statistics
export const useDepartmentStats = (id: string) => {
  return useQuery({
    queryKey: ['department-stats', id],
    queryFn: async () => {
      const { data } = await api.get(`/departments/${id}/stats`)
      return data.data
    },
    enabled: !!id,
  })
}
