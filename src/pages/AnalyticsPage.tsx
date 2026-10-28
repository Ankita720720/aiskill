import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  Download,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronDown,
} from 'lucide-react';
import { StudentProfile } from '../data/collageData';
import { getActiveDomain } from '../data/multiDomainData';

interface AnalyticsPageProps {
  user: StudentProfile;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const currentDomain = getActiveDomain();

  const [skillFilter, setSkillFilter] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleDownload = () => {
    showToast('Analytics & Readiness Report downloaded as PDF! 📄');
  };

  const SKILLS_LIST = [
    ...(currentDomain.skillsMasteredDefault || []).map((s) => ({
      name: s,
      score: 85,
      category: 'mastered',
    })),
    ...(currentDomain.skillsToImproveDefault || []).map((s) => ({
      name: s,
      score: 65,
      category: 'improving',
    })),
    ...(currentDomain.missingSkillsDefault || []).map((s) => ({
      name: s,
      score: 35,
      category: 'missing',
    })),
  ];

  const filteredSkills =
    skillFilter === 'all'
      ? SKILLS_LIST
      : SKILLS_LIST.filter((s) => s.category === skillFilter);

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
            Analytics & Reports
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Detailed performance tracking, skill growth and readiness insights for your career journey.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setShowReportModal(true)}
            className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-4 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            View Summary Report
          </button>
          <button
            onClick={handleDownload}
            className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4.5 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#31216E] to-[#5B2EFF] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#E0E7FF]">
            ✦ AI PROGRESS REPORT · {currentDomain.name.toUpperCase()}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Your readiness score is {user.readinessScore || currentDomain.readinessScoreDefault}% for {currentDomain.primaryRole}
          </h2>
          <p className="text-xs sm:text-[13px] text-[#E0E7FF] leading-relaxed">
            Consistent learning in {currentDomain.requiredSkills.slice(0, 2).join(' and ')} has established your core foundation. Focus on {currentDomain.missingSkillsDefault[0] || 'advanced competencies'} to reach 90%+ readiness.
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-3xl font-bold shrink-0 self-start md:self-auto">
          ✦
        </div>
      </div>

      {/* ================= 4 KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5.5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0EBFF] text-[#5B2EFF] flex items-center justify-center text-lg font-bold">
              ⚡
            </div>
            <span className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
              +14%
            </span>
          </div>
          <h3 className="text-2xl sm:text-[29px] font-extrabold text-[#0B1F3A] mb-1">
            {user.readinessScore || 68}%
          </h3>
          <p className="text-xs text-[#64748B]">
            Overall Career Readiness
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5.5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0EBFF] text-[#5B2EFF] flex items-center justify-center text-lg font-bold">
              ✓
            </div>
            <span className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
              +3
            </span>
          </div>
          <h3 className="text-2xl sm:text-[29px] font-extrabold text-[#0B1F3A] mb-1">
            12
          </h3>
          <p className="text-xs text-[#64748B]">
            Assessments Completed
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5.5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0EBFF] text-[#5B2EFF] flex items-center justify-center text-lg font-bold">
              ★
            </div>
            <span className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
              +2
            </span>
          </div>
          <h3 className="text-2xl sm:text-[29px] font-extrabold text-[#0B1F3A] mb-1">
            8
          </h3>
          <p className="text-xs text-[#64748B]">
            Skills Mastered
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5.5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0EBFF] text-[#5B2EFF] flex items-center justify-center text-lg font-bold">
              🎙
            </div>
            <span className="bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">
              +1
            </span>
          </div>
          <h3 className="text-2xl sm:text-[29px] font-extrabold text-[#0B1F3A] mb-1">
            4
          </h3>
          <p className="text-xs text-[#64748B]">
            Interviews Completed
          </p>
        </div>
      </div>

      {/* ================= ROW 1: SKILL GROWTH & READINESS BREAKDOWN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-5">
        {/* Skill Growth Overview */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs">
          <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
            <div>
              <h2 className="text-base font-bold text-[#0B1F3A]">
                Skill Growth Overview
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Calculated from verified quiz evaluations and coding submissions
              </p>
            </div>

            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="bg-white border border-[#E2E8F0] text-xs font-semibold text-[#475569] rounded-lg px-3 py-1.5 outline-none focus:border-[#5B2EFF]"
            >
              <option value="all">All Skills</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredSkills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <strong className="text-[#0B1F3A]">{skill.name}</strong>
                  <span className="text-[#64748B] font-semibold">{skill.score}%</span>
                </div>
                <div className="w-full bg-[#EDF0F7] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#5B2EFF] to-[#00A88F]"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Readiness Breakdown */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0B1F3A] mb-1">
              Career Readiness Breakdown
            </h2>
            <p className="text-xs text-[#64748B] mb-5">
              Weighted components towards your {user.targetRole || 'Full Stack'} readiness
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              <div
                className="w-[155px] h-[155px] rounded-full mx-auto flex items-center justify-center relative shadow-sm shrink-0"
                style={{
                  background: 'conic-gradient(#5B2EFF 0deg 244.8deg, #E9E5FF 244.8deg 360deg)',
                }}
              >
                <div className="w-[118px] h-[118px] rounded-full bg-white flex flex-col items-center justify-center">
                  <strong className="text-3xl font-extrabold text-[#0B1F3A]">68%</strong>
                  <span className="text-[10px] font-bold text-[#64748B] uppercase">Readiness</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#64748B]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B2EFF]" />
                  <span>Technical Skills (45%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A88F]" />
                  <span>Projects (25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span>Assessments (20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
                  <span>Interview Readiness (10%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ROW 2: SKILL PROFICIENCY & ASSESSMENT PERFORMANCE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
        {/* Skill Proficiency Status */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs">
          <h2 className="text-base font-bold text-[#0B1F3A] mb-1">
            Skill Proficiency Status
          </h2>
          <p className="text-xs text-[#64748B] mb-4">
            Classified by verified competency benchmark levels
          </p>

          <div className="flex flex-wrap gap-2">
            {(currentDomain.skillsMasteredDefault || []).map((s, idx) => (
              <span key={idx} className="bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] px-3 py-1.5 rounded-lg text-xs font-bold">
                {s} (Mastered)
              </span>
            ))}
            {(currentDomain.skillsToImproveDefault || []).map((s, idx) => (
              <span key={idx} className="bg-[#F1EDFF] border border-[#E2D9FF] text-[#5630D9] px-3 py-1.5 rounded-lg text-xs font-bold">
                {s} (Proficient)
              </span>
            ))}
            {(currentDomain.missingSkillsDefault || []).map((s, idx) => (
              <span key={idx} className="bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] px-3 py-1.5 rounded-lg text-xs font-bold">
                {s} (In Progress)
              </span>
            ))}
          </div>
        </div>

        {/* Assessment Performance Bars */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs">
          <h2 className="text-base font-bold text-[#0B1F3A] mb-1">
            Assessment Performance
          </h2>
          <p className="text-xs text-[#64748B] mb-4">
            Recent verified evaluation test scores
          </p>

          <div className="space-y-3.5">
            {[
              { name: 'JavaScript Fundamentals', score: 85 },
              { name: 'React Component & UI State', score: 75 },
              { name: 'Quantitative & Logical Aptitude', score: 70 },
              { name: 'Backend & Server Basics', score: 60 },
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_1.2fr_40px] items-center gap-3 text-xs">
                <span className="text-[#334155] font-medium truncate">{item.name}</span>
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

      {/* ================= ROW 3: INTERVIEW & RECOMMENDATIONS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
        {/* Mock Interview Performance */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs">
          <h2 className="text-base font-bold text-[#0B1F3A] mb-1">
            Mock Interview Performance
          </h2>
          <p className="text-xs text-[#64748B] mb-4">
            Aggregated metrics across AI spoken mock sessions
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
              <strong className="block text-2xl font-extrabold text-[#0B1F3A] mb-1">
                78%
              </strong>
              <span className="text-xs text-[#64748B]">Average Score</span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
              <strong className="block text-2xl font-extrabold text-[#0B1F3A] mb-1">
                4
              </strong>
              <span className="text-xs text-[#64748B]">Completed Sessions</span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
              <strong className="block text-2xl font-extrabold text-[#0B1F3A] mb-1">
                82%
              </strong>
              <span className="text-xs text-[#64748B]">Technical Accuracy</span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
              <strong className="block text-2xl font-extrabold text-[#0B1F3A] mb-1">
                76%
              </strong>
              <span className="text-xs text-[#64748B]">Communication</span>
            </div>
          </div>
        </div>

        {/* AI Next Steps Recommendation */}
        <div className="bg-gradient-to-br from-[#F5F2FF] to-[#EEF8FF] border border-[#E5DDFF] rounded-[15px] p-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#EDE9FE] text-[#5B2EFF] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
              ✦ AI RECOMMENDATION
            </div>
            <h3 className="text-lg font-extrabold text-[#0B1F3A] mb-1.5">
              Focus on Backend & Database competencies next
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed mb-5">
              Your frontend skills are currently tracking above average at 80%+. Mastering Node.js, Express, MongoDB and SQL will rapidly boost your total career readiness score from 68% to 85%+.
            </p>
          </div>

          <button
            onClick={() => navigate('/learning-resources')}
            className="w-full bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
          >
            Start Recommended Learning →
          </button>
        </div>
      </div>

      {/* ================= SUMMARY REPORT MODAL ================= */}
      {showReportModal && (
        <div
          className="fixed inset-0 z-[5000] bg-[#0B1F3A]/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowReportModal(false)}
        >
          <div
            className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-[#64748B] hover:text-[#0B1F3A] flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-1">
              SkillTwin AI Comprehensive Career Report
            </h3>
            <p className="text-xs text-[#64748B] mb-5">
              Generated on {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })} for {user.name}
            </p>

            <div className="space-y-4 text-xs text-[#475569] leading-relaxed">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl space-y-1.5">
                <div><strong>Candidate:</strong> {user.name} ({user.email})</div>
                <div><strong>Target Role:</strong> {user.targetRole || 'Full Stack Developer'}</div>
                <div><strong>Overall Readiness:</strong> 68% (Proficient Candidate)</div>
                <div><strong>Assessments Passed:</strong> 12 / 14</div>
              </div>

              <div>
                <h4 className="font-bold text-[#0B1F3A] mb-1">Key Strengths:</h4>
                <p>
                  Demonstrated advanced mastery in HTML5/CSS3 (90%) and modern JavaScript (85%). Completed multiple real-world portfolio projects and maintained steady interview speech performance.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B1F3A] mb-1">Primary Growth Priorities:</h4>
                <p>
                  Complete hands-on development in Node.js server architecture and MongoDB document validation to bridge the final 32% gap toward senior-level employability.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  handleDownload();
                }}
                className="flex-1 bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
