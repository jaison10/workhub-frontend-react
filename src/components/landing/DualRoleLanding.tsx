import React from 'react';
import { motion } from 'framer-motion';
import { FindJobPanel } from './FindJobPanel';
import { FindCandidatesPanel } from './FindCandidatesPanel';
import { mockJobs } from '../../data/mockJobs';
import { mockUsers } from '../../data/mockUsers';
import type { User } from '../../types/index';

interface DualRoleLandingProps {
  user: User;
}

export const DualRoleLanding: React.FC<DualRoleLandingProps> = ({ user }) => {
  // Get first 3 active jobs for preview
  const previewJobs = mockJobs.filter((j) => j.status === 'Active').slice(0, 3);

  // Get job-seeking users as candidate previews, excluding current user
  const previewCandidates = mockUsers
    .filter((u) => u.isLookingForJob && u.id !== user.id)
    .slice(0, 3)
    .map((u) => ({
      id: u.id,
      name: u.name,
      designation: u.designation,
      profilePhotoUrl: u.profilePhotoUrl,
      skills: u.skills?.slice(0, 2) ?? [],
    }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <section className="pt-12 pb-8 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
        >
          Welcome back, {user.name}!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-500 text-lg"
        >
          What would you like to do today?
        </motion.p>
      </section>

      {/* Dual Panels */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Find a Job Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FindJobPanel jobs={previewJobs} />
          </motion.div>

          {/* Find Candidates Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FindCandidatesPanel candidates={previewCandidates} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
