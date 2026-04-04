# NNN - Educational Management System

A full-stack educational management system with a modern **React + Tailwind CSS frontend** and **Node.js + Express backend**.

## 📁 Project Structure

This is a **monorepo** project organized as follows:

```
nnn-monorepo/
├── frontend/                # React + Vite frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context (Auth, Theme)
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components (by role)
│   │   ├── routes/          # Routing configuration
│   │   ├── services/        # API service calls
│   │   ├── store/           # Zustand state management
│   │   └── types/           # TypeScript definitions
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/          # Configuration files
│   │   ├── middleware/      # Express middleware
│   │   ├── modules/         # Feature modules
│   │   ├── utils/           # Utilities
│   │   └── types/           # TypeScript definitions
│   ├── prisma/              # Prisma ORM schema
│   └── package.json
├── package.json             # Root monorepo configuration
└── README.md

```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ 
- **npm** or **yarn**
- **PostgreSQL** (for backend)

### Installation

```bash
# Install all dependencies (frontend + backend)
npm install

# Or use yarn
yarn install
```

### Development Mode

**Run both frontend and backend together:**

```bash
npm run dev
```

**Or run them separately:**

```bash
# Terminal 1 - Frontend (http://localhost:5173)
npm run dev:frontend

# Terminal 2 - Backend (http://localhost:3000)
npm run dev:backend
```

### Building

```bash
# Build both
npm run build

# Or build individually
npm run build:frontend
npm run build:backend
```

### Linting

```bash
# Lint all workspaces
npm run lint

# Or lint individually
npm run lint:frontend
npm run lint:backend
```

## 📚 Detailed Documentation

- **[Frontend Documentation](./frontend/README.md)** - React app details, components, routing, state management
- **[Backend Documentation](./backend/README.md)** - Express API, modules, database schema

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **TanStack Query** - Data fetching
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Static typing
- **Prisma** - ORM
- **PostgreSQL** - Database

## 🔐 Project Features

### Dashboard & Analytics
- Admin dashboard with system analytics
- Student and teacher portals
- Role-based access control

### Core Modules
- 📚 **Admissions** - Student admission management
- 🏫 **Courses** - Course catalog and enrollment
- 👥 **Departments** - Department management
- 📋 **Attendance** - Attendance tracking
- 📊 **Results** - Grade and result management
- 💰 **Fees** - Fee structure and payments
- 📚 **Library** - Library management system
- 🚌 **Transport** - Transportation management
- 📸 **Gallery** - Event/activity gallery
- 📰 **News & Notices** - Communication board
- 📅 **Events** - Event management

## 📦 Workspace Scripts

All scripts are run from the root directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend + backend |
| `npm run dev:frontend` | Start only frontend |
| `npm run dev:backend` | Start only backend |
| `npm run build` | Build both frontend + backend |
| `npm run build:frontend` | Build only frontend |
| `npm run build:backend` | Build only backend |
| `npm run lint` | Lint all workspaces |
| `npm run lint:frontend` | Lint only frontend |
| `npm run lint:backend` | Lint only backend |
| `npm run preview` | Preview frontend build |

## 🔗 API Integration

The frontend communicates with the backend API through:
- **Base URL**: `http://localhost:3000/api`
- **Services**: Located in `frontend/src/services/`
- **Authentication**: JWT-based with role management

## 🌍 Environment Variables

### Frontend
Create `frontend/.env` for frontend-specific variables:
```
VITE_API_URL=http://localhost:3000/api
```

### Backend
Create `backend/.env` for backend configuration:
```
DATABASE_URL=postgresql://user:password@localhost:5432/nnn
PORT=3000
```

## 👥 User Roles

- **Admin** - System administration and analytics
- **Student** - Course enrollment, grades, attendance
- **Teacher** - Class management, grading, materials

## 📖 Development Guidelines

### Code Organization
- Keep components small and focused
- Use TypeScript for type safety
- Organize by feature/domain
- Follow naming conventions

### Frontend Best Practices
- Use hooks for stateful logic
- Leverage Context for global state
- Use Zustand for complex state
- Optimize with React.memo and lazy loading

### Backend Best Practices
- Use middleware for cross-cutting concerns
- Organize by feature modules
- Validate input with middleware
- Handle errors consistently

## 🤝 Contributing

When contributing to this project:
1. Create a feature branch
2. Make changes in the appropriate workspace (frontend/backend)
3. Run linting: `npm run lint`
4. Build and test: `npm run build`
5. Create a Pull Request

## 📝 License

This project is private and proprietary.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
