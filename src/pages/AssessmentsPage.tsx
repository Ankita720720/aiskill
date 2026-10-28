import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
  Info,
  X,
  Sparkles,
  Layers,
} from 'lucide-react';
import { getActiveDomain, DOMAINS_MASTER } from '../data/multiDomainData';

export const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'technical' | 'coding' | 'aptitude' | 'domain'>('all');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const activeDomain = getActiveDomain();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Active domain assessment score
  const activeDomainScore = localStorage.getItem(`assessment_score_${activeDomain.name}`);

  const assessments = [
    // Primary: Active Domain Assessment
    {
      id: `domain-${activeDomain.id}`,
      name: `${activeDomain.name} Certification Exam`,
      desc: `Comprehensive domain test covering ${activeDomain.requiredSkills.slice(0, 3).join(', ')}`,
      type: 'domain',
      badge: 'Active Domain',
      badgeClass: 'text-[#5B2EFF] bg-[#EDE9FE] font-bold border border-[#DDD6FE]',
      lastAttempt: activeDomainScore ? `Last score: ${activeDomainScore}%` : 'Recommended',
      icon: activeDomain.icon,
      isFeatured: true,
      action: () => {
        localStorage.setItem('selected_assessment', activeDomain.name);
        localStorage.setItem('assessment_type', 'domain');
        navigate('/assessment-test');
      },
    },
    {
      id: 'js-fundamentals',
      name: 'JavaScript Fundamentals',
      desc: 'Core concepts, functions, closures and async patterns',
      type: 'technical',
      badge: 'Technical',
      badgeClass: 'text-[#5B2EFF] bg-[#EDE9FE]',
      lastAttempt: 'Last score: 82%',
      icon: '⌘',
      action: () => {
        localStorage.setItem('selected_assessment', 'JavaScript Fundamentals');
        localStorage.setItem('assessment_type', 'technical');
        navigate('/assessment-test');
      },
    },
    {
      id: 'react-dev',
      name: 'React.js Development',
      desc: 'Components, hooks, state management and rendering lifecycle',
      type: 'technical',
      badge: 'Technical',
      badgeClass: 'text-[#5B2EFF] bg-[#EDE9FE]',
      lastAttempt: 'Last score: 74%',
      icon: '⚛',
      action: () => {
        localStorage.setItem('selected_assessment', 'React Development');
        localStorage.setItem('assessment_type', 'technical');
        navigate('/assessment-test');
      },
    },
    {
      id: 'node-fundamentals',
      name: 'Node.js & Express Fundamentals',
      desc: 'Backend APIs, middleware, HTTP events and streams',
      type: 'technical',
      badge: 'Technical',
      badgeClass: 'text-[#5B2EFF] bg-[#EDE9FE]',
      lastAttempt: 'Not attempted',
      icon: '⬡',
      action: () => {
        localStorage.setItem('selected_assessment', 'Node.js Fundamentals');
        localStorage.setItem('assessment_type', 'technical');
        navigate('/assessment-test');
      },
    },
    {
      id: 'coding-challenge',
      name: 'Data Structures & Algorithms Challenge',
      desc: 'Logic, time complexity, recursion and algorithmic problem solving',
      type: 'coding',
      badge: 'Coding',
      badgeClass: 'text-[#00A88F] bg-[#E6F7F4]',
      lastAttempt: 'Last score: 68%',
      icon: '{ }',
      action: () => {
        localStorage.setItem('selected_assessment', 'Coding Challenge');
        localStorage.setItem('assessment_type', 'coding');
        navigate('/coding-test');
      },
    },
    {
      id: 'quant-aptitude',
      name: 'Quantitative Aptitude',
      desc: 'Numerical reasoning, percentages, time-speed and arithmetic',
      type: 'aptitude',
      badge: 'Aptitude',
      badgeClass: 'text-[#B45309] bg-[#FFF7E6]',
      lastAttempt: 'Last score: 72%',
      icon: '∑',
      action: () => {
        localStorage.setItem('selected_assessment', 'Aptitude Assessment');
        localStorage.setItem('assessment_type', 'aptitude');
        navigate('/aptitude-test');
      },
    },
    {
      id: 'logical-reasoning',
      name: 'Logical Reasoning',
      desc: 'Patterns, syllogisms, sequences and analytical deductive thinking',
      type: 'aptitude',
      badge: 'Aptitude',
      badgeClass: 'text-[#B45309] bg-[#FFF7E6]',
      lastAttempt: 'Not attempted',
      icon: '◎',
      action: () => {
        localStorage.setItem('selected_assessment', 'Aptitude Assessment');
        localStorage.setItem('assessment_type', 'aptitude');
        navigate('/aptitude-test');
      },
    },
    {
      id: 'sql-dbms',
      name: 'SQL & Database Architecture',
      desc: 'Queries, indexing, normalization and transaction ACID guarantees',
      type: 'domain',
      badge: 'Database',
      badgeClass: 'text-[#2563EB] bg-[#EFF6FF]',
      lastAttempt: 'Last score: 80%',
      icon: '▦',
      action: () => {
        localStorage.setItem('selected_assessment', 'SQL & DBMS');
        localStorage.setItem('assessment_type', 'technical');
        navigate('/assessment-test');
      },
    },
    // Dynamic other domains
    ...Object.values(DOMAINS_MASTER)
      .filter((d) => d.id !== activeDomain.id)
      .map((d) => ({
        id: `domain-${d.id}`,
        name: `${d.name} Skill Test`,
        desc: `${d.primaryRole} knowledge: ${d.requiredSkills.slice(0, 3).join(', ')}`,
        type: 'domain' as const,
        badge: 'Domain',
        badgeClass: 'text-[#2563EB] bg-[#EFF6FF]',
        lastAttempt: localStorage.getItem(`assessment_score_${d.name}`)
          ? `Last score: ${localStorage.getItem(`assessment_score_${d.name}`)}%`
          : 'Ready to start',
        icon: d.icon,
        isFeatured: false,
        action: () => {
          localStorage.setItem('selected_assessment', d.name);
          localStorage.setItem('assessment_type', 'domain');
          navigate('/assessment-test');
        },
      })),
  ];

  const filteredAssessments = assessments.filter(
    (item) => activeTab === 'all' || item.type === activeTab
  );

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
            Assessments
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748B]">
            Test your knowledge, evaluate your skills, and track your learning progress.
          </p>
        </div>

        <button
          onClick={() => setShowHelpModal(true)}
          className="border border-[#E2E8F0] bg-white px-3.5 py-2.5 rounded-[9px] text-xs font-semibold text-[#5B2EFF] hover:border-[#5B2EFF] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <Info className="w-3.5 h-3.5" />
          <span>How It Works</span>
        </button>
      </div>

      {/* ================= ACTIVE DOMAIN BANNER ================= */}
      <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center text-xl shrink-0">
            {activeDomain.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0B1F3A]">{activeDomain.name}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E6F7F4] text-[#00A88F]">
                Active Career Domain
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              Target Role: <strong className="text-[#0B1F3A]">{activeDomain.primaryRole}</strong> • Recommended skills: {activeDomain.requiredSkills.slice(0, 4).join(', ')}
            </p>
          </div>
        </div>

        <Link
          to="/domains"
          className="border border-[#E2E8F0] hover:border-[#5B2EFF] bg-[#F8FAFC] hover:bg-[#EDE9FE] px-3.5 py-2 rounded-lg text-xs font-semibold text-[#5B2EFF] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer whitespace-nowrap"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Explore All 15 Domains</span>
        </Link>
      </div>

      {/* ================= 4 SUMMARY CARDS ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-4.5 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-[9px] bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-bold text-base mb-3">
            ▤
          </div>
          <div>
            <div className="text-[23px] font-extrabold text-[#0B1F3A] leading-tight">
              {assessments.length}
            </div>
            <div className="text-[10px] text-[#64748B] font-medium mt-1">Available Assessments</div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-4.5 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-[9px] bg-[#E6F7F4] text-[#00A88F] flex items-center justify-center font-bold text-base mb-3">
            ✓
          </div>
          <div>
            <div className="text-[23px] font-extrabold text-[#0B1F3A] leading-tight">
              3
            </div>
            <div className="text-[10px] text-[#64748B] font-medium mt-1">Completed Assessments</div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-4.5 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-[9px] bg-[#FFF7E6] text-[#D97706] flex items-center justify-center font-bold text-base mb-3">
            ◷
          </div>
          <div>
            <div className="text-[23px] font-extrabold text-[#0B1F3A] leading-tight">
              45 min
            </div>
            <div className="text-[10px] text-[#64748B] font-medium mt-1">Average Test Duration</div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-4.5 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-[9px] bg-[#EAF8EF] text-[#16A34A] flex items-center justify-center font-bold text-base mb-3">
            ↗
          </div>
          <div>
            <div className="text-[23px] font-extrabold text-[#0B1F3A] leading-tight">
              76%
            </div>
            <div className="text-[10px] text-[#64748B] font-medium mt-1">Average Score</div>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all', label: 'All Assessments' },
          { id: 'technical', label: 'Technical' },
          { id: 'coding', label: 'Coding' },
          { id: 'aptitude', label: 'Aptitude' },
          { id: 'domain', label: 'Domain Specific' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`border px-4 py-2.5 rounded-[9px] text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#5B2EFF] text-white border-[#5B2EFF] shadow-xs'
                : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#5B2EFF] hover:border-[#C9BEFF]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= CONTENT GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_0.75fr] gap-5 items-start">
        {/* Left: Available Assessments List */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] overflow-hidden shadow-xs">
          <div className="p-5 border-b border-[#E2E8F0]">
            <h2 className="text-[15px] font-bold text-[#0B1F3A]">Available Assessments</h2>
            <p className="text-[11px] text-[#64748B] mt-1">
              Choose an assessment to practise and evaluate your knowledge.
            </p>
          </div>

          <div className="divide-y divide-[#EEF2F7]">
            {filteredAssessments.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-[minmax(170px,1.7fr)_0.75fr_0.9fr_0.65fr] items-center gap-3 p-4 hover:bg-[#FAF9FF] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[10px] bg-[#F3F7FC] text-[#5B2EFF] flex items-center justify-center font-bold text-base shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1F3A]">{item.name}</div>
                    <div className="text-[10px] text-[#64748B] mt-0.5">{item.desc}</div>
                  </div>
                </div>

                <div>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="text-[10px] text-[#64748B]">
                  {item.lastAttempt}
                </div>

                <div className="text-right sm:text-left">
                  <button
                    onClick={item.action}
                    className="border-none bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-3.5 py-2 rounded-[7px] text-[10px] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Start
                  </button>
                </div>
              </div>
            ))}

            {filteredAssessments.length === 0 && (
              <div className="p-8 text-center text-[#64748B] text-xs">
                No assessments found in this category.
              </div>
            )}
          </div>
        </div>

        {/* Right: Assessment Performance & AI Coach */}
        <div className="space-y-4.5">
          {/* Card: Assessment Performance */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-[13px] font-bold text-[#0B1F3A]">Assessment Performance</h3>
              <p className="text-[10px] text-[#64748B] mt-0.5">Your overall assessment progress</p>
            </div>

            {/* Circular Progress */}
            <div
              className="w-[145px] h-[145px] rounded-full mx-auto my-4 flex items-center justify-center relative"
              style={{
                background: 'conic-gradient(#5B2EFF 0deg 273deg, #E9EDF5 273deg 360deg)',
              }}
            >
              <div className="w-[108px] h-[108px] rounded-full bg-white flex flex-col items-center justify-center shadow-xs">
                <span className="text-[26px] font-extrabold text-[#0B1F3A] leading-none">
                  76%
                </span>
                <span className="text-[10px] text-[#64748B] mt-1 font-semibold">Average Score</span>
              </div>
            </div>

            {/* Mini Progress Bars */}
            <div className="space-y-3 pt-1 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#334155] font-semibold">Technical</span>
                  <span className="text-[#64748B]">76%</span>
                </div>
                <div className="h-1.5 w-full bg-[#EDF1F7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#5B2EFF] rounded-full" style={{ width: '76%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#334155] font-semibold">Coding</span>
                  <span className="text-[#64748B]">68%</span>
                </div>
                <div className="h-1.5 w-full bg-[#EDF1F7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00A88F] rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#334155] font-semibold">Aptitude</span>
                  <span className="text-[#64748B]">72%</span>
                </div>
                <div className="h-1.5 w-full bg-[#EDF1F7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card: AI Assessment Coach */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-[#5B2EFF] to-[#2563EB] text-white flex items-center justify-center font-bold text-lg shrink-0">
                ✦
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0B1F3A]">AI Assessment Coach</h3>
                <span className="text-[10px] text-[#64748B]">Personalized recommendation</span>
              </div>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Your current skill profile suggests that backend development needs more practice. Try the Node.js assessment next, then use your result to update your Skill Gap analysis.
            </p>

            <button
              onClick={() => {
                localStorage.setItem('selected_assessment', 'Node.js Fundamentals');
                localStorage.setItem('assessment_type', 'technical');
                navigate('/assessment-test');
              }}
              className="text-xs font-bold text-[#5B2EFF] hover:underline cursor-pointer block text-left"
            >
              Start Node.js Assessment →
            </button>
          </div>
        </div>
      </div>

      {/* ================= HELP MODAL ================= */}
      {showHelpModal && (
        <div
          onClick={() => setShowHelpModal(false)}
          className="fixed inset-0 bg-[#0B1F3A]/60 backdrop-blur-xs flex items-center justify-center p-4 z-[5000] animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[520px] max-w-full bg-white rounded-[15px] p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#EEF2F7]">
              <h2 className="text-lg font-bold text-[#0B1F3A]">How Assessments Work</h2>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-7 h-7 rounded-full bg-[#F3F7FC] text-[#64748B] hover:text-[#0B1F3A] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              SkillTwin AI uses different assessment formats to evaluate your technical knowledge, coding ability and aptitude.
            </p>

            <div className="space-y-3 pt-1">
              {[
                { step: '1', title: 'Choose an assessment', desc: 'Select Technical, Coding, Aptitude or Domain.' },
                { step: '2', title: 'Complete the assessment', desc: 'Answer questions or solve coding problems.' },
                { step: '3', title: 'Get your result', desc: 'Your score and performance are saved automatically.' },
                { step: '4', title: 'Improve your skills', desc: 'Use your results to identify skill gaps and choose learning resources.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-3 items-start p-2 rounded-lg bg-[#F8FAFC]">
                  <div className="w-[25px] h-[25px] rounded-[8px] bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div className="text-xs text-[#64748B]">
                    <strong className="text-[#0B1F3A] block">{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 rounded-[8px] bg-[#5B2EFF] text-white text-xs font-bold hover:bg-[#4820DC] transition-colors cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
