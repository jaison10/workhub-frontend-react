import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, UserPlus, Send, MessageSquare } from 'lucide-react';
import type { CandidateData } from '../../data/mockCandidates';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';

interface CandidateCardProps {
  candidate: CandidateData;
  onAction: (action: string, candidateName: string) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onAction }) => {
  const navigate = useNavigate();
  const { user, profile } = candidate;

  const getJobTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Full-time': return 'blue';
      case 'Part-time': return 'green';
      case 'Internship': return 'yellow';
      case 'Gig': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <Card
      hoverable
      className="h-full flex flex-col"
      onClick={() => navigate(`/candidates/${user.id}`)}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar
          src={user.profilePhotoUrl}
          fallbackText={user.name}
          size="lg"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {user.name}
          </h3>
          {user.designation && (
            <p className="text-sm text-gray-600 truncate">{user.designation}</p>
          )}
        </div>
      </div>

      {/* Skills */}
      {user.skills && user.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {user.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="blue" size="sm">
              {skill}
            </Badge>
          ))}
          {user.skills.length > 4 && (
            <Badge variant="gray" size="sm">
              +{user.skills.length - 4} more
            </Badge>
          )}
        </div>
      )}

      {/* Details */}
      {profile && (
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          {profile.preferredJobTypes.length > 0 && (
            <div className="flex items-center gap-2">
              <Briefcase size={14} className="flex-shrink-0 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {profile.preferredJobTypes.map((type, index) => (
                  <Badge key={index} variant={getJobTypeBadgeVariant(type)} size="sm">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profile.preferredWorkMode.length > 0 && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="flex-shrink-0 text-gray-400" />
              <span>{profile.preferredWorkMode.join(', ')}</span>
            </div>
          )}

          {profile.payRangeExpectation && (
            <div className="flex items-center gap-2">
              <DollarSign size={14} className="flex-shrink-0 text-gray-400" />
              <span>
                ${profile.payRangeExpectation.min}-${profile.payRangeExpectation.max}/hr
              </span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-auto pt-3 border-t border-gray-200">
        <div className="flex justify-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onAction('request', user.name); }}
            title="Send Request"
            className="p-2.5 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
          >
            <UserPlus size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAction('invite', user.name); }}
            title="Send Job Invite"
            className="p-2.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <Send size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAction('message', user.name); }}
            title="Message"
            className="p-2.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
          >
            <MessageSquare size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
};
