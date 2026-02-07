# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start Vite dev server (port 5173)
npm run build        # TypeScript check + production build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

Node version: 22 (see `.nvmrc`)

## Architecture

This is the React frontend for WorkHub, a job marketplace platform. Currently uses mock data—no backend integration yet.

### Tech Stack
- React 19 + TypeScript 5.9 + Vite 7
- Zustand (state management with localStorage persistence)
- Formik + Yup (forms and validation)
- Tailwind CSS + Framer Motion
- React Router DOM 7

### Project Structure
```
src/
├── components/
│   ├── common/      # Button, Input, Select, Card, Badge, Avatar, TagInput
│   ├── job/         # JobCard
│   ├── layout/      # NavBar
│   └── profile/     # AvailabilitySelector, AvailabilityDisplay
├── pages/           # Route page components
├── store/           # Zustand stores (useAuthStore)
├── types/           # TypeScript interfaces (index.ts)
└── data/            # Mock data (mockUsers.ts, mockJobs.ts)
```

### Key Files
- `App.tsx` - Route definitions and ProtectedRoute wrapper
- `store/useAuthStore.ts` - Auth state with localStorage persistence
- `types/index.ts` - All TypeScript interfaces and enums
- `components/common/index.ts` - Barrel export for reusable components

### Routes
All routes in `App.tsx`. Protected routes redirect to `/login` when unauthenticated.

Public: `/`, `/login`, `/signup`
Protected: `/profile`, `/profile/edit`, `/profile/setup`, `/jobs`, `/jobs/new`, `/my-jobs`

## Key Patterns

### State Management
```typescript
const { user, isAuthenticated, setUser, logout } = useAuthStore();
```
Auth state persists to localStorage with key `'auth-storage'`.

### Form Handling
All forms use Formik + Yup pattern:
```typescript
const formik = useFormik({
  initialValues: { ... },
  validationSchema: Yup.object({ ... }),
  onSubmit: (values) => { ... }
});
```

### Component Props
Props interfaces named `{ComponentName}Props`, extend HTML attributes when applicable:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
```

### NavBar Rendering
NavBar dynamically shows tabs based on `user.accountType` and `user.isHiring`/`user.isLookingForJob`:
- Job Seeker: "Find Jobs"
- Hiring Person: "Post Job", "My Jobs"
- Organization: "Post Job", "My Jobs"

## Code Conventions

- camelCase for variables/functions
- PascalCase for components and types
- One component per file
- Tailwind for all styling (no separate CSS files)
- Framer Motion for animations (`motion.div`, `AnimatePresence`)

## Mock Data

Authentication is mocked. All users use password `'password123'`. Test credentials displayed on Login page.

- `mockUsers.ts` - User accounts and role-specific profiles
- `mockJobs.ts` - Job listings for search/filter demo

## Type System

Key enums in `types/index.ts`:
- `AccountType`: 'Person' | 'Organization'
- `JobType`: 'Full-time' | 'Part-time' | 'Internship' | 'Gig'
- `WorkMode`: 'On-site' | 'Remote' | 'Hybrid'

Key interfaces: `User`, `JobSeekerProfile`, `HiringProfile`, `OrganizationProfile`, `Job`, `JobApplication`
