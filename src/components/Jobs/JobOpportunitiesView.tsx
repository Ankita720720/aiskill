import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  Search,
  Filter,
  Sparkles,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Send,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  TrendingUp,
  Zap,
  Check,
  X,
  ShieldCheck,
  ArrowRight,
  Flame,
  Calendar,
} from 'lucide-react';
import { JobOpportunity, UserProfile, JobApplicationSubmission } from '../../types';
import { initialJobOpportunities } from '../../data/initialData';
import { useTheme } from '../../context/ThemeContext';
import { DirectApplyModal } from './DirectApplyModal';
import { Mail } from 'lucide-react';

interface JobOpportunitiesViewProps {
  user: UserProfile;
  onNavigateTab: (tab: string) => void;
  onStartInterviewPrep?: (role: string) => void;
  onOpenEmailAutomations?: (taskType?: 'daily_jobs' | 'daily_interview_questions') => void;
}

export const JobOpportunitiesView: React.FC<JobOpportunitiesViewProps> = ({
  user,
  onNavigateTab,
  onStartInterviewPrep,
  onOpenEmailAutomations,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  // Jobs state
  const [jobs, setJobs] = useState<JobOpportunity[]>(initialJobOpportunities);
  const [activeFilterTab, setActiveFilterTab] = useState<
    'all' | 'today' | 'yesterday' | 'this-week' | 'applied' | 'saved'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'match' | 'newest' | 'salary'>('match');

  // Modal & Detail Drawer State
  const [applyingJob, setApplyingJob] = useState<JobOpportunity | null>(null);
  const [selectedJobDetail, setSelectedJobDetail] = useState<JobOpportunity | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotification, setRefreshNotification] = useState<string>('');

  // Handle Refresh (Simulate Real-Time Day to Day Updates)
  const handleFetchDayToDayUpdates = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshNotification('Scraped 2 new day-to-day AI roles from Y Combinator & LinkedIn Jobs!');

      // Add a newly posted simulated role
      const freshJob: JobOpportunity = {
        id: `job-fresh-${Date.now()}`,
        title: 'Founding AI & Deep Learning Engineer',
        company: 'Perception Labs (YC W26)',
        companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
        location: 'San Francisco, CA (Remote OK)',
        workplaceType: 'Remote',
        employmentType: 'Full-time',
        salary: '$160,000 - $210,000 + 1.5% Equity',
        postedDate: 'Just Now (5 mins ago)',
        postedDayCategory: 'today',
        experienceLevel: 'Mid Level',
        matchScore: 94,
        matchLevel: 'Top Match',
        description: 'Design autonomous multi-agent reasoning graphs and deploy sub-second LLM inference servers in Python and PyTorch.',
        responsibilities: [
          'Build low-latency agentic execution loops',
          'Deploy optimized models with Docker & TensorRT',
          'Design vector similarity search indexes',
        ],
        requiredSkills: ['Python', 'PyTorch', 'FastAPI', 'System Design', 'Docker'],
        matchedSkills: ['Python', 'FastAPI', 'Docker'],
        missingSkills: ['TensorRT'],
        applicationDeadline: 'Sep 25, 2026',
        isEasyApply: true,
        applicantsCount: 6,
        status: 'not_applied',
      };

      setJobs((prev) => [freshJob, ...prev]);

      setTimeout(() => setRefreshNotification(''), 4000);
    }, 1000);
  };

  // Toggle Save Job
  const handleToggleSave = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              status: j.status === 'saved' ? 'not_applied' : 'saved',
            }
          : j
      )
    );
  };

  // Handle Successful Direct Application
  const handleApplySuccess = (jobId: string, submission: JobApplicationSubmission) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              status: 'applied',
              appliedAt: submission.appliedDate,
              applicantsCount: j.applicantsCount + 1,
            }
          : j
      )
    );
    setRefreshNotification(`Direct application submitted to ${jobs.find((j) => j.id === jobId)?.company}!`);
    setTimeout(() => setRefreshNotification(''), 4000);
  };

  // Filter and Sort Jobs
  const filteredJobs = jobs
    .filter((job) => {
      // Tab filter
      if (activeFilterTab === 'today' && job.postedDayCategory !== 'today') return false;
      if (activeFilterTab === 'yesterday' && job.postedDayCategory !== 'yesterday') return false;
      if (activeFilterTab === 'this-week' && job.postedDayCategory !== 'this-week') return false;
      if (activeFilterTab === 'applied' && job.status !== 'applied') return false;
      if (activeFilterTab === 'saved' && job.status !== 'saved') return false;

      // Workplace filter
      if (selectedWorkplace !== 'All' && job.workplaceType !== selectedWorkplace) return false;

      // Experience filter
      if (selectedExperience !== 'All' && job.experienceLevel !== selectedExperience) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesLocation = job.location.toLowerCase().includes(q);
        const matchesSkills = job.requiredSkills.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesSkills) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'salary') return b.salary.localeCompare(a.salary);
      return 0; // default order is newest
    });

  const todayJobsCount = jobs.filter((j) => j.postedDayCategory === 'today').length;
  const appliedJobsCount = jobs.filter((j) => j.status === 'applied').length;
  const highMatchCount = jobs.filter((j) => j.matchScore >= 80).length;

  return (
    <div className="space-y-6">
      {/* Header & Live Job Stream Bar */}
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shadow-2xs">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Job Opportunities &amp; Openings
                </h1>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
                  <span>{todayJobsCount} New Today</span>
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-0.5`}>
                Day-to-day curated tech roles aligned with your <strong>SkillTwin AI Profile ({user.readinessScore}% Match)</strong>. Direct apply in 1 click.
              </p>
            </div>
          </div>
        </div>

        {/* Live Scraper & 12 PM Auto-Email Action */}
        <div className="flex items-center gap-2 flex-wrap">
          {onOpenEmailAutomations && (
            <button
              onClick={() => onOpenEmailAutomations('daily_jobs')}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white flex items-center gap-2 transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>12 PM Auto-Email Digest</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            </button>
          )}

          <button
            onClick={handleFetchDayToDayUpdates}
            disabled={isRefreshing}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all shadow-2xs ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Checking Latest Openings...' : 'Fetch Day-to-Day Updates'}</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {refreshNotification && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-2xl text-xs flex items-center justify-between shadow-xs font-medium"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>{refreshNotification}</span>
            </div>
            <button onClick={() => setRefreshNotification('')} className="text-indigo-400 hover:text-indigo-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Day to Day Filtering Tabs & Search Strip */}
      <div
        className={`p-4 rounded-2xl border space-y-3 ${
          isLight ? 'bg-white border-slate-200/90 shadow-2xs' : 'bg-slate-900/90 border-slate-800'
        }`}
      >
        {/* Timeline Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveFilterTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilterTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : isLight
                  ? 'text-slate-600 hover:bg-slate-100'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              All Openings ({jobs.length})
            </button>

            <button
              onClick={() => setActiveFilterTab('today')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeFilterTab === 'today'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : isLight
                  ? 'text-slate-700 bg-rose-50/70 border border-rose-200/60 hover:bg-rose-100'
                  : 'text-rose-300 bg-rose-950/40 border border-rose-900/60 hover:bg-rose-900/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>New Today ({todayJobsCount})</span>
            </button>

            <button
              onClick={() => setActiveFilterTab('applied')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeFilterTab === 'applied'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : isLight
                  ? 'text-slate-600 hover:bg-slate-100'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Send className="w-3 h-3 text-indigo-500" />
              <span>Applied ({appliedJobsCount})</span>
            </button>

            <button
              onClick={() => setActiveFilterTab('saved')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                activeFilterTab === 'saved'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : isLight
                  ? 'text-slate-600 hover:bg-slate-100'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-3 h-3 text-amber-500" />
              <span>Saved ({jobs.filter((j) => j.status === 'saved').length})</span>
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold border focus:outline-none ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
              }`}
            >
              <option value="match">Highest Match</option>
              <option value="newest">Newest First</option>
              <option value="salary">Compensation</option>
            </select>
          </div>
        </div>

        {/* Search and Secondary Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by role, skill (e.g. PyTorch, SQL), company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  : 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600'
              }`}
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedWorkplace}
              onChange={(e) => setSelectedWorkplace(e.target.value)}
              className={`w-full px-3 py-1.5 text-xs rounded-xl border focus:outline-none ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
              }`}
            >
              <option value="All">All Locations (Remote/Hybrid/On-site)</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className={`w-full px-3 py-1.5 text-xs rounded-xl border focus:outline-none ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
              }`}
            >
              <option value="All">All Experience Levels</option>
              <option value="Entry Level">Entry Level / Graduate</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Job Cards List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isApplied = job.status === 'applied';
            const isSaved = job.status === 'saved';

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-3xl border transition-all duration-200 ${
                  isLight
                    ? 'bg-white border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md'
                    : 'bg-slate-900 border-slate-800 hover:border-indigo-800/80 shadow-md'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  {/* Left Column: Logo & Main Details */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shadow-xs shrink-0"
                    />

                    <div className="space-y-2 flex-1 min-w-0">
                      <div>
                        {/* Tags Strip */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">
                            {job.company}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              job.postedDayCategory === 'today'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            <Clock className="w-2.5 h-2.5 inline mr-1" />
                            {job.postedDate}
                          </span>

                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {job.workplaceType}
                          </span>

                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {job.employmentType}
                          </span>

                          {isApplied && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Applied on {job.appliedAt || 'Aug 21'}</span>
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className={`text-base sm:text-lg font-bold mt-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {job.title}
                        </h3>
                      </div>

                      {/* Salary & Location Info */}
                      <div className={`flex flex-wrap items-center gap-4 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <span className="font-bold text-emerald-600 flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                          {job.location}
                        </span>
                        <span className="text-slate-400">
                          {job.applicantsCount} applicants
                        </span>
                      </div>

                      {/* Brief description */}
                      <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'} line-clamp-2 leading-relaxed`}>
                        {job.description}
                      </p>

                      {/* Skills Matching Breakdown */}
                      <div className="pt-2 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-[10px] font-bold uppercase ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                            Matched Skills:
                          </span>
                          {job.matchedSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1"
                            >
                              <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                              {skill}
                            </span>
                          ))}

                          {job.missingSkills.length > 0 && (
                            <>
                              <span className={`text-[10px] font-bold uppercase ml-2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                                Skill Gaps:
                              </span>
                              {job.missingSkills.map((skill) => (
                                <button
                                  key={skill}
                                  onClick={() => onNavigateTab('learning-path')}
                                  title="Click to study in Learning Path"
                                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 flex items-center gap-1"
                                >
                                  <span>{skill}</span>
                                  <span className="text-[9px] text-amber-600">→ Learn</span>
                                </button>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Match Score & Direct Apply CTA */}
                  <div className={`lg:w-56 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-5 space-y-4 ${
                    isLight ? 'border-slate-100' : 'border-slate-800'
                  }`}>
                    {/* Skill Twin Match Ring */}
                    <div
                      className={`p-3 rounded-2xl border flex items-center justify-between ${
                        job.matchScore >= 85
                          ? isLight
                            ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-900'
                            : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                          : isLight
                          ? 'bg-indigo-50/80 border-indigo-200/80 text-indigo-900'
                          : 'bg-indigo-950/30 border-indigo-800/50 text-indigo-300'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider block">
                          Twin Match
                        </span>
                        <span className="text-xl font-black">{job.matchScore}%</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border shadow-2xs">
                        {job.matchLevel}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {isApplied ? (
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center text-xs font-bold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Application Sent</span>
                        </div>
                      ) : (
                        <button
                          id={`btn-apply-${job.id}`}
                          onClick={() => {
                            if (job.isEasyApply) {
                              setApplyingJob(job);
                            } else if (job.externalUrl) {
                              window.open(job.externalUrl, '_blank');
                            }
                          }}
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.01]"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{job.isEasyApply ? '1-Click Direct Apply' : 'Apply on Company Site'}</span>
                        </button>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedJobDetail(job)}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                            isLight
                              ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                          }`}
                        >
                          Role Details
                        </button>

                        <button
                          onClick={() => handleToggleSave(job.id)}
                          title={isSaved ? 'Remove from Saved' : 'Save Job'}
                          className={`p-2 rounded-xl border transition-colors ${
                            isSaved
                              ? 'bg-amber-50 border-amber-300 text-amber-600'
                              : isLight
                              ? 'bg-slate-50 hover:bg-slate-100 text-slate-400 border-slate-200'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                          }`}
                        >
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <p className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
              No job opportunities match your active filters.
            </p>
            <button
              onClick={() => {
                setActiveFilterTab('all');
                setSearchQuery('');
                setSelectedWorkplace('All');
                setSelectedExperience('All');
              }}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset Filters &amp; View All Openings
            </button>
          </div>
        )}
      </div>

      {/* Direct 1-Click Application Modal */}
      <DirectApplyModal
        job={applyingJob}
        user={user}
        isOpen={!!applyingJob}
        onClose={() => setApplyingJob(null)}
        onApplySuccess={handleApplySuccess}
      />

      {/* Job Details Modal / Drawer */}
      {selectedJobDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-8 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div
              className={`p-6 border-b flex items-start justify-between ${
                isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={selectedJobDetail.companyLogo}
                  alt={selectedJobDetail.company}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                />
                <div>
                  <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {selectedJobDetail.title}
                  </h3>
                  <p className="text-xs text-indigo-600 font-bold mt-0.5">
                    {selectedJobDetail.company} • {selectedJobDetail.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJobDetail(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto scrollbar-thin">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Salary Range</span>
                  <p className="text-xs font-black text-emerald-600 mt-0.5">{selectedJobDetail.salary}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Workplace</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedJobDetail.workplaceType}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Deadline</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedJobDetail.applicationDeadline}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Role Overview
                </h4>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'} leading-relaxed`}>
                  {selectedJobDetail.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Key Responsibilities
                </h4>
                <ul className="space-y-1.5">
                  {selectedJobDetail.responsibilities.map((resp, idx) => (
                    <li key={idx} className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'} flex items-start gap-2`}>
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Skill Competency Match
                </h4>
                <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/40 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Overall Match Alignment</span>
                    <span className="text-indigo-600">{selectedJobDetail.matchScore}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${selectedJobDetail.matchScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 border-t flex items-center justify-end gap-3 ${
              isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-950 border-slate-800'
            }`}>
              <button
                onClick={() => setSelectedJobDetail(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const toApply = selectedJobDetail;
                  setSelectedJobDetail(null);
                  setApplyingJob(toApply);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Proceed to Apply
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
