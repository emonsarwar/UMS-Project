export type Role = 'student' | 'teacher' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  password?: string
  department?: string
  avatar?: string
  phone?: string
  designation?: string
  semester?: string
  token?: string
}

export interface Student extends User {
  role: 'student'
  rollNumber: string
  session: string
  guardian: string
  address: string
  cgpa: number
  attendance: number
  pendingFees: number
  registeredCourses: number
  transportRoute: string
}

export interface Teacher extends User {
  role: 'teacher'
  designation: string
  researchArea: string
  department: string
  courses: string[]
}

export interface Department {
  id: string
  name: string
  shortDesc: string
  students: number
  teachers: number
  courses: number
  head: string
  icon: string
}

export interface Course {
  id: string
  code: string
  title: string
  department: string
  teacher: string
  credits: number
  capacity: number
  slots: number
  schedule: string
  section: string
}

export interface Notice {
  id: string
  title: string
  content: string
  category: 'Urgent' | 'Academic' | 'General' | 'Event'
  audience: string
  date: string
}

export interface FeeRecord {
  id: string
  studentId: string
  total: number
  paid: number
  due: number
  waiver: number
  status: 'Paid' | 'Partial' | 'Due'
  lastPayment: string
}

export interface AttendanceRecord {
  id: string
  studentId: string
  courseCode: string
  courseTitle: string
  date: string
  status: 'Present' | 'Absent' | 'Late'
}

export interface ResultRecord {
  id: string
  studentId: string
  semester: string
  courseCode: string
  courseTitle: string
  credit: number
  grade: string
  gradePoint: number
}

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
}

export interface EventItem {
  id: string
  title: string
  date: string
  location: string
  description: string
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  gradient: string
}

export interface BookCategory {
  id: string
  name: string
  description?: string
  books: Book[]
}

export interface Author {
  id: string
  name: string
  bio?: string
}

export interface Book {
  id: string
  title: string
  isbn: string
  edition?: string
  totalQuantity: number
  availableQuantity: number
  publicationYear?: number
  description?: string
  coverImage?: string
  categoryId: string
  category: BookCategory
  authorBooks: AuthorBook[]
}

export interface AuthorBook {
  authorId: string
  bookId: string
  author: Author
  book: Book
}

export interface IssueRecord {
  id: string
  bookId: string
  memberId: string
  memberType: 'STUDENT' | 'TEACHER'
  issueDate: string
  dueDate: string
  returnDate?: string
  fine: number
  status: 'ISSUED' | 'RETURNED' | 'OVERDUE' | 'RESERVED'
  book: Book
}

export interface TransportRoute {
  id: string
  routeName: string
  stops: string[]
  departure: string
  busNumber: string
  driver: string
  capacity: number
}

export interface Vehicle {
  id: string
  number: string
  driverName: string
  capacity: number
}
