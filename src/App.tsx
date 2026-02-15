import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './components/layout/NavBar';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ProfileSetup } from './pages/ProfileSetup';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { Jobs } from './pages/Jobs';
import { JobPost } from './pages/JobPost';
import { MyJobs } from './pages/MyJobs';
import { Candidates } from './pages/Candidates';
import { CandidateProfile } from './pages/CandidateProfile';
import { useAuthStore } from './store/useAuthStore';
import { useNotificationConnection } from './hooks/useNotificationConnection';
import { useToastStore } from './store/useToastStore';
import { Toast } from './components/common/Toast';

/**
 * App Component - Main application with routing
 *
 * Routes:
 * - / : Landing page (public)
 * - /login : Login page (public)
 * - /signup : Signup page (public)
 * - /profile/setup : Profile setup after signup (protected)
 * - /profile : User profile (protected)
 * - /jobs : Job listings (protected)
 * - /jobs/new : Post a job (protected)
 * - /my-jobs : User's jobs/applications (protected)
 *
 * Protected routes redirect to /login if not authenticated
 */

// Protected Route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Hiring Route wrapper - only accessible to hiring users and organizations
const HiringRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user && (user.isHiring || user.accountType === 'Organization')) return <>{children}</>;
  return <Navigate to="/" replace />;
};

function App() {
  const { isAuthenticated } = useAuthStore();
  const { toast, dismissToast } = useToastStore();
  useNotificationConnection();

  return (
    <Router>
      {/* Navbar shown on all pages */}
      <NavBar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/jobs" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/jobs" replace /> : <Signup />}
        />

        {/* Protected Routes */}
        <Route
          path="/profile/setup"
          element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={<Jobs />}
        />
        <Route
          path="/jobs/new"
          element={
            <ProtectedRoute>
              <JobPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidates"
          element={
            <HiringRoute>
              <Candidates />
            </HiringRoute>
          }
        />
        <Route
          path="/candidates/:id"
          element={
            <HiringRoute>
              <CandidateProfile />
            </HiringRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Toast */}
      <Toast toast={toast} onDismiss={dismissToast} />
    </Router>
  );
}

export default App;
