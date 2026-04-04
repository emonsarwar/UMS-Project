import type {
  AttendanceRecord,
  Course,
  Department,
  EventItem,
  FeeRecord,
  GalleryItem,
  NewsItem,
  Notice,
  ResultRecord,
  Student,
  Teacher,
  User,
} from '../types'

export const departments: Department[] = [
  { id: 'D01', name: 'Computer Science', shortDesc: 'AI, software, and systems innovation.', students: 2400, teachers: 62, courses: 38, head: 'Prof. Eleanor Shaw', icon: '💻' },
  { id: 'D02', name: 'Business Administration', shortDesc: 'Leadership, finance, and entrepreneurship.', students: 2100, teachers: 48, courses: 34, head: 'Dr. Marcus Hale', icon: '📈' },
  { id: 'D03', name: 'Electrical Engineering', shortDesc: 'Power, robotics, and intelligent devices.', students: 1850, teachers: 41, courses: 29, head: 'Dr. Lila Brooks', icon: '⚡' },
  { id: 'D04', name: 'Architecture', shortDesc: 'Sustainable design and urban futures.', students: 980, teachers: 26, courses: 18, head: 'Prof. Julian Cross', icon: '🏛️' },
  { id: 'D05', name: 'Law', shortDesc: 'Global legal studies and policy.', students: 1320, teachers: 33, courses: 22, head: 'Prof. Nadia Price', icon: '⚖️' },
  { id: 'D06', name: 'Medicine', shortDesc: 'Clinical excellence and biomedical research.', students: 1600, teachers: 55, courses: 31, head: 'Dr. Sophia Hart', icon: '🩺' },
  { id: 'D07', name: 'Media & Communication', shortDesc: 'Digital storytelling and modern media.', students: 870, teachers: 19, courses: 16, head: 'Dr. Olivia Lane', icon: '🎙️' },
  { id: 'D08', name: 'Mathematics', shortDesc: 'Pure and applied mathematical sciences.', students: 760, teachers: 21, courses: 17, head: 'Prof. Henry Cole', icon: '📐' },
]

const teacherSeed = [
  ['TCH001', 'Dr. Adrian Reeves', 'Computer Science', 'Professor', 'Machine Learning'],
  ['TCH002', 'Prof. Maya Sterling', 'Business Administration', 'Associate Professor', 'Strategic Finance'],
  ['TCH003', 'Dr. Ethan Vale', 'Electrical Engineering', 'Professor', 'Embedded Systems'],
  ['TCH004', 'Prof. Claire Monroe', 'Architecture', 'Senior Lecturer', 'Urban Design'],
  ['TCH005', 'Dr. Isaac Rowan', 'Law', 'Professor', 'International Policy'],
  ['TCH006', 'Dr. Zoe Bennett', 'Medicine', 'Associate Professor', 'Public Health'],
  ['TCH007', 'Prof. Lucas Hart', 'Media & Communication', 'Lecturer', 'Digital Journalism'],
  ['TCH008', 'Dr. Amelia Frost', 'Mathematics', 'Professor', 'Applied Statistics'],
  ['TCH009', 'Dr. Noah Ellis', 'Computer Science', 'Lecturer', 'Cyber Security'],
  ['TCH010', 'Prof. Ruby Sinclair', 'Business Administration', 'Assistant Professor', 'Innovation Strategy'],
] as const

export const teachers: Teacher[] = teacherSeed.map(([id, name, department, designation, researchArea], index) => ({
  id,
  name,
  email: `${id.toLowerCase()}@prestige.edu`,
  password: id === 'TCH001' ? 'teacher123' : 'teacher@123',
  role: 'teacher',
  department,
  designation,
  researchArea,
  phone: `+1-202-555-01${index + 10}`,
  avatar: name,
  courses: [],
}))

const courseSeed = [
  ['CSE101', 'Foundations of Programming', 'Computer Science', 'TCH001', 3, 'Mon / Wed 09:00', 'A'],
  ['CSE220', 'Data Structures & Algorithms', 'Computer Science', 'TCH009', 3, 'Tue / Thu 10:30', 'B'],
  ['CSE340', 'Artificial Intelligence', 'Computer Science', 'TCH001', 4, 'Mon / Wed 13:00', 'A'],
  ['BUS110', 'Principles of Management', 'Business Administration', 'TCH002', 3, 'Tue / Thu 09:00', 'A'],
  ['BUS315', 'Corporate Strategy', 'Business Administration', 'TCH010', 3, 'Sun / Tue 12:00', 'B'],
  ['EEE120', 'Circuit Analysis', 'Electrical Engineering', 'TCH003', 3, 'Mon / Thu 14:00', 'A'],
  ['EEE330', 'Robotics Fundamentals', 'Electrical Engineering', 'TCH003', 4, 'Tue / Wed 15:30', 'B'],
  ['ARC101', 'Design Studio I', 'Architecture', 'TCH004', 4, 'Sun / Tue 08:30', 'A'],
  ['ARC260', 'Urban Planning', 'Architecture', 'TCH004', 3, 'Mon / Wed 11:00', 'B'],
  ['LAW201', 'Constitutional Law', 'Law', 'TCH005', 3, 'Tue / Thu 13:30', 'A'],
  ['MED210', 'Human Anatomy', 'Medicine', 'TCH006', 4, 'Sun / Wed 10:00', 'A'],
  ['MED415', 'Community Medicine', 'Medicine', 'TCH006', 3, 'Mon / Thu 12:30', 'B'],
  ['MCM130', 'Media Writing', 'Media & Communication', 'TCH007', 3, 'Tue / Thu 15:00', 'A'],
  ['MAT115', 'Calculus II', 'Mathematics', 'TCH008', 3, 'Sun / Tue 11:00', 'A'],
  ['MAT405', 'Data Analytics', 'Mathematics', 'TCH008', 3, 'Wed / Thu 09:30', 'B'],
] as const

export const courses: Course[] = courseSeed.map(([code, title, department, teacherId, credits, schedule, section], index) => {
  const teacher = teachers.find((item) => item.id === teacherId)
  if (teacher) {
    teacher.courses.push(code)
  }

  return {
    id: `CRS${index + 1}`,
    code,
    title,
    department,
    teacher: teacher?.name ?? teacherId,
    credits,
    capacity: 45,
    slots: 28 + (index % 12),
    schedule,
    section,
  }
})

const studentFirstNames = ['Ariana', 'Liam', 'Noah', 'Sophia', 'Mason', 'Emma', 'Lucas', 'Mila', 'Ethan', 'Ava', 'Henry', 'Nora', 'Leo', 'Isla', 'Daniel', 'Grace', 'James', 'Ella', 'Oliver', 'Chloe']
const studentLastNames = ['Walker', 'Hayes', 'Grant', 'Brooks', 'Ford', 'Reed', 'Parker', 'Gray', 'Price', 'Wells', 'Cole', 'Knight', 'Harper', 'Bennett', 'Sullivan', 'Morgan', 'Adams', 'Ross', 'Howard', 'Lane']

export const students: Student[] = Array.from({ length: 20 }, (_, index) => {
  const id = `STU${String(index + 1).padStart(3, '0')}`
  const department = departments[index % 5].name
  const name = `${studentFirstNames[index]} ${studentLastNames[index]}`

  return {
    id,
    name,
    email: `${id.toLowerCase()}@student.prestige.edu`,
    password: index === 0 ? 'student123' : 'student@123',
    role: 'student',
    department,
    semester: `Semester ${(index % 8) + 1}`,
    rollNumber: `2025-${1000 + index}`,
    session: '2025-2026',
    guardian: `Guardian ${index + 1}`,
    address: `${120 + index} Heritage Avenue, Cambridge`,
    cgpa: Number((3.25 + (index % 5) * 0.12).toFixed(2)),
    attendance: 74 + (index % 10),
    pendingFees: index % 4 === 0 ? 1200 : 0,
    registeredCourses: 4 + (index % 2),
    transportRoute: ['North Loop', 'River Side', 'City Center'][index % 3],
    phone: `+1-303-555-${String(1100 + index).slice(-4)}`,
    avatar: name,
  }
})

export const adminUser: User = {
  id: 'ADM001',
  name: 'Dr. Amelia Grant',
  email: 'admin@prestige.edu',
  password: 'admin123',
  role: 'admin',
  department: 'Administration',
  phone: '+1-404-555-2025',
  designation: 'Registrar',
  avatar: 'AG',
}

export const notices: Notice[] = [
  { id: 'N1', title: 'Final Exam Schedule Published', content: 'Final assessment schedules are now available on the portal.', category: 'Academic', audience: 'Students', date: '2026-04-12' },
  { id: 'N2', title: 'Admissions Open for 2026', content: 'Undergraduate and graduate applications are now being accepted.', category: 'Event', audience: 'All', date: '2026-03-21' },
  { id: 'N3', title: 'Campus Shuttle Route Update', content: 'Morning route timings have been optimized for city-center students.', category: 'General', audience: 'Students', date: '2026-03-27' },
  { id: 'N4', title: 'Urgent: ID Card Renewal', content: 'All students must renew smart ID cards by April 10.', category: 'Urgent', audience: 'Students', date: '2026-03-29' },
  { id: 'N5', title: 'Faculty Research Grant Call', content: 'Seed funding proposals are invited from all departments.', category: 'Academic', audience: 'Teachers', date: '2026-03-19' },
  { id: 'N6', title: 'Spring Convocation', content: 'The university convocation will be held in the Grand Hall.', category: 'Event', audience: 'All', date: '2026-05-04' },
  { id: 'N7', title: 'Library Extended Hours', content: 'The central library will remain open until midnight during finals.', category: 'General', audience: 'All', date: '2026-04-01' },
  { id: 'N8', title: 'Tuition Payment Reminder', content: 'Outstanding tuition must be cleared before course registration.', category: 'Urgent', audience: 'Students', date: '2026-03-30' },
  { id: 'N9', title: 'Innovation Lab Showcase', content: 'Student startups will present prototypes next Friday.', category: 'Event', audience: 'All', date: '2026-04-18' },
  { id: 'N10', title: 'Curriculum Review Committee', content: 'Department chairs are requested to submit updated syllabi.', category: 'Academic', audience: 'Teachers', date: '2026-03-24' },
]

export const feeRecords: FeeRecord[] = students.map((student, index) => ({
  id: `FEE${index + 1}`,
  studentId: student.id,
  total: 5400,
  paid: index % 4 === 0 ? 4200 : 5400,
  due: index % 4 === 0 ? 1200 : 0,
  waiver: index % 3 === 0 ? 300 : 0,
  status: index % 4 === 0 ? 'Partial' : 'Paid',
  lastPayment: `2026-0${(index % 3) + 1}-1${index % 9}`,
}))

const attendanceStates: AttendanceRecord['status'][] = ['Present', 'Present', 'Present', 'Late', 'Absent']

export const attendanceRecords: AttendanceRecord[] = students.flatMap((student, studentIndex) =>
  courses.slice(0, 5).flatMap((course, courseIndex) =>
    Array.from({ length: 6 }, (_, day) => ({
      id: `${student.id}-${course.code}-${day}`,
      studentId: student.id,
      courseCode: course.code,
      courseTitle: course.title,
      date: `2026-03-${String(10 + day + courseIndex).padStart(2, '0')}`,
      status: attendanceStates[(studentIndex + courseIndex + day) % attendanceStates.length],
    })),
  ),
)

const gradeScale = [
  ['A', 4],
  ['A-', 3.7],
  ['B+', 3.3],
  ['B', 3],
  ['B-', 2.7],
] as const

export const results: ResultRecord[] = students.flatMap((student, studentIndex) =>
  courses.slice(0, 5).map((course, courseIndex) => {
    const grade = gradeScale[(studentIndex + courseIndex) % gradeScale.length]
    return {
      id: `${student.id}-${course.code}`,
      studentId: student.id,
      semester: student.semester ?? 'Semester 1',
      courseCode: course.code,
      courseTitle: course.title,
      credit: course.credits,
      grade: grade[0],
      gradePoint: grade[1],
    }
  }),
)

export const newsItems: NewsItem[] = [
  { id: 'NW1', title: 'Prestige University Ranked Top 50 for Innovation', excerpt: 'A new international ranking recognizes the university for outstanding interdisciplinary research.', date: 'Mar 28, 2026', category: 'Research' },
  { id: 'NW2', title: 'New School of AI and Data Systems Launches', excerpt: 'A premium new academic initiative expands graduate study in AI ethics, systems, and products.', date: 'Mar 19, 2026', category: 'Academics' },
  { id: 'NW3', title: 'Student Team Wins Global Robotics Challenge', excerpt: 'Engineering students secured first place with an autonomous resilience robot.', date: 'Mar 11, 2026', category: 'Achievement' },
]

export const events: EventItem[] = [
  { id: 'EV1', title: 'International Research Colloquium', date: 'Apr 15', location: 'Innovation Dome', description: 'A full-day exchange on sustainability, AI, and biomedical systems.' },
  { id: 'EV2', title: 'Leadership Summit 2026', date: 'Apr 22', location: 'Senate Hall', description: 'Executive speakers and academic leaders discuss the future of education.' },
  { id: 'EV3', title: 'Open Campus Experience', date: 'May 03', location: 'Main Quadrangle', description: 'Prospective students explore programs, labs, and scholarships.' },
]

export const galleryItems: GalleryItem[] = [
  { id: 'G1', title: 'Grand Library Atrium', category: 'Campus', gradient: 'from-slate-900 via-indigo-800 to-amber-500' },
  { id: 'G2', title: 'Biomedical Lab', category: 'Research', gradient: 'from-blue-900 via-cyan-700 to-slate-300' },
  { id: 'G3', title: 'Innovation Studio', category: 'Tech', gradient: 'from-fuchsia-900 via-violet-700 to-amber-400' },
  { id: 'G4', title: 'Convocation Hall', category: 'Events', gradient: 'from-zinc-900 via-zinc-700 to-amber-300' },
  { id: 'G5', title: 'Design Workshop', category: 'Architecture', gradient: 'from-emerald-900 via-teal-700 to-stone-200' },
  { id: 'G6', title: 'Student Commons', category: 'Life', gradient: 'from-rose-900 via-pink-700 to-orange-300' },
]

export const authUsers = [...students, ...teachers, adminUser]

export const dashboardStats = {
  students: 15000,
  faculty: 500,
  departments: 12,
  years: 50,
}
