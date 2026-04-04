import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import GlassCard from '../../components/ui/GlassCard'
import DataTable, { type DataTableColumn } from '../../components/ui/DataTable'
import Loader from '../../components/ui/Loader'
import { teacherService } from '../../services/teacherService'
import type { IssueRecord } from '../../types'

const TeacherLibrary = () => {
  const { data: issuesData, isLoading } = useQuery({
    queryKey: ['teacher-library-issues'],
    queryFn: () => teacherService.getMyLibraryIssues(),
  })

  const issues = issuesData?.data || []

  const columns: DataTableColumn<IssueRecord>[] = [
    { header: 'Book', accessor: (row: IssueRecord) => row.book.title, sortable: false },
    { header: 'Issue Date', accessor: 'issueDate' },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Status', accessor: 'status' },
    { header: 'Fine', accessor: 'fine' },
  ]

  if (isLoading) {
    return <Loader />
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-[var(--text-primary)]">My Library</h1>
      </div>

      <GlassCard className="bg-white">
        <DataTable
          title="My Issued Books"
          data={issues}
          rowKey="id"
          columns={columns}
        />
      </GlassCard>
    </motion.div>
  )
}

export default TeacherLibrary

