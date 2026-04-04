# 🚀 Quick Start Reference

## Installation & Setup

```bash
# Install all dependencies
npm install

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

## Development

```bash
# Run everything (frontend + backend)
npm run dev

# Frontend only (port 5173)
npm run dev:frontend

# Backend only (port 5000)
npm run dev:backend
```

## Testing

```bash
# Run tests
npm run test

# Test UI dashboard
npm run test:ui

# Coverage report
npm run test:coverage

# Watch mode
npm run test -- --watch
```

## Building

```bash
# Development build
npm run build

# Production build (optimized)
npm run build:prod

# Preview production build
npm run preview
```

---

## 📁 Key Files Reference

### Backend Services
```
backend/src/modules/
├── students/
│   ├── students.service.ts       (Business logic)
│   ├── students.controller.ts     (HTTP handlers)
│   └── students.router.ts         (Routes)
├── courses/
├── teachers/
├── attendance/
├── results/
├── enrollment/
├── departments/
├── notices/
├── analytics/
└── fees/
```

### Frontend Hooks
```
frontend/src/hooks/
├── useStudents.ts         (Student CRUD)
├── useCourses.ts          (Course management)
├── useTeachers.ts         (Teacher operations)
├── useAttendance.ts       (Attendance)
├── useResults.ts          (Results & transcripts)
├── useDepartments.ts      (Department queries)
├── useEnrollments.ts      (Enrollment)
├── useNotices.ts          (Notices)
└── useAnalytics.ts        (Analytics)
```

### Dashboard Components
```
frontend/src/pages/
├── student/StudentDashboard.tsx    (Student panel)
├── teacher/TeacherDashboard.tsx    (Teacher panel)
└── admin/AdminDashboard.tsx        (Admin panel)
```

### Configuration
```
frontend/
├── vite.config.ts         (Build config)
├── vitest.config.ts       (Test config)
├── tailwind.config.ts     (Styling)
├── BUILD_GUIDE.md         (Deployment)
└── TESTING.md             (Testing guide)
```

---

## 🎯 Common Tasks

### Add a New Student Service Method

```typescript
// 1. Add to student.service.ts
export const studentService = {
  async myNewMethod() {
    // Implementation
  }
}

// 2. Create controller in student.controller.ts
export const myNewController = async (req, res) => {
  try {
    const result = await studentService.myNewMethod()
    return sendResponse(res, 200, 'Success', result)
  } catch (error) {
    return sendResponse(res, 500, error.message)
  }
}

// 3. Add route in student.router.ts
router.get('/new-endpoint', myNewController)
```

### Create a New React Query Hook

```typescript
// 1. Create use{Entity}.ts in hooks/
export const useMyData = (id: string) => {
  return useQuery({
    queryKey: ['mydata', id],
    queryFn: async () => {
      const { data } = await api.get(`/endpoint/${id}`)
      return data.data
    },
    enabled: !!id,
  })
}

// 2. Use in component
const MyComponent = () => {
  const { data, isLoading, error } = useMyData('123')
  
  if (isLoading) return <Loader />
  if (error) return <Error />
  
  return <div>{data}</div>
}
```

### Write a New Test

```typescript
// Create file: src/components/MyComponent.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected')).toBeInTheDocument()
  })
})
```

### Deploy to Production

```bash
# 1. Set environment
# frontend/.env.production
VITE_API_URL=https://api.metrouni.edu.bd/api/v1

# 2. Build
npm run build:prod

# 3. Upload dist/ folder to server

# 4. Configure server
# - Enable GZIP compression
# - Set Cache-Control headers
# - Enable HTTPS
# - Point to your domain
```

---

## 📊 Performance Checklist

- [ ] Bundle size < 250KB (gzipped)
- [ ] First Contentful Paint < 1s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Core Web Vitals all green ✓
- [ ] Lighthouse score > 90
- [ ] API response time < 200ms

---

## 🆘 Troubleshooting

### Tests failing?
```bash
# Reinstall testing dependencies
npm install --save-dev

# Clear cache
npm run test -- --clearCache

# Run with verbose output
npm run test -- --reporter=verbose
```

### Build errors?
```bash
# Clean build
rm -rf dist/ node_modules/
npm install
npm run build
```

### API not connecting?
```bash
# Check backend is running
npm run dev:backend

# Verify API_URL in frontend .env
VITE_API_URL=http://localhost:5000/api/v1

# Check CORS configuration in backend app.ts
```

### TypeScript errors?
```bash
# Rebuild types
npm run build -- --mode type-check

# Check tsconfig.json is correct
```

---

## 📞 Support

**Documentation Files**:
- `COMPLETE_IMPLEMENTATION_REPORT.md` - Full overview
- `BUILD_GUIDE.md` - Deployment guide
- `TESTING.md` - Testing guide
- `IMPLEMENTATION_SUMMARY.md` - Features list

**Quick Links**:
- Backend Services: `backend/src/modules/*/`
- React Hooks: `frontend/src/hooks/`
- Dashboards: `frontend/src/pages/{student,teacher,admin}/`
- Tests: `frontend/src/**/*.test.tsx`

---

## 🎉 You're All Set!

Everything is configured and ready to:
1. ✅ Develop new features
2. ✅ Test code properly  
3. ✅ Deploy to production
4. ✅ Scale up

**Happy coding! 🚀**
