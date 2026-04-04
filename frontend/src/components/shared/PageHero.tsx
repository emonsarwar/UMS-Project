import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface PageHeroProps {
  title: string
  subtitle: string
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-hero px-4 pb-16 pt-32 text-white md:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.14),transparent_30%)]" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto max-w-7xl"
      >
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-200">
          <Link to="/" className="hover:text-[var(--accent-light)]">
            Home
          </Link>
          <ChevronRight size={16} />
          <span>{title}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-slate-200">{subtitle}</p>
      </motion.div>
    </section>
  )
}

export default PageHero
