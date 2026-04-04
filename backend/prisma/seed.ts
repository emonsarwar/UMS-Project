import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Metropolitan University - FIXED for WIN1252 encoding...')

  const adminHash = await bcrypt.hash('admin@123', 12)
  const teacherHash = await bcrypt.hash('teacher@123', 12)
  const studentHash = await bcrypt.hash('student@123', 12)

  // DEPARTMENTS - ASCII icons only for Windows encoding
  const departmentsData = [
    { name: 'Computer Science & Engineering', shortName: 'CSE', school: 'School of Science & Technology', description: 'Core computing programmes', icon: 'computer', headName: 'Prof. Dr. A. Rahman' },
    { name: 'Software Engineering', shortName: 'SWE', school: 'School of Science & Technology', description: 'Industry-ready software development', icon: 'tools', headName: 'Dr. B. Khan' },
    { name: 'Electrical & Electronic Engineering', shortName: 'EEE', school: 'School of Science & Technology', description: 'Electronics and power systems engineering', icon: 'zap', headName: 'Prof. C. Ahmed' },
    { name: 'Data Science', shortName: 'DS', school: 'School of Science & Technology', description: 'UGC-approved new programme Spring 2026', icon: 'chart', headName: 'Dr. D. Islam' },
    { name: 'Business Administration', shortName: 'BBA', school: 'School of Business & Economics', description: 'BBA & MBA with business analytics focus', icon: 'briefcase', headName: 'Prof. E. Ali' },
    { name: 'Economics', shortName: 'ECO', school: 'School of Business & Economics', description: 'BA Economics honours', icon: 'trending-up', headName: 'Dr. F. Begum' },
    { name: 'Law & Justice', shortName: 'LAW', school: 'School of Law', description: 'LLB honours programme', icon: 'balance', headName: 'Prof. G. Hossain' },
    { name: 'English', shortName: 'ENG', school: 'School of Humanities & Social Sciences', description: 'BA English Language & Literature', icon: 'book', headName: 'Dr. H. Sarkar' },
    { name: 'Journalism and Media Studies', shortName: 'JMS', school: 'School of Humanities & Social Sciences', description: 'Proposed UGC programme', icon: 'newspaper', headName: 'Assoc. Prof. I. Rahman' },
  ]

  const departments = []
  for (const data of departmentsData) {
    const dept = await prisma.department.create({ data })
    departments.push(dept)
    console.log(`Dept: ${data.shortName}`)
  }

  // ADMINS / LEADERSHIP
  const adminsData = [
    { id: 'ADM-001', email: 'admin@mu.edu.bd', fullName: 'Super Admin', role: 'super_admin' },
    { id: 'ADM-002', email: 'vc@mu.edu.bd', fullName: 'Prof. Dr. Mohammad Jahirul Hoque - Vice Chancellor', role: 'vice_chancellor' },
    { id: 'ADM-003', email: 'chairman@mu.edu.bd', fullName: 'Mr. Tanwir Rahman Chowdhury - Chairman', role: 'chairman' },
  ]

  for (const data of adminsData) {
    await prisma.user.upsert({
      where: { id: data.id },
      update: {},
      create: {
        id: data.id,
        email: data.email,
        passwordHash: adminHash,
        role: Role.ADMIN,
      },
    })
    await prisma.admin.upsert({
      where: { userId: data.id },
      update: {},
      create: { userId: data.id, fullName: data.fullName, role: data.role },
    })
  }
  console.log('Admins seeded')

  // TEACHERS (sample 9)
  const teacherTemplate = [
    ['TCH-001', 'Prof. J. Ahmed', 0, 'Professor', 'AI'],
    ['TCH-002', 'Dr. F. Begum', 0, 'Asst Prof', 'Algorithms'],
    ['TCH-003', 'Assoc. Prof. T. Rahman', 1, 'Assoc Prof', 'Software Eng'],
    ['TCH-004', 'Dr. K. Ahmed', 2, 'Asst Prof', 'Electronics'],
    ['TCH-005', 'Prof. E. Ali', 4, 'Professor', 'Business'],
    ['TCH-006', 'Dr. F. Begum', 5, 'Asst Prof', 'Economics'],
    ['TCH-007', 'Prof. G. Hossain', 6, 'Professor', 'Law'],
    ['TCH-008', 'Dr. H. Sarkar', 7, 'Asst Prof', 'English'],
    ['TCH-009', 'Assoc. Prof. I. Rahman', 8, 'Assoc Prof', 'Media'],
  ]

  for (const [id, name, deptIdx, designation, research] of teacherTemplate) {
    const userId = id
    await prisma.user.create({
      data: {
        id: userId,
        email: `${userId.toLowerCase()}@mu.edu.bd`,
        passwordHash: teacherHash,
        role: Role.TEACHER,
      },
    })
    await prisma.teacher.create({
      data: {
        id: userId,
        userId,
        teacherId: id,
        fullName: name,
        designation,
        departmentId: departments[deptIdx].id,
        researchArea: research,
      },
    })
  }
  console.log('Teachers seeded')

  // STUDENTS (20 sample for demo)
  for (let i = 0; i < 20; i++) {
    const deptIdx = i % 9
    const shortName = departments[deptIdx].shortName
    const studentId = `STU-2024-${shortName.toUpperCase()}-${String(i+1).padStart(3, '0')}`
    await prisma.user.create({
      data: {
        id: studentId,
        email: `${studentId.toLowerCase()}@students.mu.edu.bd`,
        passwordHash: studentHash,
        role: Role.STUDENT,
      },
    })
    await prisma.student.create({
      data: {
        id: studentId,
        userId: studentId,
        studentId,
        fullName: `Student Name ${i+1} ${shortName}`,
        departmentId: departments[deptIdx].id,
        semester: 2 + (i % 4),
        session: 'Spring 2024',
      },
    })
  }
  console.log('Students seeded')

  // COURSES (sample)
  const courses = [
    { code: 'CSE101', title: 'Intro to Programming', credits: 3.0, dept: 0 },
    { code: 'CSE201', title: 'Data Structures', credits: 3.0, dept: 0 },
    { code: 'BBA101', title: 'Business Mathematics', credits: 3.0, dept: 4 },
  ]
  for (const c of courses) {
    await prisma.course.create({
      data: {
        code: c.code,
        title: c.title,
        credits: c.credits,
        departmentId: departments[c.dept].id,
        semester: 1,
      },
    })
  }
  console.log('Courses seeded')

  // NOTICES from spec
  await prisma.notice.createMany({
    data: [
      { title: 'Academic Calendar Spring-2026', content: 'Full semester schedule published', category: 'academic', targetRole: 'all', createdBy: 'ADM-001', isPublished: true },
      { title: 'CSE Fest 2025 Inauguration', content: 'Celebrating innovation and technology', category: 'event', targetRole: 'all', createdBy: 'ADM-001', isPublished: true },
      { title: 'Permanent Charter Oct 2024', content: 'Government recognition achieved', category: 'urgent', targetRole: 'all', createdBy: 'ADM-001', isPublished: true },
    ],
  })

  // EVENTS
  await prisma.event.createMany({
    data: [
      { title: 'CSE Fest 2025', description: 'Tech fest and competitions', venue: 'MU Campus', startDate: new Date('2025-03-15'), endDate: new Date('2025-03-16'), category: 'tech' },
    ],
  })

  // TRANSPORT
  await prisma.transportRoute.createMany({
    data: [
      { routeName: 'Zindabazar', stops: ['Zindabazar', 'Ambarkhana'], departure: '7:30 AM', busNumber: 'MU01', driver: 'Rahim Uddin', capacity: 50 },
    ],
  })

  console.log('🎉 SEED COMPLETE! Backend ready with test data.')
  console.log('Test login: ADM-001/admin@123 | TCH-001/teacher@123 | STU-2024-CSE-001/student@123')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

