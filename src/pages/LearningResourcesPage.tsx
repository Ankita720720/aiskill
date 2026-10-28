import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  Play,
  CheckCircle2,
  X,
  ExternalLink,
  Search,
  Youtube,
  Clock,
  Award,
  BookOpen,
  Volume2,
  VolumeX,
  Pause,
  RotateCcw,
  Plus,
  Check,
  BookmarkCheck,
  ArrowRight,
  Headphones,
} from 'lucide-react';
import {
  DOMAINS_MASTER,
  getActiveDomain,
  DomainData,
  YouTubeTutorial,
  DomainCourseModule,
} from '../data/multiDomainData';
import {
  getUserCompletedCourses,
  toggleUserCompletedCourse,
  getUserLearningPlan,
  toggleUserLearningPlan,
  getUserCompletedVideos,
  toggleUserCompletedVideo,
} from '../utils/userStorage';

export const LearningResourcesPage: React.FC = () => {
  const navigate = useNavigate();

  // Active domain state (loaded once from user's saved domain)
  const [currentDomain, setCurrentDomain] = useState<DomainData>(getActiveDomain());

  // YouTube Tutorial Filters & Search
  const [videoSearch, setVideoSearch] = useState('');
  const [videoLevelFilter, setVideoLevelFilter] = useState('all');
  const [videoTopicFilter, setVideoTopicFilter] = useState('all');

  // Video Player Modal
  const [playingVideo, setPlayingVideo] = useState<YouTubeTutorial | null>(null);

  // User tracking states
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [learningPlan, setLearningPlan] = useState<string[]>([]);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  // Web Speech API Audio Learning State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSpeechTitle, setActiveSpeechTitle] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Sync user state on mount
  useEffect(() => {
    setCurrentDomain(getActiveDomain());
    setCompletedCourses(getUserCompletedCourses());
    setLearningPlan(getUserLearningPlan());
    setCompletedVideos(getUserCompletedVideos());

    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setAvailableVoices(voices);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Web Speech API Controls
  const handleStartSpeaking = (title: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech audio is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    if (availableVoices.length > 0 && availableVoices[selectedVoiceIndex]) {
      utterance.voice = availableVoices[selectedVoiceIndex];
    }
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setActiveSpeechTitle(title);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSpeechTitle(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSpeechTitle(null);
    };

    window.speechSynthesis.speak(utterance);
    showToast(`🔊 Listening to: ${title}`);
  };

  const handlePauseSpeaking = () => {
    if ('speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleResumeSpeaking = () => {
    if ('speechSynthesis' in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSpeechTitle(null);
    }
  };

  // Course action toggles
  const handleToggleCompletedCourse = (courseId: string) => {
    const isNowDone = toggleUserCompletedCourse(courseId);
    setCompletedCourses(getUserCompletedCourses());
    showToast(isNowDone ? 'Course marked as completed! 🎉' : 'Course marked as in progress.');
  };

  const handleToggleLearningPlan = (courseId: string) => {
    const isNowInPlan = toggleUserLearningPlan(courseId);
    setLearningPlan(getUserLearningPlan());
    showToast(isNowInPlan ? 'Added course to your personal Learning Plan! 📋' : 'Removed course from Learning Plan.');
  };

  // Video action toggles
  const handleToggleCompletedVideo = (videoId: string) => {
    const isNowDone = toggleUserCompletedVideo(videoId);
    setCompletedVideos(getUserCompletedVideos());
    showToast(isNowDone ? 'Video tutorial marked as completed! ✓' : 'Video tutorial marked as uncompleted.');
  };

  const handlePlayVideo = (video: YouTubeTutorial) => {
    setPlayingVideo(video);
  };

  // Filter YouTube Tutorials
  const filteredVideos = currentDomain.youtubeVideos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
      v.description.toLowerCase().includes(videoSearch.toLowerCase()) ||
      v.channelName.toLowerCase().includes(videoSearch.toLowerCase()) ||
      v.topic.toLowerCase().includes(videoSearch.toLowerCase());

    const matchesLevel =
      videoLevelFilter === 'all' || v.level.toLowerCase() === videoLevelFilter.toLowerCase();

    const matchesTopic =
      videoTopicFilter === 'all' || v.topic.toLowerCase() === videoTopicFilter.toLowerCase();

    return matchesSearch && matchesLevel && matchesTopic;
  });

  // Extract unique topics from the current domain's videos
  const availableTopics = Array.from(new Set(currentDomain.youtubeVideos.map((v) => v.topic)));

  // Next recommended video in sequential path
  const nextVideoIndex = currentDomain.youtubeVideos.findIndex((v) => !completedVideos.includes(v.id));
  const nextRecommendedVideo = nextVideoIndex !== -1 ? currentDomain.youtubeVideos[nextVideoIndex] : null;

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto font-sans pb-16 text-[#334155]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[6000] bg-[#0B1F3A] text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= AUDIO NARRATOR FLOATING BAR ================= */}
      {isSpeaking && (
        <div className="sticky top-20 z-30 bg-[#0B1F3A] text-white border border-[#5B2EFF]/50 rounded-2xl p-3.5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5B2EFF] text-white flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8AAFF]">
                Audio Learning Player • Web Speech API
              </div>
              <div className="text-xs font-bold text-white truncate max-w-sm sm:max-w-md">
                {activeSpeechTitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Speed Control */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg text-xs font-bold">
              <span>Speed:</span>
              {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`px-1.5 py-0.5 rounded text-[11px] cursor-pointer ${
                    speechRate === rate ? 'bg-[#5B2EFF] text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Pause / Resume */}
            {isPaused ? (
              <button
                onClick={handleResumeSpeaking}
                className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                title="Resume reading"
              >
                <Play className="w-4 h-4 fill-white" />
              </button>
            ) : (
              <button
                onClick={handlePauseSpeaking}
                className="p-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer"
                title="Pause reading"
              >
                <Pause className="w-4 h-4" />
              </button>
            )}

            {/* Stop */}
            <button
              onClick={handleStopSpeaking}
              className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
              title="Stop audio narration"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EDE9FE] text-[#5B2EFF] mb-1">
            <span>{currentDomain.icon}</span>
            <span>{currentDomain.name}</span>
          </div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] tracking-tight mb-1">
            Personalized Courses &amp; YouTube Tutorials
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Sequential curriculum, verified video tutorials, and interactive audio narration configured for{' '}
            <strong className="text-[#0B1F3A]">{currentDomain.primaryRole}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <Link
            to="/profile"
            className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-4 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            title="Adjust your career domain preference in Profile"
          >
            <span>Change in Profile</span>
            <span className="text-xs text-[#5B2EFF]">→</span>
          </Link>
          <button
            onClick={() => navigate('/career-path')}
            className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4.5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            View Career Roadmap →
          </button>
        </div>
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#B8AAFF]">
            ✦ AI PERSONALIZED LEARNING · {currentDomain.name.toUpperCase()}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Sequential Learning Pathway for {currentDomain.primaryRole}
          </h2>
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
            SkillTwin AI dynamically indexes verified courses from Coursera, edX, freeCodeCamp, DeepLearning.AI, and official developer documentations. All videos are playable in-app with built-in Web Speech API audio narration.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl px-5 py-4 text-center shrink-0 self-start md:self-auto">
          <div className="text-[10px] font-bold tracking-wider uppercase text-[#B8AAFF] mb-1">
            TARGET CAREER ROLE
          </div>
          <div className="text-base font-extrabold text-white">
            {currentDomain.primaryRole}
          </div>
          <div className="text-[11px] text-[#00A88F] font-bold mt-1">
            {completedCourses.length} Courses Completed
          </div>
        </div>
      </div>

      {/* ================= NEXT RECOMMENDED STAGE NOTICE ================= */}
      {nextRecommendedVideo && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5B2EFF] text-white flex items-center justify-center font-bold text-sm shrink-0">
              ▶
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#5B2EFF]">
                Next Sequential Learning Step
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1F3A]">
                {nextRecommendedVideo.title}
              </h3>
              <p className="text-[11px] text-[#64748B]">
                {nextRecommendedVideo.channelName} • {nextRecommendedVideo.topic} • {nextRecommendedVideo.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePlayVideo(nextRecommendedVideo)}
              className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Watch Next Step</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= SECTION 1: SEQUENTIAL YOUTUBE TUTORIALS ================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-bold">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0B1F3A]">
                Sequential YouTube Tutorials ({currentDomain.name})
              </h2>
              <p className="text-xs text-[#64748B]">
                Structured sequence: watch in order, track progress, or listen to learning objectives
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-[#5B2EFF] bg-[#EDE9FE] px-3 py-1 rounded-full self-start sm:self-auto">
            {completedVideos.length} of {currentDomain.youtubeVideos.length} Tutorials Completed
          </div>
        </div>

        {/* Video Filters Bar */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={videoSearch}
              onChange={(e) => setVideoSearch(e.target.value)}
              placeholder={`Search ${currentDomain.name} videos by topic, channel, or keyword...`}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] pl-9 pr-3.5 py-2 rounded-lg text-xs text-[#334155] placeholder:text-[#94A3B8] outline-none focus:border-[#5B2EFF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={videoLevelFilter}
              onChange={(e) => setVideoLevelFilter(e.target.value)}
              className="bg-white border border-[#D8E0EA] rounded-lg px-3 py-2 text-xs text-[#475569] font-medium outline-none focus:border-[#5B2EFF] w-1/2 sm:w-auto"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {availableTopics.length > 0 && (
              <select
                value={videoTopicFilter}
                onChange={(e) => setVideoTopicFilter(e.target.value)}
                className="bg-white border border-[#D8E0EA] rounded-lg px-3 py-2 text-xs text-[#475569] font-medium outline-none focus:border-[#5B2EFF] w-1/2 sm:w-auto"
              >
                <option value="all">All Topics</option>
                {availableTopics.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* YouTube Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video, index) => {
            const isCompleted = completedVideos.includes(video.id);

            return (
              <div
                key={video.id}
                className={`bg-white border rounded-[15px] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
                  isCompleted ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-[#E2E8F0] hover:border-[#C4B5FD]'
                }`}
              >
                <div>
                  {/* Thumbnail Container */}
                  <div
                    className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                    onClick={() => handlePlayVideo(video)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#5B2EFF]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{video.duration}</span>
                    </div>
                    <div className="absolute top-2.5 left-2.5 bg-[#0B1F3A] text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                      <span>Step {index + 1}</span>
                      <span>•</span>
                      <span>{video.level}</span>
                    </div>

                    {isCompleted && (
                      <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-4.5 space-y-2">
                    <div className="text-[10px] font-extrabold uppercase text-[#5B2EFF] tracking-wider">
                      {video.channelName} • {video.topic}
                    </div>
                    <h3 className="text-sm font-bold text-[#0B1F3A] line-clamp-2 leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                      {video.description}
                    </p>

                    {/* Audio Listen for Objective */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleStartSpeaking(
                            `Learning Objective: ${video.title}`,
                            `${video.title}. By ${video.channelName}. Objective: ${video.description}. Estimated duration: ${video.duration}. Level: ${video.level}.`
                          )
                        }
                        className="text-[11px] font-bold text-[#5B2EFF] hover:text-[#4820DC] flex items-center gap-1 cursor-pointer bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg w-fit transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen to Objective</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4.5 pt-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayVideo(video)}
                      className="flex-1 bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Video</span>
                    </button>
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      title="Open video directly on YouTube"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Mark as Completed */}
                  <button
                    type="button"
                    onClick={() => handleToggleCompletedVideo(video.id)}
                    className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 border-[#E2E8F0]'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark as Completed</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= SECTION 2: STRUCTURED COURSES & CERTIFICATIONS ================= */}
      <div className="mt-12 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Domain-Specific Course Recommendations ({currentDomain.name})
            </h2>
            <p className="text-xs text-[#64748B]">
              Recommended courses mapped to your skill gaps with prerequisites, learning plan tracking, and audio narration
            </p>
          </div>

          <div className="text-xs font-bold text-[#00A88F] bg-[#E6F7F4] px-3 py-1 rounded-full self-start sm:self-auto">
            {completedCourses.length} of {currentDomain.courses.length} Courses Completed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {currentDomain.courses.map((course) => {
            const isCompleted = completedCourses.includes(course.id);
            const isInPlan = learningPlan.includes(course.id);
            const prerequisites = course.prerequisites || ['Basic computer literacy', `${currentDomain.requiredSkills[0]} syntax`];

            return (
              <div
                key={course.id}
                className={`bg-white border rounded-[15px] p-5.5 shadow-xs flex flex-col justify-between transition-all ${
                  isCompleted ? 'border-emerald-300 bg-emerald-50/15' : 'border-[#E2E8F0] hover:border-[#C4B5FD]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-[#EDE9FE] text-[#5B2EFF] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      {course.provider}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#00A88F]">
                        {course.freeStatus}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#0B1F3A] mb-1.5">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-3">
                    {course.description}
                  </p>

                  {/* Audio Listen for Course Description */}
                  <div className="mb-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleStartSpeaking(
                          `Course Overview: ${course.title}`,
                          `${course.title} provided by ${course.provider}. Difficulty level: ${course.level}. Duration: ${course.duration}. ${course.description} Topics covered include ${course.topics.join(', ')}.`
                        )
                      }
                      className="text-[11px] font-bold text-[#5B2EFF] hover:text-[#4820DC] flex items-center gap-1 cursor-pointer bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg w-fit transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen to Course Overview</span>
                    </button>
                  </div>

                  {/* Skills Covered */}
                  <div className="mb-3">
                    <div className="text-[10px] font-extrabold uppercase text-[#94A3B8] mb-1">
                      Skills Covered:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {course.skillsLearned.map((s, idx) => (
                        <span
                          key={idx}
                          className="bg-[#F3F7FC] text-[#475569] text-[10px] font-medium px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="mb-3 p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                      Prerequisites:
                    </span>
                    <div className="text-[11px] text-slate-600 font-medium">
                      {prerequisites.join(' • ')}
                    </div>
                  </div>

                  {/* Course Syllabus */}
                  <div className="space-y-1 mb-4">
                    <div className="text-[10px] font-extrabold uppercase text-[#94A3B8]">
                      Curriculum Topics:
                    </div>
                    <ul className="text-xs text-[#64748B] space-y-1 pl-1">
                      {course.topics.map((t, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5B2EFF]" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Course Actions & Status */}
                <div className="pt-3 border-t border-[#F1F5F9] space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span className="font-semibold">⏱ {course.duration}</span>
                    <span className="font-bold text-[#5B2EFF]">
                      {isCompleted ? '100% Completed' : `${course.progress}% Completed`}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-emerald-500 w-full' : 'bg-[#5B2EFF]'
                      }`}
                      style={{ width: isCompleted ? '100%' : `${course.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={course.courseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2 px-3 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Open Course</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleToggleLearningPlan(course.id)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                        isInPlan
                          ? 'bg-purple-50 text-[#5B2EFF] border-purple-200'
                          : 'bg-white text-slate-600 border-[#E2E8F0] hover:bg-slate-50'
                      }`}
                      title={isInPlan ? 'In your learning plan' : 'Add to your learning plan'}
                    >
                      {isInPlan ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{isInPlan ? 'In Plan' : 'Add to Plan'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleCompletedCourse(course.id)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-white text-slate-600 border-[#E2E8F0] hover:bg-slate-50'
                      }`}
                      title={isCompleted ? 'Mark as incomplete' : 'Mark course as completed'}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isCompleted ? 'Completed' : 'Mark Done'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= VIDEO EMBEDDED MODAL PLAYER ================= */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-[6000] bg-[#0B1F3A]/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <div
            className="bg-[#0B1F3A] border border-white/20 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Video Header */}
            <div className="p-4 px-5 bg-[#08172C] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs">
                  ▶
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white truncate max-w-md sm:max-w-xl">
                    {playingVideo.title}
                  </h3>
                  <div className="text-[11px] text-[#AFA0FF]">
                    {playingVideo.channelName} • {playingVideo.topic} • {playingVideo.duration}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPlayingVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Responsive Video Frame */}
            <div className="relative pt-[56.25%] bg-black">
              <iframe
                src={`${playingVideo.embedUrl}?autoplay=1`}
                title={playingVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Footer */}
            <div className="p-4 px-5 bg-[#08172C] text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <p className="text-[#CBD5E1] text-[11px] max-w-xl line-clamp-1">
                {playingVideo.description}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleCompletedVideo(playingVideo.id)}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{completedVideos.includes(playingVideo.id) ? 'Completed ✓' : 'Mark as Completed'}</span>
                </button>
                <a
                  href={playingVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
