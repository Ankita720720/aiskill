import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Milestone,
  CheckCircle2,
  PlayCircle,
  Clock,
  BookOpen,
  ChevronRight,
  Video,
  FileText,
  HelpCircle,
  Award,
  Sparkles,
  ArrowRight,
  FolderGit2,
  Layers,
  X,
  Download,
  ExternalLink,
  Play,
  Check,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLearning } from '../../context/LearningContext';

interface LearningPathViewProps {
  onStartCourse?: () => void;
  onNavigateAssessments?: () => void;
  onNavigateChallenges?: () => void;
  onNavigateProjects?: () => void;
}

export interface RoadmapMilestone {
  id: string;
  stepNumber: number;
  title: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  progressPercentage: number;
  estimatedTime: string;
  whyLearn: string;
  resources: { type: 'Video' | 'Notes' | 'PDF'; title: string; duration: string }[];
  practiceQuizCount: number;
  projectTitle: string;
}

export const initialMilestones: RoadmapMilestone[] = [
  {
    id: 'm-1',
    stepNumber: 1,
    title: 'Python Advanced',
    status: 'Completed',
    progressPercentage: 100,
    estimatedTime: '2 weeks',
    whyLearn: 'Core programming foundation required for ML models, data manipulation, and building scalable pipelines.',
    resources: [
      { type: 'Video', title: 'Advanced OOP & Magic Methods Masterclass', duration: '1h 30m' },
      { type: 'Notes', title: 'Decorators, Iterators & Memory Optimization in Python', duration: '20 min read' },
      { type: 'PDF', title: 'Python Production Cheatsheet & Best Practices', duration: 'Download' },
    ],
    practiceQuizCount: 25,
    projectTitle: 'Multi-threaded Log File Analyzer & Parser',
  },
  {
    id: 'm-2',
    stepNumber: 2,
    title: 'SQL for Data Science',
    status: 'In Progress',
    progressPercentage: 60,
    estimatedTime: '2 weeks',
    whyLearn: 'Extract, aggregate, and transform real-world datasets using window functions, joins, and indexing strategies.',
    resources: [
      { type: 'Video', title: 'Window Functions (ROW_NUMBER, DENSE_RANK) Deep Dive', duration: '2h 00m' },
      { type: 'Notes', title: 'Common Table Expressions (CTEs) & Subquery Optimization', duration: '25 min read' },
      { type: 'PDF', title: 'PostgreSQL & SQL Performance Tuning Guide', duration: 'Download' },
    ],
    practiceQuizCount: 30,
    projectTitle: 'E-commerce User Cohort Retention & Analytics System',
  },
  {
    id: 'm-3',
    stepNumber: 3,
    title: 'Machine Learning',
    status: 'Not Started',
    progressPercentage: 0,
    estimatedTime: '3 weeks',
    whyLearn: 'Mathematical formulation of Linear/Logistic Regression, Decision Trees, Ensembles (XGBoost), and regularizations (Ridge/Lasso).',
    resources: [
      { type: 'Video', title: 'Gradient Descent & Regularization from Scratch', duration: '2h 45m' },
      { type: 'Notes', title: 'Bias-Variance Tradeoff, Precision vs Recall & ROC-AUC', duration: '30 min read' },
      { type: 'PDF', title: 'Scikit-Learn Algorithms Cheat Map & Equations', duration: 'Download' },
    ],
    practiceQuizCount: 40,
    projectTitle: 'Predictive Customer Churn Model with XGBoost',
  },
  {
    id: 'm-4',
    stepNumber: 4,
    title: 'Deep Learning',
    status: 'Not Started',
    progressPercentage: 0,
    estimatedTime: '4 weeks',
    whyLearn: 'Understand neural networks, backpropagation calculus, PyTorch tensors, CNNs, RNNs, and attention Transformer mechanisms.',
    resources: [
      { type: 'Video', title: 'PyTorch Autograd & Multi-Layer Perceptrons', duration: '3h 15m' },
      { type: 'Notes', title: 'Convolutional Filters, Pooling & Transfer Learning', duration: '35 min read' },
      { type: 'PDF', title: 'PyTorch Architecture & CUDA GPU Optimization', duration: 'Download' },
    ],
    practiceQuizCount: 35,
    projectTitle: 'Real-time Object Detection with PyTorch & YOLO',
  },
  {
    id: 'm-5',
    stepNumber: 5,
    title: 'Build AI Projects',
    status: 'Not Started',
    progressPercentage: 0,
    estimatedTime: '3 weeks',
    whyLearn: 'Create verified real-world portfolio assets: end-to-end LLM chatbots, recommendation engines, and computer vision systems.',
    resources: [
      { type: 'Video', title: 'Full Stack AI App with FastAPI & React', duration: '4h 00m' },
      { type: 'Notes', title: 'RAG Architecture with Vector Databases (Chroma/Pinecone)', duration: '40 min read' },
      { type: 'PDF', title: 'AI System Architecture Diagrams & Templates', duration: 'Download' },
    ],
    practiceQuizCount: 20,
    projectTitle: 'Enterprise Retrieval-Augmented Generation (RAG) System',
  },
  {
    id: 'm-6',
    stepNumber: 6,
    title: 'System Design',
    status: 'Not Started',
    progressPercentage: 0,
    estimatedTime: '2 weeks',
    whyLearn: 'Design resilient, scalable AI infrastructure with caching (Redis), asynchronous queues (Kafka), and container orchestration.',
    resources: [
      { type: 'Video', title: 'Designing High-Throughput ML Serving Systems', duration: '2h 30m' },
      { type: 'Notes', title: 'Model Latency, Batching vs Streaming & Caching', duration: '25 min read' },
      { type: 'PDF', title: 'System Design Interview Cheatsheet', duration: 'Download' },
    ],
    practiceQuizCount: 25,
    projectTitle: 'Scalable Real-time Video Recommendation Pipeline',
  },
  {
    id: 'm-7',
    stepNumber: 7,
    title: 'Interview Preparation',
    status: 'Not Started',
    progressPercentage: 0,
    estimatedTime: '2 weeks',
    whyLearn: 'Master technical, coding, aptitude, system design, and behavioral interviews with AI simulation.',
    resources: [
      { type: 'Video', title: 'Top 50 Most Repeated AI Engineer Interview Questions', duration: '3h 00m' },
      { type: 'Notes', title: 'Behavioral STAR Method & System Design Walkthroughs', duration: '30 min read' },
      { type: 'PDF', title: 'AI Engineer Placement Handbook', duration: 'Download' },
    ],
    practiceQuizCount: 50,
    projectTitle: 'Complete Full Technical & Behavioral Mock Evaluation',
  },
];

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  onStartCourse,
  onNavigateAssessments,
  onNavigateChallenges,
  onNavigateProjects,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';
  const { activeCareerGoal, careerTracks } = useLearning();

  const activeTrack = careerTracks.find((t) => t.id === activeCareerGoal) || careerTracks[0];
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('m-2');
  const [activeResource, setActiveResource] = useState<{ type: 'Video' | 'Notes' | 'PDF'; title: string; duration: string } | null>(null);
  const [downloadedCheatsheet, setDownloadedCheatsheet] = useState(false);

  const currentMilestone =
    initialMilestones.find((m) => m.id === selectedMilestoneId) || initialMilestones[1];

  const getStatusBadge = (status: 'Completed' | 'In Progress' | 'Not Started') => {
    if (status === 'Completed') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>Completed</span>
        </span>
      );
    }
    if (status === 'In Progress') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          <span>In Progress</span>
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400">
        Not Started
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
              Personalized Learning Path
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950 dark:text-indigo-300">
              AI Roadmap
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            Step-by-step roadmap to become a Job-Ready {activeTrack.roleName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Overall Progress:</span>
          <span className="text-xs font-bold text-indigo-600">23% Complete</span>
        </div>
      </div>

      {/* Main 2-Column: Left Vertical Roadmap Steps, Right Detailed Milestone Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Steps List */}
        <div className="lg:col-span-5 space-y-2.5">
          {initialMilestones.map((m) => {
            const isSelected = selectedMilestoneId === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setSelectedMilestoneId(m.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs'
                    : isLight
                    ? 'bg-white border-slate-200/80 hover:border-slate-300'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      m.status === 'Completed'
                        ? 'bg-emerald-500 text-white'
                        : m.status === 'In Progress'
                        ? 'bg-indigo-600 text-white'
                        : isLight
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {m.status === 'Completed' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      m.stepNumber
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className={`text-xs font-bold truncate ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {m.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Est. {m.estimatedTime}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  {getStatusBadge(m.status)}
                  <ChevronRight className={`w-4 h-4 ${
                    isSelected ? 'text-indigo-600' : 'text-slate-400'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (7 cols): Selected Milestone Full Overview */}
        <div
          className={`lg:col-span-7 p-6 sm:p-7 rounded-3xl border shadow-xs flex flex-col justify-between space-y-6 ${
            isLight ? 'bg-white border-slate-200/90' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Step {currentMilestone.stepNumber} of 7
                </span>
                {getStatusBadge(currentMilestone.status)}
              </div>
              <h2 className={`text-xl font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {currentMilestone.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Estimated Time: {currentMilestone.estimatedTime}</span>
                </span>
                <span>•</span>
                <span className="font-bold text-indigo-600">
                  {currentMilestone.progressPercentage}% Completed
                </span>
              </div>
            </div>

            {/* Why You're Learning This */}
            <div className={`p-4 rounded-2xl border ${
              isLight ? 'bg-slate-50/70 border-slate-200/80' : 'bg-slate-950/60 border-slate-800'
            }`}>
              <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'} mb-1`}>
                Why you're learning this:
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} leading-relaxed`}>
                {currentMilestone.whyLearn}
              </p>
            </div>

            {/* Resources (Video, Notes, PDF) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className={`text-xs uppercase font-bold tracking-wider ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                  Curated Resources
                </h4>
                <span className="text-[11px] text-indigo-600 font-medium">Click to view/study</span>
              </div>
              <div className="space-y-2">
                {currentMilestone.resources.map((res, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveResource(res);
                      setDownloadedCheatsheet(false);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all hover:scale-[1.01] ${
                      isLight ? 'bg-white border-slate-200/80 hover:border-indigo-300' : 'bg-slate-950/60 border-slate-800 hover:border-indigo-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 shrink-0">
                        {res.type === 'Video' ? (
                          <Video className="w-3.5 h-3.5" />
                        ) : res.type === 'Notes' ? (
                          <FileText className="w-3.5 h-3.5" />
                        ) : (
                          <BookOpen className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span className={`text-xs font-semibold truncate ${
                        isLight ? 'text-slate-800' : 'text-slate-200'
                      }`}>
                        {res.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold shrink-0 flex items-center gap-1">
                      <span>{res.duration}</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Practice & Project */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-2xl border flex flex-col justify-between gap-2.5 ${
                isLight ? 'bg-slate-50/70 border-slate-200/80' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Practice & Quiz</span>
                  <p className={`text-xs font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {currentMilestone.practiceQuizCount} Practice Questions
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (onNavigateAssessments) onNavigateAssessments();
                    else if (onNavigateChallenges) onNavigateChallenges();
                  }}
                  className="w-full py-1.5 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-indigo-200 dark:border-indigo-800"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Start Practice Quiz</span>
                </button>
              </div>

              <div className={`p-3.5 rounded-2xl border flex flex-col justify-between gap-2.5 ${
                isLight ? 'bg-slate-50/70 border-slate-200/80' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Milestone Project</span>
                  <p className={`text-xs font-bold mt-0.5 truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {currentMilestone.projectTitle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (onNavigateProjects) onNavigateProjects();
                  }}
                  className="w-full py-1.5 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-indigo-200 dark:border-indigo-800"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Open Project Workspace</span>
                </button>
              </div>
            </div>

          </div>

          {/* Primary Bottom Action */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <button
              onClick={() => {
                if (onStartCourse) onStartCourse();
              }}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>{currentMilestone.status === 'Completed' ? 'Review Milestone in Courses' : 'Continue Learning in Courses'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Resource Viewer Modal */}
      <AnimatePresence>
        {activeResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className={`p-5 border-b flex items-start justify-between gap-4 ${
                isLight ? 'border-slate-100 bg-slate-50/60' : 'border-slate-800 bg-slate-950/60'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950">
                    {activeResource.type === 'Video' ? <Video className="w-4 h-4" /> : activeResource.type === 'Notes' ? <FileText className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      {activeResource.type} Resource
                    </span>
                    <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {activeResource.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveResource(null)}
                  className={`p-1.5 rounded-xl border transition-colors ${
                    isLight ? 'border-slate-200 text-slate-500 hover:bg-slate-100' : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed scrollbar-thin">
                {activeResource.type === 'Video' ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
                      <div className="text-center text-white space-y-2">
                        <Play className="w-10 h-10 mx-auto text-indigo-400 fill-indigo-400 animate-pulse" />
                        <p className="font-semibold text-xs">{activeResource.title}</p>
                        <p className="text-[11px] text-slate-400">Duration: {activeResource.duration}</p>
                      </div>
                    </div>
                    <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      This video lecture covers essential principles, core algorithms, and practical implementation patterns for <strong>{currentMilestone.title}</strong>.
                    </p>
                  </div>
                ) : activeResource.type === 'Notes' ? (
                  <div className="space-y-3">
                    <div className={`p-4 rounded-2xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                      <h4 className="font-bold text-indigo-600">Key Conceptual Highlights</h4>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600 dark:text-slate-300">
                        <li>Understand time and space complexity tradeoffs before selecting algorithms.</li>
                        <li>Implement robust unit test assertions to guard against edge cases and data shifts.</li>
                        <li>Maintain clean documentation and type definitions across all pipeline steps.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-center py-4">
                    <BookOpen className="w-12 h-12 text-indigo-600 mx-auto" />
                    <div>
                      <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {activeResource.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Comprehensive reference cheatsheet with code syntax, formulas, and architecture patterns.
                      </p>
                    </div>

                    <button
                      onClick={() => setDownloadedCheatsheet(true)}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 ${
                        downloadedCheatsheet
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {downloadedCheatsheet ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                      <span>{downloadedCheatsheet ? 'Downloaded Successfully' : 'Download Cheatsheet (PDF)'}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className={`p-4 border-t ${isLight ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800 bg-slate-950/50'} flex items-center justify-between`}>
                <span className="text-[11px] text-slate-500">
                  {currentMilestone.title} • Step {currentMilestone.stepNumber}
                </span>
                <button
                  onClick={() => setActiveResource(null)}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
