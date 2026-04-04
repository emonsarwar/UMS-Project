# Testing Guide

## Frontend Testing Setup

We use **Vitest** + **React Testing Library** for component and hook testing.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Structure

Tests are colocated with components:
- Component tests: `src/components/**/*.test.tsx`
- Hook tests: `src/hooks/**/*.test.ts`
- Utility tests: `src/utils/**/*.test.ts`

### Example Component Test

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Example Hook Test with Mock

```typescript
import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useMyHook } from './useMyHook'

describe('useMyHook', () => {
  it('fetches data on mount', async () => {
    const { result } = renderHook(() => useMyHook())
    
    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })
  })
})
```

### Best Practices

1. **Test user behavior**, not implementation
2. **Use semantic queries**: `getByRole`, `getByLabelText`
3. **Mock external dependencies** (API calls, router)
4. **Use `waitFor` for async operations**
5. **Keep tests focused and isolated**

### Coverage Targets

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%
