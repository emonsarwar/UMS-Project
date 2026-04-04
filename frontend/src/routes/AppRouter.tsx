import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Loader from '../components/ui/Loader'
import PublicRoutes from './PublicRoutes'
import ProtectedRoute from './ProtectedRoute'
import PortalLayout from '../components/layout/PortalLayout'

const Home = lazy(() => import('../pages/public/Home'))
const About = lazy(() => import('../pages/public/About'))
const Departments = lazy(() => import('../pages/public/Departments'))
const Faculty = lazy(() => import('../pages/public/Faculty'))
const Events = lazy(() => import('../pages/public/Events'))
const News = lazy(() => import('../pages/public/News'))
const Gallery = lazy(() => import('../pages/public/Gallery'))
const Admission = lazy(() => import('../pages/public/Admission'))
const Contact = lazy(() => import('../pages/public/Contact'))
const Research = lazy(() => import('../pages/public/Research'))
const CampusLife = lazy(() => import('../pages/public/CampusLife'))
const IQAC = lazy(() => import('../pages/public/IQAC'))

const LoginSelector = lazy(() => import('../pages/auth/LoginSelector'))
const StudentLogin = lazy(() => import('../pages/auth/StudentLogin'))
const TeacherLogin = lazy(() => import('../pages/auth/TeacherLogin'))
const AdminLogin = lazy(() => import('../pages/auth/AdminLogin'))

const StudentDashboard = lazy(() => import('../pages/student/StudentDashboard'))
const Profile = lazy(() => import('../pages/student/Profile'))
const CourseRegistration = lazy(() => import('../pages/student/CourseRegistration'))
const Attendance = lazy(() => import('../pages/student/Attendance'))
const Results = lazy(() => import('../pages/student/Results'))
const TuitionFees = lazy(() => import('../pages/student/TuitionFees'))
const TransportInfo = lazy(() => import('../pages/student/TransportInfo'))
const Library = lazy(() => import('../pages/student/Library'))

const TeacherDashboard = lazy(() => import('../pages/teacher/TeacherDashboard'))
const CourseList = lazy(() => import('../pages/teacher/CourseList'))
const MarkAttendance = lazy(() => import('../pages/teacher/MarkAttendance'))
const UploadResult = lazy(() => import('../pages/teacher/UploadResult'))
const StudentList = lazy(() => import('../pages/teacher/StudentList'))

const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'))
const ManageStudents = lazy(() => import('../pages/admin/ManageStudents'))
const ManageTeachers = lazy(() => import('../pages/admin/ManageTeachers'))
const ManageCourses = lazy(() => import('../pages/admin/ManageCourses'))
const ManageDepartments = lazy(() => import('../pages/admin/ManageDepartments'))
const ManageTransport = lazy(() => import('../pages/admin/ManageTransport'))
const ManageFees = lazy(() => import('../pages/admin/ManageFees'))
const ManageLibrary = lazy(() => import('../pages/admin/ManageLibrary'))
const NoticeBoardAdmin = lazy(() => import('../pages/admin/NoticeBoard'))
const Analytics = lazy(() => import('../pages/admin/Analytics'))
const AdminGallery = lazy(() => import('../pages/admin/Gallery'))
const AdmissionsAdmin = lazy(() => import('../pages/admin/Admissions'))

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-hero px-4 text-white">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl text-center">
      <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent-light)]">404</p>
      <h1 className="mt-3 font-display text-5xl">Page not found</h1>
      <p className="mt-3 text-slate-200">The page you requested is outside Metropolitan University's academic map.</p>
      <a href="/" className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-[var(--primary)]">
        Back Home
      </a>
    </motion.div>
  </div>
)

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/research" element={<Research />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/iqac" element={<IQAC />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<LoginSelector />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        <Route path="/portal/student" element={<ProtectedRoute allowedRole="student" />}>
          <Route element={<PortalLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="courses" element={<CourseRegistration />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="results" element={<Results />} />
            <Route path="fees" element={<TuitionFees />} />
            <Route path="transport" element={<TransportInfo />} />
            <Route path="library" element={<Library />} />
          </Route>
        </Route>

        <Route path="/portal/teacher" element={<ProtectedRoute allowedRole="teacher" />}>
          <Route element={<PortalLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="courses" element={<CourseList />} />
            <Route path="attendance" element={<MarkAttendance />} />
            <Route path="results" element={<UploadResult />} />
            <Route path="students" element={<StudentList />} />
          </Route>
        </Route>

        <Route path="/portal/admin" element={<ProtectedRoute allowedRole="admin" />}>
          <Route element={<PortalLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="teachers" element={<ManageTeachers />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="departments" element={<ManageDepartments />} />
            <Route path="admissions" element={<AdmissionsAdmin />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="transport" element={<ManageTransport />} />
            <Route path="fees" element={<ManageFees />} />
            <Route path="notices" element={<NoticeBoardAdmin />} />
            <Route path="library" element={<ManageLibrary />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Route>


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
