import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { getActiveDomain, DomainData } from '../data/multiDomainData';
import { saveSkillGapAnalysisToDb } from '../utils/supabaseBackend';

interface SkillGapPageProps {
  user: {
    name: string;
    email: string;
    readinessScore?: number;
    targetRole?: string;
  };
}

export const SkillGapPage: React.FC<SkillGapPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [currentDomain, setCurrentDomain] = useState<DomainData>(getActiveDomain());

  useEffect(() => {
    const domain = getActiveDomain();
    setCurrentDomain(domain);

    try {
      saveSkillGapAnalysisToDb({
        email: user.email || 'student@skilltwin.ai',
        domainId: domain.id,
        targetRole: user.targetRole || domain.primaryRole,
        matchedSkills: domain.requiredSkills.slice(0, 4),
        missingSkills: domain.missingSkillsDefault,
        readinessPercentage: user.readinessScore || domain.readinessScoreDefault,
        prioritySkills: domain.missingSkillsDefault.slice(0, 3),
        recommendations: `Focus on mastering ${domain.missingSkillsDefault.slice(0, 2).join(' and ')} to reach job readiness.`,
      });
    } catch (err) {
      console.warn('Skill gap database sync note:', err);
    }
  }, [user.email, user.targetRole, user.readinessScore]);

  const readinessScore = user.readinessScore || currentDomain.readinessScoreDefault;

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto font-sans pb-16 text-[#334155]">
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] tracking-tight mb-1">
            Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Benchmark your current profile against {currentDomain.name} market requirements for{' '}
            <strong className="text-[#5B2EFF]">{currentDomain.primaryRole}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <div className="bg-[#F3F7FC] border border-[#D8E0EA] px-3.5 py-2 rounded-[9px] text-xs font-semibold text-[#0B1F3A] flex items-center gap-2">
            <span>{currentDomain.icon}</span>
            <span>Target: <strong className="text-[#5B2EFF]">{currentDomain.primaryRole}</strong></span>
          </div>
          <button
            onClick={() => navigate('/assessments')}
            className="border border-[#D8E0EA] bg-white hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-4 py-2.5 rounded-[9px] text-xs font-bold text-[#334155] transition-colors cursor-pointer shadow-xs"
          >
            Take Assessment
          </button>
          <button
            onClick={() => navigate('/learning-resources')}
            className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4.5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Start Learning
          </button>
        </div>
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#B8AAFF]">
            <span>✦</span>
            <span>AI SKILL GAP BENCHMARK · {currentDomain.name.toUpperCase()}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Your current readiness is {readinessScore}% for {currentDomain.primaryRole}
          </h2>
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
            Based on your resume, assessments, projects and learning progress, SkillTwin AI has identified high-priority competencies to develop to reach 85%+ readiness.
          </p>
        </div>

        <div className="relative z-10 text-center shrink-0">
          <div
            className="w-[100px] h-[100px] rounded-full mx-auto flex items-center justify-center relative shadow-sm"
            style={{
              background: `conic-gradient(#5B2EFF ${readinessScore * 3.6}deg, rgba(255,255,255,0.2) 0deg)`,
            }}
          >
            <div className="w-[76px] h-[76px] rounded-full bg-[#0B1F3A] flex flex-col items-center justify-center">
              <strong className="text-xl font-extrabold text-white">{readinessScore}%</strong>
              <span className="text-[9px] text-[#CBD5E1]">READINESS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TWO-COLUMN: SKILLS vs GAPS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Verified Mastered Skills */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00A88F]" />
                <h3 className="text-base font-bold text-[#0B1F3A]">
                  Verified Skills You Possess
                </h3>
              </div>
              <span className="text-xs font-bold text-[#00A88F]">
                {currentDomain.skillsMasteredDefault.length} Mastered
              </span>
            </div>

            <div className="space-y-3">
              {currentDomain.skillsMasteredDefault.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-[#0B1F3A]">{skill}</span>
                  <span className="bg-[#E6F7F4] text-[#008F7A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Proficient (80%+)
                  </span>
                </div>
              ))}
              {currentDomain.skillsToImproveDefault.map((skill, idx) => (
                <div
                  key={`imp-${idx}`}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-[#0B1F3A]">{skill}</span>
                  <span className="bg-[#FFF7ED] text-[#C2410C] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Developing (60%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#F1F5F9] text-xs text-[#64748B]">
            Demonstrated through completed quizzes and code submissions.
          </div>
        </div>

        {/* Right: High-Priority Missing Competencies */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#DC2626]" />
                <h3 className="text-base font-bold text-[#0B1F3A]">
                  Missing Skills to Bridge
                </h3>
              </div>
              <span className="text-xs font-bold text-[#DC2626]">
                {currentDomain.missingSkillsDefault.length} Priority Gaps
              </span>
            </div>

            <div className="space-y-3">
              {currentDomain.missingSkillsDefault.map((gap, idx) => (
                <div
                  key={idx}
                  className="bg-[#FEF2F2]/60 border border-[#FECACA] p-3 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#0B1F3A] block">{gap}</span>
                    <span className="text-[11px] text-[#DC2626]">Required for {currentDomain.primaryRole}</span>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.setItem('recommended_skill', gap);
                      navigate('/learning-resources');
                    }}
                    className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Learn →
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#F1F5F9] text-xs text-[#64748B]">
            Prioritized by current hiring trends across technical vacancy job descriptions.
          </div>
        </div>
      </div>

      {/* ================= AI RECOMMENDATION & ACTION PLAN ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#B8AAFF]">
            ✦ ACTION PLAN FOR {currentDomain.name.toUpperCase()}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Focus on {currentDomain.missingSkillsDefault[0]} to close the gap
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed">
            Completing the recommended tutorial lectures and passing the skill test for {currentDomain.missingSkillsDefault[0]} will increase your readiness score by approximately 8-12 points.
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.setItem('recommended_skill', currentDomain.missingSkillsDefault[0]);
            navigate('/learning-resources');
          }}
          className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs shrink-0 self-start md:self-auto cursor-pointer"
        >
          Start Recommended Tutorials →
        </button>
      </div>
    </div>
  );
};
