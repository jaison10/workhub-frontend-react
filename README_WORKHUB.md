# WorkHub - Job Platform MVP Frontend

A full-featured React + TypeScript frontend for connecting job seekers with employers. Built with modern technologies including React Router, Zustand, Formik, Tailwind CSS, and Framer Motion.

## Features

### User Types
- **Job Seekers**: Browse jobs, apply, manage applications
- **Hiring Persons**: Post jobs, review applications
- **Organizations**: Company profiles, job postings
- **Both**: Combined job seeker + hiring functionality

### Key Functionality
- Multi-step signup flow with role selection
- Authentication with persistent state (localStorage via Zustand)
- Dynamic NavBar based on user role
- Job listings with real-time filters (search, type, work mode)
- Responsive design (mobile, tablet, desktop)
- Profile pages with role-specific sections
- Smooth animations with Framer Motion

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Zustand** - State management
- **Formik + Yup** - Form handling & validation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Framer Motion** - Animations

## Project Structure

```
src/
├── components/
│   ├── common/         # Reusable UI (Button, Input, Card, etc.)
│   ├── job/            # Job-specific components (JobCard)
│   ├── profile/        # Profile components
│   └── layout/         # Layout components (NavBar)
├── pages/              # Full page components
│   ├── Landing.tsx     # Homepage with hero & CTA
│   ├── Login.tsx       # Login with mock auth
│   ├── Signup.tsx      # Multi-step signup
│   ├── Profile.tsx     # Dynamic profile based on role
│   ├── ProfileSetup.tsx
│   ├── Jobs.tsx        # Job listings with filters
│   ├── JobPost.tsx     # Job posting form
│   └── MyJobs.tsx      # User's jobs/applications
├── store/              # Zustand stores
├── types/              # TypeScript interfaces
├── data/               # Mock data
└── utils/              # Helper functions
```

## Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+ (recommended)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open browser to: `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Test Credentials

Use these credentials to test different user types:

- **Job Seeker**: `john@example.com` / `password123`
- **Hiring Person**: `sarah@example.com` / `password123`
- **Both Roles**: `mike@example.com` / `password123`
- **Organization**: `contact@techcorp.com` / `password123`

Or click "Continue as Guest" on the login page.

## Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/` | Landing page | No |
| `/login` | Login page | No |
| `/signup` | Multi-step signup | No |
| `/profile/setup` | Post-signup profile setup | Yes |
| `/profile` | User profile | Yes |
| `/jobs` | Job listings with filters | Yes |
| `/jobs/new` | Post a job | Yes |
| `/my-jobs` | User's jobs/applications | Yes |

## Key Components Explained

### NavBar (Dynamic Rendering)
The NavBar shows different tabs based on user role:
- **Job Seeker**: "Find Jobs"
- **Hiring Person**: "Post Job", "My Jobs"
- **Both**: All tabs
- **Organization**: "Post Job", "My Jobs"

### Zustand State Management
User authentication state is managed globally and persisted to localStorage:
```typescript
const { user, isAuthenticated, setUser, logout } = useAuthStore();
```

### Protected Routes
Routes automatically redirect to login if user is not authenticated:
```typescript
<ProtectedRoute>
  <Jobs />
</ProtectedRoute>
```

### Responsive Design
All components are mobile-first with Tailwind's responsive utilities:
- Mobile: Single column layouts
- Tablet (md:): 2-column grids
- Desktop (lg:): 3-column grids, expanded navigation

## Customization

### Add New Job Types
Edit `src/types/index.ts`:
```typescript
export type JobType = 'Full-time' | 'Part-time' | 'Internship' | 'Gig' | 'YourNewType';
```

### Change Theme Colors
Edit `tailwind.config.js` to customize colors:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Add New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update NavBar links if needed

## Mock Data

All data is currently mocked in `src/data/`:
- `mockUsers.ts` - User accounts and profiles
- `mockJobs.ts` - Job listings

In production, replace these with API calls.

## Future Enhancements

- Complete job posting form with all fields
- Job application flow
- Employer dashboard with applicant management
- Real-time notifications
- File upload for resumes/logos
- Advanced search with more filters
- Messaging between users
- Backend API integration

## Notes

- This is a frontend-only MVP
- All authentication is mocked
- Data doesn't persist across refreshes (except user auth)
- Some pages are placeholder implementations
- Ready to integrate with REST/GraphQL APIs

## License

MIT

---

Built with Claude Code
