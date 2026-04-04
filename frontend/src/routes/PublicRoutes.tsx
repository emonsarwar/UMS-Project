import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

const PublicRoutes = () => {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicRoutes
