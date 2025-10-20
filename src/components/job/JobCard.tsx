import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Briefcase, DollarSign } from 'lucide-react';
import type { Job } from '../../types/index';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface JobCardProps {
  job: Job;
}

/**
 * JobCard displays a single job listing with key details
 *
 * Features:
 * - Shows job title, company, location, pay range
 * - Displays job type, work mode as badges
 * - Shows required skills
 * - Apply button (navigates to job details or applies directly)
 */
export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  const getBadgeVariant = (jobType: string) => {
    switch (jobType) {
      case 'Full-time':
        return 'blue';
      case 'Part-time':
        return 'green';
      case 'Internship':
        return 'yellow';
      case 'Gig':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const handleApply = () => {
    // In production, this would navigate to job details or open apply modal
    alert(`Applying to: ${job.title}`);
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {job.title}
          </h3>
          <p className="text-md text-gray-700 font-medium">{job.companyName}</p>
        </div>
        <Badge variant={getBadgeVariant(job.jobType)}>{job.jobType}</Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span>{job.location} • {job.workMode}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-2 flex-shrink-0" />
          <span>{job.daysAvailable.length} days/week</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <DollarSign size={16} className="mr-2 flex-shrink-0" />
          <span>
            ${job.payRange.min}-${job.payRange.max}/{job.jobType === 'Full-time' ? 'year' : 'hour'}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Briefcase size={16} className="mr-2 flex-shrink-0" />
          <span>{job.openings} opening{job.openings > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {job.skillsRequired.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="blue" size="sm">
              {skill}
            </Badge>
          ))}
          {job.skillsRequired.length > 4 && (
            <Badge variant="gray" size="sm">
              +{job.skillsRequired.length - 4} more
            </Badge>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Posted {new Date(job.postedDate).toLocaleDateString()}
          </span>
          <Button onClick={handleApply} size="sm">
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
