import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { JobPreviewCard } from './JobPreviewCard';
import type { Job } from '../../types/index';

interface FindJobPanelProps {
  jobs: Job[];
}

export const FindJobPanel: React.FC<FindJobPanelProps> = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl overflow-hidden border border-blue-100 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white text-center">Find a Job</h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Discover Opportunities for You
        </h3>

        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            Browse Jobs Matching Your Skills
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            Filter by Availability and Location
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            Apply to New Positions
          </li>
        </ul>

        {/* Job Preview Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {jobs.map((job) => (
            <JobPreviewCard key={job.id} job={job} />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-full hover:bg-blue-800 transition-colors"
        >
          View All Jobs
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
