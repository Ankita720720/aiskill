import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Check,
  Code2,
  Github,
  Save,
  RotateCcw,
  X,
  ExternalLink,
} from 'lucide-react';

export const ProjectDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('id') || 'rest-api-backend';

  // Requirements checklist state (persisted)
  const [requirementsState, setRequirementsState] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`skilltwin_proj_reqs_${projectId}`);
      return saved ? JSON.parse(saved) : { 0: true, 1: true, 2: true, 3: true };
    } catch {
      return { 0: true, 1: true, 2: true, 3: true };
    }
  });

  // Draft code in editor
  const [draftCode, setDraftCode] = useState<string>(() => {
    return (
      localStorage.getItem(`skilltwin_proj_code_${projectId}`) ||
      `// Production REST API - Express & MongoDB
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET || 'secretKey', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

export default app;`
    );
  });

  const [githubUrl, setGithubUrl] = useState<string>(
    'https://github.com/ankita/rest-api-backend'
  );
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const REQUIREMENTS = [
    'Set up modular Express.js server architecture with environment variables',
    'Create MongoDB schemas for User, Task, and Session models with Mongoose',
    'Implement JWT token generation, bcrypt hashing, and authentication middleware',
    'Build full CRUD API endpoints with pagination, sorting, and field projection',
    'Add robust input validation using schema guards and centralized error middleware',
    'Write automated endpoint integration tests with Supertest and verify 200 responses',
  ];

  const MILESTONES = [
    { title: 'Project Initialization', desc: 'Folder structure, npm dependencies, Express setup', done: true },
    { title: 'Database Models & Validation', desc: 'Mongoose schemas, indexing, and connection pooling', done: true },
    { title: 'Security & Auth Middleware', desc: 'JWT token signing, verification, and route guards', done: true },
    { title: 'Testing & Deployment', desc: 'Integration test suites and containerization setup', done: false },
  ];

  const TASKS = [
    { task: 'Configure .env.example with PORT and MONGO_URI', done: true },
    { task: 'Implement password hash with bcrypt salt rounds 10', done: true },
    { task: 'Create /api/v1/tasks endpoint with query pagination', done: true },
    { task: 'Handle duplicate key errors in global error handler', done: false },
    { task: 'Add Postman collection for complete endpoint testing', done: false },
  ];

  const toggleRequirement = (idx: number) => {
    const next = !requirementsState[idx];
    const updated = { ...requirementsState, [idx]: next };
    setRequirementsState(updated);
    try {
      localStorage.setItem(`skilltwin_proj_reqs_${projectId}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem(`skilltwin_proj_code_${projectId}`, draftCode);
      showToast('Project draft saved to local storage! 💾');
    } catch {
      showToast('Could not save draft.');
    }
  };

  const handleClearDraft = () => {
    if (window.confirm('Are you sure you want to clear your current code draft?')) {
      setDraftCode('');
      try {
        localStorage.removeItem(`skilltwin_proj_code_${projectId}`);
      } catch {}
      showToast('Draft code cleared.');
    }
  };

  const completedReqs = Object.values(requirementsState).filter(Boolean).length;
  const progressPercent = Math.round((completedReqs / REQUIREMENTS.length) * 100);

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto font-sans pb-16 text-[#334155]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[6000] bg-[#0B1F3A] text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= BACK LINK & HEADING ================= */}
      <div>
        <button
          onClick={() => navigate('/projects')}
          className="text-xs font-bold text-[#64748B] hover:text-[#5B2EFF] flex items-center gap-1.5 mb-3 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] tracking-tight mb-1">
              REST API Backend
            </h1>
            <p className="text-xs sm:text-[14px] text-[#64748B]">
              Build a production-grade RESTful API with Node.js, Express, MongoDB and JWT authentication.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            <button
              onClick={() => {
                const el = document.getElementById('codeEditor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-4 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Open Code Editor
            </button>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4.5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Submit Project</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= 2-COLUMN OVERVIEW GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
        {/* Left: Project Overview */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-extrabold text-base shrink-0">
              API
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A] mb-1">
                RESTful API Architecture & Authentication Service
              </h2>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Design and implement a robust backend web service adhering strictly to REST constraints, with secure JWT authorization, input validation guards, Mongoose document modeling, and automated testing.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2 border-t border-[#F1F5F9]">
            <div className="bg-[#F8FAFC] border border-[#E7EDF4] px-3.5 py-2 rounded-lg text-xs">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                Category
              </span>
              <strong className="text-[#0B1F3A]">Backend Architecture</strong>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E7EDF4] px-3.5 py-2 rounded-lg text-xs">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                Skill Level
              </span>
              <strong className="text-[#00A88F]">Intermediate</strong>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E7EDF4] px-3.5 py-2 rounded-lg text-xs">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                Estimated Time
              </span>
              <strong className="text-[#0B1F3A]">12 Hours</strong>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E7EDF4] px-3.5 py-2 rounded-lg text-xs">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                Status
              </span>
              <strong className="text-[#5B2EFF]">Active Sprint</strong>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E7EDF4] px-3.5 py-2 rounded-lg text-xs">
              <span className="text-[10px] text-[#94A3B8] font-bold block uppercase">
                GitHub Repo
              </span>
              <strong className="text-[#0B1F3A]">Connected ✓</strong>
            </div>
          </div>
        </div>

        {/* Right: Progress Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs flex flex-col justify-between text-center">
          <div className="text-xs font-bold text-[#0B1F3A] mb-3 text-left">
            Project Completion Progress
          </div>

          <div className="my-2">
            <div
              className="w-[125px] h-[125px] rounded-full mx-auto flex items-center justify-center relative shadow-sm"
              style={{
                background: `conic-gradient(#5B2EFF ${progressPercent * 3.6}deg, #EDE9FE 0deg)`,
              }}
            >
              <div className="w-[96px] h-[96px] rounded-full bg-white flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-[#0B1F3A]">
                  {progressPercent}%
                </span>
                <span className="text-[10px] font-bold text-[#64748B]">
                  COMPLETED
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-[#64748B] pt-3 border-t border-[#F1F5F9]">
            <span>Requirements Done</span>
            <strong className="text-[#0B1F3A]">
              {completedReqs} of {REQUIREMENTS.length}
            </strong>
          </div>
        </div>
      </div>

      {/* ================= WORKSPACE (TWO COLUMNS) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-5">
        {/* Left Column: Brief, Requirements, Code Editor, GitHub */}
        <div className="space-y-5">
          {/* Brief Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#0B1F3A]">
                AI Project Brief & Engineering Objectives
              </h3>
              <span className="bg-[#EDE9FE] text-[#5B2EFF] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                ✦ AI SPECIFICATION
              </span>
            </div>
            <div className="bg-gradient-to-br from-[#F8F7FF] to-[#F2FBFA] border border-[#E6E1FF] rounded-xl p-4 text-xs text-[#475569] leading-relaxed">
              Your goal is to build an authenticated RESTful web service capable of managing user identities and operational task resources. The API must validate incoming request payloads, handle errors gracefully with standard HTTP status codes, hash sensitive passwords, protect private routes with signed JWT tokens, and connect to a persistent database.
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-[#0B1F3A]">
                Requirements & Acceptance Criteria
              </h3>
              <span className="text-xs text-[#94A3B8]">
                Check items as you finish them
              </span>
            </div>

            <div className="space-y-2">
              {REQUIREMENTS.map((req, idx) => {
                const isChecked = !!requirementsState[idx];
                return (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] line-through'
                        : 'bg-white border-[#E2E8F0] text-[#334155] hover:border-[#5B2EFF]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleRequirement(idx)}
                      className="mt-0.5 w-4 h-4 rounded text-[#5B2EFF] focus:ring-0 cursor-pointer accent-[#5B2EFF]"
                    />
                    <span className="text-xs leading-relaxed select-none">
                      {req}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* In-Browser Code Draft Workspace */}
          <div
            id="codeEditor"
            className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#5B2EFF]" />
                <h3 className="text-sm font-bold text-[#0B1F3A]">
                  Code Editor Draft
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearDraft}
                  className="text-xs text-[#94A3B8] hover:text-[#EF4444] px-2 py-1 rounded flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
                <button
                  onClick={handleSaveDraft}
                  className="bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#5B2EFF] px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Save className="w-3 h-3" />
                  <span>Save Draft</span>
                </button>
              </div>
            </div>

            <textarea
              rows={12}
              value={draftCode}
              onChange={(e) => setDraftCode(e.target.value)}
              className="w-full bg-[#0B1F3A] text-[#F1F5F9] font-mono text-xs p-4 rounded-xl outline-none focus:ring-1 focus:ring-[#5B2EFF] leading-relaxed resize-y"
              placeholder="// Write or paste your project code here..."
            />
          </div>

          {/* GitHub Submission */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1F3A] mb-1">
              GitHub Repository Submission
            </h3>
            <p className="text-xs text-[#64748B] mb-3 leading-relaxed">
              Connect your public GitHub repository containing your project code to allow SkillTwin AI to review and verify your implementation.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] pl-10 pr-3.5 py-2.5 rounded-lg text-xs text-[#334155] outline-none focus:border-[#5B2EFF]"
                />
              </div>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
              >
                Submit Project for Review
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Tech Stack, Milestones, Tasks */}
        <div className="space-y-5">
          {/* Tech Stack */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1F3A] mb-3">
              Required Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Bcrypt', 'Postman', 'Supertest'].map(
                (tech, idx) => (
                  <span
                    key={idx}
                    className="bg-[#F3F7FC] border border-[#E2E8F0] text-[#475569] text-xs font-semibold px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Roadmap Milestones */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1F3A] mb-4">
              Project Milestones
            </h3>
            <div className="space-y-4 relative">
              {MILESTONES.map((m, idx) => (
                <div key={idx} className="flex gap-3 relative">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 z-10 ${
                      m.done
                        ? 'bg-[#E6F7F4] text-[#00A88F]'
                        : 'bg-[#EDE9FE] text-[#5B2EFF]'
                    }`}
                  >
                    {m.done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1F3A] mb-0.5">
                      {m.title}
                    </h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Tasks */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1F3A] mb-3">
              Implementation Sprint Tasks
            </h3>
            <div className="space-y-2">
              {TASKS.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#F8FAFC] text-xs"
                >
                  <span className={`leading-relaxed ${t.done ? 'text-[#94A3B8] line-through' : 'text-[#334155]'}`}>
                    {t.task}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                      t.done
                        ? 'bg-[#E6F7F4] text-[#008F7A]'
                        : 'bg-[#FEF3C7] text-[#B45309]'
                    }`}
                  >
                    {t.done ? 'Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SUBMISSION CONFIRMATION MODAL ================= */}
      {showSubmitModal && (
        <div
          className="fixed inset-0 z-[5000] bg-[#0B1F3A]/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowSubmitModal(false)}
        >
          <div
            className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in zoom-in-95 duration-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-[#E6F7F4] text-[#00A88F] flex items-center justify-center text-2xl font-extrabold mx-auto mb-3">
              ✓
            </div>
            <h3 className="text-lg font-extrabold text-[#0B1F3A] mb-1">
              Submit Project for AI Review
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              SkillTwin AI will analyze your codebase, verify test coverage, and benchmark your implementation against industry standards.
            </p>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl text-left text-xs text-[#475569] mb-5 space-y-1">
              <div><strong>Project:</strong> REST API Backend</div>
              <div><strong>GitHub Repo:</strong> {githubUrl}</div>
              <div><strong>Requirements Met:</strong> {completedReqs} / {REQUIREMENTS.length}</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  showToast('✦ Project submitted! AI review score: 92/100 (Verified)');
                }}
                className="flex-1 bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
