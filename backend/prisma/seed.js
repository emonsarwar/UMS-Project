"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("../src/utils/bcrypt");
const prisma = new client_1.PrismaClient();
const departmentSeeds = [
    { name: 'Computer Science & Engineering', shortName: 'CSE', school: 'Science & Technology', headName: 'Dr. Adrian Karim', icon: '💻', description: 'Computational methods, software systems, and intelligent technologies.' },
    { name: 'Software Engineering', shortName: 'SWE', school: 'Science & Technology', headName: 'Dr. Nusrat Jahan', icon: '🧩', description: 'Modern software architecture, product engineering, and agile delivery.' },
    { name: 'Electrical & Electronic Eng.', shortName: 'EEE', school: 'Science & Technology', headName: 'Prof. Sajjad Rahman', icon: '⚡', description: 'Power, electronics, embedded systems, and automation.' },
    { name: 'Data Science', shortName: 'DS', school: 'Science & Technology', headName: 'Dr. Farhana Noor', icon: '📊', description: 'UGC-approved advanced programme in analytics, AI, and data engineering.' },
    { name: 'Business Administration', shortName: 'BBA', school: 'Business & Economics', headName: 'Prof. Tania Ahmed', icon: '📈', description: 'Leadership, management, finance, and entrepreneurship.' },
    { name: 'Economics', shortName: 'ECO', school: 'Business & Economics', headName: 'Dr. Faisal Hossain', icon: '🌍', description: 'Development, policy, macroeconomics, and quantitative analysis.' },
    { name: 'Law & Justice', shortName: 'LAW', school: 'Law', headName: 'Barrister Sharmin Akter', icon: '⚖️', description: 'Legal reasoning, advocacy, and justice studies.' },
    { name: 'English', shortName: 'ENG', school: 'Humanities', headName: 'Prof. Amina Sultana', icon: '📚', description: 'Language, literature, and communication excellence.' },
    { name: 'Journalism & Media Studies', shortName: 'JMS', school: 'Humanities', headName: 'Proposed Programme', icon: '🎙️', description: 'Emerging interdisciplinary media and journalism studies.', },
];
const teacherSeeds = [
    ['TCH-001', 'Dr. Rezaul Karim', 'cse@metrouni.edu.bd', 'Professor', 'Computer Science & Engineering', 'Artificial Intelligence'],
    ['TCH-002', 'Ms. Sabiha Chowdhury', 'swe@metrouni.edu.bd', 'Assistant Professor', 'Software Engineering', 'Product Engineering'],
    ['TCH-003', 'Dr. Shahid Hasan', 'eee@metrouni.edu.bd', 'Associate Professor', 'Electrical & Electronic Eng.', 'Embedded Systems'],
    ['TCH-004', 'Dr. Mahjabeen Islam', 'ds@metrouni.edu.bd', 'Associate Professor', 'Data Science', 'Applied Machine Learning'],
    ['TCH-005', 'Prof. Moin Uddin', 'bba@metrouni.edu.bd', 'Professor', 'Business Administration', 'Strategic Management'],
    ['TCH-006', 'Dr. Nadia Rahman', 'eco@metrouni.edu.bd', 'Lecturer', 'Economics', 'Development Economics'],
    ['TCH-007', 'Barrister Iftekhar Ahmed', 'law@metrouni.edu.bd', 'Associate Professor', 'Law & Justice', 'Constitutional Law'],
    ['TCH-008', 'Ms. Sabrina Sarker', 'eng@metrouni.edu.bd', 'Lecturer', 'English', 'Applied Linguistics'],
    ['TCH-009', 'Dr. Jamil Ahmed', 'cse2@metrouni.edu.bd', 'Assistant Professor', 'Computer Science & Engineering', 'Cyber Security'],
    ['TCH-010', 'Mr. Rafiq Mahmud', 'bba2@metrouni.edu.bd', 'Lecturer', 'Business Administration', 'Innovation & Entrepreneurship'],
];
const studentNames = [
    'Emon Sarwar', 'Tasnim Rahman', 'Nafis Chowdhury', 'Maliha Islam', 'Samiul Haque', 'Nusrat Jahan', 'Raiyan Karim', 'Farzana Noor', 'Arafat Hossain', 'Anika Sultana',
    'Tawhid Hasan', 'Faria Akter', 'Shafin Uddin', 'Jannatul Ferdous', 'Sabbir Ahamed', 'Rimsha Noor', 'Nabil Rahman', 'Mim Tasnia', 'Adnan Islam', 'Tahsin Mahmud',
    'Raisa Chowdhury', 'Muntasir Karim', 'Lamisa Rahman', 'Zarin Akter', 'Asif Hossain', 'Nazia Ahmed', 'Imran Chowdhury', 'Sadia Noor', 'Hasib Rahman', 'Maliha Karim',
];
const newsSeeds = [
    {
        title: 'Metropolitan University receives permanent charter',
        slug: 'permanent-charter-2024',
        excerpt: 'The Government of Bangladesh permanently chartered Metropolitan University on October 3, 2024.',
        content: 'Metropolitan University marked a major milestone with its permanent charter, reaffirming quality education and institutional excellence.',
        category: 'Accreditation',
    },
    {
        title: 'Cambridge English partnership strengthens global pathway',
        slug: 'cambridge-english-partnership',
        excerpt: 'MU expands its international learning ecosystem through a Cambridge English Educational Partner agreement.',
        content: 'The partnership opens new academic and language opportunities for students preparing for international standards.',
        category: 'Partnership',
    },
    {
        title: 'UGC approves BSc in Data Science',
        slug: 'ugc-approves-data-science',
        excerpt: 'A new Data Science programme has been approved for prospective learners at MU.',
        content: 'The new programme blends analytics, machine learning, and computational thinking for emerging careers.',
        category: 'Academics',
    },
];
const noticeSeeds = [
    ['Academic Calendar Spring-2026 Released', 'academic'],
    ['CSE Fest-2025 inaugurated successfully', 'event'],
    ['Cambridge English partnership signing ceremony highlights', 'general'],
    ['Data Science programme admission now open', 'urgent'],
    ['Permanent charter celebration week announced', 'general'],
    ['Payment instruction updated for Spring 2026', 'academic'],
    ['Library support hours extended', 'general'],
    ['Certificate & transcript application online form available', 'academic'],
    ['Orientation for newly admitted students', 'event'],
    ['Attendance policy reminder for all departments', 'urgent'],
];
const eventSeeds = [
    ['CSE Fest 2025', 'Innovation and technology celebration with students and industry partners.', 'MU Campus, Sylhet', '2026-04-10T10:00:00.000Z', '2026-04-10T16:00:00.000Z', 'Technology'],
    ['Spring Orientation', 'Welcome event for newly admitted students and guardians.', 'Auditorium', '2026-04-15T09:00:00.000Z', '2026-04-15T12:00:00.000Z', 'Academic'],
    ['British Council IELTS Session', 'Guidance and support for English proficiency preparation.', 'Conference Room', '2026-04-22T11:00:00.000Z', '2026-04-22T13:00:00.000Z', 'Partnership'],
    ['Career Centre Networking Day', 'Industry connect and placement preparation workshops.', 'Career Centre', '2026-05-04T10:00:00.000Z', '2026-05-04T15:00:00.000Z', 'Career'],
    ['Research Cell Colloquium', 'Faculty and student research paper showcase.', 'Seminar Hall', '2026-05-18T09:30:00.000Z', '2026-05-18T14:00:00.000Z', 'Research'],
];
const transportRoutes = [
    { routeName: 'Zindabazar Route', stops: ['Zindabazar', 'Amborkhana', 'Campus'], departure: '7:30 AM', busNumber: 'MU-01', driver: 'Jalal Uddin', capacity: 40 },
    { routeName: 'Amborkhana Route', stops: ['Amborkhana', 'Subid Bazar', 'Campus'], departure: '7:45 AM', busNumber: 'MU-02', driver: 'Harun Mia', capacity: 36 },
    { routeName: 'Subhanighat Route', stops: ['Subhanighat', 'Mirabazar', 'Campus'], departure: '7:20 AM', busNumber: 'MU-03', driver: 'Saifur Rahman', capacity: 32 },
];
async function main() {
    await prisma.refreshToken.deleteMany();
    await prisma.feeRecord.deleteMany();
    await prisma.result.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.courseAssignment.deleteMany();
    await prisma.course.deleteMany();
    await prisma.student.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.user.deleteMany();
    await prisma.notice.deleteMany();
    await prisma.newsArticle.deleteMany();
    await prisma.event.deleteMany();
    await prisma.galleryImage.deleteMany();
    await prisma.admissionApplication.deleteMany();
    await prisma.transportRoute.deleteMany();
    await prisma.department.deleteMany();
    const departments = new Map();
    for (const department of departmentSeeds) {
        const created = await prisma.department.create({ data: department });
        departments.set(department.name, created.id);
    }
    const routeRecords = await Promise.all(transportRoutes.map((route) => prisma.transportRoute.create({ data: route })));
    const studentPassword = await (0, bcrypt_1.hashPassword)('student@123');
    const teacherPassword = await (0, bcrypt_1.hashPassword)('teacher@123');
    const adminPassword = await (0, bcrypt_1.hashPassword)('admin@123');
    const teacherRecords = [];
    for (const [teacherId, fullName, email, designation, departmentName, researchArea] of teacherSeeds) {
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: teacherPassword,
                role: client_1.Role.TEACHER,
                teacher: {
                    create: {
                        teacherId,
                        fullName,
                        designation,
                        departmentId: departments.get(departmentName),
                        phone: '+8801700000000',
                        researchArea,
                    },
                },
            },
            include: { teacher: true },
        });
        teacherRecords.push({
            id: user.teacher.id,
            teacherId,
            departmentId: user.teacher.departmentId,
        });
    }
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@metrouni.edu.bd',
            passwordHash: adminPassword,
            role: client_1.Role.ADMIN,
            admin: {
                create: {
                    fullName: 'MU System Administrator',
                    role: 'super_admin',
                },
            },
        },
        include: { admin: true },
    });
    const deptList = Array.from(departments.entries());
    const createdStudents = [];
    for (const [index, name] of studentNames.entries()) {
        const [departmentName, departmentId] = deptList[index % deptList.length];
        const user = await prisma.user.create({
            data: {
                email: `student${index + 1}@metrouni.edu.bd`,
                passwordHash: studentPassword,
                role: client_1.Role.STUDENT,
                student: {
                    create: {
                        studentId: index === 0 ? 'STU-2024-CSE-001' : `STU-2024-${departmentName.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(3, '0')}`,
                        fullName: name,
                        phone: `+8801712${String(100000 + index).slice(-6)}`,
                        address: `${20 + index}, Sylhet City, Bangladesh`,
                        guardianName: `Guardian ${index + 1}`,
                        guardianPhone: `+8801812${String(100000 + index).slice(-6)}`,
                        departmentId,
                        semester: (index % 8) + 1,
                        session: 'Spring 2026',
                        transportRouteId: routeRecords[index % routeRecords.length].id,
                    },
                },
            },
            include: { student: true },
        });
        createdStudents.push({
            id: user.student.id,
            studentId: user.student.studentId,
            departmentId,
        });
    }
    const courseRecords = [];
    const courseTitlesByDepartment = {
        CSE: ['Programming Fundamentals', 'Data Structures', 'Database Systems', 'Operating Systems', 'Web Engineering'],
        SWE: ['Software Design', 'Requirements Engineering', 'Software Testing', 'DevOps Fundamentals', 'Mobile App Development'],
        EEE: ['Circuit Analysis', 'Electronics I', 'Signals & Systems', 'Power Systems', 'Microprocessors'],
        DS: ['Data Analytics', 'Probability for DS', 'Machine Learning', 'Data Visualization', 'Big Data Systems'],
        BBA: ['Principles of Management', 'Marketing Strategy', 'Financial Accounting', 'Business Communication', 'Entrepreneurship'],
        ECO: ['Microeconomics', 'Macroeconomics', 'Econometrics', 'Development Economics', 'Public Finance'],
        LAW: ['Legal Methods', 'Constitutional Law', 'Law of Contract', 'Criminal Law', 'Human Rights Law'],
        ENG: ['English Composition', 'Poetry & Prose', 'Linguistics', 'Literary Criticism', 'Professional Communication'],
        JMS: ['Introduction to Media', 'News Writing', 'Digital Storytelling', 'Media Ethics', 'Broadcast Journalism'],
    };
    for (const department of await prisma.department.findMany()) {
        const titles = courseTitlesByDepartment[department.shortName] ?? ['Foundation Course'];
        for (const [index, title] of titles.entries()) {
            const course = await prisma.course.create({
                data: {
                    code: `${department.shortName}-${101 + index}`,
                    title,
                    credits: index % 2 === 0 ? 3 : 4,
                    departmentId: department.id,
                    semester: (index % 8) + 1,
                    description: `${title} offered by the ${department.name} department.`,
                },
            });
            courseRecords.push({ id: course.id, departmentId: department.id, credits: course.credits });
        }
    }
    for (const [index, course] of courseRecords.entries()) {
        const teacher = teacherRecords.find((item) => item.departmentId === course.departmentId) ?? teacherRecords[index % teacherRecords.length];
        await prisma.courseAssignment.create({
            data: {
                teacherId: teacher.id,
                courseId: course.id,
                session: 'Spring 2026',
                section: String.fromCharCode(65 + (index % 3)),
            },
        });
    }
    for (const [index, student] of createdStudents.entries()) {
        const studentCourses = courseRecords.filter((course) => course.departmentId === student.departmentId).slice(0, 3);
        for (const course of studentCourses) {
            await prisma.enrollment.create({
                data: {
                    studentId: student.id,
                    courseId: course.id,
                    session: 'Spring 2026',
                },
            });
            await prisma.result.create({
                data: {
                    studentId: student.id,
                    courseId: course.id,
                    session: 'Spring 2026',
                    examType: 'midterm',
                    marksObtained: 70 + (index % 20),
                    totalMarks: 100,
                    grade: index % 5 === 0 ? 'A+' : index % 4 === 0 ? 'A' : 'B+',
                    gradePoint: index % 5 === 0 ? 4 : index % 4 === 0 ? 3.75 : 3.5,
                    publishedAt: new Date(),
                    isPublished: true,
                },
            });
        }
        await prisma.feeRecord.createMany({
            data: [
                {
                    studentId: student.id,
                    session: 'Spring 2026',
                    feeType: 'tuition',
                    amount: 42000,
                    dueDate: new Date('2026-04-20'),
                    paidAmount: index % 4 === 0 ? 21000 : 42000,
                    paidAt: index % 4 === 0 ? null : new Date('2026-03-15'),
                    status: index % 4 === 0 ? 'partial' : 'paid',
                    receiptNo: index % 4 === 0 ? null : `MU-R-${index + 1}`,
                },
                {
                    studentId: student.id,
                    session: 'Spring 2026',
                    feeType: 'library',
                    amount: 2500,
                    dueDate: new Date('2026-04-20'),
                    paidAmount: 2500,
                    paidAt: new Date('2026-03-15'),
                    status: 'paid',
                    receiptNo: `MU-L-${index + 1}`,
                },
            ],
        });
    }
    await prisma.newsArticle.createMany({
        data: newsSeeds.map((item) => ({
            ...item,
            isPublished: true,
            publishedAt: new Date(),
        })),
    });
    await prisma.event.createMany({
        data: eventSeeds.map(([title, description, venue, startDate, endDate, category]) => ({
            title,
            description,
            venue,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            category,
            isPublished: true,
        })),
    });
    await prisma.notice.createMany({
        data: noticeSeeds.map(([title, category], index) => ({
            title,
            content: `<p>${title}</p>`,
            category,
            targetRole: 'all',
            isPublished: true,
            publishedAt: new Date(),
            expiresAt: new Date('2026-06-30'),
            createdBy: adminUser.admin.id,
            createdAt: new Date(Date.now() - index * 86400000),
        })),
    });
    await prisma.galleryImage.createMany({
        data: [
            { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1', caption: 'MU academic block', category: 'Campus' },
            { url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f', caption: 'Innovation and laboratory activities', category: 'Research' },
            { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b', caption: 'Student life at MU', category: 'Student Life' },
        ],
    });
    console.log('✅ Metropolitan University seed completed successfully.');
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
