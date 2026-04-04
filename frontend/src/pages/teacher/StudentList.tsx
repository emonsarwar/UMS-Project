import { useState } from 'react'
import { motion } from 'framer-motion'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
import { students } from '../../services/muMockData'

const StudentList = () => {
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[number] | null>(null)

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <DataTable
        title="Students across assigned courses"
        data={students}
        rowKey={(row) => row.id}
        searchKeys={['id', 'name', 'email', 'department']}
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'ID', accessor: 'id' },
          { header: 'Email', accessor: 'email' },
          { header: 'Attendance %', accessor: 'attendance' },
          { header: 'GPA', accessor: 'cgpa' },
          {
            header: 'Action',
            accessor: 'id',
            sortable: false,
            render: (_, row) => (
              <button type="button" onClick={() => setSelectedStudent(row)} className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white">
                View
              </button>
            ),
          },
        ]}
      />

      <Modal open={Boolean(selectedStudent)} onClose={() => setSelectedStudent(null)} title={selectedStudent?.name ?? 'Student details'}>
        {selectedStudent ? (
          <div className="space-y-2 text-sm text-slate-200">
            <p>ID: {selectedStudent.id}</p>
            <p>Email: {selectedStudent.email}</p>
            <p>Department: {selectedStudent.department}</p>
            <p>Attendance: {selectedStudent.attendance}%</p>
            <p>CGPA: {selectedStudent.cgpa}</p>
          </div>
        ) : null}
      </Modal>
    </motion.div>
  )
}

export default StudentList
