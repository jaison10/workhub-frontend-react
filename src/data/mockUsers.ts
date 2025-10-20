import type { User, JobSeekerProfile, HiringProfile, OrganizationProfile } from '../types/index';

/**
 * Mock users for authentication testing
 * Password for all users: "password123"
 */
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'john@example.com',
    name: 'John Doe',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Computer Science student passionate about web development and UI/UX design.',
    designation: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Git'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      portfolio: 'https://johndoe.dev',
      instagram: 'nasa' // Using NASA as example for demo
    },
    createdAt: '2025-09-15'
  },
  {
    id: 'user-2',
    email: 'sarah@example.com',
    name: 'Sarah Smith',
    accountType: 'Person',
    isLookingForJob: false,
    isHiring: true,
    bio: 'HR Manager at TechCorp, passionate about finding great talent.',
    designation: 'HR Manager',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahsmith'
    },
    createdAt: '2025-09-20'
  },
  {
    id: 'user-3',
    email: 'mike@example.com',
    name: 'Mike Johnson',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: true,
    bio: 'Full-stack developer and freelance consultant. Love building scalable applications.',
    designation: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mikejohnson',
      github: 'https://github.com/mikejohnson',
      instagram: 'kavya.nayak0996'
    },
    createdAt: '2025-09-25'
  },
  {
    id: 'org-1',
    email: 'contact@techcorp.com',
    name: 'TechCorp Solutions',
    accountType: 'Organization',
    createdAt: '2025-08-10'
  },
  {
    id: 'org-2',
    email: 'info@digitalmarketing.com',
    name: 'Digital Marketing Hub',
    accountType: 'Organization',
    createdAt: '2025-08-15'
  },
  {
    id: 'user-4',
    email: 'emma@example.com',
    name: 'Emma Wilson',
    accountType: 'Person',
    isLookingForJob: true,
    isHiring: false,
    bio: 'Part-time graphic designer and college student with flexible schedule throughout the week.',
    designation: 'Graphic Designer',
    skills: ['Adobe Photoshop', 'Illustrator', 'Figma', 'Canva', 'UI Design'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emmawilson',
      portfolio: 'https://emmawilson.design'
    },
    createdAt: '2025-09-28'
  }
];

/**
 * Mock Job Seeker Profiles
 */
export const mockJobSeekerProfiles: Record<string, JobSeekerProfile> = {
  'user-1': {
    userId: 'user-1',
    interests: ['Web Development', 'Mobile Apps', 'Design'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      timeSlots: ['9 AM - 1 PM', '2 PM - 6 PM']
    },
    preferredJobTypes: ['Part-time', 'Internship'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    payRangeExpectation: {
      min: 20,
      max: 35,
      currency: 'USD'
    }
  },
  'user-3': {
    userId: 'user-3',
    interests: ['Backend Development', 'Cloud Computing', 'DevOps', 'Microservices', 'API Design'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9 AM - 5 PM', 'Evening (6 PM - 9 PM)']
    },
    preferredJobTypes: ['Gig', 'Part-time', 'Full-time'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    payRangeExpectation: {
      min: 50,
      max: 80,
      currency: 'USD'
    },
    resumeUrl: 'https://mikejohnson.dev/resume.pdf'
  },
  'user-4': {
    userId: 'user-4',
    interests: ['Design', 'Digital Art', 'Branding', 'Social Media'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      timeSlots: ['Morning (Mon)', 'All day (Tue)', 'Evening (Wed)', 'Evening (Thu-Fri)', 'Anytime (Sat-Sun)']
    },
    preferredJobTypes: ['Part-time', 'Gig', 'Internship'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    payRangeExpectation: {
      min: 25,
      max: 40,
      currency: 'USD'
    }
  }
};

/**
 * Mock Hiring Person Profiles
 */
export const mockHiringProfiles: Record<string, HiringProfile> = {
  'user-2': {
    userId: 'user-2',
    companyHiringFor: 'TechCorp Solutions',
    positionsHiring: ['Frontend Developer', 'Backend Developer', 'UI Designer'],
    locationHiringFor: 'San Francisco, CA',
    activeJobPostsCount: 2
  },
  'user-3': {
    userId: 'user-3',
    companyHiringFor: 'StartupXYZ',
    positionsHiring: ['Python Developer', 'DevOps Engineer', 'Full Stack Developer', 'Cloud Architect'],
    locationHiringFor: 'Austin, TX (Remote Available)',
    activeJobPostsCount: 3
  }
};

/**
 * Mock Organization Profiles
 */
export const mockOrganizationProfiles: Record<string, OrganizationProfile> = {
  'org-1': {
    userId: 'org-1',
    organizationName: 'TechCorp Solutions',
    logoUrl: 'https://via.placeholder.com/150',
    bio: 'Leading technology solutions provider',
    description: 'We build innovative software solutions for businesses worldwide. Founded in 2015, we have grown to a team of 200+ employees.',
    website: 'https://techcorp.com',
    industryType: 'Technology',
    headquarters: 'San Francisco, CA',
    officeLocations: ['San Francisco, CA', 'New York, NY', 'Austin, TX'],
    activeJobPostsCount: 3,
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp'
    }
  },
  'org-2': {
    userId: 'org-2',
    organizationName: 'Digital Marketing Hub',
    logoUrl: 'https://via.placeholder.com/150',
    bio: 'Your digital growth partner',
    description: 'Full-service digital marketing agency helping brands grow online since 2018.',
    website: 'https://digitalmarketinghub.com',
    industryType: 'Marketing & Advertising',
    headquarters: 'Los Angeles, CA',
    officeLocations: ['Los Angeles, CA', 'Miami, FL'],
    activeJobPostsCount: 2,
    socialLinks: {
      linkedin: 'https://linkedin.com/company/digitalmarketinghub',
      twitter: 'https://twitter.com/dmhub',
      portfolio: 'https://digitalmarketinghub.com/work'
    }
  }
};
