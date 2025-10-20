import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { Button } from '../components/common/Button';

/**
 * Job Post page - Placeholder for job posting form
 *
 * In a complete implementation, this would include:
 * - Job title, description, requirements
 * - Job type, work mode, location selection
 * - Pay range, openings count
 * - Time slots and days available
 * - Formik validation
 */
export const JobPost: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    alert('Job posted successfully! (Mock)');
    navigate('/my-jobs');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Briefcase className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Post a Job</h1>
              <p className="text-sm text-gray-600">
                Find the perfect candidate for your opening
              </p>
            </div>
          </div>

          {/* Placeholder */}
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Job Posting Form
            </h3>
            <p className="text-gray-600 mb-6">
              This page would contain a detailed job posting form with fields
              for title, description, requirements, pay range, schedule, and
              more.
            </p>
            <Button onClick={handleSubmit}>Post Job (Mock)</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
