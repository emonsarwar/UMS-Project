import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface PortalMetricCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
}

const PortalMetricCard = ({ title, value, subtitle, icon: Icon }: PortalMetricCardProps) => {
  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 font-display text-3xl text-[var(--text-primary)]">{value}</h3>
          {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        <div className="rounded-2xl bg-[var(--primary)]/5 p-3 text-[var(--secondary)]">
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  )
}

export default PortalMetricCard
