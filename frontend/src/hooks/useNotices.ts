import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export interface Notice {
  id: string
  title: string
  content: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  createdAt: string
  department?: { name: string }
}

// Fetch all notices
export const useNotices = (departmentId?: string) => {
  return useQuery({
    queryKey: ['notices', departmentId],
    queryFn: async () => {
      const { data } = await api.get<{ data: Notice[] }>('/notices', {
        params: { departmentId },
      })
      return data.data
    },
    staleTime: 2 * 60 * 1000,
  })
}

// Fetch recent notices
export const useRecentNotices = (limit = 10) => {
  return useQuery({
    queryKey: ['recent-notices', limit],
    queryFn: async () => {
      const { data } = await api.get<{ data: Notice[] }>('/notices/recent', {
        params: { limit },
      })
      return data.data
    },
    staleTime: 2 * 60 * 1000,
  })
}

// Fetch single notice
export const useNotice = (id: string) => {
  return useQuery({
    queryKey: ['notice', id],
    queryFn: async () => {
      const { data } = await api.get<{ data: Notice }>(`/notices/${id}`)
      return data.data
    },
    enabled: !!id,
  })
}

// Create notice
export const useCreateNotice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (noticeData: Omit<Notice, 'id' | 'createdAt'>) => {
      const { data } = await api.post('/notices', noticeData)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] })
      queryClient.invalidateQueries({ queryKey: ['recent-notices'] })
    },
  })
}

// Update notice
export const useUpdateNotice = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (updates: Partial<Notice>) => {
      const { data } = await api.put(`/notices/${id}`, updates)
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notice', id] })
      queryClient.invalidateQueries({ queryKey: ['notices'] })
    },
  })
}

// Delete notice
export const useDeleteNotice = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/notices/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] })
      queryClient.invalidateQueries({ queryKey: ['recent-notices'] })
    },
  })
}
