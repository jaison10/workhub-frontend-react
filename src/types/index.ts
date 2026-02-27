// User account types
export type AccountType = 'Person' | 'Organization';

// User role derived from isHiring + isLookingForJob
export type UserRole = 'JobSeeker' | 'Hiring' | 'Both';

// Job related types
export type JobType = 'Full-time' | 'Part-time' | 'Internship' | 'Gig';
export type WorkMode = 'On-site' | 'Remote' | 'Hybrid';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// User Interface - represents logged-in user
export interface User {
  id: string;
  email: string;
  name: string;
  accountType: AccountType;
  isHiring?: boolean; // Only for Person accounts - whether they are posting jobs
  isLookingForJob?: boolean; // Only for Person accounts - whether they are seeking jobs
  profilePhotoUrl?: string;
  bio?: string; // General profile bio
  skills?: string[]; // General skills (applicable to both hiring and job seeking)
  designation?: string; // Job title or role
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    portfolio?: string;
    instagram?: string; // Instagram username (not full URL)
    instagramWidgetId?: string; // Optional: Elfsight or similar widget ID for embedding feed
  };
  createdAt: string;
}

// Job Seeker specific profile fields
export interface JobSeekerProfile {
  userId: string;
  interests: string[];
  availability: {
    days: DayOfWeek[];
    timeSlots: string[]; // e.g., "9 AM - 1 PM", "2 PM - 6 PM"
  };
  preferredJobTypes: JobType[];
  preferredWorkMode: WorkMode[];
  payRangeExpectation: {
    min: number;
    max: number;
    currency: string;
  };
  resumeUrl?: string;
}

// Hiring Person specific profile fields
export interface HiringProfile {
  userId: string;
  companyHiringFor?: string;
  positionsHiring: string[];
  locationHiringFor: string;
  activeJobPostsCount: number;
}

// Organization profile
export interface OrganizationProfile {
  userId: string;
  organizationName: string;
  logoUrl?: string;
  bio: string;
  description: string;
  website?: string;
  industryType: string;
  headquarters: string;
  officeLocations: string[];
  activeJobPostsCount: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    portfolio?: string;
    instagram?: string; // Instagram username (not full URL)
    instagramWidgetId?: string; // Optional: Elfsight or similar widget ID for embedding feed
  };
}

// Job Post Interface
export interface Job {
  id: string;
  title: string;
  description: string;
  companyName: string;
  companyId: string; // User ID of poster
  jobType: JobType;
  workMode: WorkMode;
  location: string;
  timeSlots: string[];
  daysAvailable: DayOfWeek[];
  payRange: {
    min: number;
    max: number;
    currency: string;
  };
  openings: number;
  skillsRequired: string[];
  postedDate: string;
  status: 'Active' | 'Closed' | 'Draft';
}

// Utility to derive user role from flags
export function getUserRole(user: User): UserRole | null {
  if (user.accountType === 'Organization') return null;
  if (user.isHiring && user.isLookingForJob) return 'Both';
  if (user.isHiring) return 'Hiring';
  if (user.isLookingForJob) return 'JobSeeker';
  return null;
}

// Job Application Interface
export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  applicationDate: string;
  status: 'Applied' | 'Reviewed' | 'Shortlisted' | 'Rejected' | 'Hired';
  coverLetter?: string;
}

// Notification types
export type NotificationType =
  | 'JobRequestReceived'
  | 'JobRequestAccepted'
  | 'JobRequestDeclined'
  | 'JobApplicationReceived';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  referenceId?: string;
  referenceType?: string;
  isRead: boolean;
  createdAt: string;
}

export interface PaginatedNotifications {
  items: Notification[];
  totalCount: number;
  page: number;
  pageSize: number;
}
