import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { JobCard } from '../components/job/JobCard';
import { Select } from '../components/common/Select';
import { mockJobs } from '../data/mockJobs';
import type { JobType, WorkMode } from '../types/index';

/**
 * Jobs Listing Page with filters
 *
 * Features:
 * - Search by keyword (title/company/skills)
 * - Filter by job type, work mode, location
 * - Responsive grid layout
 * - Shows job count
 */
export const Jobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<JobType | ''>('');
  const [selectedWorkMode, setSelectedWorkMode] = useState<WorkMode | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skillsRequired.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Job type filter
      const matchesJobType =
        selectedJobType === '' || job.jobType === selectedJobType;

      // Work mode filter
      const matchesWorkMode =
        selectedWorkMode === '' || job.workMode === selectedWorkMode;

      return matchesSearch && matchesJobType && matchesWorkMode;
    });
  }, [searchQuery, selectedJobType, selectedWorkMode]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedJobType('');
    setSelectedWorkMode('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
          <p className="text-gray-600">
            Discover opportunities that match your skills and schedule
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by job title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden w-full mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center justify-center"
        >
          <Filter size={16} className="mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters */}
        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:flex gap-4 mb-6`}
        >
          <Select
            options={[
              { value: '', label: 'All Job Types' },
              { value: 'Full-time', label: 'Full-time' },
              { value: 'Part-time', label: 'Part-time' },
              { value: 'Internship', label: 'Internship' },
              { value: 'Gig', label: 'Gig' }
            ]}
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value as JobType | '')}
          />

          <Select
            options={[
              { value: '', label: 'All Work Modes' },
              { value: 'On-site', label: 'On-site' },
              { value: 'Remote', label: 'Remote' },
              { value: 'Hybrid', label: 'Hybrid' }
            ]}
            value={selectedWorkMode}
            onChange={(e) =>
              setSelectedWorkMode(e.target.value as WorkMode | '')
            }
          />

          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}{' '}
            found
          </p>
        </div>

        {/* Job Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
