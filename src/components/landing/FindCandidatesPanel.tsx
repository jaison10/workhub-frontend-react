import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CandidatePreviewCard } from './CandidatePreviewCard';

interface CandidatePreview {
  id: string;
  name: string;
  designation?: string;
  profilePhotoUrl?: string;
  skills: string[];
}

interface FindCandidatesPanelProps {
  candidates: CandidatePreview[];
}

export const FindCandidatesPanel: React.FC<FindCandidatesPanelProps> = ({ candidates }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl overflow-hidden border border-orange-100 bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white text-center">Find Candidates</h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Manage Your Hiring Needs
        </h3>

        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
            See Applicants for Your Jobs
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
            Search for Skilled Professionals
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
            Schedule Interviews
          </li>
        </ul>

        {/* Candidate Preview Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {candidates.map((candidate) => (
            <CandidatePreviewCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/candidates')}
          className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-full hover:bg-orange-600 transition-colors"
        >
          View All Candidates
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
