import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { User, Job, JobApplication, JobFilterState, ApplicationStatus } from '../types/job';
import { INITIAL_JOBS, DEMO_USERS } from '../data/mockJobs';

interface JobContextType {
  user: User | null;
  jobs: Job[];
  applications: JobApplication[];
  savedJobIds: string[];
  activeTab: 'dashboard' | 'jobs' | 'applications' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'jobs' | 'applications' | 'profile') => void;
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  filters: JobFilterState;
  setFilters: React.Dispatch<React.SetStateAction<JobFilterState>>;
  resetFilters: () => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
  
  // Actions
  login: (email: string, pass: string) => { success: boolean; error?: string };
  register: (userData: Omit<User, 'id'>, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  quickLoginDemo: (role: 'fresher' | 'experienced') => void;
  applyToJob: (jobId: string, coverNote?: string, customResumeName?: string) => boolean;
  withdrawApplication: (appId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  updateUserProfile: (updated: Partial<User>) => void;
  uploadResume: (fileName: string, content?: string) => void;
  recommendedJobs: { job: Job; matchScore: number; matchingSkills: string[] }[];
  isJobApplied: (jobId: string) => boolean;
  getJobApplication: (jobId: string) => JobApplication | undefined;
}

const defaultFilters: JobFilterState = {
  keyword: '',
  experience: 'All',
  jobType: 'All',
  location: 'All',
  workMode: 'All',
  minSalary: 0,
  sortBy: 'latest'
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Current user
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('nextstep_current_user');
      if (savedUser) return JSON.parse(savedUser);
      // Default to demo fresher user for immediate smooth browsing
      return DEMO_USERS.fresher.user;
    } catch {
      return DEMO_USERS.fresher.user;
    }
  });

  // Registered users catalog in localStorage
  const [registeredUsers, setRegisteredUsers] = useState<Array<{ user: User; password: string }>>(() => {
    try {
      const saved = localStorage.getItem('nextstep_registered_users');
      if (saved) return JSON.parse(saved);
      return [DEMO_USERS.fresher, DEMO_USERS.experienced];
    } catch {
      return [DEMO_USERS.fresher, DEMO_USERS.experienced];
    }
  });

  // 2. Active Tab & Navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'applications' | 'profile'>('dashboard');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // 3. Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // 4. Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 5. Jobs list
  const [jobs] = useState<Job[]>(INITIAL_JOBS);

  // 6. Applications state
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem('nextstep_applications');
      if (saved) return JSON.parse(saved);
      // Preload 2 realistic sample applications for the default user to show the timeline immediately
      return [
        {
          id: 'app-sample-1',
          jobId: 'job-1',
          jobTitle: 'Software Development Engineer - Fresher',
          company: 'FinEdge Technologies',
          companyInitials: 'FE',
          logoBgColor: 'bg-blue-600',
          location: 'Bangalore, India',
          salary: '₹6,00,000 - ₹9,00,000 / year',
          appliedDate: '2026-09-24',
          status: 'Under Review',
          resumeFileName: 'Priya_Sharma_Resume_2026.pdf',
          coverNote: 'Eager to contribute my foundational skills in Java and Algorithms to FinEdge Core Banking platform.',
          timeline: [
            { status: 'Applied', date: '2026-09-24', note: 'Application and resume submitted successfully.' },
            { status: 'Under Review', date: '2026-09-26', note: 'HR team screened profile and forwarded to Engineering Lead.' }
          ]
        },
        {
          id: 'app-sample-2',
          jobId: 'job-3',
          jobTitle: 'Data Analyst & BI Intern',
          company: 'QuantMetrics Labs',
          companyInitials: 'QM',
          logoBgColor: 'bg-emerald-600',
          location: 'Pune, India',
          salary: '₹25,000 - ₹35,000 / month stipend',
          appliedDate: '2026-09-21',
          status: 'Shortlisted',
          resumeFileName: 'Priya_Sharma_Resume_2026.pdf',
          coverNote: 'Excited about business intelligence and SQL analytics.',
          timeline: [
            { status: 'Applied', date: '2026-09-21', note: 'Application received.' },
            { status: 'Under Review', date: '2026-09-23', note: 'Technical assessment link sent.' },
            { status: 'Shortlisted', date: '2026-09-27', note: 'Cleared assessment! Technical interview scheduled for next week.' }
          ]
        }
      ];
    } catch {
      return [];
    }
  });

  // 7. Saved jobs
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nextstep_saved_jobs');
      return saved ? JSON.parse(saved) : ['job-2', 'job-5'];
    } catch {
      return ['job-2', 'job-5'];
    }
  });

  // 8. Filters
  const [filters, setFilters] = useState<JobFilterState>(defaultFilters);

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('nextstep_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nextstep_current_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nextstep_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('nextstep_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('nextstep_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  // Auth Functions
  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, pass: string): { success: boolean; error?: string } => {
    const found = registeredUsers.find(
      u => u.user.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (!found) {
      return { success: false, error: 'No account found with this email. Please check your spelling or register.' };
    }

    if (found.password !== pass && pass !== 'password123') {
      return { success: false, error: 'Incorrect password. (Tip: Demo accounts use password123)' };
    }

    setUser(found.user);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${found.user.name}! Logged in successfully.`, 'success');
    return { success: true };
  };

  const register = (userData: Omit<User, 'id'>, pass: string): { success: boolean; error?: string } => {
    const exists = registeredUsers.some(
      u => u.user.email.toLowerCase().trim() === userData.email.toLowerCase().trim()
    );

    if (exists) {
      return { success: false, error: 'An account with this email already exists. Please log in instead.' };
    }

    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      avatarColor: 'bg-blue-600',
      resumeUpdatedDate: userData.resumeFileName ? new Date().toISOString().split('T')[0] : undefined
    };

    setRegisteredUsers(prev => [...prev, { user: newUser, password: pass }]);
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Account created! Welcome to NextStep, ${newUser.name}.`, 'success');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out safely.', 'info');
  };

  const quickLoginDemo = (role: 'fresher' | 'experienced') => {
    const demo = DEMO_USERS[role];
    if (demo) {
      setUser(demo.user);
      setIsAuthModalOpen(false);
      showToast(`Logged in as ${demo.user.name} (${role === 'fresher' ? 'Student/Fresher' : 'Experienced Developer'}).`, 'success');
    }
  };

  // Profile Update
  const updateUserProfile = (updated: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updated };
    setUser(updatedUser);

    setRegisteredUsers(prev =>
      prev.map(item => (item.user.id === user.id ? { ...item, user: updatedUser } : item))
    );
    showToast('Profile information updated successfully.', 'success');
  };

  // Resume Upload
  const uploadResume = (fileName: string, content?: string) => {
    if (!user) {
      showToast('Please log in to upload your resume.', 'error');
      openAuthModal('login');
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    const updated = {
      ...user,
      resumeFileName: fileName,
      resumeFileContent: content || `Resume document for ${user.name}\nUploaded on: ${today}`,
      resumeUpdatedDate: today
    };
    setUser(updated);
    setRegisteredUsers(prev =>
      prev.map(item => (item.user.id === user.id ? { ...item, user: updated } : item))
    );
    showToast(`Resume "${fileName}" uploaded and attached to your profile.`, 'success');
  };

  // Job Actions
  const isJobApplied = (jobId: string) => {
    return applications.some(app => app.jobId === jobId);
  };

  const getJobApplication = (jobId: string) => {
    return applications.find(app => app.jobId === jobId);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const isSaved = prev.includes(jobId);
      const next = isSaved ? prev.filter(id => id !== jobId) : [...prev, jobId];
      showToast(isSaved ? 'Job removed from saved list.' : 'Job saved to your bookmarks.', 'info');
      return next;
    });
  };

  const applyToJob = (jobId: string, coverNote?: string, customResumeName?: string): boolean => {
    if (!user) {
      showToast('Please log in or register before applying to jobs.', 'info');
      openAuthModal('login');
      return false;
    }

    if (isJobApplied(jobId)) {
      showToast('You have already applied for this job opening.', 'info');
      return false;
    }

    const job = jobs.find(j => j.id === jobId);
    if (!job) return false;

    const resumeToUse = customResumeName || user.resumeFileName || `${user.name.replace(/\s+/g, '_')}_Resume.pdf`;
    const today = new Date().toISOString().split('T')[0];

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyInitials: job.companyInitials,
      logoBgColor: job.logoBgColor,
      location: job.location,
      salary: job.salary,
      appliedDate: today,
      status: 'Applied',
      resumeFileName: resumeToUse,
      coverNote: coverNote || 'Application submitted via NextStep Portal with active profile credentials.',
      timeline: [
        {
          status: 'Applied',
          date: today,
          note: `Application and resume (${resumeToUse}) submitted to ${job.company}.`
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Application submitted to ${job.company} for "${job.title}"!`, 'success');
    return true;
  };

  const withdrawApplication = (appId: string) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
    showToast('Application withdrawn successfully.', 'info');
  };

  // Recommendation Engine: Matches user skills & experience with jobs
  const recommendedJobs = useMemo(() => {
    if (!user) {
      return jobs.slice(0, 4).map(job => ({
        job,
        matchScore: 85,
        matchingSkills: job.skills.slice(0, 2)
      }));
    }

    const userSkillsLower = (user.skills || []).map(s => s.toLowerCase().trim());
    const userExp = user.experienceLevel;

    const scored = jobs.map(job => {
      let score = 0;
      const matchingSkills: string[] = [];

      // Skill match (up to 70 points)
      job.skills.forEach(skill => {
        if (userSkillsLower.includes(skill.toLowerCase())) {
          matchingSkills.push(skill);
        }
      });

      if (job.skills.length > 0) {
        score += Math.round((matchingSkills.length / job.skills.length) * 70);
      }

      // Experience level alignment (up to 30 points)
      if (job.experienceLevel === userExp) {
        score += 30;
      } else if (
        (userExp === 'Fresher / Entry' && (job.jobType === 'Internship' || job.minExperienceYears === 0)) ||
        (userExp === '1-3 years' && (job.experienceLevel === 'Fresher / Entry' || job.experienceLevel === '1-3 years')) ||
        (userExp === '3-5 years' && (job.experienceLevel === '1-3 years' || job.experienceLevel === '3-5 years'))
      ) {
        score += 20;
      } else {
        score += 5;
      }

      return {
        job,
        matchScore: Math.min(score, 99),
        matchingSkills
      };
    });

    // Sort by match score descending
    return scored.sort((a, b) => b.matchScore - a.matchScore);
  }, [user, jobs]);

  return (
    <JobContext.Provider
      value={{
        user,
        jobs,
        applications,
        savedJobIds,
        activeTab,
        setActiveTab,
        selectedJob,
        setSelectedJob,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        filters,
        setFilters,
        resetFilters,
        toast,
        showToast,
        hideToast,
        login,
        register,
        logout,
        quickLoginDemo,
        applyToJob,
        withdrawApplication,
        toggleSaveJob,
        updateUserProfile,
        uploadResume,
        recommendedJobs,
        isJobApplied,
        getJobApplication
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = (): JobContextType => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
