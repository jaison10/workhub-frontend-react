import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CandidateCard } from '../components/candidate/CandidateCard';
import { Select } from '../components/common/Select';
import { TagInput } from '../components/common/TagInput';
import { Toast } from '../components/common/Toast';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useToast } from '../hooks/useToast';
import { useAuthStore } from '../store/useAuthStore';
import { allCandidates } from '../data/mockCandidates';
import type { JobType, WorkMode, DayOfWeek } from '../types/index';

const BATCH_SIZE = 6;
const ALL_DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_ABBREV: Record<DayOfWeek, string> = {
  Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu',
  Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun'
};

type SortOption = 'relevance' | 'name-az' | 'name-za' | 'pay-low' | 'pay-high';

export const Candidates: React.FC = () => {
  const { user } = useAuthStore();
  const { toast, showToast, dismissToast } = useToast();

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<JobType | ''>('');
  const [selectedWorkMode, setSelectedWorkMode] = useState<WorkMode | ''>('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Advanced filters
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [payRangeMin, setPayRangeMin] = useState('');
  const [payRangeMax, setPayRangeMax] = useState('');
  const [filterSkills, setFilterSkills] = useState<string[]>([]);

  // Pagination
  const [displayCount, setDisplayCount] = useState(BATCH_SIZE);

  // Filter + sort logic
  const filteredCandidates = useMemo(() => {
    const results = allCandidates.filter(({ user: candidate, profile }) => {
      // Exclude current user
      if (user && candidate.id === user.id) return false;

      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = candidate.name.toLowerCase().includes(q);
        const matchesDesignation = candidate.designation?.toLowerCase().includes(q);
        const matchesSkills = candidate.skills?.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesDesignation && !matchesSkills) return false;
      }

      // Job type filter
      if (selectedJobType && profile) {
        if (!profile.preferredJobTypes.includes(selectedJobType)) return false;
      } else if (selectedJobType && !profile) {
        return false;
      }

      // Work mode filter
      if (selectedWorkMode && profile) {
        if (!profile.preferredWorkMode.includes(selectedWorkMode)) return false;
      } else if (selectedWorkMode && !profile) {
        return false;
      }

      // Day availability filter
      if (selectedDays.length > 0) {
        if (!profile) return false;
        const hasDayMatch = selectedDays.some(day => profile.availability.days.includes(day));
        if (!hasDayMatch) return false;
      }

      // Pay range filter
      const minPay = payRangeMin ? Number(payRangeMin) : null;
      const maxPay = payRangeMax ? Number(payRangeMax) : null;
      if ((minPay !== null || maxPay !== null) && profile?.payRangeExpectation) {
        const { min: cMin, max: cMax } = profile.payRangeExpectation;
        if (minPay !== null && cMax < minPay) return false;
        if (maxPay !== null && cMin > maxPay) return false;
      } else if ((minPay !== null || maxPay !== null) && !profile) {
        return false;
      }

      // Skills filter
      if (filterSkills.length > 0) {
        if (!candidate.skills) return false;
        const candidateSkillsLower = candidate.skills.map(s => s.toLowerCase());
        const hasSkillMatch = filterSkills.some(fs =>
          candidateSkillsLower.some(cs => cs.includes(fs.toLowerCase()))
        );
        if (!hasSkillMatch) return false;
      }

      return true;
    });

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case 'name-az':
          return a.user.name.localeCompare(b.user.name);
        case 'name-za':
          return b.user.name.localeCompare(a.user.name);
        case 'pay-low': {
          const aMin = a.profile?.payRangeExpectation?.min ?? 0;
          const bMin = b.profile?.payRangeExpectation?.min ?? 0;
          return aMin - bMin;
        }
        case 'pay-high': {
          const aMax = a.profile?.payRangeExpectation?.max ?? 0;
          const bMax = b.profile?.payRangeExpectation?.max ?? 0;
          return bMax - aMax;
        }
        default:
          return 0;
      }
    });

    return results;
  }, [searchQuery, selectedJobType, selectedWorkMode, sortBy, selectedDays, payRangeMin, payRangeMax, filterSkills, user]);

  // Reset display count on filter change
  const prevFilterKey = useMemo(() =>
    `${searchQuery}|${selectedJobType}|${selectedWorkMode}|${sortBy}|${selectedDays.join(',')}|${payRangeMin}|${payRangeMax}|${filterSkills.join(',')}`,
    [searchQuery, selectedJobType, selectedWorkMode, sortBy, selectedDays, payRangeMin, payRangeMax, filterSkills]
  );
  const filterKeyRef = React.useRef(prevFilterKey);
  if (filterKeyRef.current !== prevFilterKey) {
    filterKeyRef.current = prevFilterKey;
    if (displayCount !== BATCH_SIZE) {
      setDisplayCount(BATCH_SIZE);
    }
  }

  const displayedCandidates = filteredCandidates.slice(0, displayCount);
  const hasMore = displayCount < filteredCandidates.length;

  const handleLoadMore = useCallback(() => {
    setDisplayCount(prev => prev + BATCH_SIZE);
  }, []);

  const { sentinelRef, isLoading } = useInfiniteScroll({
    hasMore,
    onLoadMore: handleLoadMore
  });

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedJobType('');
    setSelectedWorkMode('');
    setSortBy('relevance');
    setSelectedDays([]);
    setPayRangeMin('');
    setPayRangeMax('');
    setFilterSkills([]);
  };

  const hasActiveFilters = searchQuery || selectedJobType || selectedWorkMode ||
    sortBy !== 'relevance' || selectedDays.length > 0 || payRangeMin || payRangeMax || filterSkills.length > 0;

  const handleAction = (action: string, candidateName: string) => {
    switch (action) {
      case 'request':
        showToast(`Connection request sent to ${candidateName}`, 'success');
        break;
      case 'invite':
        showToast(`Job invite sent to ${candidateName}`, 'info');
        break;
      case 'message':
        showToast(`Opening chat with ${candidateName}`, 'info');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Candidates</h1>
          <p className="text-gray-600">
            Discover talented professionals that match your hiring needs
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
              placeholder="Search by name, skills, or designation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden w-full mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center justify-center"
        >
          <Filter size={16} className="mr-2" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Quick Filters Row */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} md:flex flex-wrap gap-3 mb-6 items-end`}>
          <div className="flex-1 min-w-[150px]">
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
          </div>

          <div className="flex-1 min-w-[150px]">
            <Select
              options={[
                { value: '', label: 'All Work Modes' },
                { value: 'On-site', label: 'On-site' },
                { value: 'Remote', label: 'Remote' },
                { value: 'Hybrid', label: 'Hybrid' }
              ]}
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value as WorkMode | '')}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <Select
              options={[
                { value: 'relevance', label: 'Relevance' },
                { value: 'name-az', label: 'Name A-Z' },
                { value: 'name-za', label: 'Name Z-A' },
                { value: 'pay-low', label: 'Pay Low-High' },
                { value: 'pay-high', label: 'Pay High-Low' }
              ]}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            />
          </div>

          <button
            onClick={() => setShowAllFilters(!showAllFilters)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors flex items-center gap-2 ${
              showAllFilters
                ? 'bg-orange-50 border-orange-300 text-orange-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal size={16} />
            All Filters
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
            >
              <X size={14} />
              Clear All
            </button>
          )}
        </div>

        {/* Expandable All Filters Panel */}
        <AnimatePresence>
          {showAllFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
                {/* Availability Days */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Availability</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_DAYS.map(day => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedDays.includes(day)
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {DAY_ABBREV[day]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pay Range */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Pay Range ($/hr)</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={payRangeMin}
                      onChange={(e) => setPayRangeMin(e.target.value)}
                      className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={payRangeMax}
                      onChange={(e) => setPayRangeMax(e.target.value)}
                      className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Skills Filter */}
                <div>
                  <TagInput
                    label="Filter by Skills"
                    value={filterSkills}
                    onChange={setFilterSkills}
                    placeholder="Type a skill and press Enter"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredCandidates.length} {filteredCandidates.length === 1 ? 'candidate' : 'candidates'} found
          </p>
        </div>

        {/* Candidate Grid */}
        {displayedCandidates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCandidates.map(candidate => (
              <CandidateCard
                key={candidate.user.id}
                candidate={candidate}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No candidates found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Sentinel for infinite scroll */}
        <div ref={sentinelRef} className="h-1" />
      </div>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
};
