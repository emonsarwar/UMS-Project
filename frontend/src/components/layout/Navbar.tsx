import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ExternalLink, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

type NavItem = { label: string; to: string }
type NavMenu = { label: string; match: string[]; items: NavItem[] }

const dropdownMenus: NavMenu[] = [
  {
    label: 'About',
    match: ['/about'],
    items: [
      { label: 'About MU', to: '/about' },
      { label: 'Leadership', to: '/about#leadership' },
      { label: 'Committees', to: '/about#committees' },
      { label: 'Offices', to: '/about#offices' },
    ],
  },
  {
    label: 'Academics',
    match: ['/departments', '/faculty', '/admission'],
    items: [
      { label: 'Departments', to: '/departments' },
      { label: 'Faculty', to: '/faculty' },
      { label: 'Admission', to: '/admission' },
    ],
  },
  {
    label: 'Research',
    match: ['/research', '/news', '/events'],
    items: [
      { label: 'Research Overview', to: '/research' },
      { label: 'News & Achievements', to: '/news' },
      { label: 'Events', to: '/events' },
    ],
  },
  {
    label: 'Student Life',
    match: ['/campus-life', '/gallery'],
    items: [
      { label: 'Campus Life', to: '/campus-life' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Portal Login', to: '/login' },
    ],
  },
]

const directLinks: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'IQAC', to: '/iqac' },
  { label: 'Contact', to: '/contact' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <div className="mx-auto hidden max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[rgba(8,14,39,0.55)] px-5 py-2 text-[11px] text-slate-200 backdrop-blur xl:flex">
        <p>Founder: <span className="text-[var(--accent-light)]">Dr. Toufique Rahman Chowdhury</span></p>
        <div className="flex items-center gap-4">
          <a href="https://accounts.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--accent-light)]">Webmail <ExternalLink size={12} /></a>
          <a href="#" className="hover:text-[var(--accent-light)]">Certificate Verification</a>
        </div>
      </div>

      <motion.nav
        animate={{ scale: scrolled ? 0.985 : 1 }}
        className={`mx-auto mt-2 flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all md:px-6 ${
          scrolled
            ? 'border-white/15 bg-[rgba(10,15,44,0.78)] shadow-2xl backdrop-blur-xl'
            : 'border-white/10 bg-[rgba(10,15,44,0.38)] backdrop-blur-md'
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(201,168,76,0.16)] text-[var(--accent-light)] ring-1 ring-[rgba(240,208,128,0.3)]">
            <span className="font-display text-lg">MU</span>
          </div>
          <div>
            <p className="font-display text-lg text-white md:text-xl">Metropolitan University</p>
            <p className="hidden font-accent text-[10px] uppercase tracking-[0.25em] text-slate-300 md:block">Education. Not Just a Degree.</p>
          </div>
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
          {directLinks.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Link key={item.label} to={item.to} className="relative px-1 py-2 font-accent text-xs uppercase tracking-[0.22em] text-slate-200 transition hover:text-[var(--accent-light)]">
                {item.label}
                {isActive ? <motion.span layoutId="navbar-active" className="absolute inset-x-0 -bottom-1 h-px bg-[var(--accent-light)]" /> : null}
              </Link>
            )
          })}

          {dropdownMenus.map((menu) => {
            const isActive = menu.match.some((item) => location.pathname === item)
            return (
              <div key={menu.label} className="relative" onMouseEnter={() => setActiveMenu(menu.label)} onMouseLeave={() => setActiveMenu((current) => (current === menu.label ? null : current))}>
                <button type="button" className={`relative inline-flex items-center gap-1 px-1 py-2 font-accent text-xs uppercase tracking-[0.22em] transition ${isActive ? 'text-[var(--accent-light)]' : 'text-slate-200 hover:text-[var(--accent-light)]'}`}>
                  {menu.label} <ChevronDown size={14} />
                  {isActive ? <motion.span layoutId="navbar-active" className="absolute inset-x-0 -bottom-1 h-px bg-[var(--accent-light)]" /> : null}
                </button>

                <AnimatePresence>
                  {activeMenu === menu.label ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 14 }} exit={{ opacity: 0, y: 10 }} className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-3xl border border-white/10 bg-[rgba(10,15,44,0.96)] p-3 shadow-2xl backdrop-blur-xl">
                      {menu.items.map((item) => (
                        <Link key={item.label} to={item.to} className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-[var(--accent-light)]">
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-100 transition hover:border-[var(--accent)] hover:text-[var(--accent-light)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <NavLink to="/login" className="rounded-full border border-[var(--accent)] px-4 py-2 font-semibold text-[var(--accent-light)] transition hover:bg-[var(--accent)] hover:text-[var(--primary)]">
            Portal Login
          </NavLink>
        </div>

        <button type="button" onClick={() => setOpen(true)} className="rounded-full border border-white/10 bg-white/5 p-2 text-white xl:hidden" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[rgba(10,15,44,0.95)] p-6 backdrop-blur-2xl xl:hidden">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="font-display text-2xl text-white">Metropolitan University</p>
                <p className="text-xs text-slate-300">Education. Not Just a Degree.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/10 p-2 text-white">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-5">
              {[...directLinks, ...dropdownMenus.flatMap((menu) => menu.items)].map((item, index) => (
                <motion.div key={`${item.label}-${item.to}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                  <Link to={item.to} onClick={() => setOpen(false)} className="block rounded-2xl border border-white/10 px-4 py-3 font-accent text-sm uppercase tracking-[0.25em] text-slate-100">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/login" onClick={() => setOpen(false)} className="mt-4 block rounded-2xl bg-[var(--accent)] px-4 py-3 text-center font-semibold text-[var(--primary)]">
                Portal Login
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
