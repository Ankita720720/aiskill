import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileBarChart2,
  Download,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Building2,
} from 'lucide-react';
import { UserProfile, JobMatch } from '../../types';
import { initialJobMatches } from '../../data/initialData';
import { useTheme } from '../../context/ThemeContext';

interface ReportsViewProps {
  user: UserProfile;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ user }) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');

  const handleDownloadReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportMessage('SkillTwin Career Intelligence Report generated & downloaded successfully!');
      setTimeout(() => setExportMessage(''), 3500);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Reports &amp; Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Career Intelligence
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            Detailed insights about your skills, gap prioritization, and AI placement readiness.
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          disabled={isExporting}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all"
        >
          {isExporting ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          <span>{isExporting ? 'Generating PDF...' : 'Download Report'}</span>
        </button>
      </div>

      {exportMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 font-medium"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{exportMessage}</span>
        </motion.div>
      )}

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Skill Gap Analysis */}
        <div
          className={`lg:col-span-4 rounded-3xl p-5 border space-y-4 flex flex-col justify-between shadow-xs ${
            isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="space-y-4">
            <div className={`pb-2 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Skill Gap Analysis</h3>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Benchmarked against {user.role} requirements</p>
            </div>

            {/* Critical Missing Skills */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Missing Skills (Critical)
              </span>
              <div className="space-y-1.5 pl-3">
                <div className={`flex items-center justify-between text-xs p-2.5 rounded-xl border ${
                  isLight ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                }`}>
                  <span className="font-semibold">Machine Learning Advanced</span>
                  <span className="font-bold text-[10px]">Priority 1</span>
                </div>
                <div className={`flex items-center justify-between text-xs p-2.5 rounded-xl border ${
                  isLight ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                }`}>
                  <span className="font-semibold">Deep Learning (PyTorch)</span>
                  <span className="font-bold text-[10px]">Priority 2</span>
                </div>
                <div className={`flex items-center justify-between text-xs p-2.5 rounded-xl border ${
                  isLight ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                }`}>
                  <span className="font-semibold">Docker Containerization</span>
                  <span className="font-bold text-[10px]">Priority 3</span>
                </div>
              </div>
            </div>

            {/* Weak Skills (Major) */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Weak Skills (Major)
              </span>
              <div className="space-y-1.5 pl-3">
                <div className={`flex items-center justify-between text-xs p-2.5 rounded-xl border ${
                  isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                }`}>
                  <span className="font-semibold">SQL Query Optimization</span>
                  <span className="font-bold text-[10px]">61% score</span>
                </div>
                <div className={`flex items-center justify-between text-xs p-2.5 rounded-xl border ${
                  isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                }`}>
                  <span className="font-semibold">Computer Vision Fundamentals</span>
                  <span className="font-bold text-[10px]">45% score</span>
                </div>
              </div>
            </div>

            {/* Improve Skills (Minor) */}
            <div className="space-y-2 pt-1">
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                Improve Skills (Minor)
              </span>
              <div className="pl-3">
                <div className={`text-xs p-2.5 rounded-xl border font-medium ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}>
                  Data Visualization Polish &amp; Plotly Interactive Charts
                </div>
              </div>
            </div>
          </div>

          <div className={`p-3 rounded-2xl border text-[11px] ${isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
            Fixing critical gaps can increase readiness by <strong className="text-indigo-600">+18%</strong> in 3 weeks.
          </div>
        </div>

        {/* Column 2: Career Readiness Predictor */}
        <div
          className={`lg:col-span-4 rounded-3xl p-6 border flex flex-col justify-between items-center text-center space-y-6 shadow-xs ${
            isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className={`w-full pb-3 border-b text-left ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
            <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Career Readiness Predictor</h3>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Probability of passing Tier-1 technical interviews</p>
          </div>

          {/* Big Gauge Display */}
          <div className="space-y-4 flex flex-col items-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className={`${isLight ? 'text-slate-100' : 'text-slate-800'} stroke-current`}
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  className="text-indigo-600 stroke-current transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={314.159}
                  strokeDashoffset={314.159 - (314.159 * user.placementProbability) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className={`text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.placementProbability}%</span>
                <span className="text-[11px] font-bold text-emerald-700 uppercase">High Probability</span>
              </div>
            </div>

            <div className="space-y-1.5 max-w-xs">
              <p className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                You&apos;re on track! Keep consistent learning to reach 90%+
              </p>
              <p className="text-xs text-indigo-700 font-bold">
                Estimated to reach 90% readiness in <strong>6 - 8 weeks</strong>
              </p>
            </div>
          </div>

          <div className={`w-full p-3.5 rounded-2xl border text-left text-xs space-y-1 ${
            isLight ? 'bg-indigo-50/70 border-indigo-100 text-indigo-900' : 'bg-indigo-950/40 border-indigo-800/40 text-slate-300'
          }`}>
            <span className="font-bold text-indigo-700 block">AI Predictive Engine:</span>
            <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Based on candidate cohorts with matching competency graphs across Python (82%) and SQL (61%).
            </p>
          </div>
        </div>

        {/* Column 3: Top Job Role Matches */}
        <div
          className={`lg:col-span-4 rounded-3xl p-5 border flex flex-col justify-between space-y-4 shadow-xs ${
            isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="space-y-3">
            <div className={`pb-2 border-b flex items-center justify-between ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
              <div>
                <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Top Job Role Matches</h3>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Market benchmark comparison</p>
              </div>
              <span className="text-xs text-indigo-600 font-bold">4 Active</span>
            </div>

            {/* List of Job Role Matches */}
            <div className="space-y-2.5">
              {initialJobMatches.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                    isLight
                      ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 hover:border-indigo-300'
                      : 'bg-slate-950 border-slate-800/80 hover:border-indigo-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold text-xs">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold transition-colors ${
                        isLight ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-cyan-300'
                      }`}>
                        {job.role}
                      </h4>
                      <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{job.avgSalary}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{job.matchScore}%</span>
                    <span className={`block text-[10px] font-bold ${
                      job.matchLevel === 'High Match' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {job.matchLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSelectedJob(initialJobMatches[0])}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>View All Matches &amp; Requirements</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Selected Job Match Modal / Detail */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-5 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className={`flex items-start justify-between pb-3 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                    Role Match Breakdown
                  </span>
                  <h3 className={`text-lg font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedJob.role}</h3>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Market demand: {selectedJob.openingsCount.toLocaleString()}+ active positions</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-700">{selectedJob.matchScore}%</span>
                  <span className={`block text-[10px] font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{selectedJob.matchLevel}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className={`font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Key Target Competencies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.keyRequirements.map((req) => (
                      <span key={req} className={`px-2.5 py-1 rounded-xl font-medium border ${
                        isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                      }`}>
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-rose-700 block mb-1.5">Target Skills to Bridge:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.missingSkills.map((sk) => (
                      <span key={sk} className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`p-3 rounded-2xl border flex items-center justify-between ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Average Compensation Band:</span>
                  <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedJob.avgSalary}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedJob(null)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
                >
                  Adopt as Target Goal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
