import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Award,
  Code2,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Play,
  FileCode,
  Check,
  Send,
} from 'lucide-react';
import { SkillChallenge } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface ChallengesViewProps {
  challenges: SkillChallenge[];
  onCompleteChallenge: (id: string, evaluation: any) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  challenges,
  onCompleteChallenge,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const [activeTab, setActiveTab] = useState<'Active' | 'Completed' | 'Recommended'>('Active');
  const [selectedChallenge, setSelectedChallenge] = useState<SkillChallenge>(challenges[0]);
  const [userCode, setUserCode] = useState<string>(
    `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_squared_error, r2_score

# 1. Load Student Dataset
df = pd.read_csv('student_performance.csv')

# 2. Feature Engineering & Preprocessing
X = df[['study_hours', 'attendance_pct', 'parent_edu_level']]
y = df['final_grade']

# Train Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Model Training with L2 Regularization
model = Ridge(alpha=1.0)
model.fit(X_train, y_train)

# 4. Evaluation
predictions = model.predict(X_test)
print("R2 Score:", r2_score(y_test, predictions))
print("RMSE:", np.sqrt(mean_squared_error(y_test, predictions)))`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredChallenges = challenges.filter((c) => {
    if (activeTab === 'Active') return c.status === 'Active';
    if (activeTab === 'Completed') return c.status === 'Completed';
    return c.status === 'Recommended';
  });

  const handleRunEvaluation = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newEvaluation = {
        correctness: 88,
        codeQuality: 82,
        conceptUsage: 85,
        efficiency: 80,
        documentation: 85,
        overallScore: 84,
        aiFeedback:
          'Great optimization! Regularization successfully prevented overfitting on student collinear factors. Test R2 score improved to 0.89.',
      };
      onCompleteChallenge(selectedChallenge.id, newEvaluation);
      setSelectedChallenge((prev) => ({
        ...prev,
        status: 'Completed',
        progressPercentage: 100,
        evaluation: newEvaluation,
      }));
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Prove Your Skills
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              AI Code Verification
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            AI-generated real-world challenges to verify your engineering skills and benchmark execution.
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex items-center gap-1.5 p-1 rounded-2xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          {(['Active', 'Completed', 'Recommended'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'Recommended' ? 'Recommended For You' : `${tab} Challenges`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Challenge List, Right Evaluation Panel & Code Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Challenge Cards */}
        <div className="lg:col-span-7 space-y-4">
          {filteredChallenges.map((challenge) => {
            const isSelected = selectedChallenge?.id === challenge.id;
            return (
              <div
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-xs space-y-3 ${
                  isSelected
                    ? isLight
                      ? 'bg-indigo-50/60 border-indigo-500 ring-2 ring-indigo-500/20'
                      : 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/30'
                    : isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-200/90'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{challenge.title}</h3>
                      <p className={`text-xs mt-0.5 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{challenge.description}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                    challenge.difficulty === 'Advanced'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Tags & Due */}
                <div className={`flex flex-wrap items-center justify-between gap-2 pt-2 border-t ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.tags.map((t) => (
                      <span key={t} className={`text-[10px] px-2 py-0.5 rounded-lg border font-semibold ${
                        isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className={`flex items-center gap-3 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      {challenge.dueInDays > 0 ? `Due in ${challenge.dueInDays} days` : 'Completed'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Progress</span>
                    <span className="text-indigo-600 font-bold">{challenge.progressPercentage}%</span>
                  </div>
                  <div className={`w-full rounded-full h-1.5 overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-1.5 rounded-full"
                      style={{ width: `${challenge.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Challenge Evaluation (AI) & Code Submission */}
        <div className="lg:col-span-5 space-y-6">
          {/* Challenge Evaluation Card */}
          <div
            className={`rounded-3xl p-5 border space-y-4 shadow-xs ${
              isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Challenge Evaluation (AI)</h3>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2 py-0.5 rounded-full">
                Automated Rubric
              </span>
            </div>

            {selectedChallenge?.evaluation ? (
              <div className="space-y-4">
                {/* 5 Evaluation Bars */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      <span>Correctness</span>
                      <span className="font-bold text-indigo-700">{selectedChallenge.evaluation.correctness}%</span>
                    </div>
                    <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                      <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${selectedChallenge.evaluation.correctness}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      <span>Code Quality</span>
                      <span className="font-bold text-rose-700">{selectedChallenge.evaluation.codeQuality}%</span>
                    </div>
                    <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                      <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${selectedChallenge.evaluation.codeQuality}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      <span>Concept Usage</span>
                      <span className="font-bold text-emerald-700">{selectedChallenge.evaluation.conceptUsage}%</span>
                    </div>
                    <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${selectedChallenge.evaluation.conceptUsage}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      <span>Efficiency</span>
                      <span className="font-bold text-amber-700">{selectedChallenge.evaluation.efficiency}%</span>
                    </div>
                    <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${selectedChallenge.evaluation.efficiency}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      <span>Documentation</span>
                      <span className="font-bold text-sky-700">{selectedChallenge.evaluation.documentation}%</span>
                    </div>
                    <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                      <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${selectedChallenge.evaluation.documentation}%` }} />
                    </div>
                  </div>
                </div>

                {/* Overall Score Badge */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <div>
                    <span className="text-[11px] text-slate-500 block font-medium">Overall Score</span>
                    <span className="text-sm font-bold text-emerald-700">
                      {selectedChallenge.evaluation.overallScore >= 80 ? 'Excellent Build!' : 'Good Attempt!'}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl border-2 border-indigo-600 bg-indigo-50 flex items-center justify-center shadow-2xs">
                    <span className="text-base font-black text-indigo-700">{selectedChallenge.evaluation.overallScore}%</span>
                  </div>
                </div>

                {/* AI Detailed Feedback */}
                <div className={`p-3 rounded-2xl border text-xs ${isLight ? 'bg-indigo-50/70 border-indigo-100 text-indigo-900' : 'bg-indigo-950/30 border-indigo-800/30 text-indigo-200'}`}>
                  <p className="font-bold text-indigo-700 mb-1">AI Feedback:</p>
                  <p className={`leading-relaxed text-[11px] ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{selectedChallenge.evaluation.aiFeedback}</p>
                </div>
              </div>
            ) : (
              <div className={`p-6 text-center text-xs space-y-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <FileCode className="w-8 h-8 mx-auto text-slate-400" />
                <p className="font-semibold">No evaluation submitted yet for this challenge.</p>
                <p className="text-[11px] text-slate-400">Submit your solution below to trigger automated AI rubric grading.</p>
              </div>
            )}
          </div>

          {/* Interactive Code Editor & Run Evaluation */}
          <div
            className={`rounded-3xl p-5 border space-y-3 shadow-xs ${
              isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                Code Workspace
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Python 3.11</span>
            </div>

            <textarea
              rows={6}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className={`w-full font-mono text-xs rounded-2xl p-3 border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-indigo-600'
                  : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-indigo-500'
              }`}
            />

            <button
              onClick={handleRunEvaluation}
              disabled={isSubmitting}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Evaluating Code with AI...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run &amp; Submit AI Evaluation</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
