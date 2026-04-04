import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { departments } from '../../services/muMockData'

const Footer = () => {
  return (
    <footer className="bg-[var(--mu-navy)] px-4 pt-14 text-slate-200 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 pb-10 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <h3 className="font-display text-3xl text-white">Metropolitan University</h3>
          <p className="mt-2 text-sm italic text-[var(--accent-light)]">Education. Not Just a Degree.</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
           Bateshwar, Sylhet-3104, Bangladesh — a leading private university committed to quality education, innovative research, and holistic student development.
          </p>
        </div>

        <div>
          <p className="font-accent text-xs uppercase tracking-[0.32em] text-[var(--accent-light)]">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ['About', '/about'],
              ['Academics', '/departments'],
              ['Research', '/research'],
              ['Student Life', '/campus-life'],
              ['IQAC', '/iqac'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="transition hover:text-[var(--accent-light)]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-accent text-xs uppercase tracking-[0.32em] text-[var(--accent-light)]">Departments</p>
          <ul className="mt-4 space-y-2 text-sm">
            {departments.slice(0, 9).map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-accent text-xs uppercase tracking-[0.32em] text-[var(--accent-light)]">Portals & Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5" /> Bateshwar, Sylhet-3104, Bangladesh</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +88 01313 050044,

+88 01313 050066</li>
            <li className="flex items-center gap-2"><Mail size={16} /> info@metrouni.edu.bd</li>
            <li><Link to="/login">Student Login</Link> • <Link to="/login">Teacher Login</Link></li>
            <li><a href="https://accounts.google.com" target="_blank" rel="noreferrer">Webmail</a> • <a href="#">Certificate Verification</a></li>
          </ul>
          <div className="mt-4 flex gap-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a key={index} href="#" className="rounded-full border border-white/10 p-2 transition hover:border-[var(--accent)] hover:text-[var(--accent-light)]">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-xs text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Metropolitan University | Privacy | Terms | IQAC</p>
          <p>{'Education. Not Just a Degree.'}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
