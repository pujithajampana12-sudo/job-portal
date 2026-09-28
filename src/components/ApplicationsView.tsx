import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  Calendar,
  ChevronRight,
  Trash2,
  ExternalLink,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ApplicationStatus } from '../types/job';

export const ApplicationsView: React.FC = () => {
  const {
    applications,
    withdrawApplication,
    jobs,
    setSelectedJob,
    setActiveTab,
    user
  } = useJobContext();

  const [statusFilter, setStatusFilter] = useState<'All' | ApplicationStatus>('All');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const filteredApplications = applications.filter(app => {
    if (statusFilter === 'All') return true;
    return app.status === statusFilter;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Shortlisted':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        };
      case 'Under Review':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <Clock className="w-3.5 h-3.5 text-amber-600" />
        };
      case 'Rejected':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: <XCircle className="w-3.5 h-3.5 text-rose-600" />
        };
      case 'Applied':
      default:
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
        };
    }
  };

  const handleOpenJobDetails = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Application Status Tracker</h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor real-time progress for your job submissions and recruiter responses
          </p>
        </div>

        {/* Status Filter Tabs (Segmented control) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
          {(['All', 'Applied', 'Under Review', 'Shortlisted', 'Rejected'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}{' '}
              {tab === 'All'
                ? `(${applications.length})`
                : `(${applications.filter(a => a.status === tab).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {statusFilter === 'All'
              ? 'No applications found'
              : `No applications with status "${statusFilter}"`}
          </h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            {statusFilter === 'All'
              ? 'You have not submitted applications yet. Browse openings matching your skills to apply.'
              : 'Try selecting a different status filter tab to see your other applications.'}
          </p>
          <button
            onClick={() => setActiveTab('jobs')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            Explore Open Roles
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map(app => {
            const badge = getStatusBadge(app.status);
            const isExpanded = selectedAppId === app.id;

            return (
              <div
                key={app.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-5 shadow-xs transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Company & Role */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-xl ${app.logoBgColor} text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs`}
                    >
                      {app.companyInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900 leading-snug">
                          {app.jobTitle}
                        </h2>
                      </div>
                      {/* Zero-pill metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                        <span className="font-semibold text-slate-800">{app.company}</span>
                        <span aria-hidden="true">·</span>
                        <span>{app.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-blue-700 font-semibold">{app.salary}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge & Actions */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-semibold ${badge.bg}`}
                    >
                      {badge.icon}
                      <span>{app.status}</span>
                    </div>

                    <button
                      onClick={() => handleOpenJobDetails(app.jobId)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Job Details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => withdrawApplication(app.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Withdraw application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Status Progress Pipeline Visualizer */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-slate-700">Application Pipeline</span>
                    <span>Applied on: <strong className="text-slate-800">{app.appliedDate}</strong></span>
                  </div>

                  {/* Stages Bar */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {(['Applied', 'Under Review', 'Shortlisted', 'Final Decision'] as const).map(
                      (stepName, stepIdx) => {
                        let isComplete = false;
                        let isCurrent = false;

                        if (app.status === 'Applied') {
                          if (stepIdx === 0) isCurrent = true;
                        } else if (app.status === 'Under Review') {
                          if (stepIdx === 0) isComplete = true;
                          if (stepIdx === 1) isCurrent = true;
                        } else if (app.status === 'Shortlisted') {
                          if (stepIdx <= 1) isComplete = true;
                          if (stepIdx === 2) isCurrent = true;
                        } else if (app.status === 'Rejected') {
                          if (stepIdx === 0) isComplete = true;
                          if (stepIdx === 3) isCurrent = true;
                        }

                        return (
                          <div key={stepName} className="space-y-1">
                            <div
                              className={`h-1.5 rounded-full ${
                                isCurrent
                                  ? app.status === 'Rejected'
                                    ? 'bg-rose-500'
                                    : 'bg-blue-600'
                                  : isComplete
                                  ? 'bg-emerald-500'
                                  : 'bg-slate-200'
                              }`}
                            />
                            <span
                              className={`text-[11px] block truncate ${
                                isCurrent
                                  ? 'font-bold text-slate-900'
                                  : isComplete
                                  ? 'text-emerald-700 font-medium'
                                  : 'text-slate-400'
                              }`}
                            >
                              {stepName}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Timeline Events / Notes dropdown */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Submitted Resume: <strong className="text-slate-700">{app.resumeFileName}</strong></span>
                  </div>

                  <button
                    onClick={() => setSelectedAppId(isExpanded ? null : app.id)}
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Activity Log' : 'View Activity Log'}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <p className="text-xs font-bold text-slate-800">Recruiter Timeline Updates:</p>
                    <div className="space-y-2 text-xs text-slate-600">
                      {app.timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                          <div>
                            <span className="font-semibold text-slate-800">
                              {event.status} ({event.date}):
                            </span>{' '}
                            <span>{event.note}</span>
                          </div>
                        </div>
                      ))}
                      {app.coverNote && (
                        <div className="pt-2 border-t border-slate-200 text-slate-500 italic">
                          Candidate Note: "{app.coverNote}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
