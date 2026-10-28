import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  PlayCircle,
  Clock,
  Award,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
  Star,
  Users,
  Video,
  FileText,
  Code2,
  X,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize2,
  Check,
  HelpCircle,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLearning } from '../../context/LearningContext';

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessonsCount: number;
  completed: boolean;
  videoUrl?: string;
  summary?: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CourseItem {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modulesCount: number;
  progressPercentage: number;
  estimatedHours: number;
  rating: number;
  enrolledCount: string;
  description: string;
  image: string;
  instructor: string;
  modules: CourseModule[];
}

export const initialCoursesList: CourseItem[] = [
  {
    id: 'course-ml-01',
    title: 'Machine Learning A-Z: Algorithms & Practice',
    category: 'AI & Machine Learning',
    level: 'Intermediate',
    modulesCount: 12,
    progressPercentage: 42,
    estimatedHours: 24,
    rating: 4.9,
    enrolledCount: '14.2k',
    description: 'Master supervised, unsupervised learning, Ridge/Lasso regularization, ensemble algorithms (XGBoost, Random Forests) and scikit-learn pipelines.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80',
    instructor: 'Dr. Andrew Collins, AI Scientist',
    modules: [
      { id: 'm1', title: 'Data Preprocessing & Feature Engineering', duration: '2h 15m', lessonsCount: 6, completed: true },
      { id: 'm2', title: 'Linear Regression & Cost Functions', duration: '1h 45m', lessonsCount: 5, completed: true },
      { id: 'm3', title: 'Logistic Regression & Classification Metrics', duration: '2h 00m', lessonsCount: 6, completed: true },
      { id: 'm4', title: 'Regularization: Ridge & Lasso (L1/L2)', duration: '2h 30m', lessonsCount: 7, completed: false },
      { id: 'm5', title: 'Decision Trees & Random Forests', duration: '2h 10m', lessonsCount: 5, completed: false },
      { id: 'm6', title: 'Gradient Boosting & XGBoost Mastery', duration: '3h 00m', lessonsCount: 8, completed: false },
      { id: 'm7', title: 'Model Evaluation, ROC-AUC & Cross-Validation', duration: '1h 50m', lessonsCount: 4, completed: false },
    ],
  },
  {
    id: 'course-dl-02',
    title: 'Deep Learning & PyTorch from Zero to Hero',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    modulesCount: 14,
    progressPercentage: 28,
    estimatedHours: 32,
    rating: 4.9,
    enrolledCount: '9.8k',
    description: 'Understand neural networks from first principles. Build custom CNNs, RNNs, and attention Transformer models with PyTorch tensors and autograd.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    instructor: 'Elena Rostova, Senior Research Engineer',
    modules: [
      { id: 'm1', title: 'PyTorch Tensors, CUDA & GPU Acceleration', duration: '2h 00m', lessonsCount: 5, completed: true },
      { id: 'm2', title: 'Building Multi-Layer Perceptrons (MLPs)', duration: '2h 30m', lessonsCount: 6, completed: true },
      { id: 'm3', title: 'Convolutional Neural Networks (CNNs)', duration: '3h 15m', lessonsCount: 8, completed: false },
      { id: 'm4', title: 'Recurrent Networks & LSTMs', duration: '2h 45m', lessonsCount: 6, completed: false },
      { id: 'm5', title: 'Transformers & Self-Attention Mechanisms', duration: '4h 00m', lessonsCount: 10, completed: false },
    ],
  },
  {
    id: 'course-sql-03',
    title: 'SQL for Data Science & Analytical Engineering',
    category: 'Databases',
    level: 'Intermediate',
    modulesCount: 8,
    progressPercentage: 60,
    estimatedHours: 16,
    rating: 4.8,
    enrolledCount: '21.5k',
    description: 'Master advanced SQL queries, window functions (ROW_NUMBER, DENSE_RANK), CTEs, indexing strategies, and database query optimization.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
    instructor: 'Marcus Vance, Principal Data Architect',
    modules: [
      { id: 'm1', title: 'Relational Database Fundamentals & Schema Design', duration: '1h 30m', lessonsCount: 4, completed: true },
      { id: 'm2', title: 'Complex Joins (Inner, Left, Cross, Self)', duration: '2h 00m', lessonsCount: 6, completed: true },
      { id: 'm3', title: 'Window Functions & Analytical Partitions', duration: '2h 45m', lessonsCount: 7, completed: true },
      { id: 'm4', title: 'Common Table Expressions (CTEs) & Subqueries', duration: '2h 15m', lessonsCount: 5, completed: false },
      { id: 'm5', title: 'Query Profiling, B-Trees & Index Optimization', duration: '3h 00m', lessonsCount: 8, completed: false },
    ],
  },
  {
    id: 'course-py-04',
    title: 'Modern Python for Production Software & AI',
    category: 'Programming',
    level: 'Advanced',
    modulesCount: 10,
    progressPercentage: 82,
    estimatedHours: 18,
    rating: 4.9,
    enrolledCount: '35.0k',
    description: 'Advanced Python idioms, OOP design patterns, asynchronous programming (asyncio), type hints, memory management, and package distribution.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    instructor: 'Sarah Jenkins, Core Python Contributor',
    modules: [
      { id: 'm1', title: 'Generators, Iterators & List Comprehensions', duration: '1h 45m', lessonsCount: 5, completed: true },
      { id: 'm2', title: 'Decorators, Context Managers & Closures', duration: '2h 10m', lessonsCount: 6, completed: true },
      { id: 'm3', title: 'Object-Oriented Programming (OOP) & Dunder Methods', duration: '2h 30m', lessonsCount: 7, completed: true },
      { id: 'm4', title: 'Asyncio, Threading & Multiprocessing', duration: '3h 00m', lessonsCount: 8, completed: true },
      { id: 'm5', title: 'Type Hinting with Pydantic & Mypy', duration: '2h 00m', lessonsCount: 5, completed: false },
    ],
  },
  {
    id: 'course-fs-05',
    title: 'Full Stack Web Engineering with React 19 & Node.js',
    category: 'Full Stack Development',
    level: 'Intermediate',
    modulesCount: 16,
    progressPercentage: 15,
    estimatedHours: 36,
    rating: 4.8,
    enrolledCount: '18.7k',
    description: 'Build production-grade full-stack applications with React, TypeScript, Tailwind CSS, Express, PostgreSQL, Prisma ORM, and JWT authentication.',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=80',
    instructor: 'David Kim, Staff Frontend Architect',
    modules: [
      { id: 'm1', title: 'React Fundamentals, Hooks & Component Lifecycle', duration: '3h 00m', lessonsCount: 8, completed: true },
      { id: 'm2', title: 'State Management & Custom Hooks', duration: '2h 30m', lessonsCount: 6, completed: false },
      { id: 'm3', title: 'Node.js, Express & RESTful API Architecture', duration: '3h 15m', lessonsCount: 7, completed: false },
      { id: 'm4', title: 'PostgreSQL Database Integration & Migrations', duration: '2h 45m', lessonsCount: 6, completed: false },
      { id: 'm5', title: 'Authentication, Authorization & Security Best Practices', duration: '3h 30m', lessonsCount: 8, completed: false },
    ],
  },
  {
    id: 'course-sys-06',
    title: 'System Design for Scalable Distributed Systems',
    category: 'Architecture',
    level: 'Advanced',
    modulesCount: 10,
    progressPercentage: 20,
    estimatedHours: 22,
    rating: 4.9,
    enrolledCount: '12.4k',
    description: 'Learn high-scale distributed systems design: caching strategies (Redis), load balancing, database sharding, CAP theorem, and message queues (Kafka).',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    instructor: 'Alex Kumar, Ex-Principal Architect',
    modules: [
      { id: 'm1', title: 'Horizontal vs Vertical Scaling & Load Balancers', duration: '1h 50m', lessonsCount: 4, completed: true },
      { id: 'm2', title: 'Distributed Caching Strategies (Redis / Memcached)', duration: '2h 15m', lessonsCount: 5, completed: false },
      { id: 'm3', title: 'Database Sharding, Replication & CAP Theorem', duration: '2h 45m', lessonsCount: 6, completed: false },
      { id: 'm4', title: 'Asynchronous Processing with Message Queues (Kafka)', duration: '3h 00m', lessonsCount: 7, completed: false },
      { id: 'm5', title: 'Designing a High-Throughput URL Shortener & Feed', duration: '3h 30m', lessonsCount: 8, completed: false },
    ],
  },
];

export const CATEGORIES_LIST = [
  'All',
  'AI & Machine Learning',
  'Databases & SQL',
  'Full Stack Development',
  'System Design',
];

export const CoursesView: React.FC = () => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';
  const { activeCareerGoal, careerTracks } = useLearning();

  const [coursesList, setCoursesList] = useState<CourseItem[]>(initialCoursesList);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  // Active Lesson Player Modal State
  const [activePlayingModule, setActivePlayingModule] = useState<{ course: CourseItem; module: CourseModule } | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [videoSpeed, setVideoSpeed] = useState<'1x' | '1.25x' | '1.5x' | '2x'>('1x');
  const [videoProgressSeconds, setVideoProgressSeconds] = useState(45);
  const [playerTab, setPlayerTab] = useState<'video' | 'notes' | 'quiz'>('video');
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const activeTrack = careerTracks.find((t) => t.id === activeCareerGoal) || careerTracks[0];

  const filteredCourses = coursesList.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      course.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Databases & SQL' && (course.category.includes('Database') || course.title.includes('SQL'))) ||
      (selectedCategory === 'System Design' && (course.category.includes('Architecture') || course.title.includes('System')));
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch =
      searchQuery.trim() === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleStartLesson = (course: CourseItem, mod: CourseModule) => {
    setActivePlayingModule({ course, module: mod });
    setIsPlayingVideo(true);
    setVideoProgressSeconds(0);
    setPlayerTab('video');
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
  };

  const handleToggleModuleComplete = (courseId: string, moduleId: string) => {
    setCoursesList((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        const updatedModules = course.modules.map((m) =>
          m.id === moduleId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedModules.filter((m) => m.completed).length;
        const newProgress = Math.round((completedCount / updatedModules.length) * 100);

        const updatedCourse = {
          ...course,
          modules: updatedModules,
          progressPercentage: newProgress,
        };

        if (selectedCourse && selectedCourse.id === courseId) {
          setSelectedCourse(updatedCourse);
        }

        if (activePlayingModule && activePlayingModule.course.id === courseId) {
          const updatedActiveMod = updatedModules.find((m) => m.id === moduleId) || activePlayingModule.module;
          setActivePlayingModule({ course: updatedCourse, module: updatedActiveMod });
        }

        if (newProgress === 100) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }

        return updatedCourse;
      })
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Page Title & Scope Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
        isLight ? 'border-slate-200/80' : 'border-slate-800'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Courses
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800">
              Interactive Curriculum
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            Structured modular courses tailored to accelerate your {activeTrack.roleName} career path.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-semibold ${
            isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}>
            <span>Showing {filteredCourses.length} Courses</span>
          </div>
        </div>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                    : isLight
                    ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className={`relative w-full sm:w-64 flex items-center rounded-xl border px-3 py-1.5 ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
        }`}>
          <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs focus:outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Clean Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={`rounded-2xl border overflow-hidden shadow-2xs flex flex-col justify-between transition-all ${
              isLight
                ? 'bg-white border-slate-200/90 hover:border-slate-300'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              {/* Clean Image Banner */}
              <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-2">
                <div className="text-[11px] font-medium text-slate-400">
                  {course.category}
                </div>
                <h3 className={`text-sm font-bold leading-snug ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {course.title}
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} line-clamp-2 leading-relaxed`}>
                  {course.description}
                </p>

                {/* Progress bar */}
                <div className="pt-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      {course.modulesCount} modules
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600">
                      {course.progressPercentage}% complete
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${course.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Footer */}
            <div className={`px-5 py-3 border-t ${isLight ? 'border-slate-100 bg-slate-50/40' : 'border-slate-800/80 bg-slate-950/20'} flex items-center justify-between`}>
              <span className="text-xs text-slate-500">{course.instructor.split(',')[0]}</span>
              <button
                onClick={() => setSelectedCourse(course)}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{course.progressPercentage > 0 ? 'Resume' : 'Start'}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail / Curriculum Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className={`w-full max-w-2xl rounded-3xl border shadow-xl overflow-hidden flex flex-col max-h-[85vh] ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Header */}
              <div className={`p-6 border-b flex items-start justify-between gap-4 ${
                isLight ? 'border-slate-100 bg-slate-50/60' : 'border-slate-800 bg-slate-950/60'
              }`}>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300">
                      {selectedCourse.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {selectedCourse.level} • {selectedCourse.modulesCount} Modules
                    </span>
                  </div>
                  <h2 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {selectedCourse.title}
                  </h2>
                  <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} mt-1`}>
                    Instructor: {selectedCourse.instructor}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isLight
                      ? 'border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                      : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Curriculum List */}
              <div className="p-6 overflow-y-auto space-y-3 scrollbar-thin">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs uppercase font-bold tracking-wider ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                    Curriculum Breakdown
                  </h3>
                  <span className="text-xs font-bold text-indigo-600">
                    {selectedCourse.modules.filter((m) => m.completed).length}/{selectedCourse.modules.length} Completed
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedCourse.modules.map((mod, idx) => (
                    <div
                      key={mod.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                        mod.completed
                          ? isLight
                            ? 'bg-emerald-50/40 border-emerald-200/80 text-emerald-950'
                            : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                          : isLight
                          ? 'bg-white border-slate-200/80 hover:border-slate-300'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleModuleComplete(selectedCourse.id, mod.id)}
                          title="Toggle completion status"
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-transform active:scale-95 ${
                            mod.completed
                              ? 'bg-emerald-500 text-white shadow-xs'
                              : isLight
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {mod.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </button>
                        <div>
                          <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {mod.title}
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {mod.lessonsCount} lessons • {mod.duration}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartLesson(selectedCourse, mod)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                            mod.completed
                              ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs'
                          }`}
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>{mod.completed ? 'Review' : 'Play Lesson'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className={`p-4 border-t ${isLight ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800 bg-slate-950/50'} flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600">
                    {selectedCourse.progressPercentage}% Completed
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Lesson Player Modal */}
      <AnimatePresence>
        {activePlayingModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Player Top Bar */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-950 text-white">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {activePlayingModule.course.title}
                  </span>
                  <h3 className="text-sm font-bold truncate">
                    {activePlayingModule.module.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActivePlayingModule(null)}
                  className="p-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Player Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                {/* Video Simulation Canvas */}
                <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden flex flex-col justify-between p-4 shadow-lg border border-slate-800 group">
                  <div className="flex items-center justify-between text-white text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      HD 1080p Interactive Stream
                    </span>
                    <span className="text-[11px] text-slate-300 bg-black/60 px-2 py-0.5 rounded-md">
                      Instructor: {activePlayingModule.course.instructor}
                    </span>
                  </div>

                  {/* Center Play Button Graphic */}
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xl backdrop-blur-sm"
                    >
                      {isPlayingVideo ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 translate-x-0.5" />}
                    </button>
                  </div>

                  {/* Video Controls Bar */}
                  <div className="bg-slate-950/90 backdrop-blur-md rounded-xl p-3 flex flex-col gap-2 text-white">
                    {/* Scrubber bar */}
                    <div className="w-full bg-slate-700/80 h-1.5 rounded-full overflow-hidden cursor-pointer">
                      <div className="bg-indigo-500 h-full w-2/5 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setIsPlayingVideo(!isPlayingVideo)} className="hover:text-indigo-400">
                          {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <span className="text-[11px] text-slate-300">08:24 / {activePlayingModule.module.duration}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Speed Toggle */}
                        {(['1x', '1.25x', '1.5x', '2x'] as const).map((spd) => (
                          <button
                            key={spd}
                            onClick={() => setVideoSpeed(spd)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              videoSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {spd}
                          </button>
                        ))}
                        <Volume2 className="w-4 h-4 text-slate-300 ml-1" />
                        <Maximize2 className="w-3.5 h-3.5 text-slate-300 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs for Lesson Notes & Quick Knowledge Check */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <button
                      onClick={() => setPlayerTab('video')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        playerTab === 'video'
                          ? 'bg-indigo-600 text-white'
                          : isLight
                          ? 'text-slate-600 hover:bg-slate-100'
                          : 'text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Lesson Overview</span>
                    </button>

                    <button
                      onClick={() => setPlayerTab('notes')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        playerTab === 'notes'
                          ? 'bg-indigo-600 text-white'
                          : isLight
                          ? 'text-slate-600 hover:bg-slate-100'
                          : 'text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Key Takeaways & Formulas</span>
                    </button>

                    <button
                      onClick={() => setPlayerTab('quiz')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        playerTab === 'quiz'
                          ? 'bg-indigo-600 text-white'
                          : isLight
                          ? 'text-slate-600 hover:bg-slate-100'
                          : 'text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Knowledge Check Quiz</span>
                    </button>
                  </div>

                  {playerTab === 'video' && (
                    <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Module Objective:
                      </p>
                      <p>
                        In this module, you are learning the core foundations of <strong>{activePlayingModule.module.title}</strong>. We will break down mathematical equations into Python code implementations and understand how to test them against production workloads.
                      </p>
                      <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="text-indigo-900 dark:text-indigo-200 text-xs font-medium">
                          Tip: Complete the knowledge check quiz below to reinforce the core equations in your Skill Twin profile!
                        </span>
                      </div>
                    </div>
                  )}

                  {playerTab === 'notes' && (
                    <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <h4 className="font-bold text-slate-900 dark:text-white">Structured Study Notes:</h4>
                      <ul className="list-disc pl-5 space-y-1.5">
                        <li><strong>Feature scaling:</strong> Always normalize and standardize before calculating Euclidean distances.</li>
                        <li><strong>Hyperparameter tuning:</strong> Use 5-fold cross-validation with grid search to avoid data leakage.</li>
                        <li><strong>Regularization:</strong> L1 (Lasso) drives weights to zero (feature selection); L2 (Ridge) shrinks weights smoothly.</li>
                      </ul>
                    </div>
                  )}

                  {playerTab === 'quiz' && (
                    <div className="space-y-4 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        Quick Check: Which regularization technique can effectively perform automatic feature selection?
                      </p>
                      <div className="space-y-2">
                        {['L1 Regularization (Lasso)', 'L2 Regularization (Ridge)', 'ElasticNet without L1 component', 'Standard Gradient Descent'].map((opt, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              if (!quizSubmitted) setQuizSelectedOption(idx);
                            }}
                            className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                              quizSubmitted
                                ? idx === 0
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                  : quizSelectedOption === idx
                                  ? 'bg-rose-50 border-rose-300 text-rose-900'
                                  : isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                                : quizSelectedOption === idx
                                ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-900 dark:text-white font-bold'
                                : isLight ? 'bg-slate-50 border-slate-200 hover:border-slate-300' : 'bg-slate-950 border-slate-800'
                            }`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && idx === 0 && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                          </div>
                        ))}
                      </div>

                      {!quizSubmitted ? (
                        <button
                          onClick={() => setQuizSubmitted(true)}
                          disabled={quizSelectedOption === null}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-xs">
                          Correct! Lasso penalty penalizes the absolute value of coefficients, forcing irrelevant weights to exactly zero.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Player Footer */}
              <div className={`p-4 border-t ${isLight ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800 bg-slate-950/50'} flex flex-col sm:flex-row items-center justify-between gap-3`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Status: {activePlayingModule.module.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      handleToggleModuleComplete(activePlayingModule.course.id, activePlayingModule.module.id);
                    }}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                      activePlayingModule.module.completed
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{activePlayingModule.module.completed ? 'Completed (Click to Reopen)' : 'Mark Lesson as Completed'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
