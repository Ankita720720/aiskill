import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  BrainCircuit,
  TrendingUp,
  Award,
  Zap,
  Code,
  Terminal,
  Globe,
  Database,
  Cpu,
  Layers,
  Palette,
  Shield,
  Briefcase,
  ChevronRight,
  BookOpen,
  UploadCloud,
  FileText,
  FileCheck,
} from 'lucide-react';
import { UserProfile } from '../../types';

export const CAREER_OPTIONS = [
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    category: 'AI & Intelligence',
    icon: BrainCircuit,
    shortDesc: 'Build frontier LLMs, PyTorch models, computer vision & MLOps pipelines',
    color: 'from-indigo-500 to-purple-600',
    accentBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    roadmap: ['Python Advanced', 'Linear Algebra & Statistics', 'Machine Learning', 'Deep Learning & PyTorch', 'Transformers & LLMs', 'AI Projects & MLOps'],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    icon: TrendingUp,
    shortDesc: 'Statistical modeling, predictive analytics, hypothesis testing & ML',
    color: 'from-blue-500 to-indigo-600',
    accentBg: 'bg-blue-50 text-blue-700 border-blue-200',
    roadmap: ['Python & Pandas', 'Advanced Statistics', 'Machine Learning', 'Feature Engineering', 'Experimentation & A/B Testing', 'Predictive Modeling'],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    icon: Database,
    shortDesc: 'SQL analytics, Power BI/Tableau dashboards & business insights',
    color: 'from-amber-500 to-orange-600',
    accentBg: 'bg-amber-50 text-amber-700 border-amber-200',
    roadmap: ['Advanced SQL & Joins', 'Excel Modeling', 'Tableau & Power BI', 'Python for Analysis', 'Business Metrics & KPIs', 'Data Storytelling'],
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'Web & Systems',
    icon: Globe,
    shortDesc: 'React, Node.js, TypeScript, PostgreSQL & end-to-end cloud apps',
    color: 'from-emerald-500 to-teal-600',
    accentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    roadmap: ['HTML/CSS & Tailwind', 'Modern JavaScript & TypeScript', 'React & Next.js', 'Node.js & Express', 'Databases (PostgreSQL & MongoDB)', 'Full Stack Projects & CI/CD'],
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    category: 'Web & Systems',
    icon: Terminal,
    shortDesc: 'High-throughput APIs, microservices, databases & system design',
    color: 'from-cyan-500 to-blue-600',
    accentBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    roadmap: ['Python/Go/Java & OOP', 'REST & GraphQL APIs', 'Databases & Query Optimization', 'Redis Caching & Message Queues', 'System Design & Scalability', 'Containerization & Docker'],
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Web & Systems',
    icon: Code,
    shortDesc: 'Modern UI/UX, React/Vue, state management & web animations',
    color: 'from-violet-500 to-purple-600',
    accentBg: 'bg-violet-50 text-violet-700 border-violet-200',
    roadmap: ['HTML5 & Modern CSS Grid/Flexbox', 'JavaScript (ES6+) & DOM', 'React 18+ & State Management', 'TypeScript & Component Libraries', 'Web Performance & Accessibility', 'Production Portfolio Projects'],
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Engineering Core',
    icon: Cpu,
    shortDesc: 'Data structures, algorithms, clean code & robust enterprise systems',
    color: 'from-sky-500 to-indigo-600',
    accentBg: 'bg-sky-50 text-sky-700 border-sky-200',
    roadmap: ['Programming Fundamentals', 'Data Structures & Algorithms', 'Object-Oriented Design', 'Relational Databases', 'Software Testing & Git', 'System Design Basics'],
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Infrastructure',
    icon: Layers,
    shortDesc: 'AWS, Azure, GCP infrastructure, Terraform & serverless architectures',
    color: 'from-sky-500 to-teal-600',
    accentBg: 'bg-sky-50 text-sky-700 border-sky-200',
    roadmap: ['Linux & Networking Basics', 'AWS/GCP Core Services', 'Infrastructure as Code (Terraform)', 'Cloud Security & IAM', 'Serverless & Microservices', 'Cloud Architecture Certification'],
  },
  {
    id: 'cybersecurity-engineer',
    title: 'Cybersecurity Engineer',
    category: 'Security',
    icon: Shield,
    shortDesc: 'Penetration testing, network defense, threat detection & cryptography',
    color: 'from-rose-500 to-pink-600',
    accentBg: 'bg-rose-50 text-rose-700 border-rose-200',
    roadmap: ['Networking & Protocols (TCP/IP)', 'Linux OS & Command Line', 'Security Fundamentals & Cryptography', 'Ethical Hacking & Web Vulnerabilities', 'Threat Hunting & SIEM Tools', 'Security Auditing & Compliance'],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design & Product',
    icon: Palette,
    shortDesc: 'Figma prototypes, design systems, user research & wireframing',
    color: 'from-fuchsia-500 to-rose-500',
    accentBg: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    roadmap: ['UI Design Principles & Typography', 'Figma Mastery & Auto-Layout', 'UX Research & Wireframing', 'Design Systems & Component Libraries', 'Interactive Prototyping', 'Portfolio Case Studies'],
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Infrastructure',
    icon: Zap,
    shortDesc: 'CI/CD pipelines, Docker, Kubernetes, monitoring & observability',
    color: 'from-indigo-600 to-blue-600',
    accentBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    roadmap: ['Linux Administration & Shell Scripting', 'Git & Branching Workflows', 'CI/CD with GitHub Actions', 'Docker & Containerization', 'Kubernetes Orchestration', 'Monitoring (Prometheus & Grafana)'],
  },
  {
    id: 'other',
    title: 'Other',
    category: 'Custom Path',
    icon: Briefcase,
    shortDesc: 'Specify your own custom dream tech role or specialized discipline',
    color: 'from-slate-600 to-slate-800',
    accentBg: 'bg-slate-100 text-slate-700 border-slate-300',
    roadmap: ['Core Fundamentals', 'Specialized Domain Skills', 'Industry Standard Tooling', 'Portfolio Projects', 'Technical Mock Interviews', 'Career Placement Preparation'],
  },
];

interface AuthPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  defaultProfile: UserProfile;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, defaultProfile }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Onboarding Step State for Sign Up: 1 = Account Info, 2 = Career Goal Selection ("What do you want to become?"), 3 = Experience & Study Hours
  const [signupStep, setSignupStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [name, setName] = useState(defaultProfile.name);
  const [email, setEmail] = useState(defaultProfile.email);
  const [password, setPassword] = useState('Ankita@AI2026!');
  const [confirmPassword, setConfirmPassword] = useState('Ankita@AI2026!');
  const [selectedRoleTitle, setSelectedRoleTitle] = useState('AI/ML Engineer');
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [educationLevel, setEducationLevel] = useState('Bachelor of Engineering (CS / IT)');
  const [studyHoursPerDay, setStudyHoursPerDay] = useState('2-3 Hours / day');
  const [targetGoalType, setTargetGoalType] = useState<'Job Placement' | 'Internship' | 'Skill Upgrade' | 'Freelancing'>('Job Placement');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState(defaultProfile.email);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Resume Upload / Direct Input in Registration
  const [resumeMode, setResumeMode] = useState<'upload' | 'input'>('upload');
  const [uploadedResume, setUploadedResume] = useState<{
    name: string;
    size: string;
    parsedSkills: string[];
  } | null>(null);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [directSkillsInput, setDirectSkillsInput] = useState('Python, PyTorch, SQL, FastAPI, Git');
  const [directExperienceSummary, setDirectExperienceSummary] = useState('');

  const activeSelectedRole = selectedRoleTitle === 'Other' && customRoleInput.trim()
    ? customRoleInput.trim()
    : selectedRoleTitle;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (signupStep === 1) {
      if (!name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!email.trim()) {
        setErrorMessage('Please enter your email address.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (!termsAccepted) {
        setErrorMessage('Please agree to the Terms of Service & Privacy Policy.');
        return;
      }
      setSignupStep(2);
      return;
    }

    if (signupStep === 2) {
      if (selectedRoleTitle === 'Other' && !customRoleInput.trim()) {
        setErrorMessage('Please enter your custom career goal.');
        return;
      }
      setSignupStep(3);
      return;
    }

    if (signupStep === 3) {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const updatedUser: UserProfile = {
        ...defaultProfile,
        name: isSignUp ? name : (email === defaultProfile.email ? defaultProfile.name : (name || 'Ankita Chintakindi')),
        email: email,
        role: activeSelectedRole || defaultProfile.role,
        targetRole: activeSelectedRole || defaultProfile.targetRole,
        education: educationLevel,
        resumeFileName: uploadedResume ? uploadedResume.name : defaultProfile.resumeFileName,
        resumeUploadedAt: uploadedResume ? new Date().toISOString().split('T')[0] : defaultProfile.resumeUploadedAt,
        readinessScore: uploadedResume ? Math.min(99, defaultProfile.readinessScore + 6) : defaultProfile.readinessScore,
        placementProbability: uploadedResume ? Math.min(99, defaultProfile.placementProbability + 4) : defaultProfile.placementProbability,
      };
      onLoginSuccess(updatedUser);
    }, 600);
  };

  const handleQuickLoginAsAnkita = () => {
    setName(defaultProfile.name);
    setEmail(defaultProfile.email);
    setPassword('Ankita@AI2026!');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(defaultProfile);
    }, 400);
  };

  return (
    <div id="auth-root" className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Soft Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-100/70 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-100/70 blur-[100px] pointer-events-none" />
      <div className="absolute top-[35%] right-[25%] w-[400px] h-[400px] rounded-full bg-violet-100/50 blur-[100px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-500/20 text-white">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                SkillTwin <span className="text-indigo-600">AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                All-in-One Tech Careers
              </span>
            </div>
            <p className="text-xs text-slate-500">Your Career, Our AI</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-quick-demo-login"
            onClick={handleQuickLoginAsAnkita}
            className="group flex items-center gap-2 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-xl transition-all shadow-2xs"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span>Sign In as <strong>Ankita Chintakindi</strong></span>
          </button>
        </div>
      </header>

      {/* Main Authentication & Onboarding Container */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex-1 flex items-center justify-center">
        <div className={`w-full ${isSignUp && signupStep === 2 ? 'max-w-4xl' : 'max-w-5xl'} grid grid-cols-1 ${isSignUp && signupStep === 2 ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-8 items-center`}>
          
          {/* Left Column: Platform Highlights & Career Breadth (Hidden during Step 2 of sign up for clean full-width grid) */}
          {(!isSignUp || signupStep !== 2) && (
            <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-6 pr-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Choose Your Tech Career Goal</span>
                </div>
                <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Your personalized path from beginner to <span className="text-indigo-600">career ready</span>.
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Whether you aspire to be a Full Stack Developer, Data Scientist, Cloud Engineer, Cybersecurity Specialist, or AI Engineer — SkillTwin assesses your skills, identifies gaps, and builds your custom learning roadmap.
                </p>
              </div>

              {/* Supported Tech Career Pillars */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <Globe className="w-4 h-4" />
                    <span>Web & Full Stack</span>
                  </div>
                  <p className="text-[11px] text-slate-500">React, Node.js, TypeScript, Next.js, APIs &amp; cloud deployment.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                    <TrendingUp className="w-4 h-4" />
                    <span>Data & Analytics</span>
                  </div>
                  <p className="text-[11px] text-slate-500">SQL, Power BI, Python Pandas, Statistics &amp; Dashboards.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-xs">
                    <BrainCircuit className="w-4 h-4" />
                    <span>AI & Machine Learning</span>
                  </div>
                  <p className="text-[11px] text-slate-500">PyTorch, ML algorithms, Deep Learning &amp; Generative AI.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                    <Shield className="w-4 h-4" />
                    <span>Cloud, DevOps & Cyber</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Docker, AWS, CI/CD, Network Security &amp; Linux systems.</p>
                </div>
              </div>

              {/* Verified Student Micro Card */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/90 text-xs shadow-2xs">
                <img
                  src={defaultProfile.avatarUrl}
                  alt="Ankita Chintakindi"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 truncate">Ankita Chintakindi</p>
                    <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      74% Career Ready
                    </span>
                  </div>
                  <p className="text-slate-500 truncate">Track: {activeSelectedRole} • 78% Placement Probability</p>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Sign In OR Multi-Step Onboarding Form */}
          <div className={`w-full ${isSignUp && signupStep === 2 ? 'col-span-1' : 'lg:col-span-6'} flex justify-center`}>
            <div className={`w-full ${isSignUp && signupStep === 2 ? 'max-w-3xl' : 'max-w-md'} bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl relative`}>
              
              {/* Form Mode Toggle */}
              <div className="flex items-center p-1 bg-slate-100 rounded-2xl mb-6">
                <button
                  id="tab-btn-signin"
                  type="button"
                  onClick={() => { setIsSignUp(false); setErrorMessage(''); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    !isSignUp
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  id="tab-btn-signup"
                  type="button"
                  onClick={() => { setIsSignUp(true); setSignupStep(1); setErrorMessage(''); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    isSignUp
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Progress Steps for Sign Up */}
              {isSignUp && (
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      signupStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      1
                    </span>
                    <span className="text-xs font-semibold text-slate-700">Account</span>
                  </div>
                  <div className="w-8 h-0.5 bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      signupStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      2
                    </span>
                    <span className="text-xs font-semibold text-slate-700">Career Goal</span>
                  </div>
                  <div className="w-8 h-0.5 bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      signupStep === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      3
                    </span>
                    <span className="text-xs font-semibold text-slate-700">Resume &amp; Input</span>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Sign In Form */}
              {!isSignUp && (
                <form onSubmit={handleSubmitSignIn} className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      Welcome back
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Sign in to access your dashboard, skill twin, and learning roadmap.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="input-auth-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ankitachintakindi@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotSubmitted(false);
                          setShowForgotPasswordModal(true);
                        }}
                        className="text-[11px] text-indigo-600 hover:text-indigo-700 font-semibold"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="input-auth-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        id="check-remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-xs text-slate-600 font-medium">Remember me for 30 days</span>
                    </label>
                  </div>

                  <button
                    id="btn-auth-submit"
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Sign In to Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs mt-4">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="truncate font-semibold">Demo: Ankita Chintakindi</span>
                      <button
                        type="button"
                        onClick={handleQuickLoginAsAnkita}
                        className="text-indigo-600 hover:text-indigo-700 text-xs font-bold underline underline-offset-2 ml-2 whitespace-nowrap"
                      >
                        Auto Fill &amp; Enter
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Sign Up Flow: Step 1 = Account Credentials */}
              {isSignUp && signupStep === 1 && (
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Step 1: Your Account
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Enter your name and login credentials to begin.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="input-signup-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ankita Chintakindi"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="input-signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ankitachintakindi@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="input-signup-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="input-signup-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer select-none">
                      <input
                        id="check-terms"
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-[11px] text-slate-600 leading-tight">
                        I accept the <span className="text-indigo-600 hover:underline font-semibold">Terms of Service</span> and <span className="text-indigo-600 hover:underline font-semibold">Privacy Policy</span>.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Continue to Career Goal Selection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Sign Up Flow: Step 2 = "What do you want to become?" */}
              {isSignUp && signupStep === 2 && (
                <form onSubmit={handleNextStep} className="space-y-5">
                  <div className="text-center max-w-xl mx-auto space-y-1.5">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Onboarding Question
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      What do you want to become?
                    </h2>
                    <p className="text-xs text-slate-500">
                      Select your target career path. We will personalize your Skill Twin, curriculum, practice tests, and job matching.
                    </p>
                  </div>

                  {/* 12 Career Goal Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto p-1 scrollbar-thin">
                    {CAREER_OPTIONS.map((opt) => {
                      const isSelected = selectedRoleTitle === opt.title;
                      const IconComp = opt.icon;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSelectedRoleTitle(opt.title)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-left flex flex-col justify-between ${
                            isSelected
                              ? 'bg-indigo-50/80 border-indigo-600 shadow-sm ring-2 ring-indigo-500/20'
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                              }`}>
                                <IconComp className="w-4 h-4" />
                              </div>
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                              )}
                            </div>
                            <h3 className="text-xs font-bold text-slate-900">
                              {opt.title}
                            </h3>
                            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                              {opt.shortDesc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Custom Role Input if "Other" is selected */}
                  {selectedRoleTitle === 'Other' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <label className="block text-xs font-bold text-slate-800">
                        Specify your custom career goal:
                      </label>
                      <input
                        type="text"
                        value={customRoleInput}
                        onChange={(e) => setCustomRoleInput(e.target.value)}
                        placeholder="e.g. Embedded Systems Engineer, Blockchain Architect, Quantum AI Specialist..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                        required={selectedRoleTitle === 'Other'}
                      />
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setSignupStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
                    >
                      <span>Selected: <strong>{activeSelectedRole}</strong></span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Sign Up Flow: Step 3 = Resume Registration & Direct Input */}
              {isSignUp && signupStep === 3 && (
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      Step 3 of 3
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      Upload Resume or Give Input
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Career Goal: <strong className="text-indigo-600">{activeSelectedRole}</strong>. Let our AI personalize your profile.
                    </p>
                  </div>

                  {/* Dual Mode Switcher */}
                  <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setResumeMode('upload')}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        resumeMode === 'upload'
                          ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload Resume File</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setResumeMode('input')}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        resumeMode === 'input'
                          ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Give Input Directly</span>
                    </button>
                  </div>

                  {/* Mode A: Resume Upload */}
                  {resumeMode === 'upload' && (
                    <div className="space-y-3">
                      <div
                        onClick={() => {
                          const input = document.getElementById('signup-resume-file') as HTMLInputElement;
                          input?.click();
                        }}
                        className="p-5 border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl text-center cursor-pointer bg-slate-50/70 hover:bg-indigo-50/30 transition-all"
                      >
                        <input
                          id="signup-resume-file"
                          type="file"
                          accept=".pdf,.docx,.doc,.txt"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setIsParsingResume(true);
                            setTimeout(() => {
                              setIsParsingResume(false);
                              setUploadedResume({
                                name: file.name,
                                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                                parsedSkills: ['Python 3.11', 'PyTorch', 'SQL', 'FastAPI', 'Pandas', 'Machine Learning'],
                              });
                            }, 800);
                          }}
                          className="hidden"
                        />
                        {isParsingResume ? (
                          <div className="py-2 space-y-1.5">
                            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-xs font-bold text-indigo-600">Extracting skills from resume...</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <UploadCloud className="w-6 h-6 text-indigo-600 mx-auto" />
                            <p className="text-xs font-bold text-slate-800">
                              Click to choose PDF or DOCX resume
                            </p>
                            <p className="text-[11px] text-slate-400">
                              Max 10MB • Auto-extracts skills &amp; career readiness
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Sample Resume Quick Button */}
                      <div className="flex items-center justify-between text-xs px-1">
                        <span className="text-[11px] text-slate-400">Want to test without a file?</span>
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedResume({
                              name: 'Ankita_Chintakindi_AI_Resume.pdf',
                              size: '1.2 MB',
                              parsedSkills: ['Python', 'PyTorch', 'SQL', 'FastAPI', 'Machine Learning', 'Docker'],
                            });
                          }}
                          className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Load Sample Resume</span>
                        </button>
                      </div>

                      {/* Upload Result Preview */}
                      {uploadedResume && (
                        <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                              <FileCheck className="w-4 h-4 text-emerald-600" />
                              <span>{uploadedResume.name}</span>
                            </div>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                              +6% Readiness Boost
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {uploadedResume.parsedSkills.map((sk) => (
                              <span
                                key={sk}
                                className="px-2 py-0.5 text-[10px] bg-white border border-emerald-200 text-emerald-800 rounded-md font-semibold"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode B: Direct Input */}
                  {resumeMode === 'input' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Key Technical Skills (comma separated)
                        </label>
                        <input
                          type="text"
                          value={directSkillsInput}
                          onChange={(e) => setDirectSkillsInput(e.target.value)}
                          placeholder="e.g. Python, SQL, React, PyTorch, Docker"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Experience / Background Notes (optional)
                        </label>
                        <textarea
                          rows={2}
                          value={directExperienceSummary}
                          onChange={(e) => setDirectExperienceSummary(e.target.value)}
                          placeholder="Summary of projects, internships, or degrees..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600"
                        />
                      </div>
                    </div>
                  )}

                  {/* Education & Daily Study */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Education Level
                      </label>
                      <select
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      >
                        <option value="Bachelor of Engineering / B.Tech (CS / IT)">B.Tech / BE (CS / IT)</option>
                        <option value="Bachelor of Science / BCA / MCA">B.Sc / BCA / MCA</option>
                        <option value="Master of Science / M.Tech">Master's / M.Tech</option>
                        <option value="Self-Taught / Career Switcher">Self-Taught / Switcher</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Daily Study Time
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {['1h/d', '2-3h/d', '4+h/d'].map((hrs) => (
                          <button
                            key={hrs}
                            type="button"
                            onClick={() => setStudyHoursPerDay(hrs)}
                            className={`py-1.5 text-[11px] font-bold rounded-lg border text-center transition-all ${
                              studyHoursPerDay === hrs
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {hrs}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setSignupStep(2)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Complete Registration &amp; Enter</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-200/60 bg-white/40">
        <div>
          <span>&copy; 2026 SkillTwin AI Intelligence Platform. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0 font-medium">
          <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-slate-800 cursor-pointer">Support</span>
        </div>
      </footer>
    </div>
  );

  function handleSubmitSignIn(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const updatedUser: UserProfile = {
        ...defaultProfile,
        name: email === defaultProfile.email ? defaultProfile.name : (name || 'Ankita Chintakindi'),
        email: email,
      };
      onLoginSuccess(updatedUser);
    }, 500);
  }
};
