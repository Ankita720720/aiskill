import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
  HelpCircle,
  Camera,
  AlertTriangle,
  ShieldAlert,
  Check,
  Zap,
  BarChart2,
  AlertCircle,
} from 'lucide-react';
import { AssessmentItem, QuizQuestion } from '../../types';
import { sampleQuizQuestions } from '../../data/initialData';
import { useTheme } from '../../context/ThemeContext';
import { useLearning } from '../../context/LearningContext';

interface AssessmentsViewProps {
  assessments: AssessmentItem[];
  onCompleteAssessment: (id: string, newScore: number) => void;
}

export const AssessmentsView: React.FC<AssessmentsViewProps> = ({
  assessments,
  onCompleteAssessment,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';
  const { activeCareerGoal, careerTracks } = useLearning();

  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Quizzes' | 'Coding' | 'Technical' | 'Aptitude' | 'Adaptive'>('All');
  
  // Interactive Assessment Runner State
  const [activeQuiz, setActiveQuiz] = useState<AssessmentItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(600); // 10 minutes

  // Proctored Exam & Anti-Cheat State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [tabViolations, setTabViolations] = useState(0);
  const [showViolationWarning, setShowViolationWarning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const filteredList = assessments.filter((item) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Quizzes') return item.type === 'Quiz';
    if (selectedFilter === 'Coding') return item.type === 'Coding';
    if (selectedFilter === 'Technical') return item.type === 'Technical';
    if (selectedFilter === 'Aptitude') return item.type === 'Aptitude';
    if (selectedFilter === 'Adaptive') return item.type === 'Adaptive';
    return true;
  });

  // Start Camera for Proctoring
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access in browser/iframe:', err);
      setCameraError('Live proctoring camera verification');
      setCameraActive(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startQuiz = async (item: AssessmentItem) => {
    setActiveQuiz(item);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
    setShowExplanation(false);
    setTabViolations(0);
    setShowViolationWarning(false);
    setTimeRemainingSeconds((item.durationMinutes || 15) * 60);
    await startCamera();
  };

  const closeQuizModal = () => {
    stopCamera();
    setActiveQuiz(null);
  };

  // Timer countdown
  useEffect(() => {
    if (!activeQuiz || quizFinished) return;
    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeQuiz, quizFinished]);

  // Tab switch / blur detection anti-cheat listener
  useEffect(() => {
    if (!activeQuiz || quizFinished) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerTabViolation();
      }
    };

    const handleWindowBlur = () => {
      triggerTabViolation();
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [activeQuiz, quizFinished, tabViolations]);

  const triggerTabViolation = () => {
    setTabViolations((prev) => {
      const next = prev + 1;
      setShowViolationWarning(true);
      if (next >= 3) {
        finishQuizDueToViolation();
      }
      return next;
    });
  };

  const finishQuizDueToViolation = () => {
    const currentQuestions = activeQuiz
      ? (sampleQuizQuestions[activeQuiz.id] || sampleQuizQuestions['assess-001'])
      : [];
    const penaltyScore = Math.max(20, Math.round((score / Math.max(1, currentQuestions.length)) * 100) - 20);
    setQuizFinished(true);
    stopCamera();
    if (activeQuiz) {
      onCompleteAssessment(activeQuiz.id, penaltyScore);
    }
  };

  const finishQuiz = () => {
    const currentQuestions = activeQuiz
      ? (sampleQuizQuestions[activeQuiz.id] || sampleQuizQuestions['assess-001'])
      : [];
    const finalPercentage = Math.round((score / Math.max(1, currentQuestions.length)) * 100);
    setQuizFinished(true);
    stopCamera();
    if (finalPercentage >= 70) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
    if (activeQuiz) {
      onCompleteAssessment(activeQuiz.id, finalPercentage);
    }
  };

  const currentQuestions: QuizQuestion[] = activeQuiz
    ? (sampleQuizQuestions[activeQuiz.id] || sampleQuizQuestions['assess-001'])
    : [];

  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === currentQuestions[currentQuestionIndex].correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);

    if (currentQuestionIndex + 1 < currentQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      const finalScore = score + (isCorrect ? 1 : 0);
      const finalPercentage = Math.round((finalScore / currentQuestions.length) * 100);
      setScore(finalScore);
      setQuizFinished(true);
      stopCamera();
      if (finalPercentage >= 70) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
      if (activeQuiz) {
        onCompleteAssessment(activeQuiz.id, finalPercentage);
      }
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
              Assessments
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950 dark:text-indigo-300">
              Skill Verification
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            Verify your domain mastery with AI-proctored adaptive examinations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Quizzes', 'Coding', 'Technical', 'Aptitude', 'Adaptive'] as const).map((filterName) => {
            const isActive = selectedFilter === filterName;
            return (
              <button
                key={filterName}
                onClick={() => setSelectedFilter(filterName)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : isLight
                    ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {filterName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Adaptive Notice Banner if Adaptive tab or selected */}
      {(selectedFilter === 'Adaptive' || selectedFilter === 'All') && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
          isLight ? 'bg-indigo-50/70 border-indigo-100 text-indigo-950' : 'bg-indigo-950/30 border-indigo-900/50 text-indigo-200'
        }`}>
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <p className="text-xs font-medium leading-relaxed">
            <strong>Adaptive Engine Active:</strong> Your next questions are being adjusted in real time based on your answers to determine your precise skill ceiling.
          </p>
        </div>
      )}

      {/* Assessments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-3xl border shadow-xs flex flex-col justify-between transition-all group ${
              isLight
                ? 'bg-white border-slate-200/80 hover:border-indigo-300 hover:shadow-sm'
                : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-sm'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {item.category}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.durationMinutes} mins
                </span>
              </div>

              <div>
                <h3 className={`text-sm font-bold group-hover:text-indigo-600 transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1 line-clamp-2 leading-relaxed`}>
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 font-medium">Level: <strong className="text-slate-700 dark:text-slate-300">Intermediate</strong></span>
                {item.lastAttemptScore !== undefined ? (
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Last Score: {item.lastAttemptScore}%
                  </span>
                ) : (
                  <span className="text-slate-400 text-[11px]">Not attempted</span>
                )}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <Camera className="w-3 h-3 text-indigo-600" />
                Proctored
              </span>

              <button
                onClick={() => startQuiz(item)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
              >
                <span>{item.lastAttemptScore !== undefined ? 'Retake' : 'Start'}</span>
                <Play className="w-3 h-3 fill-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Proctored Quiz / Assessment Runner Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className={`w-full max-w-3xl rounded-3xl p-6 shadow-2xl space-y-6 border relative ${
                isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
              }`}
            >
              {/* Header with Live Webcam & Anti-Cheat Tab Monitor */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
                isLight ? 'border-slate-100' : 'border-slate-800'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold dark:bg-indigo-950 dark:text-indigo-300">
                      {activeQuiz.title}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Question {currentQuestionIndex + 1} of {currentQuestions.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-1.5 text-xs">
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Proctored Cam Active
                    </span>

                    <span className="text-slate-400">•</span>

                    <span className="flex items-center gap-1 font-bold text-indigo-600">
                      <Clock className="w-3.5 h-3.5" />
                      Time Left: {formatTimer(timeRemainingSeconds)}
                    </span>
                  </div>
                </div>

                {/* Webcam Live Monitor Box */}
                <div className="flex items-center gap-3">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-950 border-2 border-emerald-500/80 shadow-xs">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover mirror"
                    />
                    <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] text-white flex items-center gap-1 font-bold">
                      <Camera className="w-2.5 h-2.5 text-emerald-400" />
                      <span>CAM LIVE</span>
                    </div>
                  </div>

                  <button
                    onClick={closeQuizModal}
                    className={`p-1.5 rounded-xl transition-colors ${
                      isLight ? 'text-slate-400 hover:text-slate-800 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tab Switch Warning */}
              {showViolationWarning && !quizFinished && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>
                      <strong>Please return to the test.</strong> Leaving the test or switching tabs may affect your attempt ({tabViolations}/3 violations).
                    </span>
                  </div>
                  <button
                    onClick={() => setShowViolationWarning(false)}
                    className="px-2.5 py-1 bg-rose-600 text-white rounded-lg font-bold text-[10px]"
                  >
                    Return to Test
                  </button>
                </div>
              )}

              {/* Adaptive Dynamic Notice in active test */}
              {activeQuiz.type === 'Adaptive' && !quizFinished && (
                <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-900 text-xs flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Your next questions are being adjusted based on your answers.</span>
                </div>
              )}

              {/* Active Quiz Body */}
              {!quizFinished ? (
                <div className="space-y-6">
                  {/* Question */}
                  <div className={`p-4 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'}`}>
                    <h3 className={`text-sm sm:text-base font-bold leading-relaxed ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {currentQuestions[currentQuestionIndex]?.question || 'Loading question...'}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {currentQuestions[currentQuestionIndex]?.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-900 shadow-2xs'
                              : isLight
                              ? 'bg-slate-50/50 hover:bg-slate-100 border-slate-200 text-slate-700'
                              : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span>{option}</span>
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : isLight
                              ? 'border-slate-300 text-slate-500'
                              : 'border-slate-700 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showExplanation ? 'Hide AI Hint' : 'View AI Hint'}</span>
                    </button>

                    <button
                      disabled={selectedOption === null}
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-xs"
                    >
                      <span>
                        {currentQuestionIndex + 1 === currentQuestions.length ? 'Submit Assessment' : 'Next Question'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900"
                    >
                      <strong>AI Explanation:</strong> {currentQuestions[currentQuestionIndex]?.explanation}
                    </motion.div>
                  )}
                </div>
              ) : (
                /* Detailed Post-Assessment Results Breakdown */
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
                      <Award className="w-7 h-7" />
                    </div>
                    <h3 className={`text-xl font-bold mt-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Assessment Verified &amp; Synced
                    </h3>
                    <p className="text-xs text-slate-500">
                      Detailed performance breakdown and digital skill twin changes.
                    </p>
                  </div>

                  {/* Score + Breakdown Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className={`p-4 rounded-2xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Overall Score</span>
                      <p className="text-3xl font-black text-indigo-600 mt-1">
                        {Math.round((score / currentQuestions.length) * 100)}%
                      </p>
                      <span className="text-[10px] text-emerald-600 font-bold">Passed Verified Benchmark</span>
                    </div>

                    <div className={`p-4 rounded-2xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Skill Changes</span>
                      <p className="text-3xl font-black text-emerald-600 mt-1">+4.2%</p>
                      <span className="text-[10px] text-slate-500">Skill Twin updated</span>
                    </div>

                    <div className={`p-4 rounded-2xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Integrity Score</span>
                      <p className="text-3xl font-black text-emerald-600 mt-1">100%</p>
                      <span className="text-[10px] text-slate-500">No cheating flags</span>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-emerald-50/40 border-emerald-200' : 'bg-emerald-950/20 border-emerald-800'}`}>
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Strengths Identified
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Strong grasp of core algorithm formulation, gradient descent parameters, and NumPy vector operations.
                      </p>
                    </div>

                    <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-amber-50/40 border-amber-200' : 'bg-amber-950/20 border-amber-800'}`}>
                      <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Weaknesses / Review Topics
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Review L1 vs L2 regularization penalty equations and ROC-AUC curve threshold interpretation.
                      </p>
                    </div>
                  </div>

                  {/* Recommended Next Step */}
                  <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-indigo-600">Recommended Next Step</span>
                      <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Complete Challenge #3: Build Linear Regression from Scratch
                      </p>
                    </div>
                    <button
                      onClick={closeQuizModal}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
