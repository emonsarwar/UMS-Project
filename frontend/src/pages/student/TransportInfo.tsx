import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'

const TransportInfo = () => {
  const [subscribed, setSubscribed] = useState(true)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <GlassCard className="bg-white">
        <h2 className="font-display text-3xl text-[var(--text-primary)]">Route map</h2>
        <div className="mt-4 flex min-h-[260px] items-end rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-800 to-amber-400 p-5 text-white">
          <p className="text-sm">Temuki • City Center • Riverside • Campus Gate</p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead><tr className="border-b border-slate-200 text-slate-500"><th className="px-3 py-2">Stop</th><th className="px-3 py-2">Time</th></tr></thead>
            <tbody>
              {[['Temuki', '07:10 AM'], ['City Center', '07:35 AM'], ['Campus Gate', '08:00 AM']].map(([stop, time]) => (
                <tr key={stop} className="border-b border-slate-100 last:border-0"><td className="px-3 py-2">{stop}</td><td className="px-3 py-2">{time}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="bg-white">
        <h2 className="font-display text-3xl text-[var(--text-primary)]">Transport support</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <p>Driver:Farid Alom</p>
          <p>Contact: +8801797129674</p>
          <p>Bus No: MU-12 • Capacity: 42 seats</p>
        </div>
        <button
          type="button"
          onClick={() => setSubscribed((current) => !current)}
          className={`mt-6 rounded-full px-5 py-3 text-sm font-semibold ${subscribed ? 'bg-[var(--primary)] text-white' : 'bg-[var(--accent)] text-[var(--primary)]'}`}
        >
          {subscribed ? 'Subscribed to route' : 'Subscribe to route'}
        </button>
      </GlassCard>
    </motion.div>
  )
}

export default TransportInfo
