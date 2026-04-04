import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api'

export interface Result {
  id: string
  studentId: string
  courseId: string
  score: number
  grade?: string
  createdAt: string
}

export interface GPA {
  cgpa: number
  totalCredits: number
}

// Fetch student results
export const useStudentResults = (studentId: string, courseId?: string) => {
  return useQuery({
    queryKey: ['results', studentId, courseId],
    queryFn: async () => {
      const { data } = await api.get<{ data: Result[] }>(`/results/student/${studentId}`, {
        params: { courseId },
      })
      return data.data
    },
    enabled: !!studentId,
  })
}

// Fetch course results
export const useCourseResults = (courseId: string) => {
  return useQuery({
    queryKey: ['course-results', courseId],
    queryFn: async () => {
      const { data } = await api.get<{ data: Result[] }>(`/results/course/${courseId}`)
      return data.data
    },
    enabled: !!courseId,
  })
}

// Get student GPA
export const useStudentGPA = (studentId: string) => {
  return useQuery({
    queryKey: ['student-gpa', studentId],
    queryFn: async () => {
      const { data } = await api.get<{ data: GPA }>(`/results/${studentId}/gpa`)
      return data.data
    },
    enabled: !!studentId,
  })
}

// Get transcript
export const useTranscript = (studentId: string) => {
  return useQuery({
    queryKey: ['transcript', studentId],
    queryFn: async () => {
      const { data } = await api.get(`/results/${studentId}/transcript`)
      return data.data
    },
    enabled: !!studentId,
  })
}

// Upload result
export const useUploadResult = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (resultData: { studentId: string; courseId: string; score: number }) => {
      const { data } = await api.post('/results', resultData)
      return data.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['results', variables.studentId] })
      queryClient.invalidateQueries({ queryKey: ['course-results', variables.courseId] })
    },
  })
}

// Upload bulk results
export const useUploadBulkResults = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (bulkData: { courseId: string; results: Array<{ studentId: string; score: number }> }) => {
      const { data } = await api.post(`/results/bulk/${bulkData.courseId}`, { results: bulkData.results })
      return data.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['course-results', variables.courseId] })
    },
  })
}

// Update result
export const useUpdateResult = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (score: number) => {
      const { data } = await api.put(`/results/${id}`, { score })
      return data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] })
    },
  })
}
