# NNN Frontend

A modern React.js frontend application for an educational management system, built with **Vite**, **TypeScript**, and **Tailwind CSS**.

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   ├── App.css              # Overall styles
│   ├── index.css            # Global styles
│   ├── assets/              # Static assets
│   ├── components/          # Reusable React components
│   │   ├── layout/          # Layout components (Header, Footer, etc.)
│   │   ├── shared/          # Shared UI components
│   │   └── ui/              # Basic UI elements
│   ├── context/             # React Context (Auth, Theme)
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   │   ├── admin/           # Admin dashboard pages
│   │   ├── auth/            # Authentication pages
│   │   ├── public/          # Public pages
│   │   ├── student/         # Student portal pages
│   │   └── teacher/         # Teacher portal pages
│   ├── routes/              # Routing configuration
│   ├── services/            # API service calls
│   ├── store/               # Zustand state management
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Frontend dependencies
└── eslint.config.js         # ESLint configuration

```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

From the root directory:

```bash
# Install all dependencies (frontend + backend)
npm install

# Or install only frontend dependencies
npm install --workspace=frontend
```

### Development

```bash
# Start frontend development server (from root)
npm run dev:frontend

# Or from frontend directory
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

```bash
# Build frontend (from root)
npm run build:frontend

# Or from frontend directory
cd frontend
npm run build
```

### Preview

```bash
# Preview production build
npm run preview
```

## 🛠️ Technology Stack

### Core
- **React** - UI library
- **Vite** - Fast build tool and dev server
- **TypeScript** - Static type checking

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **clsx** - Utility for constructing className strings

### Routing & State Management
- **React Router DOM** - Client-side routing
- **Zustand** - Lightweight state management
- **TanStack React Query** - Data fetching and caching
- **TanStack React Table** - Headless table component

### UI Components & Effects
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **React Quill** - Rich text editor

### Data & Utilities
- **Axios** - HTTP client
- **date-fns** - Date utilities
- **Recharts** - charting library

### Development
- **TypeScript** - Static typing
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixes

## 📱 Features

### Dashboard
- **Admin Dashboard** - System analytics and management
- **Student Portal** - Course enrollment, grades, attendance
- **Teacher Portal** - Class management, grading, materials

### Core Modules
- **Authentication** - Multi-role login (Admin, Student, Teacher)
- **Admissions** - Student admission management
- **Courses** - Course management and enrollment
- **Attendance** - Attendance tracking
- **Results** - Grade management
- **Fees** - Fee structure and payments
- **Library** - Library management
- **Gallery** - Event/activity gallery
- **News & Notices** - Communication board
- **Transport** - Transportation management

## 🔐 State Management

**Context & Hooks:**
- `AuthContext` - Manages authentication state
- `ThemeContext` - Manages theme preferences
- `useAuth()` - Custom hook for auth state
- `useScrollAnimation()` - Scroll animation trigger

**Zustand Stores:**
- `authStore` - Auth state management
- `uiStore` - UI state management

## 🌐 API Integration

**Services:**
- `authService` - Authentication endpoints
- `adminService` - Admin operations
- `studentService` - Student operations
- `teacherService` - Teacher operations
- `api` - Base axios instance

**Mock Data:**
- `mockData` - Frontend mock data
- `muMockData` - Municipal utility mock data

## 📝 Linting

```bash
# Run ESLint on all files
npm run lint:frontend

# Or from frontend directory
cd frontend
npm run lint
```

## 🎨 Component Conventions

- **Naming**: PascalCase for components (e.g., `AdminDashboard.tsx`)
- **Props**: Typed with TypeScript interfaces
- **Styles**: Tailwind classes with `clsx` for conditional styling
- **Layout**: Use grid and flexbox utilities
- **Colors**: Use Tailwind color palette

## 🚀 Performance Optimizations

- **Code Splitting**: React Router lazy loading
- **Data Fetching**: TanStack React Query caching
- **Bundle Analysis**: Vite build optimization
- **Image Optimization**: Static asset serving

## 🔗 Related Documentation

- **Backend**: See [backend/README.md](../backend/README.md)
- **Project Root**: See [../README.md](../README.md)

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 💡 Tips

- Use Vite's HMR for instant updates during development
- Leverage TypeScript for better IDE autocomplete
- Keep components small and focused
- Use custom hooks for reusable logic
- Organize pages by feature/role

---

**Happy coding! 🎉**
