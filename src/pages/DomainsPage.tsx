import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  Check,
  X,
  Briefcase,
} from 'lucide-react';
import { DOMAINS_MASTER, getActiveDomain, setActiveDomain, DomainData } from '../data/multiDomainData';
import { StudentProfile } from '../data/collageData';
import { setUserActiveDomain, getCurrentSessionEmail } from '../utils/userStorage';
import { syncStudentProfileToSupabase } from '../utils/supabase';

interface DomainsPageProps {
  user: StudentProfile;
  onUpdateProfile?: (updated: StudentProfile) => void;
}

export const DomainsPage: React.FC<DomainsPageProps> = ({ user, onUpdateProfile }) => {
  const navigate = useNavigate();
  const [currentDomain, setCurrentDomain] = useState<DomainData>(getActiveDomain());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'engineering' | 'cloud' | 'design'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal to select specific target role within chosen domain
  const [roleSelectDomain, setRoleSelectDomain] = useState<DomainData | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const domainList = Object.values(DOMAINS_MASTER);

  const filteredDomains = domainList.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeCategory === 'ai') {
      return ['ai', 'data-science', 'machine-learning', 'data-analytics'].includes(d.id);
    }
    if (activeCategory === 'engineering') {
      return ['fullstack', 'python-dev', 'java-dev', 'mobile-dev', 'qa-testing'].includes(d.id);
    }
    if (activeCategory === 'cloud') {
      return ['cloud-computing', 'devops', 'cybersecurity', 'iot', 'blockchain'].includes(d.id);
    }
    if (activeCategory === 'design') {
      return ['ui-ux'].includes(d.id);
    }
    return true;
  });

  const handleOpenRoleModal = (domain: DomainData) => {
    setRoleSelectDomain(domain);
    setSelectedRole(domain.primaryRole);
  };

  const handleConfirmDomainSelection = () => {
    if (!roleSelectDomain) return;

    const chosenRole = selectedRole || roleSelectDomain.primaryRole;
    const email = user.email || getCurrentSessionEmail();

    // Persist domain & target role
    setUserActiveDomain(roleSelectDomain.id, chosenRole, email);
    setActiveDomain(roleSelectDomain.id);
    setCurrentDomain(roleSelectDomain);

    const updatedProfile: StudentProfile = {
      ...user,
      selectedDomain: roleSelectDomain.id,
      targetRole: chosenRole,
      role: `${chosenRole} Aspirant`,
      readinessScore: roleSelectDomain.readinessScoreDefault,
    };

    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }

    try {
      localStorage.setItem('skilltwin_student_profile', JSON.stringify(updatedProfile));
    } catch {}

    // Synchronize selected domain & role to Supabase cloud database
    syncStudentProfileToSupabase(updatedProfile);

    setRoleSelectDomain(null);
    showToast(`Domain confirmed: ${roleSelectDomain.name} • Target: ${chosenRole}! Launching personalized dashboard... 🚀`);
    setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 700);
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
            Explore Career Domains
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Select your target technical specialization to dynamically personalize career roadmaps, courses, and interviews.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs self-start sm:self-auto">
          <span className="text-[#64748B]">Current Domain:</span>
          <strong className="text-[#5B2EFF] font-bold">{currentDomain.name}</strong>
        </div>
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#B8AAFF]">
            ✦ MULTI-DOMAIN INTELLIGENCE
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            15 Specialized Career Pathways with Dedicated YouTube Tutorials & Roadmaps
          </h2>
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
            SkillTwin AI does not limit you to Full Stack Development. Choose between AI, Data Science, Cybersecurity, Cloud, Mobile, UI/UX, and more. When you pick a domain, your roadmaps, tests, projects, and interviews instantly update.
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shrink-0 self-start md:self-auto">
          🧭
        </div>
      </div>

      {/* ================= SEARCH & CATEGORY FILTER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All 15 Domains' },
            { id: 'ai', label: 'AI, Data & ML' },
            { id: 'engineering', label: 'Software & Development' },
            { id: 'cloud', label: 'Cloud, DevOps & Security' },
            { id: 'design', label: 'UI/UX & Product Design' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#5B2EFF] text-white shadow-xs'
                  : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search domains or skills (e.g., PyTorch, React, Cloud)..."
            className="w-full bg-white border border-[#E2E8F0] pl-10 pr-3.5 py-2 rounded-lg text-xs text-[#334155] placeholder:text-[#94A3B8] outline-none focus:border-[#5B2EFF]"
          />
        </div>
      </div>

      {/* ================= DOMAIN CARDS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDomains.map((domain) => {
          const isSelected = domain.id === currentDomain.id;

          return (
            <div
              key={domain.id}
              className={`bg-white border rounded-[15px] p-5.5 shadow-xs transition-all flex flex-col justify-between hover:shadow-md ${
                isSelected
                  ? 'border-[#5B2EFF] ring-2 ring-[#5B2EFF]/20'
                  : 'border-[#E2E8F0] hover:border-[#C4B5FD]'
              }`}
            >
              <div>
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center text-2xl shadow-xs shrink-0">
                    {domain.icon}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <span className="bg-[#E6F7F4] text-[#008F7A] text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      {domain.badge}
                    </span>
                    {isSelected && (
                      <span className="bg-[#5B2EFF] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-[#0B1F3A] mb-1">
                  {domain.name}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4 min-h-[48px]">
                  {domain.shortDescription}
                </p>

                {/* Target Role & Salary Meta */}
                <div className="bg-[#F8FAFC] border border-[#EDF1F6] p-3 rounded-xl mb-3 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Primary Role:</span>
                    <strong className="text-[#0B1F3A]">{domain.primaryRole}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Avg Compensation:</span>
                    <strong className="text-[#00A88F]">{domain.avgSalary}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Industry Demand:</span>
                    <strong className="text-[#5B2EFF]">{domain.hiringDemand}</strong>
                  </div>
                </div>

                {/* Career Examples */}
                <div className="mb-3 bg-purple-50/50 border border-purple-100/60 p-2.5 rounded-xl">
                  <div className="text-[10px] font-bold uppercase text-[#5B2EFF] mb-1 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    <span>Career Role Pathways:</span>
                  </div>
                  <p className="text-[11px] text-[#475569] font-medium leading-relaxed">
                    {domain.roles.slice(0, 4).join(' • ')}
                  </p>
                </div>

                {/* Required Skills Badges */}
                <div className="mb-4">
                  <div className="text-[10px] font-extrabold uppercase text-[#94A3B8] mb-1.5">
                    Core Skills Covered:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.requiredSkills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-[#F3F7FC] text-[#475569] text-[10px] font-medium px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {domain.requiredSkills.length > 4 && (
                      <span className="text-[10px] text-[#94A3B8] font-bold py-0.5">
                        +{domain.requiredSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center gap-2">
                <button
                  onClick={() => handleOpenRoleModal(domain)}
                  className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#00A88F] text-white hover:bg-[#008F7A]'
                      : 'bg-[#5B2EFF] text-white hover:bg-[#4820DC]'
                  }`}
                >
                  <span>{isSelected ? 'Active Domain • Change Target Role' : 'Select Domain & Set Role'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= TARGET CAREER ROLE SELECTION MODAL ================= */}
      {roleSelectDomain && (
        <div
          className="fixed inset-0 z-[6000] bg-[#0B1F3A]/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setRoleSelectDomain(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center text-2xl shrink-0">
                  {roleSelectDomain.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0B1F3A]">
                    {roleSelectDomain.name}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Choose your target career role to personalize all 15 modules
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRoleSelectDomain(null)}
                className="w-8 h-8 rounded-lg bg-[#F3F7FC] text-[#64748B] hover:text-[#0B1F3A] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Role Options */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0B1F3A]">
                Select Target Career Role:
              </label>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {roleSelectDomain.roles.map((role) => (
                  <div
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                      selectedRole === role
                        ? 'border-[#5B2EFF] bg-purple-50 text-[#5B2EFF] shadow-xs'
                        : 'border-[#E2E8F0] hover:bg-slate-50 text-[#334155]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#5B2EFF]" />
                      <span>{role}</span>
                    </div>
                    {selectedRole === role && (
                      <Check className="w-4 h-4 text-[#5B2EFF] stroke-[2.5]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Summary Box */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-xl text-xs space-y-1.5 text-[#475569]">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Domain Benchmark:</span>
                <span className="font-bold text-[#0B1F3A]">{roleSelectDomain.avgSalary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Hiring Growth:</span>
                <span className="font-bold text-[#00A88F]">{roleSelectDomain.hiringDemand}</span>
              </div>
              <p className="text-[11px] text-[#64748B] pt-1 border-t border-slate-200">
                Selecting this will personalize your Dashboard, Career Roadmaps, YouTube Tutorials, Courses, Tests, and Mock Interviews. You can change this later in <strong>Profile → Career Preferences</strong>.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRoleSelectDomain(null)}
                className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B] hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDomainSelection}
                className="px-5 py-2.5 rounded-xl bg-[#5B2EFF] hover:bg-[#4820DC] text-white text-xs font-bold shadow-md shadow-[#5B2EFF]/25 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Confirm &amp; Personalize Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
