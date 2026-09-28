/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { JobProvider, useJobContext } from './context/JobContext';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { JobsView } from './components/JobsView';
import { ApplicationsView } from './components/ApplicationsView';
import { ProfileView } from './components/ProfileView';
import { JobDetailsModal } from './components/JobDetailsModal';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';
import { Briefcase, Heart, ExternalLink, ShieldCheck } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useJobContext();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'jobs' && <JobsView />}
        {activeTab === 'applications' && <ApplicationsView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Global Modals & Notifications */}
      <JobDetailsModal />
      <AuthModal />
      <NotificationToast />

      {/* Quiet, Professional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-800">NextStep Careers</span>
              <span aria-hidden="true">·</span>
              <span>Online Job Portal for Students & Professionals</span>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="hover:text-slate-900 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className="hover:text-slate-900 transition-colors"
              >
                Find Jobs
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className="hover:text-slate-900 transition-colors"
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className="hover:text-slate-900 transition-colors"
              >
                Profile & Resume
              </button>
            </div>

            <p className="text-slate-400">
              © {new Date().getFullYear()} NextStep Job Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <JobProvider>
      <MainContent />
    </JobProvider>
  );
}
