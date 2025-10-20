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
import { useAuthStore } from './store/useAuthStore';

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

function App() {
  const { isAuthenticated } = useAuthStore();

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

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
