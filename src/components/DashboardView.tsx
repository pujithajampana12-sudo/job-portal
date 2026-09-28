import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import {
  Briefcase,
  Search,
  CheckCircle2,
  Clock,
  Bookmark,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  GraduationCap,
  FileCheck,
  ChevronRight,
  Layers,
  Award
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    user,
    applications,
    savedJobIds,
    recommendedJobs,
    setSelectedJob,
    setActiveTab,
    setFilters,
    isJobApplied,
    toggleSaveJob,
    openAuthModal
  } = useJobContext();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      keyword: searchQuery.trim()
    }));
    setActiveTab('jobs');
  };

  const underReviewCount = applications.filter(a => a.status === 'Under Review').length;
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Welcome & Search Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        {/* Subtle geometric decorative backdrop */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
        <div className="absolute right-20 top-0 w-48 h-48 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2 text-blue-200 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Smart Candidate Dashboard</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            {user ? (
              <>Welcome back, {user.name} 👋</>
            ) : (
              <>Find Your Next Career Move</>
            )}
          </h1>

          <p className="text-sm text-blue-100/90 leading-relaxed mb-6 max-w-2xl">
            {user ? (
              <>
                Showing personalized internships & job recommendations matched to your profile as{' '}
                <span className="font-semibold text-white underline decoration-blue-300">
                  {user.headline || user.experienceLevel}
                </span>.
              </>
            ) : (
              <>
                Browse vetted job openings for students, freshers, and experienced software engineers.
                Track applications and apply in one click.
              </>
            )}
          </p>

          {/* Quick Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row gap-2 max-w-2xl bg-white/10 p-1.5 rounded-xl backdrop-blur-md border border-white/20"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-blue-200 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by job title, skill (React, Java, Python), company..."
                className="w-full pl-10 pr-3 py-2 text-sm text-white placeholder-blue-200/70 bg-transparent focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-white text-blue-900 font-bold text-xs rounded-lg hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Search Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Suggested Fast Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-blue-200">
            <span className="text-blue-300">Popular:</span>
            {['Fresher', 'React.js', 'Internship', 'Python', 'Remote', 'Data Analyst'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setFilters(prev => ({
                    ...prev,
                    keyword: tag === 'Fresher' || tag === 'Internship' ? '' : tag,
                    experience: tag === 'Fresher' ? 'Fresher / Entry' : prev.experience,
                    jobType: tag === 'Internship' ? 'Internship' : prev.jobType
                  }));
                  setActiveTab('jobs');
                }}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Applications
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              {applications.length}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Submitted via portal</p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Under Review
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              {underReviewCount}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Active recruiter review</p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Shortlisted
            </p>
            <p className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
              {shortlistedCount}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Interview stage</p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Saved Bookmarks
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              {savedJobIds.length}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">For future application</p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Bookmark className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Recommended Jobs Section (Feature 7) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Recommended Jobs For Your Profile
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Matched against your skills ({user?.skills?.length ? user.skills.slice(0, 4).join(', ') : 'Java, React, SQL'}) and experience level
            </p>
          </div>

          <button
            onClick={() => setActiveTab('jobs')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
          >
            <span>View All Jobs</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedJobs.slice(0, 4).map(({ job, matchScore, matchingSkills }) => {
            const applied = isJobApplied(job.id);
            const isSaved = savedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-11 h-11 rounded-lg ${job.logoBgColor} text-white flex items-center justify-center font-bold text-sm shrink-0`}
                      >
                        {job.companyInitials}
                      </div>
                      <div>
                        <h3
                          onClick={() => setSelectedJob(job)}
                          className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer text-base leading-snug group-hover:text-blue-600 transition-colors"
                        >
                          {job.title}
                        </h3>
                        {/* Zero-pill metadata */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <span className="font-semibold text-slate-800">{job.company}</span>
                          <span aria-hidden="true">·</span>
                          <span>{job.location}</span>
                          <span aria-hidden="true">·</span>
                          <span>{job.workMode}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${
                        isSaved ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isSaved ? 'Remove bookmark' : 'Bookmark job'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
                    </button>
                  </div>

                  {/* Match Indicator & Unboxed Skills */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-3 bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                    <span className="font-bold text-blue-700 tabular-nums">
                      {matchScore}% Profile Match
                    </span>
                    <span aria-hidden="true" className="text-blue-300">·</span>
                    <span className="truncate">
                      Matches: <span className="font-medium text-slate-800">{matchingSkills.join(', ') || 'Domain fundamentals'}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">{job.salary}</span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">
                      Deadline: {job.deadline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      Details
                    </button>
                    {applied ? (
                      <span className="px-3 py-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition-colors flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Applications Quick Progress & Mini Project Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Applications summary */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Applications</h2>
              <p className="text-xs text-slate-500">Live tracker of your applied job positions</p>
            </div>
            <button
              onClick={() => setActiveTab('applications')}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>All Applications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">No applications submitted yet</p>
              <p className="text-xs text-slate-500 mb-3">Explore open roles and apply with one click</p>
              <button
                onClick={() => setActiveTab('jobs')}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {applications.slice(0, 3).map(app => (
                <div key={app.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg ${app.logoBgColor} text-white flex items-center justify-center font-bold text-xs shrink-0`}
                    >
                      {app.companyInitials}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                        {app.jobTitle}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {app.company} · Applied on {app.appliedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded border ${
                        app.status === 'Shortlisted'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : app.status === 'Under Review'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : app.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}
                    >
                      {app.status}
                    </span>

                    <button
                      onClick={() => setActiveTab('applications')}
                      className="text-slate-400 hover:text-slate-600 p-1"
                      title="View application timeline"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Candidate Career Readiness & Project Card */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold text-white">Career Readiness</h2>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Designed specifically for students, freshers, and experienced software developers. Keep your profile and resume updated to attract hiring managers.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-800 rounded-lg">
                <span className="text-slate-300">Resume Attached</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {user?.resumeFileName ? 'Updated' : 'Not added'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-800 rounded-lg">
                <span className="text-slate-300">Skills Listed</span>
                <span className="text-blue-400 font-semibold tabular-nums">
                  {user?.skills?.length || 0} Skills
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-800 rounded-lg">
                <span className="text-slate-300">Experience Category</span>
                <span className="text-amber-300 font-medium">
                  {user?.experienceLevel || 'Fresher'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('profile')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Edit Profile & Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
