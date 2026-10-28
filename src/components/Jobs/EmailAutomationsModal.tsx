import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Clock,
  Send,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Building2,
  MapPin,
  DollarSign,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Eye,
  FileText,
  Code2,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Play,
  Pause,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  BookOpen,
} from 'lucide-react';
import {
  RecurringEmailTask,
  CuratedJobRole,
  DailyInterviewTopicSet,
  UserProfile,
} from '../../types';
import {
  initialRecurringTasks,
  sampleIndiaJobOpenings,
  todayInterviewQuestionsPack,
} from '../../data/emailTasksData';
import { useTheme } from '../../context/ThemeContext';

interface EmailAutomationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  initialActiveTask?: 'daily_jobs' | 'daily_interview_questions';
}

export const EmailAutomationsModal: React.FC<EmailAutomationsModalProps> = ({
  isOpen,
  onClose,
  user,
  initialActiveTask = 'daily_jobs',
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  // Tasks state
  const [tasks, setTasks] = useState<RecurringEmailTask[]>(initialRecurringTasks);
  const [activeTab, setActiveTab] = useState<'daily_jobs' | 'daily_interview_questions'>(
    initialActiveTask
  );

  // Preview & Interactive state
  const [showEmailPreviewModal, setShowEmailPreviewModal] = useState(false);
  const [previewContent, setPreviewContent] = useState<{
    subject: string;
    sender: string;
    recipient: string;
    timeLabel: string;
    type: 'jobs' | 'interview';
  } | null>(null);

  // Manual Trigger Simulation
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [emailSentAlert, setEmailSentAlert] = useState<string | null>(null);

  // Copy helper
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedJobForOutreach, setSelectedJobForOutreach] = useState<CuratedJobRole | null>(
    sampleIndiaJobOpenings[0]
  );
  const [activeQuestionCategory, setActiveQuestionCategory] = useState<string>('All');

  if (!isOpen) return null;

  const currentTask = tasks.find((t) => t.type === activeTab) || tasks[0];

  // Toggle Task Active/Paused
  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextActive = !t.isActive;
          return {
            ...t,
            isActive: nextActive,
            nextScheduledRun: nextActive
              ? t.type === 'daily_jobs'
                ? 'Today / Tomorrow at 12:00 PM IST'
                : 'Today / Tomorrow at 6:00 PM IST'
              : 'Paused (Will not dispatch)',
          };
        }
        return t;
      })
    );
  };

  // Trigger Send Now (Instant Email simulation)
  const handleTriggerSendNow = (taskType: 'daily_jobs' | 'daily_interview_questions') => {
    setIsSendingTestEmail(true);
    setTimeout(() => {
      setIsSendingTestEmail(false);
      const recipient = user.email || 'ankitachintakindi@gmail.com';
      const subject =
        taskType === 'daily_jobs'
          ? '🚀 [12:00 PM Digest] Fresh Associate Software Engineer Openings (0–2 Yrs) + LinkedIn Outreach'
          : '📚 [6:00 PM Digest] Top Most Repeated Associate SDE Interview Questions & Model Answers';

      setEmailSentAlert(
        `Success! Dispatched live simulated email to ${recipient}. Check the preview below!`
      );

      // Update total dispatches
      setTasks((prev) =>
        prev.map((t) =>
          t.type === taskType
            ? {
                ...t,
                totalEmailsDispatched: t.totalEmailsDispatched + 1,
                lastSentDate: 'Just Now',
              }
            : t
        )
      );

      setTimeout(() => setEmailSentAlert(null), 5000);
    }, 1200);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredQuestions =
    activeQuestionCategory === 'All'
      ? todayInterviewQuestionsPack.questions
      : todayInterviewQuestionsPack.questions.filter((q) =>
          q.category.toLowerCase().includes(activeQuestionCategory.toLowerCase())
        );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className={`w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between ${
            isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">
                  Automated Daily Email Workflows
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  CRON Active (IST)
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Delivering curated Associate Software Engineer opportunities at 12 PM & interview packs at 6 PM to{' '}
                <span className="font-semibold text-indigo-600">{user.email || 'ankitachintakindi@gmail.com'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
              isLight
                ? 'border-slate-200 text-slate-500 hover:bg-slate-100'
                : 'border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            ✕ Close
          </button>
        </div>

        {/* Top Workflow Switcher Tabs */}
        <div className={`px-6 pt-4 pb-2 border-b flex items-center justify-between gap-4 flex-wrap ${isLight ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-900'}`}>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('daily_jobs')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'daily_jobs'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>1️⃣ 12:00 PM Daily Job Openings</span>
              {tasks[0].isActive ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-400" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('daily_interview_questions')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'daily_interview_questions'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>2️⃣ 6:00 PM Most Repeated Interview Questions</span>
              {tasks[1].isActive ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-400" />
              )}
            </button>
          </div>

          {/* Quick Trigger Test Email */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTriggerSendNow(activeTab)}
              disabled={isSendingTestEmail}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
            >
              {isSendingTestEmail ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>{isSendingTestEmail ? 'Sending...' : 'Send Test Digest Now'}</span>
            </button>
          </div>
        </div>

        {/* Sent Alert Banner */}
        {emailSentAlert && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{emailSentAlert}</span>
            </div>
            <span className="text-[10px] text-emerald-700 uppercase font-extrabold tracking-wider">
              Dispatched to Inbox
            </span>
          </div>
        )}

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TASK 1: 12:00 PM DAILY JOBS */}
          {activeTab === 'daily_jobs' && (
            <div className="space-y-6">
              {/* Task Configuration Card */}
              <div
                className={`p-5 rounded-3xl border shadow-xs ${
                  isLight ? 'bg-indigo-50/40 border-indigo-100' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-indigo-100/60 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">
                        Daily Schedule: Every Day at 12:00 PM IST
                      </h3>
                      <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        Automated web search scraping fresh Associate Software Engineer roles across India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-indigo-600">
                        {currentTask.isActive ? 'Status: Active & Scheduled' : 'Status: Paused'}
                      </p>
                      <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Next Run: {currentTask.nextScheduledRun}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleTaskStatus(currentTask.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                        currentTask.isActive
                          ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {currentTask.isActive ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Task</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Resume Daily Task</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Filter & Criteria Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
                  <div className={`p-3 rounded-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Target Roles</span>
                    <span className="font-bold text-indigo-600">Associate Software Engineer (ASE)</span>
                  </div>
                  <div className={`p-3 rounded-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Experience Required</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">0–2 Years (Freshers/Grads)</span>
                  </div>
                  <div className={`p-3 rounded-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Geographies Covered</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">India (Remote + On-site / Hubs)</span>
                  </div>
                  <div className={`p-3 rounded-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Company Tier</span>
                    <span className="font-bold text-emerald-600">Product-based & Top Startups</span>
                  </div>
                </div>
              </div>

              {/* Sample 12 PM Email Output & LinkedIn Outreach Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">
                      Today’s 12:00 PM Curated Openings & Outreach Templates ({sampleIndiaJobOpenings.length} Positions)
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                      Auto-Compiled Digest
                    </span>
                  </div>
                  <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Includes 1-Click LinkedIn Outreach generator
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleIndiaJobOpenings.map((job) => (
                    <div
                      key={job.id}
                      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                        isLight ? 'bg-white border-slate-200/90 shadow-2xs hover:shadow-md' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Top: Logo & Title */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={job.companyLogo}
                              alt={job.companyName}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                            />
                            <div>
                              <h4 className="text-sm font-bold leading-snug">{job.roleTitle}</h4>
                              <p className="text-xs font-semibold text-indigo-600">{job.companyName}</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200 whitespace-nowrap">
                            {job.workplaceType}
                          </span>
                        </div>

                        {/* Location & Experience */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                            {job.experienceRange}
                          </span>
                        </div>

                        {/* Salary & Deadline */}
                        <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                        }`}>
                          <span className="text-emerald-600 font-bold">{job.salaryRange}</span>
                          <span className="text-[11px] text-slate-500">Deadline: {job.applicationDeadline}</span>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tech Stack:</span>
                          <div className="flex flex-wrap gap-1">
                            {job.techStack.map((tech) => (
                              <span
                                key={tech}
                                className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                                  isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} line-clamp-2 leading-relaxed`}>
                          {job.description}
                        </p>
                      </div>

                      {/* Action Buttons: Apply + LinkedIn Message */}
                      <div className="pt-4 border-t mt-4 flex items-center justify-between gap-2 border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => setSelectedJobForOutreach(job)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>LinkedIn Message</span>
                        </button>

                        <a
                          href={job.directApplyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          <span>Direct Apply</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LinkedIn Message Modal Drawer / Inline Preview */}
              {selectedJobForOutreach && (
                <div
                  className={`p-5 rounded-3xl border shadow-sm space-y-3 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        Personalized LinkedIn Recruiter Outreach for {selectedJobForOutreach.companyName} ({selectedJobForOutreach.roleTitle})
                      </h4>
                    </div>
                    <button
                      onClick={() =>
                        handleCopyText(
                          selectedJobForOutreach.linkedInOutreachTemplate,
                          selectedJobForOutreach.id
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      {copiedId === selectedJobForOutreach.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message Template</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className={`p-4 rounded-2xl border font-mono text-xs whitespace-pre-wrap leading-relaxed ${
                    isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}>
                    {selectedJobForOutreach.linkedInOutreachTemplate}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TASK 2: 6:00 PM DAILY INTERVIEW QUESTIONS */}
          {activeTab === 'daily_interview_questions' && (
            <div className="space-y-6">
              {/* Task Configuration Card */}
              <div
                className={`p-5 rounded-3xl border shadow-xs ${
                  isLight ? 'bg-indigo-50/40 border-indigo-100' : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-indigo-100/60 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">
                        Daily Schedule: Every Day at 6:00 PM IST
                      </h3>
                      <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        5–10 highly repeated Associate SDE interview questions with model answers, DSA code, & HR tips
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-indigo-600">
                        {tasks[1].isActive ? 'Status: Active & Scheduled' : 'Status: Paused'}
                      </p>
                      <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Next Run: {tasks[1].nextScheduledRun}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleTaskStatus(tasks[1].id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                        tasks[1].isActive
                          ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {tasks[1].isActive ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Task</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Resume Daily Task</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Topics Track Badges */}
                <div className="space-y-1.5 pt-4">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    Topics Included in Daily 6 PM Email Digest:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {todayInterviewQuestionsPack.focusAreas.map((topic) => (
                      <span
                        key={topic}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${
                          isLight
                            ? 'bg-white border-slate-200 text-indigo-700'
                            : 'bg-slate-900 border-slate-700 text-indigo-300'
                        }`}
                      >
                        ✓ {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['All', 'HR & Behavioral', 'Data Structures', 'OOPS', 'DBMS', 'System Design', 'Core Java'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveQuestionCategory(cat)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        activeQuestionCategory === cat
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              {/* Question Model Answer Cards */}
              <div className="space-y-4">
                {filteredQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border space-y-4 ${
                      isLight ? 'bg-white border-slate-200/90 shadow-2xs' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-800">
                            Q{idx + 1} • {q.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            🔥 {q.frequency}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      <button
                        onClick={() =>
                          handleCopyText(
                            `Question: ${q.question}\n\nModel Answer:\n${q.modelAnswer}${
                              q.codeExample ? `\n\nCode Example:\n${q.codeExample.code}` : ''
                            }`,
                            q.id
                          )
                        }
                        className="p-2 rounded-xl border text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 shrink-0"
                        title="Copy question and answer"
                      >
                        {copiedId === q.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Model Answer Body */}
                    <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}>
                      <span className="font-bold text-indigo-600 block mb-1">
                        Model Answer & Key Explanation:
                      </span>
                      <p className="whitespace-pre-wrap">{q.modelAnswer}</p>
                    </div>

                    {/* Code Example if applicable */}
                    {q.codeExample && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-500 flex items-center gap-1.5">
                            <Code2 className="w-4 h-4 text-indigo-600" />
                            <span>Practical Coding Implementation ({q.codeExample.language})</span>
                          </span>
                        </div>
                        <pre className={`p-4 rounded-2xl border font-mono text-xs overflow-x-auto ${
                          isLight ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-slate-950 text-slate-100 border-slate-800'
                        }`}>
                          {q.codeExample.code}
                        </pre>
                      </div>
                    )}

                    {/* Key Interviewer Takeaways */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Interviewer Assessment Tips:
                      </span>
                      <div className="space-y-1">
                        {q.keyTakeaways.map((tip, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
          }`}
        >
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              All email dispatches are scheduled via cron and delivered to <strong>{user.email || 'ankitachintakindi@gmail.com'}</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
