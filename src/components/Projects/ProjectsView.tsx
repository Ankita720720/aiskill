import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Award,
  Sparkles,
  CheckCircle2,
  Code2,
  Layers,
  Plus,
  Play,
  X,
  FileCode,
  Check,
  ChevronRight,
  BookOpen,
  Send,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technology: string[];
  progressPercentage: number;
  description: string;
  image: string;
  requirements: string[];
  resources: string[];
  tasks: { id: string; title: string; completed: boolean }[];
  githubConnected?: boolean;
}

export const initialProjectsList: ProjectItem[] = [
  {
    id: 'p-1',
    title: 'AI Chatbot with RAG & LLM',
    category: 'AI & Machine Learning',
    difficulty: 'Advanced',
    technology: ['Python', 'LangChain', 'FastAPI', 'Vector DB', 'React'],
    progressPercentage: 65,
    description: 'Build a multi-turn AI chatbot with Retrieval-Augmented Generation, vector embeddings, and citation ranking.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    requirements: [
      'Implement document chunking and vector indexing with FAISS or ChromaDB',
      'Support conversational memory and multi-turn context retention',
      'Deploy FastAPI endpoints with streaming responses and JWT auth',
    ],
    resources: [
      'LangChain RAG Architecture Guide & Documentation',
      'FastAPI Async Streaming Response Tutorial',
      'Chunking & Hybrid Search Strategies PDF',
    ],
    tasks: [
      { id: 't1', title: 'Setup Python environment and install LangChain/FastAPI', completed: true },
      { id: 't2', title: 'Implement PDF/Text parser and chunking utility', completed: true },
      { id: 't3', title: 'Generate vector embeddings and store in ChromaDB', completed: true },
      { id: 't4', title: 'Connect LLM generation with retrieved context', completed: false },
      { id: 't5', title: 'Build React UI with streaming markdown support', completed: false },
    ],
    githubConnected: true,
  },
  {
    id: 'p-2',
    title: 'Movie & Content Recommendation System',
    category: 'AI & Data Science',
    difficulty: 'Intermediate',
    technology: ['Python', 'Pandas', 'Scikit-Learn', 'Surprise', 'Streamlit'],
    progressPercentage: 40,
    description: 'Collaborative filtering and content-based recommendation engine for personalized media discovery.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    requirements: [
      'Matrix factorization using Singular Value Decomposition (SVD)',
      'Cosine similarity over cosine user-item preference vectors',
      'Interactive Streamlit UI for live recommendations',
    ],
    resources: [
      'Collaborative Filtering vs Content-Based Systems Notes',
      'Matrix Factorization & SVD Mathematics Walkthrough',
    ],
    tasks: [
      { id: 't1', title: 'Clean and explore MovieLens 100k dataset', completed: true },
      { id: 't2', title: 'Build SVD model and compute RMSE', completed: true },
      { id: 't3', title: 'Implement content-based metadata filtering', completed: false },
      { id: 't4', title: 'Deploy interactive demo', completed: false },
    ],
    githubConnected: false,
  },
  {
    id: 'p-3',
    title: 'Executive Sales & Revenue Analytics Dashboard',
    category: 'Data Analytics',
    difficulty: 'Beginner',
    technology: ['Power BI', 'SQL', 'PostgreSQL', 'Excel'],
    progressPercentage: 90,
    description: 'Dynamic KPI dashboard tracking ARR, churn rate, regional distribution, and monthly recurring cohorts.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    requirements: [
      'Connect to live PostgreSQL sales database',
      'Calculate MoM revenue growth, churn rate, and CAC to LTV ratio',
      'Design clean executive cards with drill-down views',
    ],
    resources: [
      'DAX Formulas Cheatsheet for Power BI',
      'Cohort Retention Analysis SQL Queries',
    ],
    tasks: [
      { id: 't1', title: 'Write SQL extraction queries for transaction records', completed: true },
      { id: 't2', title: 'Design relational star schema data model', completed: true },
      { id: 't3', title: 'Create interactive charts and KPI cards', completed: true },
      { id: 't4', title: 'Publish executive report', completed: false },
    ],
    githubConnected: true,
  },
  {
    id: 'p-4',
    title: 'E-commerce Platform with Payment Gateway',
    category: 'Full Stack Development',
    difficulty: 'Advanced',
    technology: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
    progressPercentage: 25,
    description: 'Modern storefront with cart state, product search, order management, and secure Stripe checkout.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80',
    requirements: [
      'State management for persistent shopping carts',
      'Stripe PaymentIntent API integration with webhook listeners',
      'Role-based dashboard for product catalog management',
    ],
    resources: [
      'Stripe Integration with Node.js & React Guide',
      'Database Schema for Orders & Inventory',
    ],
    tasks: [
      { id: 't1', title: 'Initialize database schema with Prisma ORM', completed: true },
      { id: 't2', title: 'Build product listing and filters', completed: false },
      { id: 't3', title: 'Integrate Stripe checkout webhooks', completed: false },
    ],
    githubConnected: false,
  },
  {
    id: 'p-5',
    title: 'Student Performance Management System',
    category: 'Full Stack Development',
    difficulty: 'Intermediate',
    technology: ['Python', 'Django', 'SQLite', 'Bootstrap'],
    progressPercentage: 80,
    description: 'Academic tracking platform with attendance logging, grade generation, and automated report cards.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    requirements: [
      'Student profile management with attendance and GPA computation',
      'Teacher role permissions and report generation in PDF format',
    ],
    resources: [
      'Django Authentication & Role-Based Permissions Guide',
      'Generating Dynamic PDFs in Python with ReportLab',
    ],
    tasks: [
      { id: 't1', title: 'Setup Django models and migrations', completed: true },
      { id: 't2', title: 'Build student record table with search', completed: true },
      { id: 't3', title: 'Add PDF transcript generator', completed: true },
      { id: 't4', title: 'Final testing & deployment', completed: false },
    ],
    githubConnected: true,
  },
  {
    id: 'p-6',
    title: 'High-Throughput REST API Microservice',
    category: 'Backend Development',
    difficulty: 'Intermediate',
    technology: ['Go', 'Docker', 'Redis', 'PostgreSQL', 'Swagger'],
    progressPercentage: 15,
    description: 'Resilient REST API featuring Redis in-memory caching, rate limiting, and OpenAPI documentation.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    requirements: [
      'CRUD operations with sub-15ms response times',
      'Redis cache-aside pattern with TTL expiration',
      'Token bucket rate-limiting middleware',
    ],
    resources: [
      'REST API Design Best Practices & Microservice Standards',
      'Redis Caching Strategies in High-Load Systems',
    ],
    tasks: [
      { id: 't1', title: 'Define API contract and Swagger specs', completed: true },
      { id: 't2', title: 'Implement database connection pool', completed: false },
      { id: 't3', title: 'Add Redis caching layer and rate limiter', completed: false },
    ],
    githubConnected: false,
  },
  {
    id: 'p-7',
    title: 'Developer Portfolio with Interactive Showcase',
    category: 'Frontend Development',
    difficulty: 'Beginner',
    technology: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    progressPercentage: 100,
    description: 'High-performance personal website featuring smooth layout animations, project gallery, and dark mode.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    requirements: [
      'Responsive design with perfect mobile breakpoints',
      'Interactive skill tags with filtering',
      'Contact form integration and SEO metadata',
    ],
    resources: [
      'Portfolio Layout Best Practices for Engineers',
      'Web Performance & Lighthouse Optimization',
    ],
    tasks: [
      { id: 't1', title: 'Design wireframes and color palette', completed: true },
      { id: 't2', title: 'Build hero section and skill badges', completed: true },
      { id: 't3', title: 'Implement project showcase cards', completed: true },
      { id: 't4', title: 'Deploy on Vercel with custom domain', completed: true },
    ],
    githubConnected: true,
  },
  {
    id: 'p-8',
    title: 'Production Full Stack SaaS Application',
    category: 'Full Stack Development',
    difficulty: 'Advanced',
    technology: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind'],
    progressPercentage: 30,
    description: 'Complete SaaS starter kit with subscription tiers, team invites, analytics dashboard, and API keys.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    requirements: [
      'Multi-tenant database schema with workspace partitioning',
      'Stripe subscription billing webhook handler',
      'Custom domain routing and analytics tracking',
    ],
    resources: [
      'Next.js App Router Architecture Guide',
      'Multi-tenant SaaS Database Design Best Practices',
    ],
    tasks: [
      { id: 't1', title: 'Database schema and multi-tenant setup', completed: true },
      { id: 't2', title: 'User authentication and workspace creation', completed: true },
      { id: 't3', title: 'Stripe webhook subscription billing', completed: false },
      { id: 't4', title: 'Team member role invites', completed: false },
    ],
    githubConnected: false,
  },
];

export const ProjectsView: React.FC = () => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const [projectsList, setProjectsList] = useState<ProjectItem[]>(initialProjectsList);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [search, setSearch] = useState('');
  const [isEvaluatingWithAI, setIsEvaluatingWithAI] = useState(false);
  const [aiReviewResult, setAiReviewResult] = useState<string | null>(null);

  const filteredProjects = projectsList.filter((proj) => {
    const matchesDiff = selectedDifficulty === 'All' || proj.difficulty === selectedDifficulty;
    const matchesSearch =
      search.trim() === '' ||
      proj.title.toLowerCase().includes(search.toLowerCase()) ||
      proj.description.toLowerCase().includes(search.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  const handleToggleTask = (taskId: string) => {
    if (!selectedProject) return;
    const updatedTasks = selectedProject.tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const completedCount = updatedTasks.filter((t) => t.completed).length;
    const newProgress = Math.round((completedCount / updatedTasks.length) * 100);

    const updatedProj = {
      ...selectedProject,
      tasks: updatedTasks,
      progressPercentage: newProgress,
    };
    setSelectedProject(updatedProj);
    setProjectsList((prev) =>
      prev.map((p) => (p.id === selectedProject.id ? updatedProj : p))
    );
  };

  const handleRunAIReview = () => {
    setIsEvaluatingWithAI(true);
    setAiReviewResult(null);
    setTimeout(() => {
      setIsEvaluatingWithAI(false);
      setAiReviewResult(
        `AI Code Review Passed! Architecture Score: 92/100.
Clean modular separation of concerns detected. The data pipeline adheres to industry standards. Recommended improvement: add unit tests for boundary exceptions.`
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
        isLight ? 'border-slate-200/80' : 'border-slate-800'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Projects
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950 dark:text-indigo-300">
              Portfolio Builder
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
            Build real-world verified projects with AI code reviews and GitHub synchronizations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDifficulty === diff
                  ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                  : isLight
                  ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className={`rounded-3xl border overflow-hidden shadow-xs flex flex-col justify-between transition-all group ${
              isLight
                ? 'bg-white border-slate-200/80 hover:border-indigo-300 hover:shadow-sm'
                : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:shadow-sm'
            }`}
          >
            <div>
              {/* Image banner */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-xs">
                    {proj.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    proj.difficulty === 'Advanced'
                      ? 'bg-purple-600 text-white'
                      : proj.difficulty === 'Intermediate'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {proj.difficulty}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className={`text-sm font-bold group-hover:text-indigo-600 transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {proj.title}
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} line-clamp-2 leading-relaxed`}>
                  {proj.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technology.map((tech) => (
                    <span
                      key={tech}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border ${
                        isLight
                          ? 'bg-slate-100/70 text-slate-700 border-slate-200'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">Progress</span>
                    <span className="text-[11px] font-bold text-indigo-600">
                      {proj.progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${proj.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className={`p-4 border-t ${isLight ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800 bg-slate-900/50'} flex items-center justify-between`}>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Github className="w-3.5 h-3.5" />
                <span className="text-[11px]">{proj.githubConnected ? 'Synced' : 'Not linked'}</span>
              </div>
              <button
                onClick={() => {
                  setSelectedProject(proj);
                  setAiReviewResult(null);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
              >
                <span>{proj.progressPercentage > 0 ? 'Continue Project' : 'Start Project'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail / Interactive Workspace Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Header */}
              <div className={`p-6 border-b flex items-start justify-between gap-4 ${
                isLight ? 'border-slate-100 bg-slate-50/60' : 'border-slate-800 bg-slate-950/60'
              }`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Difficulty: {selectedProject.difficulty}
                    </span>
                  </div>
                  <h2 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {selectedProject.title}
                  </h2>
                  <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} mt-1`}>
                    {selectedProject.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className={`p-2 rounded-xl border transition-colors ${
                    isLight
                      ? 'border-slate-200 text-slate-500 hover:bg-slate-100'
                      : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 scrollbar-thin">
                
                {/* Requirements */}
                <div className="space-y-2">
                  <h4 className={`text-xs uppercase font-bold tracking-wider ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                    Core Requirements
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {selectedProject.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step-by-Step Tasks */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs uppercase font-bold tracking-wider ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                      Step-by-Step Tasks ({selectedProject.tasks.filter((t) => t.completed).length}/{selectedProject.tasks.length})
                    </h4>
                    <span className="text-xs font-bold text-indigo-600">
                      {selectedProject.progressPercentage}% Complete
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedProject.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleToggleTask(task.id)}
                        className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          task.completed
                            ? isLight
                              ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
                              : 'bg-emerald-950/20 border-emerald-800 text-emerald-200'
                            : isLight
                            ? 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                            task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'
                          }`}>
                            {task.completed && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs font-semibold">{task.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Resources */}
                <div className="space-y-2">
                  <h4 className={`text-xs uppercase font-bold tracking-wider ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                    Recommended Learning Resources
                  </h4>
                  <div className="space-y-1.5">
                    {selectedProject.resources.map((res, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        <span className="font-medium text-slate-700 dark:text-slate-300">{res}</span>
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Review Box */}
                {aiReviewResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed"
                  >
                    <p className="font-bold mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      Automated AI Project Evaluation:
                    </p>
                    <p>{aiReviewResult}</p>
                  </motion.div>
                )}

              </div>

              {/* Footer */}
              <div className={`p-4 border-t ${isLight ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800 bg-slate-950/50'} flex flex-col sm:flex-row items-center justify-between gap-3`}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('Connected GitHub repository synced!')}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{selectedProject.githubConnected ? 'GitHub Connected' : 'Connect Repository'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleRunAIReview}
                    disabled={isEvaluatingWithAI}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    {isEvaluatingWithAI ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>{isEvaluatingWithAI ? 'Evaluating Code...' : 'Request AI Review'}</span>
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
