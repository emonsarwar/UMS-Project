import api from './api'

export const teacherService = {
  getDashboard: (teacherId: string) => api.get(`/teachers/${teacherId}/dashboard`),
  getCourses: () => api.get('/courses'),
  markAttendance: (payload: any) => api.post('/attendance/mark', payload),
  uploadResult: (payload: any) => api.post('/results/upload', payload),
  updateResult: (resultId: string, payload: any) => api.put(`/results/${resultId}`, payload),
  
  // Library
  getMyLibraryIssues: () => api.get('/library/my-issues'),
}
