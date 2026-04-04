import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import GlassCard from '../../components/ui/GlassCard'
import { attendanceRecords, students } from '../../services/muMockData'
import { useAuth } from '../../hooks/useAuth'

const Attendance = () => {
  const { user } = useAuth()
  const student = students.find((item) => item.id === user?.id) ?? students[0]
  const [month, setMonth] = useState('03')

  const records = attendanceRecords.filter((item) => item.studentId === student.id && item.date.includes(`-` + month + '-'))

  const chartData = useMemo(() => {
    const grouped = records.reduce<Record<string, { course: string; score: number }>>((acc, item) => {
      if (!acc[item.courseCode]) {
        acc[item.courseCode] = { course: item.courseCode, score: 0 }
      }
      acc[item.courseCode].score += item.status === 'Present' ? 1 : item.status === 'Late' ? 0.5 : 0
      return acc
    }, {})

    return Object.values(grouped).map((item) => ({
      course: item.course,
      percentage: Math.round((item.score / 6) * 100),
    }))
  }, [records])

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <GlassCard className="bg-white">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl text-[var(--text-primary)]">Attendance overview</h2>
            <p className="text-sm text-slate-500">Subject-wise attendance and calendar heatmap.</p>
          </div>
          <select value={month} onChange={(event) => setMonth(event.target.value)} className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none">
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
          </select>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#1B2A6B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="bg-white">
        <h3 className="font-display text-2xl text-[var(--text-primary)]">Attendance heatmap</h3>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {records.slice(0, 21).map((item) => (
            <div
              key={item.id}
              className={`rounded-xl p-3 text-center text-xs font-semibold ${
                item.status === 'Present'
                  ? 'bg-emerald-100 text-emerald-700'
                  : item.status === 'Late'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              {item.date.split('-')[2]}
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default Attendance
