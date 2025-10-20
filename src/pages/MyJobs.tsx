import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Briefcase, FileText } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

/**
 * My Jobs page - Shows different content based on user role
 *
 * - Job Seekers: Applications they've submitted
 * - Hiring/Organization: Jobs they've posted
 */
export const MyJobs: React.FC = () => {
  const { user } = useAuthStore();

  const isJobSeeker = user?.role === 'JobSeeker';
  const isHiring =
    user?.role === 'Hiring' ||
    user?.role === 'Both' ||
    user?.accountType === 'Organization';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h1>
          <p className="text-gray-600">
            {isJobSeeker
              ? 'Track your job applications and their status'
              : 'Manage your job postings and review applications'}
          </p>
        </div>

        {/* Job Seeker View */}
        {isJobSeeker && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Applications Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start applying to jobs to see your applications here
              </p>
              <Button onClick={() => window.location.href = '/jobs'}>
                Browse Jobs
              </Button>
            </div>
          </div>
        )}

        {/* Hiring/Organization View */}
        {isHiring && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Posted Jobs Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Post your first job to start receiving applications
              </p>
              <Button onClick={() => window.location.href = '/jobs/new'}>
                Post a Job
              </Button>
            </div>
          </div>
        )}

        {/* Mock Job Posts for Users with "Both" role */}
        {user?.role === 'Both' && (
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sample Job Post
                  </h3>
                  <p className="text-sm text-gray-600">Posted 3 days ago</p>
                </div>
                <Badge variant="green">Active</Badge>
              </div>
              <p className="text-gray-600 mb-4">5 applications received</p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm">Review Applications</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
