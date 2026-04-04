export const calculateCgpa = (results: Array<{ gradePoint: number | null; course: { credits: number } }>) => {
  const totals = results.reduce(
    (acc, item) => {
      const point = item.gradePoint ?? 0
      const credits = item.course.credits
      acc.totalPoints += point * credits
      acc.totalCredits += credits
      return acc
    },
    { totalPoints: 0, totalCredits: 0 },
  )

  if (!totals.totalCredits) return 0
  return Number((totals.totalPoints / totals.totalCredits).toFixed(2))
}
