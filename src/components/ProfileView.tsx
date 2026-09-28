import React, { useState, useEffect } from 'react';
import { useJobContext } from '../context/JobContext';
import {
  User as UserIcon,
  GraduationCap,
  Briefcase,
  FileText,
  Upload,
  Plus,
  X,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Download,
  Eye,
  AlertCircle
} from 'lucide-react';
import { ExperienceLevel } from '../types/job';

const COMMON_SKILLS_RECOMMENDATIONS = [
  'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'SQL',
  'Node.js', 'HTML/CSS', 'Git', 'AWS', 'Docker', 'Figma', 'Data Structures', 'Spring Boot'
];

export const ProfileView: React.FC = () => {
  const { user, updateUserProfile, uploadResume, openAuthModal, showToast } = useJobContext();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(user?.experienceLevel || 'Fresher / Entry');
  const [experienceSummary, setExperienceSummary] = useState(user?.experienceSummary || '');

  // Education
  const [degree, setDegree] = useState(user?.education.degree || '');
  const [institution, setInstitution] = useState(user?.education.institution || '');
  const [graduationYear, setGraduationYear] = useState(user?.education.graduationYear || '2026');
  const [cgpaOrGrade, setCgpaOrGrade] = useState(user?.education.cgpaOrGrade || '');

  // Skills
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Resume preview state
  const [showResumePreview, setShowResumePreview] = useState(false);

  // Sync state if user changes in context
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setLocation(user.location);
      setHeadline(user.headline);
      setExperienceLevel(user.experienceLevel);
      setExperienceSummary(user.experienceSummary);
      setDegree(user.education.degree);
      setInstitution(user.education.institution);
      setGraduationYear(user.education.graduationYear);
      setCgpaOrGrade(user.education.cgpaOrGrade || '');
      setSkills(user.skills || []);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
        <UserIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800 mb-1">User Profile Access</h2>
        <p className="text-xs text-slate-500 mb-5">
          Please log in or register to manage your personal details, education, skills, and resume.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const handleAddSkill = (skillToAdd?: string) => {
    const skill = (skillToAdd || newSkillInput).trim();
    if (!skill) return;

    if (skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      showToast(`Skill "${skill}" is already added.`, 'info');
      setNewSkillInput('');
      return;
    }

    setSkills([...skills, skill]);
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleKeyDownSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Read or simulate resume content
    const reader = new FileReader();
    reader.onload = () => {
      const textSample = `Resume File: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB\nLast Modified: ${new Date(file.lastModified).toLocaleDateString()}\nApplicant: ${name}\nSkills: ${skills.join(', ')}`;
      uploadResume(file.name, textSample);
    };
    reader.readAsText(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    updateUserProfile({
      name,
      email,
      phone,
      location,
      headline,
      experienceLevel,
      experienceSummary,
      skills,
      education: {
        degree,
        institution,
        graduationYear,
        cgpaOrGrade
      }
    });
  };

  const downloadSimulatedResume = () => {
    const content = user.resumeFileContent || `Resume for ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nDegree: ${degree} (${institution})\nSkills: ${skills.join(', ')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = user.resumeFileName || 'Resume.txt';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Resume downloaded to your device.', 'info');
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full ${user.avatarColor || 'bg-blue-600'} text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-sm`}
          >
            {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">{name}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{headline || 'Job Seeker Profile'}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {location || 'India'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-blue-700">{experienceLevel}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors whitespace-nowrap self-start sm:self-center"
        >
          Save All Changes
        </button>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* 1. Personal & Contact Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <UserIcon className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Personal & Contact Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Professional Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                placeholder="e.g. B.Tech CS Student | React & Python Enthusiast"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Location (City, Country)
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. Bangalore, India"
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Resume Management Section (Upload and update resume) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Resume / Curriculum Vitae
              </h2>
            </div>

            {user.resumeFileName && (
              <span className="text-xs text-slate-500">
                Last updated: <strong className="text-slate-800">{user.resumeUpdatedDate || 'Recent'}</strong>
              </span>
            )}
          </div>

          {user.resumeFileName ? (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{user.resumeFileName}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Attached and ready for automatic 1-click job submissions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowResumePreview(!showResumePreview)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showResumePreview ? 'Hide Preview' : 'Preview'}</span>
                </button>

                <button
                  type="button"
                  onClick={downloadSimulatedResume}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>

                <label className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Update Resume</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-800">No resume attached yet</p>
              <p className="text-xs text-slate-500 mb-4">
                Upload your resume (PDF, DOCX, or TXT) to apply for jobs directly
              </p>
              <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg cursor-pointer inline-flex items-center gap-1.5 shadow-sm">
                <Upload className="w-4 h-4" />
                <span>Upload Resume</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Inline Resume Viewer Box */}
          {showResumePreview && user.resumeFileName && (
            <div className="mt-3 p-4 bg-white border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
                <span className="font-bold text-slate-800">Document Text Preview</span>
                <button
                  type="button"
                  onClick={() => setShowResumePreview(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-700 bg-slate-50 p-3 rounded overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-48">
                {user.resumeFileContent || 'Candidate Resume Details'}
              </pre>
            </div>
          )}
        </div>

        {/* 3. Education Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Educational Qualifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Degree / Course *
              </label>
              <input
                type="text"
                required
                value={degree}
                onChange={e => setDegree(e.target.value)}
                placeholder="e.g. B.Tech Computer Science, BCA, MCA"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College / University *
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={e => setInstitution(e.target.value)}
                placeholder="e.g. National Institute of Technology (NIT)"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Graduation Passing Year
              </label>
              <input
                type="text"
                value={graduationYear}
                onChange={e => setGraduationYear(e.target.value)}
                placeholder="e.g. 2026"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CGPA / Percentage
              </label>
              <input
                type="text"
                value={cgpaOrGrade}
                onChange={e => setCgpaOrGrade(e.target.value)}
                placeholder="e.g. 8.8 / 10 CGPA or 85%"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 4. Experience & Career Stage */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Experience Level & Background
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Experience Bracket *
              </label>
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer"
              >
                <option value="Fresher / Entry">Fresher / Student (0-1 yrs)</option>
                <option value="1-3 years">1 - 3 years experience</option>
                <option value="3-5 years">3 - 5 years experience</option>
                <option value="5+ years">5+ years (Senior / Lead)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Experience / Projects Summary
              </label>
              <textarea
                rows={3}
                value={experienceSummary}
                onChange={e => setExperienceSummary(e.target.value)}
                placeholder="Briefly describe your internship projects, academic coursework, or previous companies..."
                className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 5. Skills Management */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Skills & Technical Proficiencies
            </h2>
            <span className="text-xs text-slate-500 tabular-nums font-semibold">
              {skills.length} skills added
            </span>
          </div>

          {/* Current Skills list (interactive buttons/chips) */}
          <div className="flex flex-wrap items-center gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-md border border-slate-200 transition-colors"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-slate-400 hover:text-rose-600 p-0.5 rounded"
                  title={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Add custom skill input */}
          <div className="flex items-center gap-2 max-w-md pt-2">
            <input
              type="text"
              value={newSkillInput}
              onChange={e => setNewSkillInput(e.target.value)}
              onKeyDown={handleKeyDownSkill}
              placeholder="Add skill (e.g. Next.js, Redux, C++)"
              className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleAddSkill()}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Suggested skills quick-add */}
          <div className="pt-2">
            <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
              Click to quickly add trending skills:
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {COMMON_SKILLS_RECOMMENDATIONS.filter(
                s => !skills.some(existing => existing.toLowerCase() === s.toLowerCase())
              ).map(suggested => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => handleAddSkill(suggested)}
                  className="text-[11px] px-2 py-0.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 rounded transition-colors"
                >
                  + {suggested}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save button bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
          >
            Save Profile Information
          </button>
        </div>
      </form>
    </div>
  );
};
