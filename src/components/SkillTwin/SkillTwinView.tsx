import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Award,
  ChevronRight,
  Code2,
  FileCheck2,
  Users,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SkillNode } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLearning } from '../../context/LearningContext';

interface SkillTwinViewProps {
  skillNodes: Record<string, SkillNode>;
  onNavigateLearningPath: () => void;
  onNavigateAssessments: () => void;
  onNavigateChallenges?: () => void;
  onNavigateProjects?: () => void;
  onNavigateMockInterview?: () => void;
}

export const SkillTwinView: React.FC<SkillTwinViewProps> = ({
  skillNodes,
  onNavigateLearningPath,
  onNavigateAssessments,
  onNavigateChallenges,
  onNavigateProjects,
  onNavigateMockInterview,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';
  const { activeCareerGoal, careerTracks } = useLearning();

  const activeTrack = careerTracks.find((t) => t.id === activeCareerGoal) || careerTracks[0];
  const [selectedSkillId, setSelectedSkillId] = useState<string>('python');

  // Hierarchy Structure
  const skillHierarchy = [
    {
      category: 'Machine Learning',
      status: 'Moderate' as const,
      skills: [
        { id: 'python', name: 'Python', score: 82, level: 'Advanced', status: 'Strong' as const, evidence: { quiz: 84, coding: 86, project: 88, interview: 76 } },
        { id: 'sql', name: 'SQL', score: 61, level: 'Intermediate', status: 'Moderate' as const, evidence: { quiz: 65, coding: 58, project: 68, interview: 55 } },
        { id: 'numpy', name: 'NumPy', score: 75, level: 'Advanced', status: 'Strong' as const, evidence: { quiz: 78, coding: 76, project: 74, interview: 72 } },
        { id: 'pandas', name: 'Pandas', score: 80, level: 'Advanced', status: 'Strong' as const, evidence: { quiz: 82, coding: 80, project: 85, interview: 73 } },
        { id: 'statistics', name: 'Statistics', score: 65, level: 'Intermediate', status: 'Moderate' as const, evidence: { quiz: 68, coding: 60, project: 65, interview: 67 } },
      ],
    },
    {
      category: 'Deep Learning',
      status: 'Needs Improvement' as const,
      skills: [
        { id: 'tensorflow', name: 'TensorFlow', score: 28, level: 'Beginner', status: 'Needs Improvement' as const, evidence: { quiz: 32, coding: 25, project: 30, interview: 25 } },
        { id: 'neural-networks', name: 'Neural Networks', score: 32, level: 'Beginner', status: 'Needs Improvement' as const, evidence: { quiz: 35, coding: 28, project: 35, interview: 30 } },
      ],
    },
  ];

  // Find currently selected skill
  let currentSkill = skillHierarchy[0].skills[0];
  for (const group of skillHierarchy) {
    const found = group.skills.find((s) => s.id === selectedSkillId);
    if (found) {
      currentSkill = found;
      break;
    }
  }

  const getStatusBadge = (status: 'Strong' | 'Moderate' | 'Needs Improvement') => {
    if (status === 'Strong') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">
          Strong
        </span>
      );
    }
    if (status === 'Moderate') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300">
          Moderate
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300">
        Needs Improvement
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      
      {/* Top Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
        isLight ? 'border-slate-200/80' : 'border-slate-800'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              My SkillTwin
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950 dark:text-indigo-300">
              {activeTrack.roleName}
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            Your AI-powered skill profile
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className={isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}>Strong (70%+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className={isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}>Moderate (40-70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className={isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}>Needs Improvement (&lt;40%)</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout: Left Skill Hierarchy, Right Evidence Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Clean Skill Hierarchy */}
        <div className="lg:col-span-7 space-y-5">
          {skillHierarchy.map((group) => (
            <div
              key={group.category}
              className={`p-6 rounded-3xl border shadow-xs space-y-4 ${
                isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {group.category}
                  </h3>
                </div>
                {getStatusBadge(group.status)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.skills.map((skill) => {
                  const isSelected = selectedSkillId === skill.id;
                  return (
                    <div
                      key={skill.id}
                      onClick={() => setSelectedSkillId(skill.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs'
                          : isLight
                          ? 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {skill.name}
                        </span>
                        <span className="text-xs font-bold text-indigo-600">
                          {skill.score}%
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{skill.level}</span>
                        {getStatusBadge(skill.status)}
                      </div>

                      {/* Mini progress line */}
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2.5 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (5 cols): Evidence Breakdown */}
        <div
          className={`lg:col-span-5 p-6 rounded-3xl border shadow-xs flex flex-col justify-between ${
            isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="space-y-6">
            
            {/* Header for selected skill */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Evidence Breakdown
                </span>
                {getStatusBadge(currentSkill.status)}
              </div>
              <h2 className={`text-xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {currentSkill.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Confidence: <span className="font-bold text-indigo-600">{currentSkill.score}%</span> • Level: <span className="font-semibold">{currentSkill.level}</span>
              </p>
            </div>

            {/* 4 Evidence Cards */}
            <div className="space-y-3">
              <button
                onClick={onNavigateAssessments}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${
                  isLight ? 'bg-slate-50/70 border-slate-200/80 hover:border-indigo-300' : 'bg-slate-950/60 border-slate-800 hover:border-indigo-500/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    Q
                  </div>
                  <div className="text-left">
                    <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Quiz Score
                    </h4>
                    <p className="text-[10px] text-slate-500">Conceptual mastery</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-indigo-600">{currentSkill.evidence.quiz}%</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>

              <button
                onClick={() => {
                  if (onNavigateChallenges) onNavigateChallenges();
                  else onNavigateAssessments();
                }}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${
                  isLight ? 'bg-slate-50/70 border-slate-200/80 hover:border-emerald-300' : 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    C
                  </div>
                  <div className="text-left">
                    <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Coding Score
                    </h4>
                    <p className="text-[10px] text-slate-500">Syntax & algorithms</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-emerald-600">{currentSkill.evidence.coding}%</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>

              <button
                onClick={() => {
                  if (onNavigateProjects) onNavigateProjects();
                  else onNavigateLearningPath();
                }}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${
                  isLight ? 'bg-slate-50/70 border-slate-200/80 hover:border-amber-300' : 'bg-slate-950/60 border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-xs">
                    P
                  </div>
                  <div className="text-left">
                    <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Project Score
                    </h4>
                    <p className="text-[10px] text-slate-500">Practical application</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-amber-600">{currentSkill.evidence.project}%</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>

              <button
                onClick={() => {
                  if (onNavigateMockInterview) onNavigateMockInterview();
                  else onNavigateAssessments();
                }}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all hover:scale-[1.01] ${
                  isLight ? 'bg-slate-50/70 border-slate-200/80 hover:border-sky-300' : 'bg-slate-950/60 border-slate-800 hover:border-sky-500/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold text-xs">
                    I
                  </div>
                  <div className="text-left">
                    <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Interview Score
                    </h4>
                    <p className="text-[10px] text-slate-500">Verbal problem solving</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-sky-600">{currentSkill.evidence.interview}%</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>
            </div>

          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-6">
            <button
              onClick={onNavigateLearningPath}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Practice {currentSkill.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateAssessments}
              className={`w-full py-2 rounded-xl border text-xs font-bold transition-all text-center ${
                isLight
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              Take Assessment
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
