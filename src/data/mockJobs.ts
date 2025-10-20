import type { Job } from '../types/index';

/**
 * Mock job listings data
 * In production, this would come from an API
 */
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    description: 'Work on React-based web applications. Learn modern web development practices.',
    companyName: 'TechCorp Solutions',
    companyId: 'org-1',
    jobType: 'Internship',
    workMode: 'Hybrid',
    location: 'San Francisco, CA',
    timeSlots: ['9 AM - 1 PM', '2 PM - 6 PM'],
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    payRange: {
      min: 20,
      max: 30,
      currency: 'USD'
    },
    openings: 3,
    skillsRequired: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
    postedDate: '2025-10-05',
    status: 'Active'
  },
  {
    id: '2',
    title: 'Part-time Content Writer',
    description: 'Create engaging blog posts and articles for our tech blog.',
    companyName: 'Digital Marketing Hub',
    companyId: 'org-2',
    jobType: 'Part-time',
    workMode: 'Remote',
    location: 'Remote',
    timeSlots: ['Flexible'],
    daysAvailable: ['Monday', 'Wednesday', 'Friday'],
    payRange: {
      min: 25,
      max: 40,
      currency: 'USD'
    },
    openings: 2,
    skillsRequired: ['Content Writing', 'SEO', 'Research'],
    postedDate: '2025-10-08',
    status: 'Active'
  },
  {
    id: '3',
    title: 'Graphic Designer - Freelance',
    description: 'Design social media graphics, logos, and marketing materials.',
    companyName: 'Creative Studio',
    companyId: 'user-5',
    jobType: 'Gig',
    workMode: 'Remote',
    location: 'Remote',
    timeSlots: ['Flexible'],
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    payRange: {
      min: 30,
      max: 60,
      currency: 'USD'
    },
    openings: 1,
    skillsRequired: ['Adobe Photoshop', 'Illustrator', 'Figma', 'Branding'],
    postedDate: '2025-10-09',
    status: 'Active'
  },
  {
    id: '4',
    title: 'Data Entry Specialist',
    description: 'Part-time data entry work. Flexible hours, work from home.',
    companyName: 'DataPro Inc',
    companyId: 'org-3',
    jobType: 'Part-time',
    workMode: 'Remote',
    location: 'Remote',
    timeSlots: ['9 AM - 1 PM'],
    daysAvailable: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    payRange: {
      min: 15,
      max: 20,
      currency: 'USD'
    },
    openings: 5,
    skillsRequired: ['MS Excel', 'Attention to Detail', 'Typing Speed'],
    postedDate: '2025-10-10',
    status: 'Active'
  },
  {
    id: '5',
    title: 'Social Media Manager',
    description: 'Manage Instagram and TikTok accounts for growing e-commerce brand.',
    companyName: 'Fashion Forward',
    companyId: 'org-4',
    jobType: 'Part-time',
    workMode: 'Remote',
    location: 'New York, NY',
    timeSlots: ['2 PM - 6 PM'],
    daysAvailable: ['Monday', 'Wednesday', 'Friday'],
    payRange: {
      min: 25,
      max: 35,
      currency: 'USD'
    },
    openings: 1,
    skillsRequired: ['Social Media Marketing', 'Content Creation', 'Analytics'],
    postedDate: '2025-10-07',
    status: 'Active'
  },
  {
    id: '6',
    title: 'Junior Python Developer',
    description: 'Work on backend APIs and data processing scripts. Great for students.',
    companyName: 'StartupXYZ',
    companyId: 'user-6',
    jobType: 'Part-time',
    workMode: 'On-site',
    location: 'Austin, TX',
    timeSlots: ['9 AM - 1 PM'],
    daysAvailable: ['Tuesday', 'Thursday'],
    payRange: {
      min: 22,
      max: 32,
      currency: 'USD'
    },
    openings: 2,
    skillsRequired: ['Python', 'Django', 'REST APIs', 'SQL'],
    postedDate: '2025-10-06',
    status: 'Active'
  }
];
