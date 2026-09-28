import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { Briefcase, User as UserIcon, LogOut, Menu, X, Bookmark, FileText } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, activeTab, setActiveTab, openAuthModal, applications } = useJobContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingApplicationsCount = applications.length;

  const handleNavClick = (tab: 'dashboard' | 'jobs' | 'applications' | 'profile') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-700 transition-colors">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  NextStep
                </span>
                <span className="text-xs text-slate-500 font-normal ml-1.5 hidden sm:inline">
                  Careers
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`py-1 transition-colors border-b-2 ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('jobs')}
              className={`py-1 transition-colors border-b-2 ${
                activeTab === 'jobs'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Find Jobs
            </button>
            <button
              onClick={() => handleNavClick('applications')}
              className={`py-1 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'applications'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Applications</span>
              {pendingApplicationsCount > 0 && (
                <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold tabular-nums">
                  {pendingApplicationsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('profile')}
              className={`py-1 transition-colors border-b-2 ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              My Profile
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2 text-left p-1.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                  title="View Profile"
                >
                  <div className={`w-8 h-8 rounded-full ${user.avatarColor || 'bg-blue-600'} text-white flex items-center justify-center text-xs font-semibold`}>
                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
                      {user.name}
                    </p>
                    <p className="text-slate-500 leading-tight truncate max-w-[120px]">
                      {user.experienceLevel}
                    </p>
                  </div>
                </button>

                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Log out"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-blue-600 transition-colors whitespace-nowrap"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            {user && (
              <button
                onClick={() => handleNavClick('profile')}
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold"
              >
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavClick('jobs')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'jobs' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Find Jobs
          </button>
          <button
            onClick={() => handleNavClick('applications')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
              activeTab === 'applications' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Applications</span>
            {pendingApplicationsCount > 0 && (
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold tabular-nums">
                {pendingApplicationsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleNavClick('profile')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            My Profile
          </button>

          <div className="pt-3 border-t border-slate-100">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-rose-600 font-medium px-2 py-1 border border-rose-200 rounded hover:bg-rose-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full py-2 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('register');
                  }}
                  className="w-full py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
