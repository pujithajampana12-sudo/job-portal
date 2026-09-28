export type ExperienceLevel = 'Fresher / Entry' | '1-3 years' | '3-5 years' | '5+ years';
export type JobType = 'Full-time' | 'Internship' | 'Part-time' | 'Remote' | 'Contract';
export type WorkMode = 'Remote' | 'On-site' | 'Hybrid';
export type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Rejected';

export interface EducationInfo {
  degree: string;
  institution: string;
  graduationYear: string;
  cgpaOrGrade?: string;
  fieldOfStudy?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  experienceLevel: ExperienceLevel;
  education: EducationInfo;
  experienceSummary: string;
  skills: string[];
  resumeFileName?: string;
  resumeFileContent?: string; // base64 or simulated text content
  resumeUpdatedDate?: string;
  avatarColor?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyInitials: string;
  logoBgColor: string;
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  minExperienceYears: number;
  salary: string;
  minSalaryUSD: number;
  department: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  deadline: string;
  postedDate: string;
  openings: number;
  isFeatured?: boolean;
}

export interface ApplicationTimelineEvent {
  status: ApplicationStatus;
  date: string;
  note: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyInitials: string;
  logoBgColor: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: ApplicationStatus;
  resumeFileName: string;
  coverNote?: string;
  timeline: ApplicationTimelineEvent[];
}

export interface JobFilterState {
  keyword: string;
  experience: string;
  jobType: string;
  location: string;
  workMode: string;
  minSalary: number;
  sortBy: 'latest' | 'salary-high' | 'deadline';
}
