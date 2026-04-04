import api from './api'

export const studentService = {
  getDashboard: (studentId: string) => api.get(`/students/${studentId}/dashboard`),
  getProfile: (studentId: string) => api.get(`/students/${studentId}`),
  updateProfile: (studentId: string, payload: Record<string, unknown>) => api.put(`/students/${studentId}`, payload),
  getEnrollments: (studentId: string) => api.get(`/enrollment/student/${studentId}`),
  registerCourse: (payload: Record<string, unknown>) => api.post('/enrollment/register', payload),
  dropCourse: (enrollmentId: string) => api.delete(`/enrollment/drop/${enrollmentId}`),
  getAttendance: (studentId: string) => api.get(`/attendance/student/${studentId}`),
  getAttendanceSummary: (studentId: string) => api.get(`/attendance/summary/${studentId}`),
  getResults: (studentId: string) => api.get(`/results/student/${studentId}`),
  getFees: (studentId: string) => api.get(`/fees/student/${studentId}`),
  
  // Library
  getMyLibraryIssues: () => api.get('/library/my-issues'),
  
  // Transport
  getTransportInfo: () => api.get('/transport/my-route'),
}
