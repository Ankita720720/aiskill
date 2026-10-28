import React from 'react';
import {
  TrendingUp,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Clock,
  BookOpen,
  Briefcase,
  Layers,
  Award,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Mail,
  Send,
  Zap,
} from 'lucide-react';
import { UserProfile } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLearning } from '../../context/LearningContext';

interface DashboardViewProps {
  user: UserProfile;
  onNavigate: (tab: any) => void;
  onStartChallenge: (challengeId?: string) => void;
  onOpenEmailAutomations?: (taskType?: 'daily_jobs' | 'daily_interview_questions') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onNavigate,
  onStartChallenge,
  onOpenEmailAutomations,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const {
    careerTracks,
    activeCareerGoal,
    setActiveCareerGoal,
    currentlyLearningConcept,
    userProgress,
  } = useLearning();

  const activeTrack = careerTracks.find((t) => t.id === activeCareerGoal) || careerTracks[0];
  const firstName = user.name ? user.name.split(' ')[0] : 'Shubhada';

  const skillsOverview = [
    { name: 'Python', score: 82 },
    { name: 'SQL', score: 61 },
    { name: 'Machine Learning', score: 42 },
    { name: 'Deep Learning', score: 28 },
    { name: 'Git & GitHub', score: 72 },
  ];

  const careerMatches = [
    { role: 'AI Engineer', score: 78, level: 'High Match' },
    { role: 'Data Scientist', score: 72, level: 'High Match' },
    { role: 'ML Engineer', score: 69, level: 'Good Match' },
    { role: 'Software Engineer', score: 65, level: 'Good Match' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      
      {/* Clean Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Good morning, {firstName}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Focusing on <span className="font-semibold text-slate-700 dark:text-slate-300">{activeTrack.roleName}</span>
          </p>
        </div>

        {/* Minimal Track Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
          {careerTracks.slice(0, 3).map((track) => {
            const isSelected = track.id === activeCareerGoal;
            return (
              <button
                key={track.id}
                onClick={() => setActiveCareerGoal(track.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {track.roleName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Readiness Card: Clean, Airy, Focused */}
      <div
        className={`p-6 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200/80 shadow-2xs' : 'bg-slate-900/90 border-slate-800 shadow-2xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Career Readiness
            </span>
            <div className="flex items-baseline gap-3">
              <span className={`text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                74%
              </span>
              <span className="text-xs text-slate-500">
                Placement benchmark: 85%
              </span>
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} max-w-lg leading-relaxed`}>
              Strong foundation in Python and Data Analysis. Complete upcoming modules in Machine Learning and System Design to reach interview readiness.
            </p>
          </div>

          <button
            onClick={() => onNavigate('learning-path')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Resume Learning Path</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Minimal Progress Track */}
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-5 overflow-hidden">
          <div className="h-full bg-indigo-600 rounded-full" style={{ width: '74%' }} />
        </div>
      </div>

      {/* 2 Balanced Columns: Active Learning & Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: Currently Learning & Next Task */}
        <div
          className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 ${
            isLight ? 'bg-white border-slate-200/80 shadow-2xs' : 'bg-slate-900/90 border-slate-800 shadow-2xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                In Progress
              </span>
              <span className="text-xs font-bold text-indigo-600">60% Done</span>
            </div>

            <div className="pt-4 space-y-2">
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                SQL for Data Science &amp; Analytics
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} leading-relaxed`}>
                Module 4: Window Functions, Partitions, and Analytical CTEs.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              <span>Next up: Practice challenge</span>
            </div>
            <button
              onClick={() => onNavigate('learning-path')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                isLight
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              Continue Lesson
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Key Verified Skills */}
        <div
          className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
            isLight ? 'bg-white border-slate-200/80 shadow-2xs' : 'bg-slate-900/90 border-slate-800 shadow-2xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Skill Summary
              </span>
              <button
                onClick={() => onNavigate('skill-twin')}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
              >
                <span>Full Profile</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="pt-4 space-y-3.5">
              {skillsOverview.slice(0, 4).map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {skill.name}
                    </span>
                    <span className="font-semibold text-slate-500">
                      {skill.score}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('jobs')}
              className={`w-full py-2 rounded-xl text-xs font-semibold text-center transition-colors border ${
                isLight
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              Browse Matched Openings
            </button>
          </div>
        </div>

      </div>

      {/* Minimal Email Alert Notification (No Clutter) */}
      {onOpenEmailAutomations && (
        <div
          className={`px-4 py-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Daily job alerts scheduled at 12:00 PM and interview questions at 6:00 PM.</span>
          </div>
          <button
            onClick={() => onOpenEmailAutomations('daily_jobs')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2 shrink-0 ml-2"
          >
            Preferences
          </button>
        </div>
      )}

    </div>
  );
};
