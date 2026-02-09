import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Briefcase, Users, Zap } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/useAuthStore';
import { DualRoleLanding } from '../components/landing/DualRoleLanding';

/**
 * Landing Page
 *
 * Renders different views based on auth state:
 * - Dual-role users (isHiring + isLookingForJob): Personalized dual-panel UI
 * - Everyone else: Public hero section with CTAs
 */
export const Landing: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  // Dual-role: both hiring and looking for job
  if (isAuthenticated && user?.isHiring && user?.isLookingForJob) {
    return <DualRoleLanding user={user} />;
  }

  return <PublicLanding />;
};

/**
 * Public Landing - Hero section with CTA and "How it works"
 */
const PublicLanding: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleFindJobs = () => {
    if (isAuthenticated) {
      navigate('/jobs');
    } else {
      navigate('/signup');
    }
  };

  const handlePostJob = () => {
    if (isAuthenticated) {
      navigate('/jobs/new');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Find Part-Time Jobs That Fit Your Schedule
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 text-blue-100 max-w-2xl mx-auto"
          >
            Connect with opportunities that match your skills, availability, and
            goals. Whether you're a student, freelancer, or company—we've got you
            covered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleFindJobs}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Search className="inline-block mr-2" size={20} />
              Find Jobs
            </Button>
            <Button
              onClick={handlePostJob}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Briefcase className="inline-block mr-2" size={20} />
              Post a Job
            </Button>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 md:h-20"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                1. Create Your Profile
              </h3>
              <p className="text-gray-600">
                Sign up as a job seeker, hiring person, or organization. Tell us
                about your skills, availability, and what you're looking for.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2. Browse or Post Jobs
              </h3>
              <p className="text-gray-600">
                Job seekers can filter opportunities by type, schedule, and
                location. Employers can post openings in minutes.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                3. Connect & Get Hired
              </h3>
              <p className="text-gray-600">
                Apply to jobs that match your profile. Employers review
                applications and hire the best fit—all in one platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of job seekers and employers already using WorkHub
          </p>
          <Button
            onClick={() => navigate('/signup')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
};
