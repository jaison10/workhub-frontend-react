import React from 'react';
import { MapPin } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import type { Job } from '../../types/index';

interface JobPreviewCardProps {
  job: Job;
}

export const JobPreviewCard: React.FC<JobPreviewCardProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center min-w-0">
      <Avatar
        fallbackText={job.companyName}
        size="lg"
      />
      <h4 className="font-semibold text-gray-900 text-sm mt-3 truncate w-full">
        {job.title}
      </h4>
      <p className="text-xs text-gray-500 mt-1 truncate w-full">
        {job.companyName}
      </p>
      <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
        <MapPin size={12} />
        <span className="truncate">{job.jobType} | {job.workMode}</span>
      </div>
    </div>
  );
};
