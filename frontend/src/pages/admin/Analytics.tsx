import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import GlassCard from '../../components/ui/GlassCard'

const yearlyData = [
  { year: '2021', enrollment: 9200, target: 9000, fees: 4.1 },
  { year: '2022', enrollment: 10100, target: 9800, fees: 4.4 },
  { year: '2023', enrollment: 11250, target: 10800, fees: 4.7 },
  { year: '2024', enrollment: 12400, target: 12000, fees: 5.0 },
  { year: '2025', enrollment: 13600, target: 13000, fees: 5.3 },
]

const radarData = [
  { department: 'CS', performance: 90 },
  { department: 'BUS', performance: 82 },
  { department: 'MED', performance: 88 },
  { department: 'LAW', performance: 79 },
  { department: 'ARC', performance: 84 },
]

const Analytics = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Student-Teacher Ratio', '28:1'],
          ['Attendance Score', '91%'],
          ['Fee Target Achievement', '96%'],
        ].map(([label, value]) => (
          <GlassCard key={label} className="bg-white">
            <p className="text-sm text-slate-500">{label}</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--text-primary)]">{value}</h2>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <GlassCard className="bg-white">
          <h2 className="font-display text-2xl text-[var(--text-primary)]">Enrollment trends</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="enrollment" stroke="#1B2A6B" fill="#1B2A6B33" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="bg-white">
          <h2 className="font-display text-2xl text-[var(--text-primary)]">Department performance</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="department" />
                <PolarRadiusAxis />
                <Radar dataKey="performance" stroke="#C9A84C" fill="#C9A84C66" />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="bg-white">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl text-[var(--text-primary)]">Fee collection vs target</h2>
          <button type="button" className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">Export PDF</button>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="target" fill="#0A0F2C" />
              <Bar yAxisId="left" dataKey="enrollment" fill="#C9A84C" />
              <Line yAxisId="right" type="monotone" dataKey="fees" stroke="#1B2A6B" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default Analytics
