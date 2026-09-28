import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import {
  X,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Building,
  CheckCircle2,
  Clock,
  Bookmark,
  Share2,
  FileText,
  Upload,
  ChevronRight,
  ArrowRight,
  Users
} from 'lucide-react';

export const JobDetailsModal: React.FC = () => {
  const {
    selectedJob,
    setSelectedJob,
    user,
    isJobApplied,
    getJobApplication,
    applyToJob,
    toggleSaveJob,
    savedJobIds,
    setActiveTab,
    showToast
  } = useJobContext();

  const [isApplying, setIsApplying] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [customResumeName, setCustomResumeName] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!selectedJob) return null;

  const applied = isJobApplied(selectedJob.id);
  const application = getJobApplication(selectedJob.id);
  const isSaved = savedJobIds.includes(selectedJob.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    showToast('Job link copied to clipboard!', 'info');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomResumeName(e.target.files[0].name);
    }
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyToJob(selectedJob.id, coverNote, customResumeName || user?.resumeFileName);
    if (success) {
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/70">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-xl ${selectedJob.logoBgColor} text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-xs`}
            >
              {selectedJob.companyInitials}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">
                {selectedJob.title}
              </h1>
              {/* Zero-pill metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-1.5 font-medium">
                <span className="font-semibold text-slate-900">{selectedJob.company}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {selectedJob.location} ({selectedJob.workMode})
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedJob.jobType}</span>
                <span aria-hidden="true">·</span>
                <span className="text-blue-700 font-semibold">{selectedJob.salary}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveJob(selectedJob.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              title={isSaved ? 'Saved to bookmarks' : 'Save job'}
              aria-label="Save job"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-800 transition-colors"
              title="Share job"
              aria-label="Share job"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedJob(null);
                setIsApplying(false);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Status banner if already applied */}
          {applied && application && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    You applied for this position on {application.appliedDate}
                  </p>
                  <p className="text-xs text-emerald-700">
                    Current Status: <span className="font-bold underline">{application.status}</span> · Resume: {application.resumeFileName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setActiveTab('applications');
                }}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
              >
                <span>Track Application</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <div>
              <p className="text-slate-500 font-medium">Experience</p>
              <p className="font-semibold text-slate-800 mt-0.5">{selectedJob.experienceLevel}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Openings</p>
              <p className="font-semibold text-slate-800 mt-0.5">{selectedJob.openings} vacancies</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Deadline</p>
              <p className="font-semibold text-slate-800 mt-0.5">{selectedJob.deadline}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Department</p>
              <p className="font-semibold text-slate-800 mt-0.5">{selectedJob.department}</p>
            </div>
          </div>

          {/* Inline Application Section if user clicked "Apply Now" */}
          {isApplying ? (
            <div className="border-2 border-blue-600 rounded-xl p-5 bg-blue-50/40">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-blue-200">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Apply to {selectedJob.title}
                  </h2>
                  <p className="text-xs text-slate-600">
                    Confirm your candidate credentials and resume submission
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleConfirmApply} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500">Applicant:</span>{' '}
                    <strong className="text-slate-900">{user?.name || 'Guest User'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Email:</span>{' '}
                    <strong className="text-slate-900">{user?.email || 'Not logged in'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone:</span>{' '}
                    <strong className="text-slate-900">{user?.phone || 'Not provided'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Education:</span>{' '}
                    <strong className="text-slate-900">{user?.education.degree || 'Degree'}</strong>
                  </div>
                </div>

                {/* Resume to submit */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Attached Resume *
                  </label>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-800">
                        {customResumeName || user?.resumeFileName || 'Default_Candidate_Resume.pdf'}
                      </span>
                    </div>

                    <label className="text-xs font-medium text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Attach different file</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={handleResumeFileChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cover Note / Message to Hiring Manager (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={coverNote}
                    onChange={e => setCoverNote(e.target.value)}
                    placeholder="Briefly mention why your skills match this role or projects you've worked on..."
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Submit Job Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="py-2.5 px-4 bg-white border border-slate-300 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          {/* Job Overview */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              About the Role
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedJob.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Key Responsibilities
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {selectedJob.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications & Requirements */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Required Qualifications & Skills
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {selectedJob.qualifications.map((qual, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Skills unboxed list */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Core Technical Competencies
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
              {selectedJob.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-medium border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Perks & Benefits */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Benefits & Perks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {selectedJob.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Company */}
          <div className="border-t border-slate-100 pt-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              About {selectedJob.company}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedJob.company} is an equal opportunity employer committed to cultivating a collaborative, diverse, and high-impact engineering culture. Applications are reviewed on a rolling basis until the deadline ({selectedJob.deadline}).
            </p>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            <span>Posted {selectedJob.postedDate}</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>Deadline: <strong className="text-slate-800">{selectedJob.deadline}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedJob(null);
                setIsApplying(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close
            </button>

            {applied ? (
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setActiveTab('applications');
                }}
                className="px-5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                View in Applications
              </button>
            ) : (
              <button
                onClick={() => setIsApplying(true)}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
