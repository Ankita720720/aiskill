import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  Award,
  ChevronRight,
  TrendingUp,
  Target,
  Terminal,
  Database,
  Brain,
  Code,
  GitBranch,
  PieChart,
  Percent,
  Briefcase,
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { useTheme } from '../../context/ThemeContext';
import { ConceptDetailPage } from './ConceptDetailPage';
import { ConceptDetail } from '../../types';

export const ResourcesView: React.FC = () => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const {
    categories,
    careerTracks,
    activeCareerGoal,
    setActiveCareerGoal,
    userProgress,
    getCategoryProgress,
    overallLearningScore,
    completedConceptsCount,
    totalConceptsCount,
    totalHoursLearned,
    weakConcepts,
    currentlyLearningConcept,
    recommendedNextConcept,
  } = useLearning();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [search, setSearch] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<ConceptDetail | null>(null);
  const [viewMode, setViewMode] = useState<'curriculum' | 'practice_bank' | 'weak_topics'>('curriculum');

  // Active track
  const activeTrack = careerTracks.find((t) => t.id === activeCareerGoal) || careerTracks[0];

  // Helper icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-4 h-4" />;
      case 'Terminal': return <Terminal className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Code': return <Code className="w-4 h-4" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4" />;
      case 'PieChart': return <PieChart className="w-4 h-4" />;
      case 'Percent': return <Percent className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  // If a concept detail page is open, render it directly
  if (selectedConcept) {
    return (
      <ConceptDetailPage
        concept={selectedConcept}
        onBack={() => setSelectedConcept(null)}
        onSelectConcept={(newConceptId) => {
          for (const cat of categories) {
            const found = cat.concepts.find((c) => c.id === newConceptId);
            if (found) {
              setSelectedConcept(found);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }
          }
        }}
      />
    );
  }

  // Filter concepts
  const allFilteredConcepts = categories
    .filter((cat) => selectedCategoryId === 'all' || cat.id === selectedCategoryId)
    .flatMap((cat) => cat.concepts)
    .filter((concept) => {
      if (selectedDifficulty !== 'All' && concept.difficulty !== selectedDifficulty) return false;
      if (
        search &&
        !concept.name.toLowerCase().includes(search.toLowerCase()) &&
        !concept.categoryName.toLowerCase().includes(search.toLowerCase()) &&
        !concept.shortSummary.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

  return (
    <div className="space-y-6">
      {/* Header Banner with Career Track Selector */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Interactive Learning Platform
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Learn → Watch → Practice → Score
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            Structured courses with verified YouTube video lessons, beginner-friendly mathematical deep-dives, and graded practice questions synced to your Skill Twin.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search concepts (e.g. Linear Regression, SQL Joins)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full rounded-2xl pl-9 pr-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600'
                : 'bg-slate-900 border-slate-800 text-slate-200 focus:border-indigo-500'
            }`}
          />
        </div>
      </div>

      {/* Target Career Track Selector Strip */}
      <div
        className={`p-5 rounded-3xl border shadow-xs space-y-3 ${
          isLight
            ? 'bg-gradient-to-r from-indigo-50/80 via-white to-sky-50/50 border-indigo-100'
            : 'bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              Target Career Learning Path
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active: {activeTrack.roleName}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Target Benchmark: <strong className="text-indigo-600">{activeTrack.targetBenchmark}%</strong>
          </span>
        </div>

        {/* Career Track Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {careerTracks.map((track) => {
            const isCurrent = track.id === activeCareerGoal;
            return (
              <button
                key={track.id}
                onClick={() => setActiveCareerGoal(track.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isLight
                    ? 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <span>{track.title}</span>
                {isCurrent && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className={`p-4 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Overall Score</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-indigo-600 mt-1">{overallLearningScore}%</p>
          <span className="text-[10px] text-slate-500">Across 10 Categories</span>
        </div>

        <div className={`p-4 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Modules Mastered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-1">{completedConceptsCount} / {totalConceptsCount}</p>
          <span className="text-[10px] text-slate-500">Verified Evidence</span>
        </div>

        <div className={`p-4 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Hours Learned</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-600 mt-1">{totalHoursLearned} hrs</p>
          <span className="text-[10px] text-slate-500">Active Watch &amp; Practice</span>
        </div>

        <div className={`p-4 rounded-3xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Learning Streak</span>
            <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-500 mt-1">7 Days</p>
          <span className="text-[10px] text-emerald-600 font-bold">Consistent Daily Learner</span>
        </div>
      </div>

      {/* Currently Learning / Continue Learning Bar */}
      {currentlyLearningConcept && (
        <div
          className={`p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs ${
            isLight
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white'
              : 'bg-indigo-950/80 border-indigo-800 text-white'
          }`}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-200">
              Continue Learning
            </span>
            <h3 className="text-base sm:text-lg font-extrabold">
              {currentlyLearningConcept.categoryName} → {currentlyLearningConcept.name}
            </h3>
            <p className="text-xs text-indigo-100 max-w-xl line-clamp-1">
              {currentlyLearningConcept.shortSummary}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setSelectedConcept(currentlyLearningConcept)}
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm w-full sm:w-auto justify-center"
            >
              <Play className="w-3.5 h-3.5 fill-indigo-700" />
              <span>Continue Lesson</span>
            </button>
          </div>
        </div>
      )}

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCategoryId('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategoryId === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : isLight
              ? 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          All Topics ({totalConceptsCount})
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          const prog = getCategoryProgress(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isLight
                  ? 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {prog}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allFilteredConcepts.map((concept) => {
          const prog = userProgress[concept.id] || {
            conceptId: concept.id,
            watchProgressPercentage: 0,
            watchTimeSeconds: 0,
            isWatchCompleted: false,
            practiceScorePercentage: 0,
            practiceAttempted: false,
            practiceCorrectCount: 0,
            practiceTotalCount: 0,
            assessmentScorePercentage: 60,
            masteryScorePercentage: 0,
            isMastered: false,
            lastStudiedAt: 'Not started',
          };

          return (
            <div
              key={concept.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-xs group hover:border-indigo-300 ${
                isLight ? 'bg-white border-slate-200/90 hover:bg-slate-50/40' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {concept.categoryName}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    concept.difficulty === 'Beginner'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : concept.difficulty === 'Intermediate'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {concept.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className={`text-base font-bold leading-snug group-hover:text-indigo-600 transition-colors ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {concept.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {concept.shortSummary}
                  </p>
                </div>

                {/* Video channel info */}
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <div className="w-5 h-5 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-rose-600" />
                  </div>
                  <span className="font-semibold">{concept.primaryVideo.channel}</span>
                  <span>•</span>
                  <span className="text-slate-400">{concept.estimatedMinutes} min</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Mastery Score</span>
                    <span className={prog.masteryScorePercentage >= 70 ? 'text-emerald-600' : 'text-indigo-600'}>
                      {prog.masteryScorePercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${prog.masteryScorePercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedConcept(concept)}
                  className="py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Learn &amp; Watch</span>
                </button>

                <button
                  onClick={() => setSelectedConcept(concept)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${
                    isLight ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Code className="w-3 h-3" />
                  <span>Practice ({concept.practiceQuestions.length})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weak Areas Banner */}
      {weakConcepts.length > 0 && (
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isLight ? 'bg-amber-50/50 border-amber-200' : 'bg-amber-950/20 border-amber-900/40'
          }`}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              AI Detected Weak Areas &amp; Review Recommendations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {weakConcepts.map((item) => (
              <div
                key={item.concept.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">{item.concept.categoryName}</span>
                  <span className="text-xs font-bold text-amber-600">{item.mastery}% Mastery</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {item.concept.name}
                </h4>
                <button
                  onClick={() => setSelectedConcept(item.concept)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 pt-1"
                >
                  <span>Review Concept</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
