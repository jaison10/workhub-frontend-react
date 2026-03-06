import type { User, JobSeekerProfile } from '../types/index';
import { mockUsers, mockJobSeekerProfiles } from './mockUsers';

export interface CandidateData {
  user: User;
  profile: JobSeekerProfile | null;
}

// Additional mock users (user-6 through user-17) for candidates listing
const additionalUsers: User[] = [
  {
    id: 'user-6',
    email: 'priya@example.com',
    name: 'Priya Sharma',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Backend engineer with 3 years of experience in microservices and distributed systems.',
    designation: 'Backend Engineer',
    skills: ['Java', 'Spring Boot', 'Kubernetes', 'PostgreSQL', 'Redis'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/priyasharma',
      github: 'https://github.com/priyasharma'
    },
    createdAt: '2025-10-05'
  },
  {
    id: 'user-7',
    email: 'david@example.com',
    name: 'David Kim',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Mobile developer specializing in cross-platform apps with React Native and Flutter.',
    designation: 'Mobile Developer',
    skills: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Swift'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/davidkim',
      github: 'https://github.com/davidkim',
      portfolio: 'https://davidkim.dev'
    },
    createdAt: '2025-10-08'
  },
  {
    id: 'user-8',
    email: 'lisa@example.com',
    name: 'Lisa Chen',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'UX researcher and designer passionate about creating accessible and inclusive digital experiences.',
    designation: 'UX Designer',
    skills: ['Figma', 'User Research', 'Prototyping', 'Accessibility', 'Design Systems'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/lisachen',
      portfolio: 'https://lisachen.design'
    },
    createdAt: '2025-10-10'
  },
  {
    id: 'user-9',
    email: 'james@example.com',
    name: 'James Rodriguez',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'DevOps engineer focused on CI/CD pipelines, cloud infrastructure, and automation.',
    designation: 'DevOps Engineer',
    skills: ['AWS', 'Terraform', 'Docker', 'Jenkins', 'Linux'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/jamesrodriguez',
      github: 'https://github.com/jamesrod'
    },
    createdAt: '2025-10-12'
  },
  {
    id: 'user-10',
    email: 'nina@example.com',
    name: 'Nina Patel',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Data scientist with expertise in machine learning, NLP, and statistical modeling.',
    designation: 'Data Scientist',
    skills: ['Python', 'TensorFlow', 'NLP', 'SQL', 'Pandas'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ninapatel',
      github: 'https://github.com/ninapatel'
    },
    createdAt: '2025-10-15'
  },
  {
    id: 'user-11',
    email: 'ryan@example.com',
    name: 'Ryan O\'Brien',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Marketing specialist with strong analytical skills and experience in growth hacking.',
    designation: 'Marketing Specialist',
    skills: ['SEO', 'Google Analytics', 'Content Marketing', 'Social Media', 'Copywriting'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ryanobrien'
    },
    createdAt: '2025-10-18'
  },
  {
    id: 'user-12',
    email: 'sophia@example.com',
    name: 'Sophia Martinez',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Full-stack developer with a focus on React and Node.js. Love building SaaS products.',
    designation: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'TypeScript'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sophiamartinez',
      github: 'https://github.com/sophiam',
      portfolio: 'https://sophiamartinez.dev'
    },
    createdAt: '2025-10-20'
  },
  {
    id: 'user-13',
    email: 'carlos@example.com',
    name: 'Carlos Mendes',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Cloud architect specializing in Azure and multi-cloud solutions for enterprise clients.',
    designation: 'Cloud Architect',
    skills: ['Azure', 'AWS', 'Terraform', 'Microservices', 'C#'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/carlosmendes'
    },
    createdAt: '2025-10-22'
  },
  {
    id: 'user-14',
    email: 'aisha@example.com',
    name: 'Aisha Thompson',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'QA engineer passionate about test automation and ensuring software quality at scale.',
    designation: 'QA Engineer',
    skills: ['Selenium', 'Cypress', 'Jest', 'API Testing', 'Agile'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/aishathompson',
      github: 'https://github.com/aishathompson'
    },
    createdAt: '2025-10-25'
  },
  {
    id: 'user-15',
    email: 'tom@example.com',
    name: 'Tom Walker',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Product manager with 5 years of experience in tech startups. Bridge between business and engineering.',
    designation: 'Product Manager',
    skills: ['Product Strategy', 'Agile', 'Jira', 'Data Analysis', 'Stakeholder Management'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/tomwalker'
    },
    createdAt: '2025-10-28'
  },
  {
    id: 'user-16',
    email: 'mei@example.com',
    name: 'Mei Zhang',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Cybersecurity analyst with certifications in penetration testing and incident response.',
    designation: 'Security Analyst',
    skills: ['Penetration Testing', 'SIEM', 'Python', 'Network Security', 'Risk Assessment'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/meizhang',
      github: 'https://github.com/meizhang'
    },
    createdAt: '2025-11-01'
  },
  {
    id: 'user-17',
    email: 'jordan@example.com',
    name: 'Jordan Lee',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Creative video editor and motion graphics artist with experience in social media content.',
    designation: 'Video Editor',
    skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics', 'Storytelling'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/jordanlee',
      portfolio: 'https://jordanlee.video'
    },
    createdAt: '2025-11-03'
  }
];

// Additional job seeker profiles for the new users
const additionalProfiles: Record<string, JobSeekerProfile> = {
  'user-5': {
    userId: 'user-5',
    interests: ['Data Science', 'Machine Learning', 'Business Intelligence'],
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday'],
      timeSlots: ['9 AM - 1 PM', '2 PM - 6 PM']
    },
    preferredJobTypes: ['Part-time', 'Gig'],
    preferredWorkMode: ['Remote'],
    payRangeExpectation: { min: 30, max: 50, currency: 'USD' }
  },
  'user-6': {
    userId: 'user-6',
    interests: ['Distributed Systems', 'API Design', 'Open Source'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9 AM - 5 PM']
    },
    preferredJobTypes: ['Full-time', 'Part-time'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    payRangeExpectation: { min: 45, max: 70, currency: 'USD' }
  },
  'user-7': {
    userId: 'user-7',
    interests: ['Mobile Development', 'Cross-Platform', 'UI Animation'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      timeSlots: ['9 AM - 1 PM', 'Evening (6 PM - 9 PM)']
    },
    preferredJobTypes: ['Part-time', 'Gig'],
    preferredWorkMode: ['Remote'],
    payRangeExpectation: { min: 35, max: 55, currency: 'USD' }
  },
  'user-8': {
    userId: 'user-8',
    interests: ['UX Research', 'Accessibility', 'Design Thinking'],
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9 AM - 5 PM']
    },
    preferredJobTypes: ['Full-time', 'Part-time'],
    preferredWorkMode: ['Hybrid', 'On-site'],
    payRangeExpectation: { min: 40, max: 60, currency: 'USD' }
  },
  'user-9': {
    userId: 'user-9',
    interests: ['Cloud Infrastructure', 'Automation', 'Site Reliability'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9 AM - 5 PM', 'Evening (6 PM - 9 PM)']
    },
    preferredJobTypes: ['Full-time'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    payRangeExpectation: { min: 55, max: 85, currency: 'USD' }
  },
  'user-10': {
    userId: 'user-10',
    interests: ['Machine Learning', 'NLP', 'Computer Vision'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['9 AM - 1 PM']
    },
    preferredJobTypes: ['Part-time', 'Internship'],
    preferredWorkMode: ['Remote'],
    payRangeExpectation: { min: 40, max: 65, currency: 'USD' }
  },
  'user-11': {
    userId: 'user-11',
    interests: ['Growth Marketing', 'Analytics', 'Brand Strategy'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlots: ['9 AM - 5 PM']
    },
    preferredJobTypes: ['Full-time', 'Part-time'],
    preferredWorkMode: ['Hybrid', 'Remote'],
    payRangeExpectation: { min: 25, max: 40, currency: 'USD' }
  },
  'user-12': {
    userId: 'user-12',
    interests: ['SaaS', 'Web Development', 'Developer Tools'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9 AM - 5 PM']
    },
    preferredJobTypes: ['Full-time', 'Gig'],
    preferredWorkMode: ['Remote'],
    payRangeExpectation: { min: 50, max: 75, currency: 'USD' }
  },
  'user-13': {
    userId: 'user-13',
    interests: ['Cloud Architecture', 'Enterprise Solutions', 'DevOps'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9 AM - 5 PM']
    },
    preferredJobTypes: ['Full-time'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    payRangeExpectation: { min: 65, max: 100, currency: 'USD' }
  },
  'user-14': {
    userId: 'user-14',
    interests: ['Test Automation', 'Quality Assurance', 'Performance Testing'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      timeSlots: ['9 AM - 5 PM']
    },
    preferredJobTypes: ['Full-time', 'Part-time'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    payRangeExpectation: { min: 35, max: 55, currency: 'USD' }
  },
  'user-15': {
    userId: 'user-15',
    interests: ['Product Strategy', 'User Research', 'Startup Growth'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9 AM - 5 PM']
    },
    preferredJobTypes: ['Full-time'],
    preferredWorkMode: ['Hybrid', 'On-site'],
    payRangeExpectation: { min: 55, max: 80, currency: 'USD' }
  },
  'user-16': {
    userId: 'user-16',
    interests: ['Cybersecurity', 'Ethical Hacking', 'Compliance'],
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9 AM - 5 PM', 'Evening (6 PM - 9 PM)']
    },
    preferredJobTypes: ['Full-time', 'Gig'],
    preferredWorkMode: ['Remote'],
    payRangeExpectation: { min: 50, max: 80, currency: 'USD' }
  },
  'user-17': {
    userId: 'user-17',
    interests: ['Video Production', 'Social Media', 'Brand Content'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Saturday', 'Sunday'],
      timeSlots: ['Morning (Mon)', 'All day (Tue-Wed)', 'Anytime (Sat-Sun)']
    },
    preferredJobTypes: ['Part-time', 'Gig'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    payRangeExpectation: { min: 30, max: 50, currency: 'USD' }
  }
};

// Combine existing job-seeking users with additional ones
const allProfiles: Record<string, JobSeekerProfile> = {
  ...mockJobSeekerProfiles,
  ...additionalProfiles
};

// Build the full candidates list from users who are looking for jobs
const existingCandidateUsers = mockUsers.filter(
  u => u.accountType === 'Person' && u.isLookingForJob
);

export const allCandidates: CandidateData[] = [
  ...existingCandidateUsers,
  ...additionalUsers
].map(user => ({
  user,
  profile: allProfiles[user.id] || null
}));
