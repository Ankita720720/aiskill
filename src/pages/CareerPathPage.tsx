import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Clock,
  BookOpen,
} from 'lucide-react';
import { getActiveDomain, DomainData, DOMAINS_MASTER } from '../data/multiDomainData';
import { saveLearningPathProgressToDb } from '../utils/supabaseBackend';

interface CareerPathPageProps {
  user: {
    name: string;
    email: string;
    readinessScore?: number;
    targetRole?: string;
  };
}

export const CareerPathPage: React.FC<CareerPathPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [currentDomain, setCurrentDomain] = useState<DomainData>(getActiveDomain());

  // Track completed roadmap stages (persisted in localStorage)
  const [completedStages, setCompletedStages] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('skilltwin_completed_roadmap_stages');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  useEffect(() => {
    setCurrentDomain(getActiveDomain());
  }, []);

  const toggleStage = (stageNum: number) => {
    const key = `${currentDomain.id}_stage_${stageNum}`;
    const nextState = !completedStages[key];
    const updated = { ...completedStages, [key]: nextState };
    setCompletedStages(updated);
    try {
      localStorage.setItem('skilltwin_completed_roadmap_stages', JSON.stringify(updated));
    } catch {}

    try {
      const activeStages = Object.keys(updated).filter((k) => updated[k]);
      saveLearningPathProgressToDb(
        user.email || 'student@skilltwin.ai',
        currentDomain.id,
        user.targetRole || currentDomain.primaryRole,
        activeStages,
        [],
        currentDomain.roadmap.length
      );
    } catch (err) {
      console.warn('Supabase learning path save error:', err);
    }

    showToast(nextState ? `Stage ${stageNum} marked as completed! 🌟` : `Stage ${stageNum} marked as pending.`);
  };

  const continueLearning = () => {
    localStorage.setItem('recommended_skill', currentDomain.requiredSkills[0] || 'Fundamentals');
    navigate('/learning-resources');
  };

  const totalStages = currentDomain.roadmap.length;
  let doneCount = 0;
  currentDomain.roadmap.forEach((stg) => {
    const isDone = completedStages[`${currentDomain.id}_stage_${stg.stage}`] ?? stg.defaultDone;
    if (isDone) doneCount++;
  });
  const roadmapProgress = Math.round((doneCount / totalStages) * 100);

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
            Career Path & Roadmap
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Your step-by-step career path from current baseline to{' '}
            <strong className="text-[#5B2EFF]">{currentDomain.primaryRole}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <div className="bg-[#F3F7FC] border border-[#D8E0EA] px-3.5 py-2 rounded-[9px] text-xs font-semibold text-[#0B1F3A] flex items-center gap-2">
            <span>{currentDomain.icon}</span>
            <span>Target: <strong className="text-[#5B2EFF]">{currentDomain.primaryRole}</strong></span>
          </div>
          <button
            onClick={continueLearning}
            className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4.5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Continue Learning →
          </button>
        </div>
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#B8AAFF]">
            ✦ AI CAREER ANALYSIS · {currentDomain.name.toUpperCase()}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {currentDomain.primaryRole} is your current target path
          </h2>
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
            SkillTwin AI has mapped your existing competencies, identified missing curriculum stages, and structured an 8-stage industry development plan.
          </p>
        </div>

        <div className="relative z-10 text-center shrink-0">
          <div
            className="w-[100px] h-[100px] rounded-full mx-auto flex items-center justify-center relative shadow-sm"
            style={{
              background: `conic-gradient(#5B2EFF ${roadmapProgress * 3.6}deg, rgba(255,255,255,0.2) 0deg)`,
            }}
          >
            <div className="w-[76px] h-[76px] rounded-full bg-[#0B1F3A] flex flex-col items-center justify-center">
              <strong className="text-xl font-extrabold text-white">{roadmapProgress}%</strong>
              <span className="text-[9px] text-[#CBD5E1]">COMPLETED</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4 KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <div className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider mb-2">
            TARGET ROLE
          </div>
          <div className="text-lg font-extrabold text-[#0B1F3A] mb-0.5 truncate">
            {currentDomain.primaryRole}
          </div>
          <div className="text-[11px] text-[#5B2EFF] font-semibold">
            {currentDomain.hiringDemand}
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <div className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider mb-2">
            ROADMAP STAGES
          </div>
          <div className="text-2xl font-extrabold text-[#0B1F3A] mb-0.5">
            {doneCount} / {totalStages}
          </div>
          <div className="text-[11px] text-[#00A88F] font-semibold">
            {totalStages - doneCount} stages remaining
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <div className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider mb-2">
            AVG INDUSTRY SALARY
          </div>
          <div className="text-xl font-extrabold text-[#00A88F] mb-0.5">
            {currentDomain.avgSalary}
          </div>
          <div className="text-[11px] text-[#94A3B8]">
            Based on current market data
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs">
          <div className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider mb-2">
            CAREER READINESS
          </div>
          <div className="text-2xl font-extrabold text-[#5B2EFF] mb-0.5">
            {currentDomain.readinessScoreDefault}%
          </div>
          <div className="text-[11px] text-[#94A3B8]">
            Assessment benchmark score
          </div>
        </div>
      </div>

      {/* ================= 8-STAGE ROADMAP (STEP-BY-STEP) ================= */}
      <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#F1F5F9]">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Step-by-Step {currentDomain.name} Career Roadmap
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Check off completed milestones as you advance through the learning pathway.
            </p>
          </div>

          <div className="text-xs font-bold text-[#5B2EFF] bg-[#EDE9FE] px-3 py-1 rounded-full self-start sm:self-auto">
            {doneCount} of {totalStages} Stages Completed ({roadmapProgress}%)
          </div>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-4">
          {currentDomain.roadmap.map((stage) => {
            const key = `${currentDomain.id}_stage_${stage.stage}`;
            const isCompleted = completedStages[key] ?? stage.defaultDone;

            return (
              <div
                key={stage.stage}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-[#F8FAFC] border-[#E2E8F0]'
                    : 'bg-white border-[#E2E8F0] hover:border-[#5B2EFF] shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    onClick={() => toggleStage(stage.stage)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 cursor-pointer transition-transform hover:scale-110 ${
                      isCompleted
                        ? 'bg-[#E6F7F4] text-[#00A88F]'
                        : 'bg-[#EDE9FE] text-[#5B2EFF]'
                    }`}
                    title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isCompleted ? '✓' : stage.stage}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-extrabold uppercase text-[#5B2EFF] tracking-wider">
                        STAGE {stage.stage} • {stage.duration}
                      </span>
                      {isCompleted && (
                        <span className="bg-[#E6F7F4] text-[#008F7A] text-[9px] font-bold px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-bold mb-1 ${isCompleted ? 'text-[#0B1F3A]' : 'text-[#0B1F3A]'}`}>
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed max-w-2xl mb-2">
                      {stage.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-[#F1F5F9] text-[#475569] text-[10px] font-medium px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  <button
                    onClick={() => toggleStage(stage.stage)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-slate-100 text-[#64748B] hover:bg-slate-200'
                        : 'bg-[#5B2EFF] text-white hover:bg-[#4820DC] shadow-xs'
                    }`}
                  >
                    {isCompleted ? 'Completed ✓' : 'Mark Done'}
                  </button>
                  <button
                    onClick={continueLearning}
                    className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Study →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= DOMAIN CAREER ROLES & OPTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs">
          <h3 className="text-sm font-bold text-[#0B1F3A] mb-3">
            Career Role Opportunities in {currentDomain.name}
          </h3>
          <div className="space-y-2">
            {currentDomain.roles.map((role, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5B2EFF]" />
                  <strong className="text-[#0B1F3A]">{role}</strong>
                </div>
                <span className="text-[#00A88F] font-bold">Hiring Now</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#F5F2FF] to-[#EEF8FF] border border-[#E5DDFF] rounded-[15px] p-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EDE9FE] text-[#5B2EFF] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
              ✦ AI RECOMMENDATION
            </div>
            <h3 className="text-base font-bold text-[#0B1F3A] mb-1.5">
              Next Recommended Step for {currentDomain.name}
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed mb-4">
              Watch the dedicated verified YouTube masterclasses and take the domain-specific skill assessment to evaluate your current benchmark score.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/assessments')}
              className="flex-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] py-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer"
            >
              Take Assessment
            </button>
            <button
              onClick={continueLearning}
              className="flex-1 bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2 rounded-lg text-xs font-bold transition-all shadow-xs text-center cursor-pointer"
            >
              Start Learning Tutorials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
