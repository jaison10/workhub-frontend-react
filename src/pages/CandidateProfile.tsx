import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Briefcase, DollarSign, Calendar, UserPlus, Send, MessageSquare, Link as LinkIcon } from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { AvailabilityDisplay } from '../components/profile/AvailabilityDisplay';
import { InstagramEmbed } from '../components/profile/InstagramEmbed';
import { Toast } from '../components/common/Toast';
import { useToast } from '../hooks/useToast';
import { allCandidates } from '../data/mockCandidates';

export const CandidateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast, showToast, dismissToast } = useToast();

  const candidate = allCandidates.find(c => c.user.id === id);

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Candidate not found</p>
          <Button onClick={() => navigate('/candidates')}>Back to Candidates</Button>
        </div>
      </div>
    );
  }

  const { user, profile } = candidate;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/candidates')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Candidates</span>
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-6">
            <Avatar
              src={user.profilePhotoUrl}
              fallbackText={user.name}
              size="xl"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {user.name}
              </h1>

              {user.designation && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Briefcase size={16} />
                  <span className="text-sm font-medium">{user.designation}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Mail size={16} />
                <span className="text-sm">{user.email}</span>
              </div>

              <div className="flex gap-2 mb-4">
                {user.isLookingForJob && (
                  <Badge variant="green">Looking for Job</Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => showToast(`Connection request sent to ${user.name}`, 'success')}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <UserPlus size={16} className="mr-2" />
                  Send Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => showToast(`Job invite sent to ${user.name}`, 'info')}
                >
                  <Send size={16} className="mr-2" />
                  Send Job Invite
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => showToast(`Opening chat with ${user.name}`, 'info')}
                >
                  <MessageSquare size={16} className="mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="blue">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {user.socialLinks && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Links</h3>
              <div className="flex flex-wrap gap-3">
                {user.socialLinks.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <LinkIcon size={16} />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                )}
                {user.socialLinks.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <LinkIcon size={16} />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                )}
                {user.socialLinks.twitter && (
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition-colors"
                  >
                    <LinkIcon size={16} />
                    <span className="text-sm font-medium">Twitter</span>
                  </a>
                )}
                {user.socialLinks.portfolio && (
                  <a
                    href={user.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <LinkIcon size={16} />
                    <span className="text-sm font-medium">Portfolio</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Interests */}
        {profile && profile.interests.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <Badge key={index} variant="gray">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Job Preferences */}
        {profile && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Preferences</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Preferred Job Types</p>
                <div className="flex flex-wrap gap-2">
                  {profile.preferredJobTypes.map((type, index) => (
                    <Badge key={index} variant="green">{type}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Work Mode</p>
                <div className="flex flex-wrap gap-2">
                  {profile.preferredWorkMode.map((mode, index) => (
                    <Badge key={index} variant="yellow">{mode}</Badge>
                  ))}
                </div>
              </div>

              {profile.payRangeExpectation && (
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Pay Expectation</p>
                  <div className="flex items-center gap-2">
                    <DollarSign size={18} className="text-green-600" />
                    <span className="text-gray-900 font-semibold">
                      {profile.payRangeExpectation.currency}{' '}
                      {profile.payRangeExpectation.min} -{' '}
                      {profile.payRangeExpectation.max} / hour
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Weekly Availability */}
        {profile && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={20} className="text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">Weekly Availability</h2>
            </div>
            <AvailabilityDisplay availability={profile.availability} />
          </div>
        )}

        {/* Instagram Embed */}
        {user.socialLinks?.instagram && (
          <InstagramEmbed username={user.socialLinks.instagram} />
        )}
      </div>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
};
