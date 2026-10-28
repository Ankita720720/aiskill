import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Target,
  Mic,
  Compass,
  X,
  Send,
  Sparkles,
  Layers,
} from 'lucide-react';
import { StudentProfile } from '../data/collageData';
import { getActiveDomain } from '../data/multiDomainData';

interface DashboardPageProps {
  user: StudentProfile;
  onOpenAIMentor?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleAskAI = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuestion.trim()) {
      showToast('Please enter your question.');
      return;
    }
    showToast('SkillTwin AI is preparing your response...');
    setAiQuestion('');
  };

  const firstName = user.name.split(' ')[0] || 'Ankita';

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const activeDomain = getActiveDomain();

  // Dynamic skills derived from active domain
  const domainSkills = activeDomain.requiredSkills.map((name, i) => {
    const defaultScores = [90, 84, 76, 70, 64, 58, 52];
    const percent = defaultScores[i % defaultScores.length];
    return {
      name,
      percent,
      color: percent >= 75 ? 'bg-[#00A88F]' : 'bg-[#5B2EFF]',
    };
  });

  const domainSkillGaps = activeDomain.missingSkillsDefault.map((name, i) => ({
    name,
    priority: i === 0 ? 'High' : i === 1 ? 'High' : 'Medium',
    dot: i < 2 ? 'bg-[#EF4444]' : 'bg-[#F59E0B]',
    badge: i < 2 ? 'text-[#DC2626] bg-[#FEF2F2]' : 'text-[#B45309] bg-[#FFF7ED]',
  }));

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto font-sans pb-16 text-[#334155]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[6000] bg-[#0B1F3A] text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= WELCOME ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-[27px] font-extrabold text-[#0B1F3A] tracking-tight mb-1">
            Welcome back, <span>{firstName}</span> 👋
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748B]">
            Track your skills, assessments, learning and interview readiness for <strong className="text-[#0B1F3A]">{activeDomain.primaryRole}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/domains"
            className="hidden sm:flex items-center gap-2 bg-[#F3F7FC] hover:bg-[#EDE9FE] border border-[#E2E8F0] hover:border-[#C4B5FD] px-3 py-2 rounded-[10px] text-xs font-semibold text-[#0B1F3A] hover:text-[#5B2EFF] transition-colors shadow-xs"
            title="Switch your active career domain"
          >
            <span className="text-sm">{activeDomain.icon}</span>
            <span>{activeDomain.name.split('(')[0].trim()}</span>
            <span className="text-[10px] text-[#5B2EFF] font-bold bg-[#EDE9FE] px-1.5 py-0.5 rounded">Change</span>
          </Link>
          <div className="self-start sm:self-auto bg-white border border-[#E2E8F0] px-4 py-2 rounded-[10px] text-xs text-[#64748B] font-medium shadow-xs">
            {todayDate}
          </div>
        </div>
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#162F52] text-white rounded-[17px] p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#B8AAFF] mb-2 flex items-center gap-1.5">
            <span>✦</span>
            <span>AI Career Intelligence • {activeDomain.name}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
            Your SkillTwin is {user.readinessScore || activeDomain.readinessScoreDefault}% job-ready for {activeDomain.primaryRole}
          </h2>
          <p className="text-xs sm:text-xs text-[#CBD5E1] leading-relaxed max-w-2xl">
            SkillTwin AI has identified <strong className="text-white">{activeDomain.missingSkillsDefault.slice(0, 3).join(', ')}</strong> as top growth priorities to match current enterprise hiring requirements.
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10 shrink-0">
          <Link
            to="/domains"
            className="py-2.5 px-3.5 rounded-[9px] bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 backdrop-blur-xs flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Switch Domain</span>
          </Link>
          <button
            onClick={() => setShowAIModal(true)}
            className="py-2.5 px-4.5 rounded-[9px] bg-white text-[#5B2EFF] hover:bg-slate-50 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Ask SkillTwin AI →
          </button>
        </div>
      </div>

      {/* ================= KPI GRID (4 Cards) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {/* KPI 1 */}
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[39px] h-[39px] rounded-[10px] bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-black text-base">
              ◈
            </div>
            <span className="text-[10px] font-bold text-[#00A88F] bg-[#E6F7F4] px-2 py-0.5 rounded-full">
              +8%
            </span>
          </div>
          <div>
            <div className="text-[25px] font-extrabold text-[#0B1F3A] leading-tight">
              {user.readinessScore || 68}%
            </div>
            <div className="text-xs text-[#64748B] mt-1">Job Readiness</div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[39px] h-[39px] rounded-[10px] bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-black text-base">
              ✓
            </div>
            <span className="text-[10px] font-bold text-[#00A88F] bg-[#E6F7F4] px-2 py-0.5 rounded-full">
              +2
            </span>
          </div>
          <div>
            <div className="text-[25px] font-extrabold text-[#0B1F3A] leading-tight">
              8
            </div>
            <div className="text-xs text-[#64748B] mt-1">Skills Mastered</div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[39px] h-[39px] rounded-[10px] bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-black text-base">
              %
            </div>
            <span className="text-[10px] font-bold text-[#00A88F] bg-[#E6F7F4] px-2 py-0.5 rounded-full">
              +5%
            </span>
          </div>
          <div>
            <div className="text-[25px] font-extrabold text-[#0B1F3A] leading-tight">
              76%
            </div>
            <div className="text-xs text-[#64748B] mt-1">Assessment Average</div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[39px] h-[39px] rounded-[10px] bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-black text-base">
              🎤
            </div>
            <span className="text-[10px] font-bold text-[#00A88F] bg-[#E6F7F4] px-2 py-0.5 rounded-full">
              Ready
            </span>
          </div>
          <div>
            <div className="text-[25px] font-extrabold text-[#0B1F3A] leading-tight">
              73%
            </div>
            <div className="text-xs text-[#64748B] mt-1">Interview Readiness</div>
          </div>
        </div>
      </div>

      {/* ================= SKILL PROFILE + SKILL GAPS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-5">
        {/* Card 1: Your Skill Profile */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#0B1F3A]">Your Skill Profile</h2>
            <Link to="/skill-gap" className="text-xs font-bold text-[#5B2EFF] hover:underline">
              View Skill Gap →
            </Link>
          </div>

          <div className="space-y-4">
            {domainSkills.slice(0, 6).map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#334155]">{skill.name}</span>
                  <span className="text-[#64748B] font-medium">{skill.percent}%</span>
                </div>
                <div className="h-[7px] w-full bg-[#EEF2F7] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} rounded-full transition-all duration-500`}
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Top Skill Gaps */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#0B1F3A]">Top Skill Gaps</h2>
            <Link to="/skill-gap" className="text-xs font-bold text-[#5B2EFF] hover:underline">
              View All →
            </Link>
          </div>

          <div className="divide-y divide-[#F1F5F9]">
            {domainSkillGaps.map((gap) => (
              <div key={gap.name} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${gap.dot}`} />
                  <span className="text-xs font-semibold text-[#334155]">{gap.name}</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${gap.badge}`}>
                  {gap.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= READINESS ================= */}
      <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-[#0B1F3A]">Job Readiness</h2>
          <Link to="/analytics" className="text-xs font-bold text-[#5B2EFF] hover:underline">
            View Analytics →
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Conic Circle */}
          <div
            className="w-[115px] h-[115px] rounded-full flex items-center justify-center shrink-0 shadow-xs"
            style={{
              background: `conic-gradient(#5B2EFF ${user.readinessScore || activeDomain.readinessScoreDefault}%, #E9EEF5 0)`,
            }}
          >
            <div className="w-[88px] h-[88px] rounded-full bg-white flex flex-col items-center justify-center shadow-xs">
              <strong className="text-[22px] font-extrabold text-[#0B1F3A] leading-none">
                {user.readinessScore || activeDomain.readinessScoreDefault}%
              </strong>
              <span className="text-[10px] text-[#64748B] mt-1 font-semibold">Ready</span>
            </div>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Continue building your {activeDomain.name} profile
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed max-w-2xl">
              Your foundation in <strong className="text-[#0B1F3A]">{activeDomain.skillsMasteredDefault.slice(0, 2).join(' & ')}</strong> is solid. Next high-leverage growth topics are <strong className="text-[#0B1F3A]">{activeDomain.missingSkillsDefault.slice(0, 2).join(' & ')}</strong>. Completing domain roadmaps, video tutorials, and mock interviews will help SkillTwin AI advance your readiness score.
            </p>
          </div>
        </div>
      </div>

      {/* ================= AI RECOMMENDATION ================= */}
      <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-[45px] h-[45px] rounded-[12px] bg-[#EDE9FE] text-[#5B2EFF] font-black text-lg flex items-center justify-center shrink-0">
              ✦
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#0B1F3A] mb-0.5">
                AI Recommended Next Step for {activeDomain.primaryRole}
              </div>
              <div className="text-[11px] text-[#64748B]">
                Explore Stage 1 of your roadmap ({activeDomain.roadmap[0]?.title || activeDomain.requiredSkills[0]}) and watch curated YouTube tutorials.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/career-path"
              className="py-2.5 px-3.5 rounded-[8px] bg-[#F3F7FC] hover:bg-[#EDE9FE] text-[#5B2EFF] text-xs font-bold transition-colors whitespace-nowrap shadow-xs cursor-pointer border border-[#E2E8F0]"
            >
              View Roadmap →
            </Link>
            <Link
              to="/learning-resources"
              className="py-2.5 px-4 rounded-[8px] bg-[#5B2EFF] hover:bg-[#4820DC] text-white text-xs font-bold transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              Watch Tutorials →
            </Link>
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
        <h2 className="text-base font-bold text-[#0B1F3A] mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <button
            onClick={() => navigate('/domains')}
            className="border border-[#E2E8F0] bg-white rounded-[12px] p-4 text-left hover:border-[#5B2EFF] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-9 h-9 rounded-[9px] bg-[#EDE9FE] group-hover:bg-[#5B2EFF] group-hover:text-white flex items-center justify-center text-[#5B2EFF] mb-2.5 transition-colors font-bold text-sm">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-[#0B1F3A] mb-1">15 Career Domains</h3>
              <p className="text-[10px] text-[#64748B] leading-relaxed">
                Explore pathways and switch your active specialization.
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/resume-analyzer')}
            className="border border-[#E2E8F0] bg-white rounded-[12px] p-4 text-left hover:border-[#C4B5FD] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-9 h-9 rounded-[9px] bg-[#F3F7FC] group-hover:bg-[#EDE9FE] flex items-center justify-center text-[#5B2EFF] mb-2.5 transition-colors font-bold text-sm">
                ▣
              </div>
              <h3 className="text-xs font-bold text-[#0B1F3A] mb-1">Analyze Resume</h3>
              <p className="text-[10px] text-[#64748B] leading-relaxed">
                Analyze your resume against {activeDomain.primaryRole} requirements.
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/assessments')}
            className="border border-[#E2E8F0] bg-white rounded-[12px] p-4 text-left hover:border-[#C4B5FD] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-9 h-9 rounded-[9px] bg-[#F3F7FC] group-hover:bg-[#EDE9FE] flex items-center justify-center text-[#5B2EFF] mb-2.5 transition-colors font-bold text-sm">
                ✓
              </div>
              <h3 className="text-xs font-bold text-[#0B1F3A] mb-1">Domain Tests</h3>
              <p className="text-[10px] text-[#64748B] leading-relaxed">
                Take MCQ, coding and technical skill assessments.
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/mock-interview')}
            className="border border-[#E2E8F0] bg-white rounded-[12px] p-4 text-left hover:border-[#C4B5FD] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-9 h-9 rounded-[9px] bg-[#F3F7FC] group-hover:bg-[#EDE9FE] flex items-center justify-center text-[#5B2EFF] mb-2.5 transition-colors font-bold text-sm">
                🎤
              </div>
              <h3 className="text-xs font-bold text-[#0B1F3A] mb-1">AI Mock Interview</h3>
              <p className="text-[10px] text-[#64748B] leading-relaxed">
                Practice speech & camera interview for {activeDomain.primaryRole}.
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/career-path')}
            className="border border-[#E2E8F0] bg-white rounded-[12px] p-4 text-left hover:border-[#C4B5FD] hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-9 h-9 rounded-[9px] bg-[#F3F7FC] group-hover:bg-[#EDE9FE] flex items-center justify-center text-[#5B2EFF] mb-2.5 transition-colors font-bold text-sm">
                ⌁
              </div>
              <h3 className="text-xs font-bold text-[#0B1F3A] mb-1">Career Roadmap</h3>
              <p className="text-[10px] text-[#64748B] leading-relaxed">
                Follow your 8-stage step-by-step career milestones.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* ================= AI MODAL ================= */}
      {showAIModal && (
        <div
          onClick={() => setShowAIModal(false)}
          className="fixed inset-0 bg-[#0F172A]/55 backdrop-blur-xs flex items-center justify-center p-4 z-[4000] animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[450px] max-w-[92%] bg-white rounded-[18px] p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#0B1F3A] flex items-center gap-2">
                <span>✦</span>
                <span>Ask SkillTwin AI • {activeDomain.name}</span>
              </h2>
              <button
                onClick={() => setShowAIModal(false)}
                className="w-8 h-8 rounded-lg bg-[#F3F7FC] text-[#64748B] hover:text-[#0B1F3A] flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#F8FAFC] rounded-[11px] p-4 text-xs text-[#475569] leading-relaxed space-y-2">
              <p>
                Hi <strong className="text-[#0B1F3A]">{firstName}</strong>! 👋
              </p>
              <p>
                Based on your current profile in <strong className="text-[#0B1F3A]">{activeDomain.name}</strong>, your recommended next learning path is:
              </p>
              <div className="p-2.5 bg-purple-50 text-[#5B2EFF] font-bold rounded-lg border border-purple-100 text-[11px]">
                {activeDomain.missingSkillsDefault.join(' → ')}
              </div>
              <p className="text-[11px] text-[#64748B]">
                Target role: <strong>{activeDomain.primaryRole}</strong> (Average benchmark {activeDomain.avgSalary}). You can take a skill assessment, watch YouTube masterclasses, and practice a mock interview anytime.
              </p>
            </div>

            <form onSubmit={handleAskAI} className="flex gap-2">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ask about your career or skills..."
                className="flex-1 border border-[#E2E8F0] rounded-[8px] px-3 py-2.5 text-xs text-[#334155] focus:outline-none focus:border-[#5B2EFF] bg-white"
              />
              <button
                type="submit"
                className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4 py-2.5 rounded-[8px] text-xs font-bold transition-colors cursor-pointer"
              >
                Ask
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
