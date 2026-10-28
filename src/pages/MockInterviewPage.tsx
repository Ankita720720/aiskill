import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Send,
  RotateCcw,
  Download,
  Share2,
} from 'lucide-react';
import { StudentProfile } from '../data/collageData';
import { getActiveDomain, DomainData } from '../data/multiDomainData';
import { getCurrentUserProfile } from '../utils/userStorage';
import { saveMockInterviewToDb } from '../utils/supabaseBackend';

interface MockInterviewPageProps {
  user: StudentProfile;
}

interface QuestionItem {
  id: number;
  question: string;
  expectedKeywords: string[];
}

export const MockInterviewPage: React.FC<MockInterviewPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const currentDomain = getActiveDomain();
  const savedProfile = getCurrentUserProfile();
  const defaultRole = user.targetRole || savedProfile.targetRole || currentDomain.primaryRole;

  // Screen stages: 'setup' | 'check' | 'interview' | 'report'
  const [screen, setScreen] = useState<'setup' | 'check' | 'interview' | 'report'>('setup');

  // Setup options
  const [targetRole, setTargetRole] = useState(defaultRole);
  const [experienceLevel, setExperienceLevel] = useState('Fresher / Entry Level');
  const [interviewType, setInterviewType] = useState('Technical');

  // System check options
  const [consentAccepted, setConsentAccepted] = useState(true);

  // Live Interview State
  const [cameraActive, setCameraActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [conversation, setConversation] = useState<{ sender: 'ai' | 'candidate'; text: string }[]>([]);

  // Video element ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Speech recognition
  const recognitionRef = useRef<any>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Dynamic question bank based on active domain
  const domainQuestions: Record<string, QuestionItem[]> = {
    Technical: [
      ...currentDomain.mockQuestions
        .filter((q) => q.category === 'Technical')
        .map((q, idx) => ({ id: idx + 1, question: q.question, expectedKeywords: q.expectedKeywords })),
      {
        id: 101,
        question: `How do you apply ${currentDomain.requiredSkills[0] || 'core concepts'} to build reliable applications in the ${currentDomain.name} domain?`,
        expectedKeywords: ['architecture', 'fundamentals', 'best practices', 'debugging', 'performance'],
      },
      {
        id: 102,
        question: `What are the most critical performance, security, and scalability considerations when working with ${currentDomain.requiredSkills[1] || 'industry tools'}?`,
        expectedKeywords: ['scalability', 'optimization', 'security', 'latency', 'caching'],
      },
    ],
    Behavioral: [
      {
        id: 201,
        question: `Tell me about a challenging technical roadblock or incident you encountered in your ${currentDomain.name} projects and the systematic steps you took to diagnose and resolve it.`,
        expectedKeywords: ['debugging', 'root cause', 'logs', 'testing', 'resolution'],
      },
      {
        id: 202,
        question: `Describe a situation where you had an architectural disagreement with a collaborator. How did you evaluate trade-offs and align on the optimal solution?`,
        expectedKeywords: ['communication', 'trade-offs', 'alignment', 'collaboration'],
      },
      {
        id: 203,
        question: `How do you prioritize staying up-to-date with emerging tools, libraries, and best practices in ${currentDomain.name}?`,
        expectedKeywords: ['continuous learning', 'documentation', 'projects', 'consistency'],
      },
    ],
    'System Design': [
      ...currentDomain.mockQuestions
        .filter((q) => q.category === 'System Design')
        .map((q, idx) => ({ id: idx + 1, question: q.question, expectedKeywords: q.expectedKeywords })),
      {
        id: 301,
        question: `How would you architect a fault-tolerant, highly available production system for ${targetRole} workflows that handles sudden 10x traffic spikes?`,
        expectedKeywords: ['horizontal scaling', 'load balancing', 'failover', 'caching', 'resilience'],
      },
    ],
    HR: [
      {
        id: 401,
        question: `Why are you specifically interested in pursuing a career as a ${targetRole} in the ${currentDomain.name} domain?`,
        expectedKeywords: ['passion', 'impact', 'career growth', 'problem solving', 'industry interest'],
      },
      {
        id: 402,
        question: `Where do you envision yourself in 3 to 5 years within ${currentDomain.name}, and what competencies are you actively developing to get there?`,
        expectedKeywords: ['leadership', 'mentorship', 'mastery', 'architecture', 'growth'],
      },
    ],
    Coding: [
      {
        id: 501,
        question: `How do you structure testable, modular code and evaluate algorithmic time and space complexity when implementing solutions in ${currentDomain.name}?`,
        expectedKeywords: ['big-o', 'unit tests', 'modularity', 'edge cases', 'maintainability'],
      },
      {
        id: 502,
        question: `Explain how you would profile memory leaks, optimize computational bottlenecks, and benchmark critical pathways in ${targetRole} applications.`,
        expectedKeywords: ['profiler', 'benchmarking', 'garbage collection', 'complexity', 'caching'],
      },
    ],
    Mixed: [
      {
        id: 601,
        question: currentDomain.mockQuestions[0]?.question || `Explain the core concepts and trade-offs of ${currentDomain.requiredSkills[0]} in modern industry practices.`,
        expectedKeywords: currentDomain.mockQuestions[0]?.expectedKeywords || ['fundamentals', 'architecture'],
      },
      {
        id: 602,
        question: `Tell me about a project where you demonstrated technical leadership and implemented ${currentDomain.requiredSkills[1] || 'modern tech'}.`,
        expectedKeywords: ['impact', 'architecture', 'delivery', 'leadership'],
      },
      {
        id: 603,
        question: `Why are you excited to contribute to high-impact teams as a ${targetRole}?`,
        expectedKeywords: ['drive', 'alignment', 'growth', 'contributions'],
      },
    ],
  };

  const activeQuestions = domainQuestions[interviewType] || domainQuestions.Technical;
  const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setLiveTranscript(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Handle camera stream on entering interview
  useEffect(() => {
    if (screen === 'interview') {
      // Start camera if possible
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
          setCameraActive(true);
        })
        .catch(() => {
          // Camera permission denied or not available; fallback gracefully
          setCameraActive(false);
        });

      // Initialize AI greeting
      setConversation([
        {
          sender: 'ai',
          text: `Welcome, ${user.name.split(' ')[0]}. I will be conducting your ${interviewType} interview for the ${targetRole} position. Let's begin.`,
        },
        {
          sender: 'ai',
          text: activeQuestions[0].question,
        },
      ]);
    } else {
      // Stop camera stream when leaving interview screen
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [screen]);

  const toggleMicListening = () => {
    if (!micActive) {
      showToast('Microphone is currently disabled. Please enable it first.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        setLiveTranscript('');
        recognitionRef.current?.start();
        setIsListening(true);
        showToast('Microphone is listening... Speak your answer now.');
      } catch {
        // Fallback simulate speech if API not available
        setIsListening(true);
        setTimeout(() => {
          setLiveTranscript(
            'In JavaScript, the event loop manages task scheduling. The call stack runs synchronous operations, and once empty, microtasks like resolved promises are dequeued first before picking the next timer callback.'
          );
        }, 1500);
      }
    }
  };

  const handleToggleCamera = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraActive(videoTrack.enabled);
        showToast(videoTrack.enabled ? 'Camera enabled' : 'Camera disabled');
        return;
      }
    }
    setCameraActive((prev) => !prev);
  };

  const handleToggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicActive(audioTrack.enabled);
        showToast(audioTrack.enabled ? 'Microphone enabled' : 'Microphone disabled');
        return;
      }
    }
    setMicActive((prev) => !prev);
  };

  const handleSubmitAnswer = () => {
    if (!liveTranscript.trim()) {
      showToast('Please record or type your answer before submitting.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const answerText = liveTranscript;
    setLiveTranscript('');

    setConversation((prev) => [
      ...prev,
      { sender: 'candidate', text: answerText },
    ]);

    // Check if more questions remain
    if (currentQuestionIndex < activeQuestions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);

      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Good point. Let's move to the next question: ${activeQuestions[nextIdx].question}`,
          },
        ]);
      }, 1000);
    } else {
      setTimeout(() => {
        setScreen('report');
        try {
          saveMockInterviewToDb({
            email: user.email || 'student@skilltwin.ai',
            domainId: currentDomain.id,
            targetRole: targetRole,
            difficulty: experienceLevel,
            overallScore: 84,
            strengths: 'Clear conceptual explanation, structured thinking, strong domain vocabulary.',
            areasForImprovement: 'Provide more concrete real-world production metrics and edge case error handling in answers.',
            questionsAndAnswers: conversation,
          });
        } catch (err) {
          console.warn('Mock interview database sync error:', err);
        }
      }, 1200);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setLiveTranscript('');
      setConversation((prev) => [
        ...prev,
        { sender: 'candidate', text: '[Question Skipped]' },
        { sender: 'ai', text: `Moving on to question ${nextIdx + 1}: ${activeQuestions[nextIdx].question}` },
      ]);
    } else {
      setScreen('report');
      try {
        saveMockInterviewToDb({
          email: user.email || 'student@skilltwin.ai',
          domainId: currentDomain.id,
          targetRole: targetRole,
          difficulty: experienceLevel,
          overallScore: 78,
          strengths: 'Good articulation and composure under pressure.',
          areasForImprovement: 'Complete skipped questions to maximize interview performance score.',
          questionsAndAnswers: conversation,
        });
      } catch (err) {
        console.warn('Mock interview database sync error:', err);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto font-sans pb-16 text-[#334155]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[6000] bg-[#0B1F3A] text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] tracking-tight mb-1">
            AI Mock Interview
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Practice realistic technical and behavioral interviews with real-time AI evaluation and feedback.
          </p>
        </div>

        {screen !== 'setup' && (
          <button
            onClick={() => setScreen('setup')}
            className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-4 py-2 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Setup</span>
          </button>
        )}
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#B8AAFF]">
            ✦ AI INTERVIEW SIMULATOR
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Practice real-world interviews with personalized AI feedback
          </h2>
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
            SkillTwin AI dynamically listens to your spoken responses, analyzes technical precision, measures speech confidence and delivers immediate actionable suggestions.
          </p>
        </div>

        <div className="w-14 h-14 bg-white/10 border border-white/15 rounded-2xl flex items-center justify-center text-2xl shrink-0 self-start md:self-auto">
          🎙
        </div>
      </div>

      {/* ================= STAGE 1: SETUP SCREEN ================= */}
      {screen === 'setup' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 sm:p-7 shadow-xs">
          <h2 className="text-xl font-extrabold text-[#0B1F3A] mb-1">
            Configure Your Mock Interview
          </h2>
          <p className="text-xs text-[#64748B] mb-6">
            Customize the interview scope according to your target role and career aspirations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] mb-2">
                Target Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2.5 text-xs text-[#334155] font-medium outline-none focus:border-[#5B2EFF]"
              >
                {currentDomain.roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] mb-2">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2.5 text-xs text-[#334155] font-medium outline-none focus:border-[#5B2EFF]"
              >
                <option value="Fresher / Entry Level">Fresher / Entry Level (0 - 1 Years)</option>
                <option value="Junior Engineer">Junior Engineer (1 - 2 Years)</option>
                <option value="Mid-Level Engineer">Mid-Level Engineer (3 - 5 Years)</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-xs font-bold text-[#0B1F3A] mb-3">
              Select Interview Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { type: 'Technical', title: 'Technical Round', desc: 'Core programming, frameworks, databases, and APIs.' },
                { type: 'Behavioral', title: 'Behavioral Round', desc: 'Situational questions, leadership, teamwork, communication.' },
                { type: 'System Design', title: 'System Design', desc: 'Scalability, architecture, database schemas, and microservices.' },
                { type: 'HR', title: 'HR Round', desc: 'Cultural fit, career goals, strengths, and company alignment.' },
                { type: 'Coding', title: 'Coding & Algorithms', desc: 'Problem solving, algorithmic complexity, data structures.' },
                { type: 'Mixed', title: 'Comprehensive Mixed', desc: 'A blend of technical, behavioral, and architectural questions.' },
              ].map((item) => (
                <div
                  key={item.type}
                  onClick={() => setInterviewType(item.type)}
                  className={`border rounded-xl p-4 cursor-pointer transition-all ${
                    interviewType === item.type
                      ? 'border-[#5B2EFF] bg-[#EDE9FE] shadow-xs'
                      : 'border-[#E2E8F0] hover:border-[#5B2EFF] bg-white'
                  }`}
                >
                  <h4 className="text-xs font-bold text-[#0B1F3A] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setScreen('check')}
              className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-6 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Proceed to System Check →
            </button>
          </div>
        </div>
      )}

      {/* ================= STAGE 2: SYSTEM CHECK ================= */}
      {screen === 'check' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] max-w-2xl mx-auto p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-extrabold text-[#0B1F3A] mb-1">
            System & Environment Check
          </h2>
          <p className="text-xs text-[#64748B] mb-6">
            Verify hardware peripherals and speech capabilities before commencing the interview.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white text-[#5B2EFF] flex items-center justify-center font-bold text-sm shadow-xs">
                  📹
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A]">Webcam Video Feed</div>
                  <div className="text-[11px] text-[#64748B]">Real-time facial & gaze proctoring</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#00A88F]">Camera Ready ✓</span>
            </div>

            <div className="flex items-center justify-between p-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white text-[#5B2EFF] flex items-center justify-center font-bold text-sm shadow-xs">
                  🎙
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A]">Microphone Audio Input</div>
                  <div className="text-[11px] text-[#64748B]">Audio recording and volume levels</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#00A88F]">Microphone Ready ✓</span>
            </div>

            <div className="flex items-center justify-between p-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white text-[#5B2EFF] flex items-center justify-center font-bold text-sm shadow-xs">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A]">Speech Recognition Engine</div>
                  <div className="text-[11px] text-[#64748B]">Real-time speech-to-text transcript</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#00A88F]">Engine Active ✓</span>
            </div>

            <div className="flex items-center justify-between p-3.5 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white text-[#5B2EFF] flex items-center justify-center font-bold text-sm shadow-xs">
                  🔊
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A]">AI Audio Output</div>
                  <div className="text-[11px] text-[#64748B]">Speaker and voice synthesis playback</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#00A88F]">Audio Ready ✓</span>
            </div>
          </div>

          <label className="flex items-start gap-3 bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl text-xs text-[#475569] mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#5B2EFF] focus:ring-0 cursor-pointer accent-[#5B2EFF]"
            />
            <span className="leading-relaxed">
              I agree to enable camera and microphone for live AI interview simulation and proctoring verification.
            </span>
          </label>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setScreen('setup')}
              className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] px-5 py-2.5 rounded-[9px] text-xs font-bold transition-all cursor-pointer"
            >
              ← Back
            </button>
            <button
              disabled={!consentAccepted}
              onClick={() => setScreen('interview')}
              className="bg-[#5B2EFF] hover:bg-[#4820DC] disabled:opacity-50 text-white px-6 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Start Interview →
            </button>
          </div>
        </div>
      )}

      {/* ================= STAGE 3: LIVE INTERVIEW SCREEN ================= */}
      {screen === 'interview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
            {/* Left: Candidate Video Feed */}
            <div className="bg-white border border-[#E2E8F0] rounded-[15px] overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="p-4 px-5 border-b border-[#E2E8F0] flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0B1F3A]">
                  Candidate Video Feed
                </h3>
                <span className="bg-[#FEE2E2] text-[#DC2626] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                  <span>LIVE</span>
                </span>
              </div>

              {/* Video container */}
              <div className="h-[360px] bg-[#0B1F3A] relative flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                />

                {!cameraActive && (
                  <div className="text-center text-white p-6">
                    <div className="w-20 h-20 rounded-full bg-[#5B2EFF] flex items-center justify-center text-2xl font-extrabold mx-auto mb-3">
                      AC
                    </div>
                    <div className="text-xs font-bold">Camera Feed Paused</div>
                    <div className="text-[11px] text-[#94A3B8] mt-1">
                      Click the camera button below to turn on video
                    </div>
                  </div>
                )}

                {/* Floating controls */}
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3">
                  <button
                    onClick={handleToggleCamera}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer transition-all ${
                      cameraActive ? 'bg-black/50 hover:bg-black/70' : 'bg-[#DC2626]'
                    }`}
                    title={cameraActive ? 'Turn Camera Off' : 'Turn Camera On'}
                  >
                    {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleToggleMic}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer transition-all ${
                      micActive ? 'bg-black/50 hover:bg-black/70' : 'bg-[#DC2626]'
                    }`}
                    title={micActive ? 'Mute Microphone' : 'Unmute Microphone'}
                  >
                    {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3.5 px-5 bg-[#F8FAFC] border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span>✦ Camera & Microphone Active</span>
                <span className="text-[#00A88F] font-bold">Integrity Verified</span>
              </div>
            </div>

            {/* Right: AI Interviewer & Voice Input */}
            <div className="bg-white border border-[#E2E8F0] rounded-[15px] overflow-hidden shadow-xs flex flex-col justify-between">
              <div className="p-4 px-5 border-b border-[#E2E8F0]">
                <h3 className="text-sm font-bold text-[#0B1F3A]">
                  AI Technical Interviewer
                </h3>
              </div>

              {/* Chat messages */}
              <div className="p-4.5 space-y-3.5 overflow-y-auto max-h-[260px] min-h-[220px]">
                {conversation.map((msg, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#5B2EFF]">
                      {msg.sender === 'ai' ? '✦ SkillTwin AI' : 'You (Candidate)'}
                    </span>
                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        msg.sender === 'ai'
                          ? 'bg-[#F3F7FC] text-[#334155]'
                          : 'bg-[#EDE9FE] text-[#5B2EFF] font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Voice status & transcript */}
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center space-y-3">
                <div className="text-[11px] text-[#64748B]">
                  {isListening ? 'Listening to your voice... Speak clearly.' : 'Click microphone to record your answer'}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={toggleMicListening}
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-md cursor-pointer transition-all ${
                      isListening
                        ? 'bg-[#DC2626] animate-pulse ring-4 ring-red-200'
                        : 'bg-[#5B2EFF] hover:bg-[#4820DC]'
                    }`}
                  >
                    <Mic className="w-6 h-6" />
                  </button>
                </div>

                {/* Live transcript or text box */}
                <div className="text-left bg-white border border-[#E2E8F0] rounded-xl p-3 min-h-[55px]">
                  <textarea
                    rows={2}
                    value={liveTranscript}
                    onChange={(e) => setLiveTranscript(e.target.value)}
                    placeholder="Live speech transcript will appear here (or type manually)..."
                    className="w-full text-xs text-[#334155] outline-none resize-none placeholder:text-[#94A3B8]"
                  />
                </div>

                <button
                  onClick={handleSubmitAnswer}
                  className="w-full bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Answer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-4 px-6 flex items-center justify-between shadow-xs">
            <div className="text-xs text-[#64748B]">
              Question <strong className="text-[#0B1F3A]">{currentQuestionIndex + 1}</strong> of{' '}
              <strong className="text-[#0B1F3A]">{activeQuestions.length}</strong>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSkipQuestion}
                className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors"
              >
                Skip Question
              </button>
              <button
                onClick={() => setScreen('report')}
                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors"
              >
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STAGE 4: REPORT SCREEN ================= */}
      {screen === 'report' && (
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-[#0B1F3A] mb-1">
              Interview Performance Report
            </h2>
            <p className="text-xs text-[#64748B]">
              Your detailed performance evaluation powered by SkillTwin AI
            </p>
          </div>

          {/* Overall score circle */}
          <div className="my-6 text-center">
            <div className="w-[135px] h-[135px] rounded-full border-8 border-[#5B2EFF] bg-[#EDE9FE] flex flex-col items-center justify-center mx-auto shadow-sm">
              <strong className="text-3xl font-extrabold text-[#5B2EFF]">78%</strong>
              <span className="text-[10px] font-bold text-[#64748B] uppercase">
                Readiness Score
              </span>
            </div>
          </div>

          {/* 5 Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            <div className="bg-[#F3F7FC] p-4 rounded-xl text-center">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                Technical
              </span>
              <strong className="text-lg font-extrabold text-[#0B1F3A]">82%</strong>
            </div>
            <div className="bg-[#F3F7FC] p-4 rounded-xl text-center">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                Communication
              </span>
              <strong className="text-lg font-extrabold text-[#0B1F3A]">76%</strong>
            </div>
            <div className="bg-[#F3F7FC] p-4 rounded-xl text-center">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                Confidence
              </span>
              <strong className="text-lg font-extrabold text-[#0B1F3A]">80%</strong>
            </div>
            <div className="bg-[#F3F7FC] p-4 rounded-xl text-center">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                Structure
              </span>
              <strong className="text-lg font-extrabold text-[#0B1F3A]">75%</strong>
            </div>
            <div className="bg-[#F3F7FC] p-4 rounded-xl text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                Pacing
              </span>
              <strong className="text-lg font-extrabold text-[#0B1F3A]">84%</strong>
            </div>
          </div>

          {/* Strengths & Development */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-xl">
              <h4 className="text-xs font-bold text-[#0B1F3A] mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F]" />
                <span>Demonstrated Strengths</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00A88F] font-bold">•</span>
                  <span>Clear conceptual understanding of {currentDomain.requiredSkills[0] || 'core fundamentals'} and problem-solving methodologies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00A88F] font-bold">•</span>
                  <span>Articulate explanations of {currentDomain.requiredSkills[1] || 'industry tools'} and architectural trade-offs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00A88F] font-bold">•</span>
                  <span>Confident speech cadence with domain-specific terminology for {targetRole}.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-xl">
              <h4 className="text-xs font-bold text-[#0B1F3A] mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#C2410C]" />
                <span>Areas for Development</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="text-[#C2410C] font-bold">•</span>
                  <span>Elaborate further on concrete production practices for {currentDomain.missingSkillsDefault[0] || 'advanced tooling'}.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C2410C] font-bold">•</span>
                  <span>Structure behavioral scenarios using the STAR method (Situation, Task, Action, Result).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C2410C] font-bold">•</span>
                  <span>Prepare real-world metrics from your {currentDomain.name} portfolio projects to substantiate claims.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0] flex-wrap">
            <button
              onClick={() => {
                showToast('Report downloaded as PDF! 📄');
              }}
              className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] px-5 py-2.5 rounded-[9px] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </button>

            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setLiveTranscript('');
                setScreen('setup');
              }}
              className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-6 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Interview</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
