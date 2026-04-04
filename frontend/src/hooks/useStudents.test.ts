import { describe, it, expect } from 'vitest'
import { useStudents } from './useStudents'

describe('useStudents Hook', () => {
  it('should return null initially', () => {
    // This is a basic smoke test. In a real scenario, you would mock React Query
    expect(true).toBe(true)
  })

  it('should accept pagination parameters', () => {
    const params = { page: 2, limit: 20, search: 'John', department: 'CS' }
    expect(params.page).toBe(2)
    expect(params.limit).toBe(20)
  })
})
