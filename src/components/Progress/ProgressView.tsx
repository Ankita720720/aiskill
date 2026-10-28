import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  BookOpen,
  Award,
  ClipboardCheck,
  Flame,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { UserProfile } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface ProgressViewProps {
  user: UserProfile;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ user }) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';
  const [timeFilter, setTimeFilter] = useState<'7 Days' | '30 Days' | '90 Days' | 'All Time'>('30 Days');

  const skillsProgress = [
    { name: 'Python', pct: 82, color: 'bg-emerald-600' },
    { name: 'SQL', pct: 61, color: 'bg-amber-600' },
    { name: 'Machine Learning', pct: 42, color: 'bg-indigo-600' },
    { name: 'Deep Learning', pct: 28, color: 'bg-rose-600' },
    { name: 'Git & GitHub', pct: 72, color: 'bg-sky-600' },
    { name: 'Data Visualization', pct: 65, color: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Time Filters */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Progress Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
              Activity Tracking
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            Track your overall learning velocity, streak metrics, and readiness score growth.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex items-center gap-1.5 p-1 rounded-2xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          {(['7 Days', '30 Days', '90 Days', 'All Time'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeFilter(period)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                timeFilter === period
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border space-y-1 shadow-xs ${isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Courses Completed</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.coursesCompleted}</p>
          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +2 this month
          </span>
        </div>

        <div className={`p-5 rounded-3xl border space-y-1 shadow-xs ${isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Challenges Completed</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.challengesCompleted}</p>
          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +1 this month
          </span>
        </div>

        <div className={`p-5 rounded-3xl border space-y-1 shadow-xs ${isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Tests Attempted</span>
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-100">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </div>
          <p className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.testsAttempted}</p>
          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +4 this month
          </span>
        </div>

        <div className={`p-5 rounded-3xl border space-y-1 shadow-xs ${isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Learning Streak</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <p className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.streakDays}</p>
          <span className="text-[10px] text-amber-700 font-bold">
            Active streak 🔥
          </span>
        </div>
      </div>

      {/* Charts Grid: Left Readiness Over Time, Right Skills Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Readiness Over Time Chart */}
        <div
          className={`lg:col-span-7 rounded-3xl p-5 border space-y-4 shadow-xs ${
            isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
            <div>
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Readiness Over Time</h3>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>AI Readiness trajectory ({timeFilter})</p>
            </div>
            <span className="text-xs font-bold text-indigo-700">{user.readinessScore}% Current</span>
          </div>

          {/* SVG Line Graph */}
          <div className="h-64 w-full relative pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 180">
              {/* Horizontal Grid lines */}
              <line x1="40" y1="20" x2="380" y2="20" stroke={isLight ? '#e2e8f0' : '#334155'} strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="60" x2="380" y2="60" stroke={isLight ? '#e2e8f0' : '#334155'} strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="100" x2="380" y2="100" stroke={isLight ? '#e2e8f0' : '#334155'} strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="140" x2="380" y2="140" stroke={isLight ? '#e2e8f0' : '#334155'} strokeWidth="1" strokeDasharray="3 3" />

              {/* Y Axis Labels */}
              <text x="30" y="24" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="end">100%</text>
              <text x="30" y="64" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="end">75%</text>
              <text x="30" y="104" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="end">50%</text>
              <text x="30" y="144" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="end">25%</text>
              <text x="30" y="175" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="end">0%</text>

              {/* Trajectory Area & Line */}
              <defs>
                <linearGradient id="readinessGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M50,130 L110,105 L170,120 L240,85 L310,95 L370,62"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M50,130 L110,105 L170,120 L240,85 L310,95 L370,62 L370,175 L50,175 Z"
                fill="url(#readinessGrad)"
              />

              {/* Data points */}
              {[[50, 130], [110, 105], [170, 120], [240, 85], [310, 95], [370, 62]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4.5" fill="#4f46e5" stroke={isLight ? '#ffffff' : '#0f172a'} strokeWidth="2.5" />
              ))}

              {/* X Axis Labels */}
              <text x="50" y="175" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="middle">May 01</text>
              <text x="110" y="175" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="middle">May 08</text>
              <text x="170" y="175" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="middle">May 15</text>
              <text x="240" y="175" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="middle">May 22</text>
              <text x="310" y="175" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="middle">May 29</text>
              <text x="370" y="175" fill={isLight ? '#64748b' : '#64748b'} fontSize="9" textAnchor="middle">Today</text>
            </svg>
          </div>
        </div>

        {/* Right: Skills Progress Bars */}
        <div
          className={`lg:col-span-5 rounded-3xl p-5 border space-y-4 shadow-xs ${
            isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
            <div>
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Skills Progress</h3>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Benchmark completion status</p>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold">Updated Live</span>
          </div>

          <div className="space-y-4 pt-1">
            {skillsProgress.map((sk) => (
              <div key={sk.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{sk.name}</span>
                  <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{sk.pct}%</span>
                </div>
                <div className={`w-full rounded-full h-2 overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                  <div
                    className={`${sk.color} h-2 rounded-full transition-all duration-700`}
                    style={{ width: `${sk.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={`pt-2 flex justify-between text-[11px] font-semibold border-t ${isLight ? 'border-slate-100 text-slate-400' : 'border-slate-800 text-slate-500'}`}>
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

      </div>
    </div>
  );
};
