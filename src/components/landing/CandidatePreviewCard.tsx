import React from 'react';
import { Avatar } from '../common/Avatar';

interface CandidatePreviewCardProps {
  candidate: {
    id: string;
    name: string;
    designation?: string;
    profilePhotoUrl?: string;
    skills: string[];
  };
}

export const CandidatePreviewCard: React.FC<CandidatePreviewCardProps> = ({ candidate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center min-w-0">
      <Avatar
        src={candidate.profilePhotoUrl}
        fallbackText={candidate.name}
        size="lg"
      />
      <h4 className="font-semibold text-gray-900 text-sm mt-3 truncate w-full">
        {candidate.name}
      </h4>
      <p className="text-xs text-gray-500 mt-1 truncate w-full">
        {candidate.designation || 'Job Seeker'}
      </p>
      {candidate.skills.length > 0 && (
        <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
          {candidate.skills.slice(0, 2).map((skill) => (
            <span key={skill} className="flex items-center gap-1 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
