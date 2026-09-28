import React, { useState, useMemo } from 'react';
import { useJobContext } from '../context/JobContext';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  DollarSign,
  Bookmark,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
  Layers,
  X
} from 'lucide-react';
import { Job, ExperienceLevel, JobType, WorkMode } from '../types/job';

export const JobsView: React.FC = () => {
  const {
    jobs,
    filters,
    setFilters,
    resetFilters,
    setSelectedJob,
    isJobApplied,
    toggleSaveJob,
    savedJobIds,
    user
  } = useJobContext();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // List of unique locations from jobs
  const availableLocations = useMemo(() => {
    const locs = new Set<string>();
    jobs.forEach(j => {
      const city = j.location.split(',')[0].trim();
      locs.add(city);
    });
    return Array.from(locs);
  }, [jobs]);

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // 1. Keyword search (title, skill, company, location)
      if (filters.keyword.trim()) {
        const query = filters.keyword.toLowerCase().trim();
        const titleMatch = job.title.toLowerCase().includes(query);
        const companyMatch = job.company.toLowerCase().includes(query);
        const locationMatch = job.location.toLowerCase().includes(query);
        const skillMatch = job.skills.some(skill => skill.toLowerCase().includes(query));
        const deptMatch = job.department.toLowerCase().includes(query);

        if (!titleMatch && !companyMatch && !locationMatch && !skillMatch && !deptMatch) {
          return false;
        }
      }

      // 2. Experience filter
      if (filters.experience !== 'All') {
        if (job.experienceLevel !== filters.experience) {
          return false;
        }
      }

      // 3. Job Type filter
      if (filters.jobType !== 'All') {
        if (job.jobType !== filters.jobType) {
          return false;
        }
      }

      // 4. Work Mode / Location filter
      if (filters.workMode !== 'All') {
        if (job.workMode !== filters.workMode) {
          return false;
        }
      }

      if (filters.location !== 'All') {
        if (!job.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // 5. Min Salary filter
      if (filters.minSalary > 0) {
        if (job.minSalaryUSD < filters.minSalary) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, filters]);

  // Sorting
  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (filters.sortBy === 'salary-high') {
      return list.sort((a, b) => b.minSalaryUSD - a.minSalaryUSD);
    }
    // Default: latest
    return list;
  }, [filteredJobs, filters.sortBy]);

  // Check if any filters are active
  const isFilterActive =
    filters.keyword !== '' ||
    filters.experience !== 'All' ||
    filters.jobType !== 'All' ||
    filters.location !== 'All' ||
    filters.workMode !== 'All' ||
    filters.minSalary > 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Main search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={filters.keyword}
              onChange={e => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
              placeholder="Search by job title, skill (React, Java, SQL), company, or location..."
              className="w-full pl-10 pr-9 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-slate-400"
            />
            {filters.keyword && (
              <button
                type="button"
                onClick={() => setFilters(prev => ({ ...prev, keyword: '' }))}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={filters.experience}
              onChange={e => setFilters(prev => ({ ...prev, experience: e.target.value }))}
              className="px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer"
            >
              <option value="All">All Experience Levels</option>
              <option value="Fresher / Entry">Fresher / Entry Level</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>

            <select
              value={filters.jobType}
              onChange={e => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
              className="px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer"
            >
              <option value="All">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship (Students)</option>
              <option value="Part-time">Part-time</option>
            </select>

            <select
              value={filters.workMode}
              onChange={e => setFilters(prev => ({ ...prev, workMode: e.target.value }))}
              className="px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer"
            >
              <option value="All">All Work Modes</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
              title="More Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Extended filters drawer on mobile or additional filters */}
        <div className={`mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs ${mobileFilterOpen ? 'block' : 'hidden md:flex'}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500 font-medium">Quick Cities:</span>
            {availableLocations.slice(0, 5).map(city => (
              <button
                key={city}
                type="button"
                onClick={() =>
                  setFilters(prev => ({
                    ...prev,
                    location: prev.location === city ? 'All' : city
                  }))
                }
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  filters.location === city
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-slate-500">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-2 py-1 text-xs border border-slate-200 rounded bg-white text-slate-700 font-medium focus:ring-1 focus:ring-blue-600 focus:outline-none"
            >
              <option value="latest">Latest First</option>
              <option value="salary-high">Highest Compensation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Status & Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-600">
        <div>
          Showing <span className="font-bold text-slate-900 tabular-nums">{sortedJobs.length}</span> open{' '}
          {sortedJobs.length === 1 ? 'position' : 'positions'}
          {filters.keyword && (
            <span> matching "<strong className="text-slate-900">{filters.keyword}</strong>"</span>
          )}
        </div>

        {isFilterActive && (
          <button
            onClick={resetFilters}
            className="text-blue-600 hover:underline font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Job Cards Grid */}
      {sortedJobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No jobs match your criteria</h3>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search terms, changing the experience filter, or resetting all filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            Show All Jobs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedJobs.map(job => {
            const applied = isJobApplied(job.id);
            const isSaved = savedJobIds.includes(job.id);

            // Calculate skill match if user is logged in
            const userSkillsLower = (user?.skills || []).map(s => s.toLowerCase());
            const matchedSkills = job.skills.filter(s => userSkillsLower.includes(s.toLowerCase()));

            return (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top: Company Logo + Title + Bookmark */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-11 h-11 rounded-lg ${job.logoBgColor} text-white flex items-center justify-center font-bold text-sm shrink-0`}
                      >
                        {job.companyInitials}
                      </div>
                      <div>
                        <h3
                          onClick={() => setSelectedJob(job)}
                          className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer text-base leading-snug"
                        >
                          {job.title}
                        </h3>

                        {/* Zero-pill metadata */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                          <span className="font-semibold text-slate-800">{job.company}</span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {job.location} ({job.workMode})
                          </span>
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

                  {/* Secondary metadata line */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 my-2">
                    <span className="font-semibold text-blue-700">{job.salary}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.experienceLevel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{job.jobType}</span>
                  </div>

                  {/* Brief description */}
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills tags preview */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {job.skills.map((skill, idx) => {
                      const isMatched = matchedSkills.includes(skill);
                      return (
                        <span
                          key={idx}
                          className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                            isMatched
                              ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Card footer: Deadlines & Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-500 text-[11px]">
                    <span>Posted {job.postedDate}</span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>Deadline: <strong className="text-slate-700">{job.deadline}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3 py-1.5 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                    >
                      View Details
                    </button>

                    {applied ? (
                      <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition-colors flex items-center gap-1"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
