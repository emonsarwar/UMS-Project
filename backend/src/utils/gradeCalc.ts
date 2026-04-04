export const gradeFromMarks = (marks: number) => {
  if (marks >= 90) return { grade: 'A+', point: 4 }
  if (marks >= 80) return { grade: 'A', point: 3.75 }
  if (marks >= 70) return { grade: 'B+', point: 3.5 }
  if (marks >= 60) return { grade: 'B', point: 3 }
  if (marks >= 50) return { grade: 'C', point: 2.5 }
  return { grade: 'F', point: 0 }
}
