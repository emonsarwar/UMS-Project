import { useMemo, useState } from 'react'
import { Bell, BookOpen, BookUser, Building2, Bus, ClipboardCheck, CreditCard, GraduationCap, Image, LayoutDashboard, LogOut, Menu, PieChart, Settings, UserRound, Users } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Modal from '../ui/Modal'
import { useAuth } from '../../hooks/useAuth'

const navMap = {
  student: [
    { to: '/portal/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/portal/student/profile', label: 'My Profile', icon: UserRound },
    { to: '/portal/student/courses', label: 'Course Registration', icon: BookOpen },
    { to: '/portal/student/attendance', label: 'Attendance', icon: BookUser },
    { to: '/portal/student/results', label: 'Results', icon: PieChart },
    { to: '/portal/student/fees', label: 'Fee Payments', icon: CreditCard },
    { to: '/portal/student/transport', label: 'Transport', icon: Bus },
  ],
  teacher: [
    { to: '/portal/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/portal/teacher/courses', label: 'Course Management', icon: BookOpen },
    { to: '/portal/teacher/attendance', label: 'Attendance', icon: BookUser },
    { to: '/portal/teacher/results', label: 'Result Upload', icon: PieChart },
    { to: '/portal/teacher/students', label: 'Students', icon: Users },
  ],
  admin: [
    { to: '/portal/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/portal/admin/students', label: 'Students', icon: GraduationCap },
    { to: '/portal/admin/teachers', label: 'Teachers', icon: Users },
    { to: '/portal/admin/courses', label: 'Courses', icon: BookOpen },
    { to: '/portal/admin/departments', label: 'Departments', icon: Building2 },
    { to: '/portal/admin/admissions', label: 'Admissions', icon: ClipboardCheck },
    { to: '/portal/admin/gallery', label: 'Gallery', icon: Image },
    { to: '/portal/admin/transport', label: 'Transport', icon: Bus },
    { to: '/portal/admin/fees', label: 'Fees', icon: CreditCard },
    { to: '/portal/admin/notices', label: 'Notices', icon: Settings },
    { to: '/portal/admin/analytics', label: 'Analytics', icon: PieChart },
  ],
} as const

const prettifyTitle = (pathName: string) =>
  pathName
    .split('/')
    .filter(Boolean)
    .slice(-1)[0]
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase()) ?? 'Dashboard'

const PortalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const { user, role, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const items = useMemo(() => (role ? navMap[role] : []), [role])

  const handleLogout = () => {
    logout()
    setLogoutOpen(false)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-[var(--mu-navy)] p-5 text-white transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/15 font-display text-lg text-[var(--accent-light)]">MU</div>
              <div>
                <p className="font-display text-lg">MU Portal</p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-300">Education. Not Just a Degree.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/15 font-display text-xl text-[var(--accent-light)]">
                {user?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2)}
              </div>
              <p className="mt-3 text-lg font-semibold">{user?.name}</p>
              <span className="mt-1 inline-flex rounded-full bg-[var(--accent)]/15 px-2.5 py-1 text-xs uppercase tracking-[0.22em] text-[var(--accent-light)]">
                {role}
              </span>
            </div>

            <nav className="mt-6 space-y-1">
              {items.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 rounded-2xl border-l-2 px-4 py-3 text-sm transition ${
                    isActive
                      ? 'border-[var(--accent)] bg-[rgba(201,168,76,0.12)] text-[var(--accent-light)]'
                      : 'border-transparent text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </nav>

            <button type="button" onClick={() => setLogoutOpen(true)} className="mt-auto flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-100 transition hover:border-[var(--accent)] hover:text-[var(--accent-light)]">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        <div className="flex-1 lg:pl-72">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur-xl lg:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setSidebarOpen((current) => !current)} className="rounded-full border border-slate-200 p-2 lg:hidden" aria-label="Toggle sidebar">
                  <Menu size={18} />
                </button>
                <div>
                  <p className="font-accent text-xs uppercase tracking-[0.3em] text-slate-500">Metropolitan University Portal</p>
                  <h1 className="font-display text-2xl text-[var(--text-primary)]">{prettifyTitle(location.pathname)}</h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="min-w-[220px] rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                  <input placeholder="Search students, notices, fees..." className="w-full bg-transparent outline-none" />
                </label>
                <button type="button" className="relative rounded-full border border-slate-200 bg-white p-2">
                  <Bell size={18} />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-[var(--primary)]">5</span>
                </button>
                <motion.div whileHover={{ y: -1 }} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium">
                  {user?.name?.split(' ')[0]}
                </motion.div>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <Modal open={logoutOpen} onClose={() => setLogoutOpen(false)} title="Confirm logout" description="You will be returned to the login selector.">
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => setLogoutOpen(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">
            Cancel
          </button>
          <button type="button" onClick={handleLogout} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">
            Logout
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default PortalLayout
