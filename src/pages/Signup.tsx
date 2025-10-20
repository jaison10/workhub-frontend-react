import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ArrowRight, ArrowLeft } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/useAuthStore';
import type { AccountType } from '../types/index';

/**
 * Multi-step Signup Page
 *
 * Step 1: Select Account Type (Person | Organization)
 * Step 2: If Person, choose what they want to do (checkboxes for hiring/looking for job)
 * Step 3: Basic Info (Name, Email, Password)
 * Step 4: Redirect to /profile/setup
 */
export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType | ''>('');
  const [isHiring, setIsHiring] = useState(false);
  const [isLookingForJob, setIsLookingForJob] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')
    }),
    onSubmit: (values) => {
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email: values.email,
        name: values.name,
        accountType: accountType as AccountType,
        isHiring: accountType === 'Person' ? isHiring : undefined,
        isLookingForJob: accountType === 'Person' ? isLookingForJob : undefined,
        createdAt: new Date().toISOString()
      };

      setUser(newUser);
      navigate('/profile/setup');
    }
  });

  const handleNext = () => {
    if (step === 1 && accountType) {
      if (accountType === 'Organization') {
        setStep(3); // Skip preference selection for organizations
      } else {
        setStep(2);
      }
    } else if (step === 2 && (isHiring || isLookingForJob)) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 3 && accountType === 'Organization') {
      setStep(1);
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <UserPlus className="text-blue-600" size={24} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Step {step} of 3
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Account Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3 className="text-lg font-semibold mb-4">Select Account Type</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setAccountType('Person')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                    accountType === 'Person'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold">Person</p>
                  <p className="text-sm text-gray-600">
                    For job seekers or individuals hiring
                  </p>
                </button>

                <button
                  onClick={() => setAccountType('Organization')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                    accountType === 'Organization'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold">Organization</p>
                  <p className="text-sm text-gray-600">
                    For companies posting jobs
                  </p>
                </button>
              </div>

              <Button
                onClick={handleNext}
                disabled={!accountType}
                className="w-full mt-6"
              >
                Next <ArrowRight className="inline-block ml-2" size={16} />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Preferences Selection (Person only) */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3 className="text-lg font-semibold mb-2">What would you like to do?</h3>
              <p className="text-sm text-gray-600 mb-4">Select one or both options</p>

              <div className="space-y-3">
                <label
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    isLookingForJob
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isLookingForJob}
                    onChange={(e) => setIsLookingForJob(e.target.checked)}
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div>
                    <p className="font-semibold">Looking for a Job</p>
                    <p className="text-sm text-gray-600">
                      Find and apply to job opportunities
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    isHiring
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isHiring}
                    onChange={(e) => setIsHiring(e.target.checked)}
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div>
                    <p className="font-semibold">Hiring</p>
                    <p className="text-sm text-gray-600">
                      Post jobs and find candidates
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleBack} variant="outline" className="flex-1">
                  <ArrowLeft className="inline-block mr-2" size={16} /> Back
                </Button>
                <Button onClick={handleNext} disabled={!isHiring && !isLookingForJob} className="flex-1">
                  Next <ArrowRight className="inline-block ml-2" size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Basic Info */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name ? formik.errors.name : ''}
                  required
                />

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
                  helperText="At least 6 characters"
                  required
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword
                      ? formik.errors.confirmPassword
                      : ''
                  }
                  required
                />

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1"
                  >
                    <ArrowLeft className="inline-block mr-2" size={16} /> Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Create Account
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
