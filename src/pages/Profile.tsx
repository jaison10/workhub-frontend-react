import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { AvailabilityDisplay } from '../components/profile/AvailabilityDisplay';
import { InstagramEmbed } from '../components/profile/InstagramEmbed';
import { Mail, Briefcase, MapPin, Calendar, DollarSign, Link as LinkIcon, UserSearch, Sparkles } from 'lucide-react';

/**
 * Profile Page - displays user profile based on account type
 *
 * Shows different sections based on:
 * - Looking for job only: Job seeker profile
 * - Hiring only: Hiring profile
 * - Both: Tabs to switch between job seeker and hiring profiles
 * - Organization: Company details, job posts
 */
export const Profile: React.FC = () => {
  const { user, jobSeekerProfile, hiringProfile, organizationProfile } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'jobseeker' | 'hiring'>('jobseeker');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Please log in to view your profile</p>
      </div>
    );
  }

  const orgProfile = organizationProfile;

  const showTabs = user.accountType === 'Person' && user.isHiring && user.isLookingForJob;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {user.accountType === 'Organization' && (
                  <Badge variant="blue">Organization</Badge>
                )}
                {user.isLookingForJob && (
                  <Badge variant="green">Looking for Job</Badge>
                )}
                {user.isHiring && (
                  <Badge variant="purple">Hiring</Badge>
                )}
              </div>

              <Button size="sm" onClick={() => navigate('/profile/edit')}>
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Bio Section - shown for all person accounts */}
          {user.accountType === 'Person' && user.bio && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Skills Section - shown for all person accounts */}
          {user.accountType === 'Person' && user.skills && user.skills.length > 0 && (
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

          {/* Social Links - shown for all person accounts */}
          {user.accountType === 'Person' && user.socialLinks && (
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

        {/* Tabs for users with both hiring and looking for job */}
        {showTabs && (
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('jobseeker')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'jobseeker'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserSearch size={18} />
                    Job Seeker Profile
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('hiring')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'hiring'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} />
                    Hiring Profile
                  </div>
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Organization Profile */}
        {user.accountType === 'Organization' && orgProfile && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Company Information
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-700">{orgProfile.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Industry</p>
                  <p className="text-gray-900">{orgProfile.industryType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Headquarters</p>
                  <p className="text-gray-900">{orgProfile.headquarters}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Active Jobs</p>
                  <p className="text-gray-900">
                    {orgProfile.activeJobPostsCount} openings
                  </p>
                </div>
              </div>

              {orgProfile.website && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Website</p>
                  <a
                    href={orgProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {orgProfile.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Job Seeker Profile - shown if looking for job and (no tabs OR jobseeker tab is active) */}
        {user.isLookingForJob && jobSeekerProfile && (!showTabs || activeTab === 'jobseeker') && (
          <>
            {/* Interests */}
            {jobSeekerProfile.interests && jobSeekerProfile.interests.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Interests
                </h2>

                <div className="flex flex-wrap gap-2">
                  {jobSeekerProfile.interests.map((interest, index) => (
                    <Badge key={index} variant="gray">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Job Preferences */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Job Preferences
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Preferred Job Types</p>
                  <div className="flex flex-wrap gap-2">
                    {jobSeekerProfile.preferredJobTypes.map((type, index) => (
                      <Badge key={index} variant="green">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Work Mode</p>
                  <div className="flex flex-wrap gap-2">
                    {jobSeekerProfile.preferredWorkMode.map((mode, index) => (
                      <Badge key={index} variant="yellow">
                        {mode}
                      </Badge>
                    ))}
                  </div>
                </div>

                {jobSeekerProfile.payRangeExpectation && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Pay Expectation</p>
                    <div className="flex items-center gap-2">
                      <DollarSign size={18} className="text-green-600" />
                      <span className="text-gray-900 font-semibold">
                        {jobSeekerProfile.payRangeExpectation.currency}{' '}
                        {jobSeekerProfile.payRangeExpectation.min} -{' '}
                        {jobSeekerProfile.payRangeExpectation.max} / hour
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={20} className="text-gray-700" />
                <h2 className="text-xl font-bold text-gray-900">
                  Weekly Availability
                </h2>
              </div>

              <AvailabilityDisplay availability={jobSeekerProfile.availability} />
            </div>
          </>
        )}

        {/* Hiring Profile - shown if hiring and (no tabs OR hiring tab is active) */}
        {user.isHiring && hiringProfile && (!showTabs || activeTab === 'hiring') && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Hiring Information
            </h2>

            <div className="space-y-4">
              {hiringProfile.companyHiringFor && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Company</p>
                  <p className="text-gray-900 font-medium">
                    {hiringProfile.companyHiringFor}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500 mb-2">Positions Hiring</p>
                <div className="flex flex-wrap gap-2">
                  {hiringProfile.positionsHiring.map((position, index) => (
                    <Badge key={index} variant="purple">
                      {position}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-gray-900">
                    {hiringProfile.locationHiringFor}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Active Job Posts</p>
                  <p className="text-gray-900">
                    {hiringProfile.activeJobPostsCount} openings
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instagram Embed - shown for all personal accounts with Instagram */}
        {user.accountType === 'Person' && user.socialLinks?.instagram && (
          <InstagramEmbed username={user.socialLinks.instagram} />
        )}
      </div>
    </div>
  );
};
