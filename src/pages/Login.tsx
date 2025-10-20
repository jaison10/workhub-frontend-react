import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/useAuthStore';
import { mockUsers } from '../data/mockUsers';

/**
 * Login Page with Formik validation
 *
 * Features:
 * - Email/Password validation with Yup
 * - Mock authentication (checks against mockUsers)
 * - "Continue as Guest" option
 * - Link to signup page
 *
 * Test credentials:
 * - john@example.com / password123
 * - sarah@example.com / password123
 * - contact@techcorp.com / password123
 */
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
    }),
    onSubmit: (values) => {
      // Mock authentication
      const user = mockUsers.find(
        (u) => u.email === values.email
      );

      if (user && values.password === 'password123') {
        setUser(user);
        navigate('/jobs');
      } else {
        setError('Invalid email or password');
      }
    }
  });

  const handleGuestLogin = () => {
    // Use first job seeker as guest
    const guestUser = mockUsers.find(u => u.isLookingForJob);
    if (guestUser) {
      setUser(guestUser);
      navigate('/jobs');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <LogIn className="text-blue-600" size={24} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email ? formik.errors.email : ''}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password ? formik.errors.password : ''}
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Guest Login */}
        <Button
          onClick={handleGuestLogin}
          variant="outline"
          className="w-full mb-4"
        >
          Continue as Guest
        </Button>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>

        {/* Test Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 font-semibold mb-2">
            Test Credentials:
          </p>
          <p className="text-xs text-gray-600">
            <strong>Job Seeker:</strong> john@example.com / password123
          </p>
          <p className="text-xs text-gray-600">
            <strong>Hiring:</strong> sarah@example.com / password123
          </p>
          <p className="text-xs text-gray-600">
            <strong>Both:</strong> mike@example.com / password123
          </p>
          <p className="text-xs text-gray-600">
            <strong>Organization:</strong> contact@techcorp.com / password123
          </p>
        </div>
      </motion.div>
    </div>
  );
};
