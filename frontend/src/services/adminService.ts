import api from './api'

export const adminService = {
  getAnalyticsOverview: () => api.get('/analytics/overview'),
  getStudents: () => api.get('/students'),
  getTeachers: () => api.get('/teachers'),
  getCourses: () => api.get('/courses'),
  getDepartments: () => api.get('/departments'),
  getFeeRecords: () => api.get('/fees'),
  getApplications: () => api.get('/admission/applications'),
  createNotice: (payload: unknown) => api.post('/notices', payload),
  uploadGalleryImage: (payload: FormData) => api.post('/gallery/upload', payload),
  
  // Library
  getLibraryCategories: () => api.get('/library/categories'),
  getLibraryBooks: () => api.get('/library/books'),
createLibraryCategory: (payload: { name: string; description?: string }) => api.post('/library/categories', payload),
createBook: (payload: { title: string; isbn: string; totalQuantity: number; availableQuantity: number; categoryId: string; authors?: string; edition?: string; publicationYear?: number; description?: string; coverImage?: string }) => api.post('/library/books', payload),
  updateBook: (id: string, payload: any) => api.put(`/library/books/${id}`, payload),
  deleteBook: (id: string) => api.delete(`/library/books/${id}`),
  
  // Transport
  getTransportRoutes: () => api.get('/transport/routes'),
createTransportRoute: (payload: { routeName: string; stops?: string[]; departure: string; busNumber: string; driver: string; capacity: number }) => api.post('/transport/routes', payload),
  getVehicle: (id: string) => api.get(`/transport/vehicles/${id}`),
}
