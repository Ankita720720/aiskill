import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Sparkles,
  HelpCircle,
  ExternalLink,
  Code2,
  Check,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Flame,
  RotateCcw,
  Sliders,
  ChevronRight,
  Bookmark,
  Share2,
} from 'lucide-react';
import { ConceptDetail, ConceptPracticeQuestion } from '../../types';
import { useLearning } from '../../context/LearningContext';
import { useTheme } from '../../context/ThemeContext';

interface ConceptDetailPageProps {
  concept: ConceptDetail;
  onBack: () => void;
  onSelectConcept: (conceptId: string) => void;
}

export const ConceptDetailPage: React.FC<ConceptDetailPageProps> = ({
  concept,
  onBack,
  onSelectConcept,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const {
    userProgress,
    updateWatchProgress,
    markWatchCompleted,
    submitPracticeAttempt,
    getConceptById,
  } = useLearning();

  const progress = userProgress[concept.id] || {
    conceptId: concept.id,
    watchProgressPercentage: 0,
    watchTimeSeconds: 0,
    isWatchCompleted: false,
    practiceScorePercentage: 0,
    practiceAttempted: false,
    practiceCorrectCount: 0,
    practiceTotalCount: 0,
    assessmentScorePercentage: 65,
    masteryScorePercentage: 20,
    isMastered: false,
    lastStudiedAt: 'Not started',
  };

  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'resources'>('learn');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  
  // Practice state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Filtered practice questions
  const filteredQuestions = concept.practiceQuestions.filter((q) => {
    if (selectedDifficulty === 'All') return true;
    return q.difficulty === selectedDifficulty;
  });

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (submittedQuestions[questionId]) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleCheckAnswer = (question: ConceptPracticeQuestion) => {
    if (userAnswers[question.id] === undefined) return;
    setSubmittedQuestions((prev) => ({ ...prev, [question.id]: true }));
  };

  const handleSubmitAllPractice = () => {
    let correct = 0;
    filteredQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = submitPracticeAttempt(concept.id, correct, filteredQuestions.length);
    setPracticeCompleted(true);

    if (score >= 70) {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
    }
  };

  const handleResetPractice = () => {
    setUserAnswers({});
    setSubmittedQuestions({});
    setPracticeCompleted(false);
  };

  const handleCopyCode = () => {
    if (concept.codeExample) {
      navigator.clipboard.writeText(concept.codeExample.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const nextConcept = concept.nextRecommendedConceptId
    ? getConceptById(concept.nextRecommendedConceptId)
    : null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 text-xs font-bold transition-colors ${
            isLight ? 'text-slate-600 hover:text-indigo-600' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {concept.categoryName} Resources</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {concept.categoryName}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            concept.difficulty === 'Beginner'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : concept.difficulty === 'Intermediate'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}>
            {concept.difficulty}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {concept.estimatedMinutes} mins
          </span>
        </div>
      </div>

      {/* Main Concept Header Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-xs relative overflow-hidden ${
          isLight
            ? 'bg-gradient-to-br from-indigo-50/60 via-white to-sky-50/50 border-indigo-100'
            : 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-100/70 dark:bg-indigo-950 px-2.5 py-0.5 rounded-md">
                Concept Module #{concept.order}
              </span>
              {progress.isMastered && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Concept Mastered
                </span>
              )}
            </div>

            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {concept.name}
            </h1>

            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {concept.shortSummary}
            </p>

            {/* Quick Action Navigation Tabs */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('learn')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'learn'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isLight
                    ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>1. Watch &amp; Learn</span>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'practice'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isLight
                    ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>2. Practice &amp; Score ({concept.practiceQuestions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'resources'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isLight
                    ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3. Extra Resources</span>
              </button>
            </div>
          </div>

          {/* Right Mastery Breakdown Card */}
          <div className="lg:col-span-4">
            <div
              className={`p-5 rounded-2xl border shadow-xs space-y-3 ${
                isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Concept Mastery</span>
                <span className={`text-xl font-black ${
                  progress.masteryScorePercentage >= 75 ? 'text-emerald-600' : 'text-indigo-600'
                }`}>
                  {progress.masteryScorePercentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.masteryScorePercentage}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block">Video</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{progress.watchProgressPercentage}%</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block">Practice</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{progress.practiceScorePercentage}%</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block">Twin Sync</span>
                  <span className="text-xs font-bold text-emerald-600">+8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: WATCH & LEARN */}
      {activeTab === 'learn' && (
        <div className="space-y-6">
          {/* What You Will Learn Card */}
          <div
            className={`p-6 rounded-3xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                What You Will Learn
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
              {concept.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded YouTube Player & Progress Section */}
          <div
            className={`p-6 rounded-3xl border space-y-5 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
                  <Play className="w-4 h-4 text-rose-600 fill-rose-600" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {concept.primaryVideo.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Instructor: {concept.primaryVideo.channel} • Verified Curriculum Lesson
                  </p>
                </div>
              </div>

              <a
                href={concept.primaryVideo.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Open in YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded YouTube Player */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-200 dark:border-slate-800">
              {concept.primaryVideo.youtubeVideoId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${concept.primaryVideo.youtubeVideoId}?rel=0&modestbranding=1`}
                  title={concept.primaryVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 text-white space-y-3">
                  <Play className="w-12 h-12 text-rose-500" />
                  <p className="text-sm font-bold">{concept.primaryVideo.title}</p>
                  <a
                    href={concept.primaryVideo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Watch Progress Control Bar */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="space-y-1 w-full sm:w-1/2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Video Progress</span>
                  <span className="text-indigo-600">{progress.watchProgressPercentage}% Watched</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all"
                    style={{ width: `${progress.watchProgressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => updateWatchProgress(concept.id, Math.min(100, progress.watchProgressPercentage + 25))}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    isLight ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  +25% Progress
                </button>

                <button
                  onClick={() => markWatchCompleted(concept.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Completed</span>
                </button>
              </div>
            </div>
          </div>

          {/* Deep Dive Breakdown: What is this? Why is it used? Examples */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* Definition */}
            <div className="space-y-2">
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                1. What is {concept.name}?
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {concept.definition}
              </p>
            </div>

            {/* Why Used */}
            <div className="space-y-2">
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                2. Why is it used?
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {concept.whyUsed}
              </p>
            </div>

            {/* Real World Applications */}
            <div className="space-y-3">
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                3. Real-World Industry Applications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {concept.realWorldApplications.map((app, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                      isLight ? 'bg-slate-50/70 border-slate-200 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    {app}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example (if available) */}
            {concept.codeExample && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    4. Practical Implementation Code
                  </h3>
                  <button
                    onClick={handleCopyCode}
                    className={`text-xs font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
                      isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Code2 className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="rounded-2xl overflow-hidden bg-slate-950 p-4 font-mono text-xs text-emerald-400 border border-slate-800 shadow-inner">
                  <pre className="overflow-x-auto whitespace-pre-wrap">{concept.codeExample.code}</pre>
                </div>
                <p className="text-[11px] text-slate-500 italic mt-1">{concept.codeExample.explanation}</p>
              </div>
            )}

            {/* Key Terminology */}
            <div className="space-y-3">
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                5. Key Terminology You Must Know
              </h3>
              <div className="space-y-2">
                {concept.keyTerminology.map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-start gap-1.5 ${
                      isLight ? 'bg-indigo-50/40 border-indigo-100 text-slate-800' : 'bg-indigo-950/20 border-indigo-900/30 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 sm:w-44 shrink-0">
                      {t.term}:
                    </span>
                    <span className="leading-relaxed">{t.explanation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advantages & Limitations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className={`p-4 rounded-2xl border space-y-2 ${isLight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-emerald-950/20 border-emerald-900/40'}`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Key Advantages
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {concept.advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 ${isLight ? 'bg-rose-50/50 border-rose-200' : 'bg-rose-950/20 border-rose-900/40'}`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Limitations
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {concept.limitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Step Transition Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-500">Ready to test what you learned?</p>
                <p className={`text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Complete practice questions to boost your concept mastery and update your Skill Twin.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('practice')}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Start Practice Questions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE PRACTICE QUESTIONS */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* Difficulty Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Filter Difficulty:</span>
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isLight
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetPractice}
                className="px-3 py-1 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Answers</span>
              </button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const selectedIdx = userAnswers[q.id];
              const isChecked = submittedQuestions[q.id] || practiceCompleted;
              const isCorrect = selectedIdx === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border space-y-4 shadow-xs transition-all ${
                    isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      Question {idx + 1} of {filteredQuestions.length}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      q.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <h4 className={`text-sm sm:text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {q.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {q.options.map((option, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      let optionStyle = isLight
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 text-slate-300';

                      if (isOptionSelected && !isChecked) {
                        optionStyle = 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-2xs';
                      } else if (isChecked) {
                        if (optIdx === q.correctAnswer) {
                          optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                        } else if (isOptionSelected && !isCorrect) {
                          optionStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isChecked}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{option}</span>
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                            isOptionSelected && !isChecked
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : isChecked && optIdx === q.correctAnswer
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : isChecked && isOptionSelected
                              ? 'border-rose-600 bg-rose-600 text-white'
                              : 'border-slate-300 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Per Question Check & Explanation */}
                  {!isChecked ? (
                    <div className="flex justify-end pt-2">
                      <button
                        disabled={selectedIdx === undefined}
                        onClick={() => handleCheckAnswer(q)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all"
                      >
                        Check Answer
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50/70 border-rose-200 text-rose-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Correct!</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-rose-600" />
                            <span>Incorrect Answer</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong>Why:</strong> {q.explanation}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Practice Summary Button */}
          {!practiceCompleted ? (
            <div className="p-6 rounded-3xl border bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div>
                <h4 className="text-sm font-bold">Finished all practice questions?</h4>
                <p className="text-xs text-indigo-100">
                  Submit your results to evaluate mastery and update your Skill Twin evidence score.
                </p>
              </div>

              <button
                onClick={handleSubmitAllPractice}
                className="px-6 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-bold rounded-xl text-xs transition-all shadow-sm"
              >
                Submit Practice Results
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-3xl border text-center space-y-4 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Practice Module Completed!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Practice Score: <span className="font-bold text-emerald-600">{progress.practiceScorePercentage}%</span> • Concept Mastery updated to <span className="font-bold text-indigo-600">{progress.masteryScorePercentage}%</span>
                </p>
              </div>

              {nextConcept && (
                <div className="pt-2">
                  <button
                    onClick={() => onSelectConcept(nextConcept.id)}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>Next Recommended Concept: {nextConcept.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADDITIONAL RESOURCES (PDFs, Docs, Articles) */}
      {activeTab === 'resources' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.additionalResources.length > 0 ? (
              concept.additionalResources.map((res) => (
                <div
                  key={res.id}
                  className={`p-5 rounded-3xl border flex flex-col justify-between space-y-3 ${
                    isLight ? 'bg-white border-slate-200 hover:border-indigo-300' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {res.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{res.difficulty}</span>
                    </div>

                    <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{res.description}</p>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-8 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p className="text-xs font-semibold">Additional verified cheat sheets and docs are being curated for this module.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
