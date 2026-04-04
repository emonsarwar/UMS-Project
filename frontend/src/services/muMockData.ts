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

export const universityInfo = {
  name: 'Metropolitan University',
  short: 'MU',
  founded: 2003,
  location: 'Sylhet, Bangladesh',
  charter: 'Permanently chartered by Government of Bangladesh — Oct 3, 2024',
  accreditation: 'University Grants Commission (UGC) of Bangladesh',
  tagline: 'Education. Not Just a Degree.',
  website: 'https://www.metrouni.edu.bd',
}

export const departments: Department[] = [
  { id: 'D01', name: 'Computer Science & Engineering', shortDesc: 'Computational methods, software systems, and intelligent technology.', students: 2100, teachers: 42, courses: 20, head: 'Dr. Rezaul Karim', icon: '💻' },
  { id: 'D02', name: 'Software Engineering', shortDesc: 'Modern software architecture, product design, and agile engineering.', students: 1260, teachers: 22, courses: 16, head: 'Ms. Sabiha Chowdhury', icon: '🧩' },
  { id: 'D03', name: 'Electrical & Electronic Eng.', shortDesc: 'Power, electronics, robotics, and automation systems.', students: 980, teachers: 18, courses: 15, head: 'Prof. Sajjad Rahman', icon: '⚡' },
  { id: 'D04', name: 'Data Science', shortDesc: 'New UGC-approved programme in analytics, AI, and data systems.', students: 430, teachers: 10, courses: 12, head: 'Dr. Farhana Noor', icon: '📊' },
  { id: 'D05', name: 'Business Administration', shortDesc: 'Leadership, finance, and entrepreneurship for modern organizations.', students: 1800, teachers: 32, courses: 18, head: 'Prof. Tania Ahmed', icon: '📈' },
  { id: 'D06', name: 'Economics', shortDesc: 'Policy, development economics, and evidence-based decision making.', students: 620, teachers: 12, courses: 12, head: 'Dr. Faisal Hossain', icon: '🌍' },
  { id: 'D07', name: 'Law & Justice', shortDesc: 'Legal education grounded in justice, advocacy, and ethics.', students: 700, teachers: 14, courses: 14, head: 'Barrister Sharmin Akter', icon: '⚖️' },
  { id: 'D08', name: 'English', shortDesc: 'Language, literature, and communication in a global context.', students: 430, teachers: 10, courses: 10, head: 'Prof. Amina Sultana', icon: '📚' },
  { id: 'D09', name: 'Journalism & Media Studies', shortDesc: 'A proposed interdisciplinary pathway in journalism and digital media.', students: 180, teachers: 4, courses: 6, head: 'Proposed Programme', icon: '🎙️' },
]

export const leadership = [
  {
    id: 'L1',
    name: 'Dr. Toufique Rahman Chowdhury',
    title: 'Founder & Chairman (Emeritus)',
    summary: 'The visionary pioneer who established MU with a mission to provide world-class education in Sylhet.',
  },
  {
    id: 'L2',
    name: 'Mr. Tanwir Rahman Chowdhury',
    title: 'Chairman, Board of Trustees',
    summary: 'Leading the university’s strategic growth and modernization efforts.',
  },
  {
    id: 'L3',
    name: 'Professor Dr. Mohammad Jahirul Hoque',
    title: 'Vice Chancellor',
    summary: 'Dedicated to fostering academic integrity, research innovation, and a vibrant learning culture.',
  },
]

export const schools = [
  {
    key: 'science',
    name: 'School of Science & Technology',
    description: 'The School is devoted to the study and advancement of computational methods and data analysis techniques.',
    departments: ['CSE', 'SWE', 'EEE', 'Data Science'],
    icon: '🧪',
  },
  {
    key: 'business',
    name: 'School of Business & Economics',
    description: 'Started in 2003 with 49 students with the objective of giving quality education.',
    departments: ['Business Administration', 'Economics'],
    icon: '💼',
  },
  {
    key: 'law',
    name: 'School of Law',
    description: 'Preparing students for justice, legal reasoning, and service to society.',
    departments: ['Law & Justice'],
    icon: '⚖️',
  },
  {
    key: 'humanities',
    name: 'School of Humanities & Social Sciences',
    description: 'Language, media, and culture with a contemporary interdisciplinary lens.',
    departments: ['English', 'Journalism & Media Studies (proposed)'],
    icon: '🖋️',
  },
]

export const clubs = [
  'MU Sports Club',
  'MU Hult Prize',
  'MU Rover Scouts',
  'MU Karate Club',
  'MU Social Services Club',
  'MU Cultural Club',
  'MU Model United Nation',
  'MU Cycling Association',
  'MU Photographic Society',
  'MU Robotics Club',
  'SWE Innovators Forum',
  'MU Geography & Astronomical Society (MUGAS)',
  'Metropolitan University Debating Club',
]

export const facilities = [
  'One Stop Service',
  'Career Centre',
  'Digital Campus',
  'Library',
  'Laboratory Resources',
  'Cafeteria',
  'Auditorium',
  'Play Ground',
  'IT Support Centre',
  'Accommodation',
]

export const partnerships = [
  'Cambridge English Educational Partner',
  'British Council IELTS Partner',
  'UGC Bangladesh',
  'Permanently Chartered 2024',
  'Est. 2003',
]

export const committees = [
  'Advisors',
  'Board of Trustees',
  'Syndicate',
  'Academic Council',
  'Senior Management Committee',
  'Finance Committee',
  'Exam Surveillance Committee',
  'Disciplinary Committee',
  'Proctorial Committee',
  'Anti-Terrorism Committee',
  'Anti-Drug Committee',
  'Sexual Abuse & Harassment Prevention Committee',
  'Anti-Ragging Committee',
]

export const offices = [
  'Office of Board of Trustees',
  'VC Office',
  'Pro-VC Office',
  'Treasurer',
  'Registrar',
  'Controller of Examinations',
  'Library',
  'IT',
  'Admission',
  'University Engineers (Electrical & Civil)',
]

export const policies = [
  'Academic Policies',
  'Student Code of Conduct',
  'Prospectus',
  'Examination Policy',
  'Academic Calendar Spring-2026',
  'Payment Instruction',
  'Certificate & Transcript Application',
  'Online Forms',
]

const teacherSeed = [
  ['TCH-001', 'Dr. Rezaul Karim', 'Computer Science & Engineering', 'Professor', 'Artificial Intelligence'],
  ['TCH-002', 'Ms. Sabiha Chowdhury', 'Software Engineering', 'Assistant Professor', 'Software Product Engineering'],
  ['TCH-003', 'Dr. Shahid Hasan', 'Electrical & Electronic Eng.', 'Associate Professor', 'Embedded Systems'],
  ['TCH-004', 'Dr. Farhana Noor', 'Data Science', 'Associate Professor', 'Applied Machine Learning'],
  ['TCH-005', 'Prof. Tania Ahmed', 'Business Administration', 'Professor', 'Strategic Management'],
  ['TCH-006', 'Dr. Faisal Hossain', 'Economics', 'Lecturer', 'Development Economics'],
  ['TCH-007', 'Barrister Iftekhar Ahmed', 'Law & Justice', 'Associate Professor', 'Constitutional Law'],
  ['TCH-008', 'Ms. Sabrina Sarker', 'English', 'Lecturer', 'Applied Linguistics'],
  ['TCH-009', 'Dr. Jamil Ahmed', 'Computer Science & Engineering', 'Assistant Professor', 'Cyber Security'],
  ['TCH-010', 'Mr. Rafiq Mahmud', 'Business Administration', 'Lecturer', 'Innovation & Entrepreneurship'],
] as const

export const teachers: Teacher[] = teacherSeed.map(([id, name, department, designation, researchArea], index) => ({
  id,
  name,
  email: `${id.toLowerCase()}@metrouni.edu.bd`,
  password: id === 'TCH-001' ? 'teacher@123' : 'teacher@123',
  role: 'teacher',
  department,
  designation,
  researchArea,
  phone: `+8801711000${String(index).padStart(2, '0')}`,
  avatar: name,
  courses: [],
}))

const courseSeed = [
  ['CSE-101', 'Programming Fundamentals', 'Computer Science & Engineering', 'TCH-001', 3, 'Sun / Tue 09:00', 'A'],
  ['CSE-220', 'Database Systems', 'Computer Science & Engineering', 'TCH-009', 3, 'Mon / Wed 11:00', 'B'],
  ['SWE-101', 'Software Design Basics', 'Software Engineering', 'TCH-002', 3, 'Sun / Tue 10:30', 'A'],
  ['SWE-230', 'Software Testing', 'Software Engineering', 'TCH-002', 3, 'Mon / Wed 14:00', 'A'],
  ['EEE-120', 'Circuit Analysis', 'Electrical & Electronic Eng.', 'TCH-003', 3, 'Sun / Tue 12:00', 'A'],
  ['EEE-240', 'Power Electronics', 'Electrical & Electronic Eng.', 'TCH-003', 3, 'Mon / Thu 13:30', 'B'],
  ['DS-101', 'Data Analytics', 'Data Science', 'TCH-004', 3, 'Sun / Tue 09:30', 'A'],
  ['DS-210', 'Machine Learning Foundations', 'Data Science', 'TCH-004', 4, 'Tue / Thu 15:00', 'A'],
  ['BBA-101', 'Principles of Management', 'Business Administration', 'TCH-005', 3, 'Sun / Tue 08:30', 'A'],
  ['BBA-320', 'Entrepreneurship', 'Business Administration', 'TCH-010', 3, 'Mon / Wed 12:00', 'B'],
  ['ECO-101', 'Microeconomics', 'Economics', 'TCH-006', 3, 'Tue / Thu 10:00', 'A'],
  ['ECO-205', 'Development Economics', 'Economics', 'TCH-006', 3, 'Sun / Wed 14:30', 'A'],
  ['LAW-101', 'Legal Methods', 'Law & Justice', 'TCH-007', 3, 'Mon / Wed 09:00', 'A'],
  ['LAW-220', 'Constitutional Law', 'Law & Justice', 'TCH-007', 3, 'Tue / Thu 13:00', 'B'],
  ['ENG-101', 'English Composition', 'English', 'TCH-008', 3, 'Sun / Tue 11:30', 'A'],
  ['ENG-230', 'Literary Criticism', 'English', 'TCH-008', 3, 'Mon / Wed 15:00', 'B'],
] as const

export const courses: Course[] = courseSeed.map(([code, title, department, teacherId, credits, schedule, section], index) => {
  const teacher = teachers.find((item) => item.id === teacherId)
  if (teacher) teacher.courses.push(code)

  return {
    id: `CRS${index + 1}`,
    code,
    title,
    department,
    teacher: teacher?.name ?? teacherId,
    credits,
    capacity: 45,
    slots: 12 + (index % 18),
    schedule,
    section,
  }
})

const names = [
  'Emon Sarwar', 'Tasnim Rahman', 'Nafis Chowdhury', 'Maliha Islam', 'Samiul Haque', 'Nusrat Jahan', 'Raiyan Karim', 'Farzana Noor', 'Arafat Hossain', 'Anika Sultana',
  'Tawhid Hasan', 'Faria Akter', 'Shafin Uddin', 'Jannatul Ferdous', 'Sabbir Ahamed', 'Rimsha Noor', 'Nabil Rahman', 'Mim Tasnia', 'Adnan Islam', 'Tahsin Mahmud',
  'Raisa Chowdhury', 'Muntasir Karim', 'Lamisa Rahman', 'Zarin Akter', 'Asif Hossain', 'Nazia Ahmed', 'Imran Chowdhury', 'Sadia Noor', 'Hasib Rahman', 'Maliha Karim',
]

export const students: Student[] = names.map((name, index) => {
  const department = departments[index % departments.length].name
  const short = departments[index % departments.length].shortDesc.includes('data') ? 'DS' : departments[index % departments.length].name.split(' ')[0].replace('&', '').slice(0, 3).toUpperCase()
  const id = index === 0 ? 'STU-2024-CSE-001' : `STU-2024-${short}-${String(index + 1).padStart(3, '0')}`

  return {
    id,
    name,
    email: `${id.toLowerCase().replace(/[^a-z0-9]/g, '')}@student.metrouni.edu.bd`,
    password: 'student@123',
    role: 'student',
    department,
    semester: `Semester ${(index % 8) + 1}`,
    rollNumber: `MU-${2024 + (index % 2)}-${String(1000 + index)}`,
    session: 'Spring 2026',
    guardian: `Guardian ${index + 1}`,
    address: `${50 + index}, Zindabazar, Sylhet`,
    cgpa: Number((3.2 + (index % 5) * 0.12).toFixed(2)),
    attendance: 68 + (index % 20),
    pendingFees: index % 4 === 0 ? 18500 : 0,
    registeredCourses: 4 + (index % 2),
    transportRoute: ['Zindabazar Route', 'Amborkhana Route', 'Subhanighat Route'][index % 3],
    phone: `+8801712${String(100000 + index).slice(-6)}`,
    avatar: name,
  }
})

export const adminUser: User = {
  id: 'ADM-001',
  name: 'MU System Administrator',
  email: 'admin@metrouni.edu.bd',
  password: 'admin@123',
  role: 'admin',
  department: 'Administration',
  phone: '+8801700000000',
  designation: 'super_admin',
  avatar: 'MU',
}

export const notices: Notice[] = [
  { id: 'N1', title: 'Academic Calendar Spring-2026 Released', content: 'The official Spring 2026 calendar is now available for all departments.', category: 'Academic', audience: 'All', date: '2026-03-28' },
  { id: 'N2', title: 'CSE Fest-2025 Inaugurated', content: 'Innovation meets technology at the colorful inauguration of CSE Fest-2025.', category: 'Event', audience: 'All', date: '2026-03-20' },
  { id: 'N3', title: 'Cambridge English Partnership Signed', content: 'MU officially signed the Cambridge English Educational Partner ceremony.', category: 'General', audience: 'All', date: '2026-03-18' },
  { id: 'N4', title: 'UGC approves Data Science programme', content: 'Admissions are now open for the new BSc in Data Science.', category: 'Urgent', audience: 'Students', date: '2026-03-31' },
  { id: 'N5', title: 'Permanent Charter Celebration Week', content: 'Campus-wide celebrations continue following the 2024 permanent charter milestone.', category: 'General', audience: 'All', date: '2026-04-02' },
  { id: 'N6', title: 'Payment Instruction Updated', content: 'Please review the latest fee submission instructions for Spring 2026.', category: 'Academic', audience: 'Students', date: '2026-03-26' },
  { id: 'N7', title: 'Certificate Verification Portal Live', content: 'Digital certificate verification is now available through the portal.', category: 'General', audience: 'All', date: '2026-03-15' },
  { id: 'N8', title: 'Attendance Policy Reminder', content: 'Students below 75% attendance should consult their advisors immediately.', category: 'Urgent', audience: 'Students', date: '2026-03-30' },
  { id: 'N9', title: 'British Council IELTS Session', content: 'Join the upcoming IELTS partnership information session next week.', category: 'Event', audience: 'All', date: '2026-04-06' },
  { id: 'N10', title: 'Online Forms Updated', content: 'Transcript, certificate, and payment forms are now available online.', category: 'Academic', audience: 'All', date: '2026-03-24' },
]

export const feeRecords: FeeRecord[] = students.map((student, index) => ({
  id: `FEE${index + 1}`,
  studentId: student.id,
  total: 46000,
  paid: index % 4 === 0 ? 27500 : 46000,
  due: index % 4 === 0 ? 18500 : 0,
  waiver: index % 5 === 0 ? 2500 : 0,
  status: index % 4 === 0 ? 'Partial' : 'Paid',
  lastPayment: `2026-03-${String(10 + (index % 12)).padStart(2, '0')}`,
}))

const attendanceStates: AttendanceRecord['status'][] = ['Present', 'Present', 'Late', 'Present', 'Absent']

export const attendanceRecords: AttendanceRecord[] = students.flatMap((student, studentIndex) =>
  courses.slice(0, 6).flatMap((course, courseIndex) =>
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
  ['A+', 4],
  ['A', 3.75],
  ['B+', 3.5],
  ['B', 3],
  ['C', 2.5],
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
  { id: 'NW1', title: 'Permanent charter marks a defining milestone for MU', excerpt: 'The Government of Bangladesh granted Metropolitan University permanent charter recognition on October 3, 2024.', date: 'Mar 28, 2026', category: 'Accreditation' },
  { id: 'NW2', title: 'Cambridge English Educational Partner ceremony held at MU', excerpt: 'A significant partnership now strengthens language pathways and international readiness for MU students.', date: 'Mar 19, 2026', category: 'Partnership' },
  { id: 'NW3', title: 'UGC approves new BSc in Data Science programme', excerpt: 'Metropolitan University expands its School of Science & Technology with a newly approved Data Science degree.', date: 'Mar 11, 2026', category: 'Academics' },
]

export const events: EventItem[] = [
  { id: 'EV1', title: 'CSE Fest 2025', date: 'Apr 10', location: 'MU Campus', description: 'Innovation and technology celebration with students, alumni, and industry partners.' },
  { id: 'EV2', title: 'Spring Orientation', date: 'Apr 15', location: 'Auditorium', description: 'Welcome event for newly admitted students and guardians.' },
  { id: 'EV3', title: 'British Council IELTS Session', date: 'Apr 22', location: 'Conference Room', description: 'Guidance and support for English proficiency preparation and test readiness.' },
  { id: 'EV4', title: 'Career Centre Networking Day', date: 'May 04', location: 'Career Centre', description: 'Industry connect and placement preparation workshops.' },
  { id: 'EV5', title: 'Research Cell Colloquium', date: 'May 18', location: 'Seminar Hall', description: 'Faculty and student research paper showcase under the Centre for Research & Publication.' },
]

export const galleryItems: GalleryItem[] = [
  { id: 'G1', title: 'Permanent Charter Celebration', category: 'Campus', gradient: 'from-slate-950 via-blue-900 to-amber-400' },
  { id: 'G2', title: 'Cambridge English Ceremony', category: 'Partnership', gradient: 'from-slate-900 via-indigo-700 to-stone-200' },
  { id: 'G3', title: 'Data Science Launch', category: 'Academics', gradient: 'from-sky-950 via-cyan-700 to-amber-300' },
  { id: 'G4', title: 'CSE Fest 2025', category: 'Events', gradient: 'from-fuchsia-950 via-violet-700 to-orange-300' },
  { id: 'G5', title: 'Robotics Club Showcase', category: 'Clubs', gradient: 'from-emerald-950 via-teal-700 to-lime-200' },
  { id: 'G6', title: 'Campus Life in Sylhet', category: 'Student Life', gradient: 'from-rose-950 via-pink-700 to-amber-200' },
]

export const authUsers = [...students, ...teachers, adminUser]

export const tickerItems = [
  'Academic Calendar Spring-2026 Released',
  'CSE Fest-2025 Inaugurated',
  'Cambridge English Partnership Signed',
  'UGC approves Data Science programme',
  'Permanent Charter awarded October 2024',
]

export const dashboardStats = {
  students: 8500,
  faculty: 200,
  departments: 9,
  years: 22,
  clubs: 13,
}
