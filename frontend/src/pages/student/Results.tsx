import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DataTable from '../../components/ui/DataTable'
import GlassCard from '../../components/ui/GlassCard'
import { results, students } from '../../services/muMockData'
import { useAuth } from '../../hooks/useAuth'

const Results = () => {
  const { user } = useAuth()
  const student = students.find((item) => item.id === user?.id) ?? students[0]
  const studentResults = results.filter((item) => item.studentId === student.id)
  const semesters = Array.from(new Set(studentResults.map((item) => item.semester)))
  const [activeSemester, setActiveSemester] = useState(semesters[0])

  const tableData = useMemo(
    () => studentResults.filter((item) => item.semester === activeSemester),
    [activeSemester, studentResults],
  )

  const cgpaTrend = [
    { term: 'S1', gpa: 3.42 },
    { term: 'S2', gpa: 3.55 },
    { term: 'S3', gpa: 3.61 },
    { term: 'S4', gpa: student.cgpa },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <GlassCard className="bg-white">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl text-[var(--text-primary)]">Academic results</h2>
            <p className="text-sm text-slate-500">Semester records and transcript preview.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {semesters.map((semester) => (
              <button
                key={semester}
                type="button"
                onClick={() => setActiveSemester(semester)}
                className={`rounded-full px-4 py-2 text-sm ${activeSemester === semester ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] text-slate-600'}`}
              >
                {semester}
              </button>
            ))}
            <button type="button" onClick={() => window.print()} className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">
              Download Transcript
            </button>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cgpaTrend}>
              <XAxis dataKey="term" />
              <YAxis domain={[3, 4]} />
              <Tooltip />
              <Line type="monotone" dataKey="gpa" stroke="#C9A84C" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <DataTable
        title="Grade table"
        data={tableData}
        rowKey={(row) => row.id}
        searchKeys={['courseCode', 'courseTitle', 'grade']}
        columns={[
          { header: 'Course', accessor: 'courseTitle' },
          { header: 'Credit', accessor: 'credit' },
          { header: 'Grade', accessor: 'grade' },
          { header: 'Grade Point', accessor: 'gradePoint' },
        ]}
      />
    </motion.div>
  )
}

export default Results
