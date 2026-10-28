import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  FolderKanban,
} from 'lucide-react';

import { getActiveDomain, DomainData } from '../data/multiDomainData';

interface ProjectItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  categoryLabel: string;
  level: string;
  description: string;
  tech: string[];
  progress: number;
  objectives: string;
}

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const currentDomain = getActiveDomain();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailModalProject, setDetailModalProject] = useState<ProjectItem | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);
  const [customGoal, setCustomGoal] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Build projects dynamically from currentDomain
  const domainProjects: ProjectItem[] = [
    ...(currentDomain.projects || []).map((p, idx) => ({
      id: p.id || `${currentDomain.id}-p-${idx + 1}`,
      name: p.title,
      icon: p.title.slice(0, 3).toUpperCase(),
      category: p.level.toLowerCase(),
      categoryLabel: `${currentDomain.name.split('(')[0].trim()}`,
      level: p.level.toUpperCase(),
      description: p.description,
      tech: p.tech,
      progress: p.progress,
      objectives: p.objectives,
    })),
    {
      id: `${currentDomain.id}-starter`,
      name: `${currentDomain.name.split('(')[0].trim()} Core Starter Kit`,
      icon: 'INI',
      category: 'beginner',
      categoryLabel: currentDomain.name.split('(')[0].trim(),
      level: 'BEGINNER',
      description: `Hands-on foundation project demonstrating essential concepts and toolchains for ${currentDomain.primaryRole}.`,
      tech: currentDomain.requiredSkills.slice(0, 3),
      progress: 60,
      objectives: `Establish repository environment, configure linting, build initial test suites, and deploy reproducible artifact.`,
    },
    {
      id: `${currentDomain.id}-capstone`,
      name: `Enterprise ${currentDomain.primaryRole} Capstone`,
      icon: 'CAP',
      category: 'advanced',
      categoryLabel: currentDomain.name.split('(')[0].trim(),
      level: 'ADVANCED',
      description: `Production-ready capstone project showcasing architecture, security, scaling, and automated testing.`,
      tech: [...currentDomain.requiredSkills.slice(0, 3), 'CI/CD Pipelines', 'Docker'],
      progress: 10,
      objectives: `Architect resilient end-to-end system with automated telemetry, benchmarking, and professional README documentation.`,
    },
  ];

  const filteredProjects = domainProjects.filter((p) => {
    const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleOpenProject = (project: ProjectItem) => {
    navigate(`/project-details?id=${project.id}`);
  };

  const handleGenerateCustomProject = () => {
    if (!customGoal.trim()) {
      showToast('Please describe your target project idea.');
      return;
    }
    showToast(`✦ SkillTwin AI generated: ${customGoal} for ${currentDomain.primaryRole}!`);
    setShowGenerateModal(false);
    setCustomGoal('');
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
            Projects · {currentDomain.name}
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Build real-world projects to strengthen your portfolio for <strong className="text-[#5B2EFF]">{currentDomain.primaryRole}</strong>.
          </p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4.5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Project</span>
        </button>
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#B8AAFF]">
            ✦ AI PROJECT RECOMMENDATION · {currentDomain.name.toUpperCase()}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Build projects tailored to {currentDomain.primaryRole}
          </h2>
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
            Your career roadmap requires mastery of {currentDomain.requiredSkills.slice(0, 3).join(', ')}. SkillTwin AI recommends practical, portfolio-grade projects that demonstrate production skills.
          </p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="relative z-10 bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4.5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs shrink-0 self-start md:self-auto cursor-pointer"
        >
          Generate Personalized Project
        </button>
      </div>

      {/* ================= 4 STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <div className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider mb-2">
            PROJECTS COMPLETED
          </div>
          <div className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] mb-1">
            3
          </div>
          <div className="text-[11px] text-[#94A3B8]">
            Portfolio projects
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <div className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider mb-2">
            IN PROGRESS
          </div>
          <div className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] mb-1">
            2
          </div>
          <div className="text-[11px] text-[#94A3B8]">
            Active projects
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <div className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider mb-2">
            RECOMMENDED
          </div>
          <div className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] mb-1">
            4
          </div>
          <div className="text-[11px] text-[#94A3B8]">
            AI-generated ideas
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <div className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider mb-2">
            PORTFOLIO STRENGTH
          </div>
          <div className="text-2xl sm:text-[28px] font-extrabold text-[#5B2EFF] mb-1">
            72%
          </div>
          <div className="text-[11px] text-[#94A3B8]">
            Project readiness
          </div>
        </div>
      </div>

      {/* ================= FILTER & SEARCH ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'beginner', label: 'Beginner' },
            { id: 'intermediate', label: 'Intermediate' },
            { id: 'advanced', label: 'Advanced' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveFilter(item.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeFilter === item.id
                  ? 'bg-[#5B2EFF] text-white shadow-xs'
                  : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-white border border-[#E2E8F0] pl-9 pr-3.5 py-2 rounded-lg text-xs text-[#334155] placeholder:text-[#94A3B8] outline-none focus:border-[#5B2EFF]"
          />
        </div>
      </div>

      {/* ================= PROJECT CARDS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-[#E2E8F0] rounded-[15px] overflow-hidden shadow-xs hover:border-[#C4B5FD] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Banner */}
              <div className="h-[125px] bg-gradient-to-br from-[#EDE9FE] to-[#E6F7F4] p-4.5 relative flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-white text-[#5B2EFF] flex items-center justify-center font-extrabold text-sm shadow-xs">
                  {project.icon}
                </div>
                <span className="bg-white/90 backdrop-blur-xs text-[#64748B] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {project.level}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4.5">
                <div className="text-[10px] font-extrabold uppercase text-[#5B2EFF] tracking-wider mb-1">
                  {project.categoryLabel}
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] mb-1.5">
                  {project.name}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-3.5 min-h-[50px]">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="bg-[#F1F5F9] text-[#64748B] text-[10px] font-medium px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4.5 pt-0">
              <div className="mb-4">
                <div className="flex justify-between text-[11px] text-[#94A3B8] font-semibold mb-1.5">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-[#E8EEF5] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#5B2EFF] h-full rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenProject(project)}
                  className="flex-1 bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
                >
                  {project.progress > 0 ? (project.progress === 100 ? 'View Project' : 'Continue') : 'Start Project'}
                </button>
                <button
                  onClick={() => setDetailModalProject(project)}
                  className="flex-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= AI CUSTOM PROJECT CALLOUT ================= */}
      <div className="mt-8 bg-gradient-to-br from-[#F5F3FF] to-[#F0FDFA] border border-[#DDD6FE] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1 max-w-2xl">
          <h3 className="text-base font-bold text-[#0B1F3A]">
            Need a custom project for your target job role?
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            SkillTwin AI analyzes current hiring vacancy trends and your verified skills to generate real-world production project briefs complete with requirements and architecture.
          </p>
        </div>
        <button
          onClick={() => setShowGenerateModal(true)}
          className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4.5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs shrink-0 self-start md:self-auto cursor-pointer"
        >
          Generate Custom Project
        </button>
      </div>

      {/* ================= DETAILS MODAL ================= */}
      {detailModalProject && (
        <div
          className="fixed inset-0 z-[5000] bg-[#0B1F3A]/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDetailModalProject(null)}
        >
          <div
            className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDetailModalProject(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-[#64748B] hover:text-[#0B1F3A] flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase bg-[#EDE9FE] text-[#5B2EFF] px-2.5 py-1 rounded-full">
                {detailModalProject.categoryLabel}
              </span>
              <span className="text-[10px] font-extrabold text-[#64748B]">
                {detailModalProject.level}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-2">
              {detailModalProject.name}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              {detailModalProject.description}
            </p>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mb-4">
              <h4 className="text-xs font-bold text-[#0B1F3A] mb-1">
                Project Architecture & Objectives:
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed">
                {detailModalProject.objectives}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-[#0B1F3A] mb-2">
                Tech Stack:
              </h4>
              <div className="flex flex-wrap gap-2">
                {detailModalProject.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-[#EDE9FE] text-[#5B2EFF] text-xs font-bold px-2.5 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDetailModalProject(null)}
                className="flex-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = detailModalProject;
                  setDetailModalProject(null);
                  handleOpenProject(target);
                }}
                className="flex-1 bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Open Project Workspace →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= GENERATE PROJECT MODAL ================= */}
      {showGenerateModal && (
        <div
          className="fixed inset-0 z-[5000] bg-[#0B1F3A]/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowGenerateModal(false)}
        >
          <div
            className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowGenerateModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-[#64748B] hover:text-[#0B1F3A] flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-1.5 bg-[#EDE9FE] text-[#5B2EFF] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
              ✦ AI Generator
            </div>

            <h3 className="text-lg font-extrabold text-[#0B1F3A] mb-1">
              Generate Personalized Project
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              Describe what kind of project you'd like to build, or let SkillTwin AI pick the best topic based on your missing competencies.
            </p>

            <textarea
              rows={4}
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="E.g., I want to build a real-time collaborative whiteboard using Node.js, WebSockets, and Redis..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl text-xs text-[#334155] placeholder:text-[#94A3B8] outline-none focus:border-[#5B2EFF] mb-4 resize-none"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="flex-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCustomProject}
                className="flex-1 bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
