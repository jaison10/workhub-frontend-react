import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Save, X, Briefcase, UserSearch } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { TagInput } from '../components/common/TagInput';
import { AvailabilitySelector } from '../components/profile/AvailabilitySelector';
import type { JobType, WorkMode } from '../types/index';

// Skill suggestions for quick add
const SKILL_SUGGESTIONS = [
  'React', 'JavaScript', 'TypeScript', 'Python', 'Node.js', 'Java', 'SQL',
  'MongoDB', 'AWS', 'Docker', 'Git', 'HTML/CSS', 'Vue.js', 'Angular',
  'GraphQL', 'REST APIs', 'Agile', 'UI/UX Design', 'Figma', 'Photoshop'
];

const INTEREST_SUGGESTIONS = [
  'Web Development', 'Mobile Development', 'Machine Learning', 'Cloud Computing',
  'DevOps', 'Data Science', 'Cybersecurity', 'Game Development', 'AI',
  'Blockchain', 'UI/UX Design', 'Product Management', 'Digital Marketing'
];

const POSITION_SUGGESTIONS = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Designer',
  'Product Manager', 'Data Scientist', 'DevOps Engineer', 'QA Engineer',
  'Mobile Developer', 'Marketing Manager', 'Sales Representative'
];

/**
 * EditProfile - Comprehensive profile editing for both job seekers and hiring
 *
 * Features:
 * - Role toggles (Looking for Job / Hiring)
 * - Job Seeker profile: skills, interests, availability, preferences
 * - Hiring profile: company, positions, location
 * - Form validation with Formik
 */
export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Role state - initialize from user
  const [isLookingForJob, setIsLookingForJob] = useState(user?.isLookingForJob || false);
  const [isHiring, setIsHiring] = useState(user?.isHiring || false);

  // Initialize availability state
  const [availability, setAvailability] = useState<{
    workType: 'full-time' | 'part-time';
    schedule: { [key: string]: string[] };
  }>({
    workType: 'part-time',
    schedule: {}
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      // General fields (used by both)
      bio: user?.bio || '',
      designation: user?.designation || '',
      skills: user?.skills || ([] as string[]),
      // Social Links
      linkedin: user?.socialLinks?.linkedin || '',
      twitter: user?.socialLinks?.twitter || '',
      github: user?.socialLinks?.github || '',
      portfolio: user?.socialLinks?.portfolio || '',
      instagram: user?.socialLinks?.instagram || '',
      instagramWidgetId: user?.socialLinks?.instagramWidgetId || '',
      // Job Seeker specific fields
      interests: [] as string[],
      preferredJobTypes: [] as JobType[],
      preferredWorkMode: [] as WorkMode[],
      payMin: '',
      payMax: '',
      currency: 'USD',
      // Hiring specific fields
      companyHiringFor: '',
      positionsHiring: [] as string[],
      locationHiringFor: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      bio: Yup.string().max(500, 'Bio must be 500 characters or less'),
      designation: Yup.string(),
      payMin: Yup.number().min(0, 'Must be positive').nullable(),
      payMax: Yup.number()
        .min(Yup.ref('payMin'), 'Max must be greater than min')
        .nullable(),
      companyHiringFor: Yup.string(),
      locationHiringFor: Yup.string()
    }),
    onSubmit: (values) => {
      // Update user with new boolean flags
      const updatedUser = {
        ...user,
        name: values.name,
        bio: values.bio,
        designation: values.designation,
        skills: values.skills,
        socialLinks: {
          linkedin: values.linkedin,
          twitter: values.twitter,
          github: values.github,
          portfolio: values.portfolio,
          instagram: values.instagram,
          instagramWidgetId: values.instagramWidgetId
        },
        isHiring,
        isLookingForJob
      };

      // In production, save to backend
      console.log('Profile Data:', {
        ...updatedUser,
        ...values,
        availability: isLookingForJob ? availability : undefined
      });
      alert('Profile saved successfully! (Mock save)');
      navigate('/profile');
    }
  });

  const jobTypeOptions = [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Gig', label: 'Gig' }
  ];

  const workModeOptions = [
    { value: 'On-site', label: 'On-site' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Hybrid', label: 'Hybrid' }
  ];

  const toggleJobType = (type: JobType) => {
    const current = formik.values.preferredJobTypes;
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    formik.setFieldValue('preferredJobTypes', updated);
  };

  const toggleWorkMode = (mode: WorkMode) => {
    const current = formik.values.preferredWorkMode;
    const updated = current.includes(mode)
      ? current.filter(m => m !== mode)
      : [...current, mode];
    formik.setFieldValue('preferredWorkMode', updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
              <p className="text-sm text-gray-600 mt-1">
                Update your profile information
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name ? formik.errors.name : ''}
                required
              />

              <Input
                label="Designation / Title"
                name="designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                placeholder="e.g., Frontend Developer, Designer, HR Manager"
                helperText="Your current or desired job title"
              />

              <Textarea
                label="Bio"
                name="bio"
                rows={4}
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bio ? formik.errors.bio : ''}
                placeholder="Tell us about yourself, your experience..."
                helperText={`${formik.values.bio.length}/500 characters`}
              />

              <TagInput
                label="Skills"
                value={formik.values.skills}
                onChange={(skills) => formik.setFieldValue('skills', skills)}
                placeholder="Type a skill and press Enter"
                suggestions={SKILL_SUGGESTIONS}
              />

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Social Links</h3>
                <div className="space-y-3">
                  <Input
                    label="LinkedIn"
                    name="linkedin"
                    value={formik.values.linkedin}
                    onChange={formik.handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    helperText="Your LinkedIn profile URL"
                  />
                  <Input
                    label="GitHub"
                    name="github"
                    value={formik.values.github}
                    onChange={formik.handleChange}
                    placeholder="https://github.com/yourusername"
                    helperText="Your GitHub profile URL"
                  />
                  <Input
                    label="Twitter"
                    name="twitter"
                    value={formik.values.twitter}
                    onChange={formik.handleChange}
                    placeholder="https://twitter.com/yourusername"
                    helperText="Your Twitter profile URL"
                  />
                  <Input
                    label="Portfolio"
                    name="portfolio"
                    value={formik.values.portfolio}
                    onChange={formik.handleChange}
                    placeholder="https://yourwebsite.com"
                    helperText="Your portfolio or personal website URL"
                  />
                  <Input
                    label="Instagram Username"
                    name="instagram"
                    value={formik.values.instagram}
                    onChange={formik.handleChange}
                    placeholder="yourusername (without @)"
                    helperText="Your Instagram username (without @). Your profile will be embedded directly."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              What are you here for?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Select one or both options below to customize your profile
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Looking for Job Toggle */}
              <button
                type="button"
                onClick={() => setIsLookingForJob(!isLookingForJob)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  isLookingForJob
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    isLookingForJob ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      isLookingForJob ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      Looking for a Job
                    </h3>
                    <p className="text-sm text-gray-600">
                      Create a job seeker profile with skills and availability
                    </p>
                  </div>
                </div>
              </button>

              {/* Hiring Toggle */}
              <button
                type="button"
                onClick={() => setIsHiring(!isHiring)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  isHiring
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    isHiring ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <UserSearch size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      isHiring ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      Hiring
                    </h3>
                    <p className="text-sm text-gray-600">
                      Create a hiring profile to find talent
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Job Seeker Profile Section */}
          {isLookingForJob && (
            <>
              {/* Interests */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase size={20} className="text-blue-600" />
                  Job Seeker Preferences
                </h2>
                <div className="space-y-4">
                  <TagInput
                    label="Interests"
                    value={formik.values.interests}
                    onChange={(interests) => formik.setFieldValue('interests', interests)}
                    placeholder="Type an interest and press Enter"
                    suggestions={INTEREST_SUGGESTIONS}
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Availability
                </h2>
                <AvailabilitySelector
                  value={availability}
                  onChange={setAvailability}
                />
              </div>

              {/* Job Preferences */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Preferences
                </h2>
                <div className="space-y-4">
                  {/* Preferred Job Types */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Job Types
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {jobTypeOptions.map((option) => {
                        const isSelected = formik.values.preferredJobTypes.includes(option.value as JobType);
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => toggleJobType(option.value as JobType)}
                            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                              isSelected
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred Work Mode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Work Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {workModeOptions.map((option) => {
                        const isSelected = formik.values.preferredWorkMode.includes(option.value as WorkMode);
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => toggleWorkMode(option.value as WorkMode)}
                            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                              isSelected
                                ? 'bg-green-600 border-green-600 text-white'
                                : 'bg-white border-gray-300 text-gray-700 hover:border-green-400'
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay Expectations */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Pay Range Expectation
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    label="Minimum (per hour)"
                    name="payMin"
                    type="number"
                    value={formik.values.payMin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.payMin ? formik.errors.payMin : ''}
                    placeholder="15"
                  />
                  <Input
                    label="Maximum (per hour)"
                    name="payMax"
                    type="number"
                    value={formik.values.payMax}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.payMax ? formik.errors.payMax : ''}
                    placeholder="30"
                  />
                  <Select
                    label="Currency"
                    name="currency"
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                    options={[
                      { value: 'USD', label: 'USD ($)' },
                      { value: 'EUR', label: 'EUR (€)' },
                      { value: 'GBP', label: 'GBP (£)' },
                      { value: 'INR', label: 'INR (₹)' }
                    ]}
                  />
                </div>
              </div>
            </>
          )}

          {/* Hiring Profile Section */}
          {isHiring && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <UserSearch size={20} className="text-green-600" />
                  Hiring Information
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Company Name"
                    name="companyHiringFor"
                    value={formik.values.companyHiringFor}
                    onChange={formik.handleChange}
                    placeholder="e.g., TechCorp Solutions"
                    helperText="The company you're hiring for"
                  />

                  <TagInput
                    label="Positions Hiring For"
                    value={formik.values.positionsHiring}
                    onChange={(positions) => formik.setFieldValue('positionsHiring', positions)}
                    placeholder="Type a position and press Enter"
                    suggestions={POSITION_SUGGESTIONS}
                  />

                  <Input
                    label="Location"
                    name="locationHiringFor"
                    value={formik.values.locationHiringFor}
                    onChange={formik.handleChange}
                    placeholder="e.g., San Francisco, CA or Remote"
                    helperText="Where the positions are located"
                  />
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 bg-white rounded-lg shadow-md p-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={formik.isSubmitting || (!isLookingForJob && !isHiring)}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              {formik.isSubmitting ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
