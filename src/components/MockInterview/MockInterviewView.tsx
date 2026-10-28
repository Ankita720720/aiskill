import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Mic,
  MicOff,
  Sparkles,
  Award,
  Play,
  RotateCcw,
  Square,
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  BrainCircuit,
  Mail,
} from 'lucide-react';
import { MockInterviewQuestion, InterviewEvaluation } from '../../types';
import { initialMockQuestions } from '../../data/initialData';
import { useTheme } from '../../context/ThemeContext';

interface MockInterviewViewProps {
  onEvaluationComplete?: (evalData: InterviewEvaluation) => void;
  onOpenEmailAutomations?: (taskType?: 'daily_jobs' | 'daily_interview_questions') => void;
}

export const MockInterviewView: React.FC<MockInterviewViewProps> = ({
  onEvaluationComplete,
  onOpenEmailAutomations,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const [selectedTrack, setSelectedTrack] = useState<'Aptitude' | 'Technical' | 'Coding' | 'Project' | 'HR'>('Technical');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showKeyConcepts, setShowKeyConcepts] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Performance metrics state
  const [evaluation, setEvaluation] = useState<InterviewEvaluation>({
    technicalScore: 72,
    problemSolvingScore: 68,
    communicationScore: 69,
    confidenceScore: 78,
    overallScore: 71,
    verdict: 'Good',
    strengths: ['Clear definition of underfitting vs overfitting', 'Mentioned regularization techniques (L1/L2)', 'Steady speech tempo'],
    improvements: ['Could elaborate on cross-validation folds', 'Address high variance in deep architectures'],
    aiDetailedRemarks:
      'Strong grasp of core bias-variance principles. Structured the explanation logically and gave concrete mitigation tactics. Communication was crisp and confidence was high.',
  });

  const questionsForTrack = initialMockQuestions.filter((q) => q.track === selectedTrack);
  const currentQ = questionsForTrack[currentQuestionIndex] || initialMockQuestions[0];

  // Timer effect when recording
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      setTranscript('');
      setTimeout(() => {
        setTranscript('The bias-variance tradeoff is a central concept in machine learning. High bias refers to underfitting when the model is too simple, while high variance is overfitting...');
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      const newEval: InterviewEvaluation = {
        technicalScore: 84,
        problemSolvingScore: 78,
        communicationScore: 82,
        confidenceScore: 88,
        overallScore: 83,
        verdict: 'Excellent',
        strengths: [
          'Articulate explanation of error decomposition',
          'Accurately described practical mitigation using ensemble methods and dropout',
          'Maintained high vocal clarity',
        ],
        improvements: [
          'Add a brief real-world example from previous projects',
        ],
        aiDetailedRemarks:
          'Excellent response! Answer demonstrates mature conceptual understanding and readiness for Senior AI Engineer technical rounds.',
      };
      setEvaluation(newEval);
      if (onEvaluationComplete) onEvaluationComplete(newEval);
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    }, 1400);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              AI Mock Interview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
              Live Voice Simulation
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            Practice real interview rounds with our AI Interviewer. Get instant speech, technical, and rubric analytics.
          </p>
        </div>

        {/* Track Tabs & 6 PM Auto Email button */}
        <div className="flex items-center gap-2 flex-wrap">
          {onOpenEmailAutomations && (
            <button
              onClick={() => onOpenEmailAutomations('daily_interview_questions')}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>6 PM Interview Email Digest</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            </button>
          )}

          <div className={`flex items-center gap-1.5 p-1 rounded-2xl border overflow-x-auto ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            {(['Aptitude', 'Technical', 'Coding', 'Project', 'HR'] as const).map((track) => (
              <button
                key={track}
                onClick={() => {
                  setSelectedTrack(track);
                  setCurrentQuestionIndex(0);
                  setIsRecording(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTrack === track
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: AI Interviewer Question & Audio Recording Area */}
        <div className="lg:col-span-8 space-y-5">
          {/* AI Interviewer Question Card */}
          <div
            className={`rounded-3xl p-6 border space-y-4 relative overflow-hidden shadow-xs ${
              isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-2xs">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>AI Technical Interviewer</h3>
                  <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Evaluating: {selectedTrack} Track</span>
                </div>
              </div>

              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                  isPlayingAudio
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">{isPlayingAudio ? 'Speaking...' : 'Play Prompt'}</span>
              </button>
            </div>

            {/* Question Text Box */}
            <div className={`p-4 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800/80'}`}>
              <p className={`text-sm sm:text-base font-semibold leading-relaxed ${isLight ? 'text-slate-900' : 'text-white'}`}>
                &ldquo;{currentQ.question}&rdquo;
              </p>
            </div>

            {/* Hints / Key Concepts toggle */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={() => setShowKeyConcepts(!showKeyConcepts)}
                className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showKeyConcepts ? 'Hide Expected Concepts' : 'Show AI Rubric Concepts'}</span>
              </button>
              <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Recommended time: 2-3 mins</span>
            </div>

            {showKeyConcepts && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`p-3.5 rounded-2xl border space-y-2 text-xs ${
                  isLight ? 'bg-indigo-50/70 border-indigo-100 text-indigo-900' : 'bg-indigo-950/30 border-indigo-800/30 text-indigo-200'
                }`}
              >
                <span className="font-bold text-indigo-700">Key Concepts Interviewer looks for:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentQ.keyConcepts.map((k) => (
                    <span key={k} className={`px-2 py-0.5 rounded-lg border text-[11px] font-medium ${
                      isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}>
                      {k}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Your Answer / Live Voice Studio */}
          <div
            className={`rounded-3xl p-6 border space-y-5 shadow-xs ${
              isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-white'}`}>
                Your Answer (Voice or Text)
              </span>
              {isRecording && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-rose-600">
                    Recording... {formatTimer(recordingSeconds)}
                  </span>
                </div>
              )}
            </div>

            {/* Simulated Audio Waveform Bar */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="flex items-center gap-1 flex-1 h-8 px-2 overflow-hidden">
                {Array.from({ length: 36 }).map((_, i) => {
                  const height = isRecording
                    ? `${20 + Math.sin(i * 0.4 + recordingSeconds) * 70}%`
                    : '20%';
                  return (
                    <motion.div
                      key={i}
                      animate={{ height }}
                      transition={{ duration: 0.2 }}
                      className={`flex-1 min-w-[3px] rounded-full ${
                        isRecording ? 'bg-indigo-600' : isLight ? 'bg-slate-300' : 'bg-slate-700'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Record / Stop Button */}
              <button
                onClick={toggleRecording}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 shadow-sm ${
                  isRecording
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isRecording ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>Start Speaking</span>
                  </>
                )}
              </button>
            </div>

            {/* Answer Transcription / Text Area */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                Live Speech Transcript / Written Notes
              </label>
              <textarea
                rows={4}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Click 'Start Speaking' or type your structured response here..."
                className={`w-full rounded-2xl p-3 text-xs leading-relaxed border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-600'
                    : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-indigo-500 placeholder:text-slate-600'
                }`}
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setTranscript(currentQ.sampleGoodAnswer);
                }}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-bold underline underline-offset-2"
              >
                Insert Sample Model Answer
              </button>

              <button
                disabled={isEvaluating}
                onClick={handleRunEvaluation}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all"
              >
                {isEvaluating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>AI Analyzing Speech &amp; Concepts...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Submit &amp; Evaluate Interview</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Interview Performance Rubric */}
        <div
          className={`lg:col-span-4 rounded-3xl p-6 border flex flex-col justify-between space-y-6 shadow-xs ${
            isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="space-y-5">
            <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Interview Performance</h3>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">
                AI Evaluated
              </span>
            </div>

            {/* Big Circular Score Display */}
            <div className="flex items-center justify-center py-2">
              <div className="relative w-28 h-28 flex items-center justify-center">
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
                    strokeDashoffset={314.159 - (314.159 * evaluation.overallScore) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{evaluation.overallScore}%</span>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase">{evaluation.verdict}</span>
                </div>
              </div>
            </div>

            {/* 5 Metric Rows */}
            <div className="space-y-3 text-xs">
              <div>
                <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span>Technical Knowledge</span>
                  <span className="font-bold text-indigo-700">{evaluation.technicalScore}%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${evaluation.technicalScore}%` }} />
                </div>
              </div>

              <div>
                <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span>Problem Solving</span>
                  <span className="font-bold text-sky-700">{evaluation.problemSolvingScore}%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                  <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${evaluation.problemSolvingScore}%` }} />
                </div>
              </div>

              <div>
                <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span>Communication</span>
                  <span className="font-bold text-amber-700">{evaluation.communicationScore}%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${evaluation.communicationScore}%` }} />
                </div>
              </div>

              <div>
                <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span>Confidence</span>
                  <span className="font-bold text-emerald-700">{evaluation.confidenceScore}%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${evaluation.confidenceScore}%` }} />
                </div>
              </div>

              <div>
                <div className={`flex justify-between mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <span>Overall Performance</span>
                  <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{evaluation.overallScore}%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`}>
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-1.5 rounded-full" style={{ width: `${evaluation.overallScore}%` }} />
                </div>
              </div>
            </div>

            {/* AI Detailed Remarks */}
            <div className={`p-3 rounded-2xl border space-y-1 text-xs ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <span className="text-[11px] font-bold text-indigo-600 block">AI Speech Synthesis Remarks:</span>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{evaluation.aiDetailedRemarks}</p>
            </div>
          </div>

          <button
            onClick={handleRunEvaluation}
            className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-colors ${
              isLight
                ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            Generate Detailed Evaluation PDF
          </button>
        </div>

      </div>
    </div>
  );
};
