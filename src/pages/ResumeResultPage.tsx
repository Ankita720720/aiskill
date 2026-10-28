import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  GraduationCap,
  FolderGit2,
} from 'lucide-react';
import { StudentProfile } from '../data/collageData';
import { getActiveDomain } from '../data/multiDomainData';

interface ResumeResultPageProps {
  user: StudentProfile;
}

export const ResumeResultPage: React.FC<ResumeResultPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const currentDomain = getActiveDomain();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleDownload = () => {
    showToast('Resume ATS Evaluation Report downloaded as PDF! 📄');
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
            Resume Analysis Results
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Comprehensive ATS score, detected skills and personalized improvement roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => navigate('/resume-analyzer')}
            className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-4 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Analyze Another Resume</span>
          </button>
          <button
            onClick={handleDownload}
            className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4.5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Analysis Report</span>
          </button>
        </div>
      </div>

      {/* ================= SUCCESS BANNER ================= */}
      <div className="bg-gradient-to-r from-[#EEFDF9] to-[#F3F0FF] border border-[#D8EDE8] rounded-2xl p-5 sm:p-5.5 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#00A88F] text-white flex items-center justify-center font-extrabold text-xl shrink-0">
            ✓
          </div>
          <div>
            <strong className="text-sm font-bold text-[#0B1F3A] block">
              Resume Successfully Analyzed
            </strong>
            <p className="text-xs text-[#64748B] mt-0.5">
              We found strong alignment with Full Stack Developer roles with 4 critical skill gaps identified.
            </p>
          </div>
        </div>

        <span className="hidden md:inline-block bg-[#E6F7F4] text-[#008F7A] text-xs font-extrabold px-3 py-1 rounded-full uppercase">
          Parsed & Verified
        </span>
      </div>

      {/* ================= ROW 1: MATCH SCORE & BREAKDOWN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5">
        {/* Match Score Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs flex flex-col sm:flex-row items-center gap-7">
          <div
            className="w-[145px] h-[145px] rounded-full mx-auto sm:mx-0 flex items-center justify-center relative shadow-sm shrink-0"
            style={{
              background: 'conic-gradient(#5B2EFF 72%, #EDE9FE 0)',
            }}
          >
            <div className="w-[110px] h-[110px] rounded-full bg-white flex flex-col items-center justify-center text-center">
              <strong className="text-3xl font-extrabold text-[#0B1F3A]">72%</strong>
              <small className="text-[10px] font-bold text-[#64748B] uppercase">Match Score</small>
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <span className="bg-[#E6F7F4] text-[#008774] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
              ATS COMPLIANT (Score: 78/100)
            </span>
            <h2 className="text-xl font-extrabold text-[#0B1F3A]">
              Strong Candidate Foundation
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Your resume matches 78% of typical job specifications for {currentDomain.primaryRole} positions in {currentDomain.name}.
            </p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#0B1F3A] mb-3">
            Score Breakdown
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { label: 'Technical Skills Match', score: 75 },
              { label: 'Experience Relevance', score: 70 },
              { label: 'Education & Credentials', score: 85 },
              { label: 'ATS Keyword Density', score: 68 },
              { label: 'Formatting & Readability', score: 90 },
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-[135px_1fr_40px] items-center gap-2.5">
                <span className="text-[#475569] truncate">{item.label}</span>
                <div className="w-full bg-[#EDF0F7] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5B2EFF] rounded-full"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <span className="text-right font-bold text-[#0B1F3A]">{item.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ROW 2: DETECTED SKILLS & EDUCATION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
        {/* Detected Technical Skills */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Detected Technical Skills
            </h3>
            <span className="text-xs text-[#00A88F] font-bold">7 Extracted ✓</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ...(currentDomain.skillsMasteredDefault || []).map((s) => ({ name: s, level: 'Advanced' })),
              ...(currentDomain.skillsToImproveDefault || []).map((s) => ({ name: s, level: 'Intermediate' })),
            ].map((skill, idx) => (
              <div
                key={idx}
                className="bg-[#F3F7FC] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-xs flex items-center gap-2"
              >
                <span className="font-bold text-[#0B1F3A]">{skill.name}</span>
                <span className="text-[10px] text-[#5B2EFF] font-semibold">({skill.level})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Projects Detected */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#0B1F3A]">
            Education & Project Detection
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-[#5B2EFF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0B1F3A] block">
                  B.Tech in Computer Science & Engineering
                </strong>
                <span className="text-[#64748B]">2022 - 2026 • Current CGPA: 8.4</span>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl flex items-start gap-3">
              <FolderGit2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0B1F3A] block">
                  E-Commerce Web Storefront
                </strong>
                <span className="text-[#64748B]">React, Cart Interactions, State Management, Responsive</span>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl flex items-start gap-3">
              <FolderGit2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0B1F3A] block">
                  Personal Developer Portfolio
                </strong>
                <span className="text-[#64748B]">Semantic HTML, CSS, JavaScript Animations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ROW 3: STRENGTHS & SKILL GAPS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strengths */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5.5 rounded-[15px]">
          <h4 className="text-xs font-bold text-[#0B1F3A] mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#00A88F]" />
            <span>Strengths & Key Advantages</span>
          </h4>
          <ul className="space-y-2 text-xs text-[#475569]">
            <li className="flex items-start gap-2">
              <span className="text-[#00A88F] font-bold">•</span>
              <span>Modern frontend stack with demonstrated React component proficiency.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00A88F] font-bold">•</span>
              <span>Practical portfolio projects showing complete UI delivery and responsive design.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00A88F] font-bold">•</span>
              <span>Clean ATS document formatting with clear section headings and dates.</span>
            </li>
          </ul>
        </div>

        {/* Skills to Develop */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5.5 rounded-[15px]">
          <h4 className="text-xs font-bold text-[#0B1F3A] mb-3 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-[#C2410C]" />
            <span>Missing Competencies for {currentDomain.primaryRole}</span>
          </h4>
          <ul className="space-y-2 text-xs text-[#475569]">
            {currentDomain.missingSkillsDefault.map((gap, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#C2410C] font-bold">•</span>
                <span>{gap} (High priority market requirement).</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= FULL-WIDTH AI RECOMMENDATION ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#B8AAFF]">
            ✦ SKILLTWIN AI ACTION PLAN · {currentDomain.name.toUpperCase()}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Bridge your {currentDomain.name} gaps to unlock 90%+ match scores
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed">
            To increase your match score from 78% to 90%+, complete the recommended learning modules in {currentDomain.missingSkillsDefault.slice(0, 2).join(' & ')} and build a verified portfolio project.
          </p>
        </div>

        <button
          onClick={() => navigate('/learning-resources')}
          className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs shrink-0 self-start md:self-auto cursor-pointer"
        >
          Start Recommended Modules →
        </button>
      </div>
    </div>
  );
};
