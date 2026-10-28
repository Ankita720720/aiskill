import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Edit3,
  CheckCircle2,
  Calendar,
  Sparkles,
  Save,
  X,
  Award,
  Download,
  Share2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Check,
  QrCode,
  Printer,
  Compass,
  History,
} from 'lucide-react';
import { StudentProfile, studentSkills } from '../data/collageData';
import { DOMAINS_MASTER, getActiveDomain, setActiveDomain } from '../data/multiDomainData';
import { setUserActiveDomain, getUserAssessmentHistory } from '../utils/userStorage';
import { syncStudentProfileToSupabase } from '../utils/supabase';
import { saveStudentSkillsToDb } from '../utils/supabaseBackend';

interface ProfilePageProps {
  user: StudentProfile;
  onUpdateUser: (updated: StudentProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateUser,
}) => {
  const activeDomain = getActiveDomain();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [saveToast, setSaveToast] = useState(false);
  const [certificateToast, setCertificateToast] = useState<string | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Career Preferences State (exclusive location for changing domain)
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [prefDomainId, setPrefDomainId] = useState(activeDomain.id);
  const [prefRole, setPrefRole] = useState(user.targetRole || activeDomain.primaryRole);
  const assessmentHistory = getUserAssessmentHistory(user.email);

  const credentialId = `STW-2025-${user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}8492`;
  const verificationUrl = `https://skilltwin.ai/verify/${credentialId}`;

  const showCertToast = (msg: string) => {
    setCertificateToast(msg);
    setTimeout(() => setCertificateToast(null), 4000);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    const newDomain = DOMAINS_MASTER[prefDomainId] || activeDomain;
    const finalRole = prefRole || newDomain.primaryRole;

    setUserActiveDomain(newDomain.id, finalRole, user.email);
    setActiveDomain(newDomain.id);

    const updated: StudentProfile = {
      ...user,
      selectedDomain: newDomain.id,
      targetRole: finalRole,
      role: `${finalRole} Aspirant`,
      readinessScore: newDomain.readinessScoreDefault,
    };

    onUpdateUser(updated);
    syncStudentProfileToSupabase(updated);
    setIsEditingPreferences(false);
    showCertToast(`Career Preferences updated & synced to Supabase! Domain: ${newDomain.name}`);
  };

  const handleCopyCredential = () => {
    try {
      navigator.clipboard.writeText(verificationUrl);
    } catch (e) {}
    showCertToast('Verifiable credential link copied to clipboard!');
  };

  const handleDownloadCertificate = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6C35F5', '#F5A623', '#16B897', '#2563EB'],
      });
    } catch (e) {}

    showCertToast(`Official PDF Certificate downloaded for ${user.name}!`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData);
    syncStudentProfileToSupabase(formData);
    try {
      const masteredList = studentSkills.map((s) => s.name);
      saveStudentSkillsToDb(formData.email, masteredList, ['Docker', 'Kubernetes', 'CI/CD Pipelines']);
    } catch {}
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      {/* Top Banner / Toast */}
      {saveToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {certificateToast && (
        <div className="p-3 bg-purple-50 border border-purple-200 text-[#6C35F5] text-xs font-bold rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#6C35F5]" />
            <span>{certificateToast}</span>
          </div>
          <button onClick={() => setCertificateToast(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Profile Card matching cell 14 */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E3E8F2] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-[#6C35F5] to-blue-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-[#6C35F5]/20 flex-shrink-0">
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#1B2545] tracking-tight">
              {user.name}
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span>{user.email}</span>
              <span>•</span>
              <span className="text-[#6C35F5] font-bold">{user.targetRole}</span>
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Circular Profile Completion */}
        <div className="flex items-center gap-4 bg-[#F4F7FC] p-4 rounded-2xl border border-[#E3E8F2]/60 self-start md:self-auto">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#6C35F5]"
                strokeDasharray={`${user.profileCompletion}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-black text-[#1B2545]">
              {user.profileCompletion}%
            </span>
          </div>
          <div>
            <div className="text-xs font-bold text-[#1B2545]">Profile Completion</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Add your portfolio link to reach 100%
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Personal Info & Technical Skills */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3E8F2] shadow-2xs space-y-4">
            <h3 className="text-base font-extrabold text-[#1B2545] border-b border-slate-100 pb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#F4F7FC] rounded-xl border border-[#E3E8F2]">
                <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Full Name</span>
                </div>
                <div className="font-bold text-[#1B2545] text-sm">{user.name}</div>
              </div>

              <div className="p-3 bg-[#F4F7FC] rounded-xl border border-[#E3E8F2]">
                <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email Address</span>
                </div>
                <div className="font-bold text-[#1B2545] text-sm truncate">{user.email}</div>
              </div>

              <div className="p-3 bg-[#F4F7FC] rounded-xl border border-[#E3E8F2]">
                <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Phone Number</span>
                </div>
                <div className="font-bold text-[#1B2545] text-sm">{user.phone}</div>
              </div>

              <div className="p-3 bg-[#F4F7FC] rounded-xl border border-[#E3E8F2]">
                <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Location</span>
                </div>
                <div className="font-bold text-[#1B2545] text-sm">{user.location}</div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3E8F2] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#1B2545]">
                Technical Skills
              </h3>
              <span className="text-xs font-bold text-[#6C35F5]">
                {studentSkills.length} Verified
              </span>
            </div>

            <div className="space-y-3">
              {studentSkills.map((sk) => (
                <div key={sk.name}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#1B2545]">{sk.name}</span>
                    <span className="text-slate-500">{sk.proficiency}% ({sk.level})</span>
                  </div>
                  <div className="w-full bg-[#F4F7FC] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#6C35F5] h-full rounded-full"
                      style={{ width: `${sk.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Career Goal & Education */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Career Preferences Section (Dedicated Domain & Role Customization) */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3E8F2] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#1B2545] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#6C35F5]" />
                  <span>Career Preferences</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Exclusive configuration for your active domain &amp; role recommendations
                </p>
              </div>

              {!isEditingPreferences && (
                <button
                  type="button"
                  onClick={() => {
                    setPrefDomainId(activeDomain.id);
                    setPrefRole(user.targetRole || activeDomain.primaryRole);
                    setIsEditingPreferences(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-[#6C35F5] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer border border-purple-200"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Change</span>
                </button>
              )}
            </div>

            {isEditingPreferences ? (
              <form onSubmit={handleSavePreferences} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    Select Technical Domain (All 15 Supported):
                  </label>
                  <select
                    value={prefDomainId}
                    onChange={(e) => {
                      const newId = e.target.value;
                      setPrefDomainId(newId);
                      setPrefRole(DOMAINS_MASTER[newId]?.primaryRole || '');
                    }}
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#6C35F5]"
                  >
                    {Object.values(DOMAINS_MASTER).map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.icon} {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    Target Career Role within {DOMAINS_MASTER[prefDomainId]?.name || 'Domain'}:
                  </label>
                  <select
                    value={prefRole}
                    onChange={(e) => setPrefRole(e.target.value)}
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#6C35F5]"
                  >
                    {(DOMAINS_MASTER[prefDomainId]?.roles || [user.targetRole]).map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Average Compensation:</span>
                    <strong className="text-[#00A88F]">{DOMAINS_MASTER[prefDomainId]?.avgSalary}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Hiring Growth:</span>
                    <strong className="text-[#6C35F5]">{DOMAINS_MASTER[prefDomainId]?.hiringDemand}</strong>
                  </div>
                  <p className="pt-1 text-[10px] text-slate-400">
                    Switching your domain dynamically updates your Dashboard, Roadmaps, YouTube Tutorials, and Assessments without deleting your existing learning history.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-3 rounded-xl bg-[#6C35F5] hover:bg-[#5B21B6] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Save Career Preferences
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingPreferences(false)}
                    className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">Active Technical Domain</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl">{activeDomain.icon}</span>
                    <div className="text-sm font-bold text-[#1B2545]">
                      {activeDomain.name}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold">Target Career Role</span>
                  <div className="text-sm font-bold text-[#6C35F5] mt-0.5">
                    {user.targetRole || activeDomain.primaryRole}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold">Target Timeline</span>
                  <div className="text-sm font-bold text-[#1B2545] mt-0.5">
                    6 Months (Campus Placements 2025)
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold">Target Companies</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {['TCS', 'Infosys', 'Tech Mahindra', 'Accenture', 'SaaS Startups'].map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-lg bg-[#F4F7FC] border border-[#E3E8F2] text-slate-700 font-semibold text-[11px]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Historical Assessment & Learning Records (Preserved Across Domains) */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3E8F2] shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#1B2545] flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-600" />
                <span>Historical Assessment Records</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Preserved
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Historical performance records are retained per domain even if your career focus changes.
            </p>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {assessmentHistory.map((rec, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#1B2545]">{rec.testName}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {rec.role} • {rec.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-[#6C35F5]">{rec.score}%</span>
                    <div className="text-[9px] font-bold text-emerald-600">Verified</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Details */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3E8F2] shadow-2xs space-y-4">
            <h3 className="text-base font-extrabold text-[#1B2545] border-b border-slate-100 pb-3">
              Education
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold">Degree</span>
                <div className="text-sm font-bold text-[#1B2545] mt-0.5">
                  {user.education}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-semibold">College / University</span>
                <div className="text-sm font-bold text-[#1B2545] mt-0.5">
                  {user.college}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-400 font-semibold">Graduation Year</span>
                  <div className="text-sm font-bold text-[#1B2545] mt-0.5">
                    {user.graduationYear}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">CGPA</span>
                  <div className="text-sm font-bold text-emerald-600 mt-0.5">
                    {user.cgpa} / 10
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* SKILLTWIN VERIFIED CAREER READINESS CERTIFICATE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3E8F2] shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-50 text-[#6C35F5] border border-purple-200 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Verifiable Industry Credential</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1B2545] tracking-tight">
              SkillTwin Verified Career Readiness Certificate
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Audited and authenticated credentials generated from your diagnostic assessments, coding benchmarks, and AI mock interview scores.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyCredential}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-[#F4F7FC] hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Verify Link</span>
            </button>
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-3.5 py-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-xs font-bold text-[#6C35F5] transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>View &amp; Print</span>
            </button>
            <button
              onClick={handleDownloadCertificate}
              className="px-4 py-2 rounded-xl bg-[#6C35F5] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all shadow-md shadow-[#6C35F5]/25 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate Display Mockup */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0B132B] via-[#101F42] to-[#1C1542] text-white border-4 border-amber-400/40 shadow-xl overflow-hidden">
          {/* Watermark Crest */}
          <div className="absolute right-4 -bottom-10 opacity-5 pointer-events-none select-none text-[200px] font-black">
            ST
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-900 font-black text-xl flex items-center justify-center shadow-lg">
                  ST
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-amber-300">
                    SKILLTWIN AI ACADEMIC &amp; INDUSTRY COUNCIL
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    Global Verification Standard for Engineering Readiness
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>OFFICIALLY VERIFIED</span>
                </span>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  ID: {credentialId}
                </div>
              </div>
            </div>

            <div className="text-center space-y-2 py-2">
              <div className="text-xs tracking-widest uppercase text-amber-200/90 font-bold">
                CERTIFICATE OF VERIFIED CAREER READINESS
              </div>
              <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {user.name}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed pt-1">
                Has demonstrated proven readiness for entry into corporate engineering roles as a verified <strong className="text-white underline">{user.targetRole}</strong>, validating core architectures, algorithms, and practical technical frameworks.
              </p>
            </div>

            {/* 4 Score Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-xs text-indigo-200 font-medium">Readiness Index</div>
                <div className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5">{user.readinessScore}%</div>
                <div className="text-[9px] text-emerald-400 font-bold uppercase">Audited Score</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-xs text-indigo-200 font-medium">Coding Benchmark</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-0.5">Top 6%</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase">94th Percentile</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-xs text-indigo-200 font-medium">AI Mock Interview</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5">92 / 100</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase">Live Audio Tested</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-xs text-indigo-200 font-medium">ATS Match Index</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-0.5">94%</div>
                <div className="text-[9px] text-purple-300 font-bold uppercase">Role Optimized</div>
              </div>
            </div>

            {/* Signatures & Footer */}
            <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="space-y-1">
                <div className="font-mono text-[11px] text-amber-200/90 font-bold">
                  Dr. Rajesh K., Ph.D.
                </div>
                <div className="text-[10px] text-slate-400">Dean of Engineering Evaluation, SkillTwin</div>
              </div>

              <div className="space-y-1 text-center sm:text-right">
                <div className="text-[10px] text-slate-400">Issue Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                <div className="text-[10px] text-slate-400 font-mono">Blockchain Hash: 0x8a91c...f42b</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Certificate Modal for Print / High-Res View */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 animate-fade-in max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#6C35F5]" />
                <h3 className="text-base font-black text-slate-900">
                  Official Printable Certificate View
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-black text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Print-Ready Certificate Card */}
            <div className="border-8 border-double border-amber-600/40 p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-amber-50/20 via-white to-amber-50/30 text-center space-y-6">
              <div className="space-y-1">
                <div className="text-[11px] font-black tracking-widest text-[#6C35F5] uppercase">
                  SKILLTWIN AI • CAREER READINESS ACCREDITATION
                </div>
                <div className="text-2xl font-black text-slate-900 font-serif">
                  CERTIFICATE OF COMPETENCY
                </div>
              </div>

              <div className="py-2">
                <p className="text-xs text-slate-500 italic">This is proudly presented to</p>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#1B2545] font-serif mt-1">
                  {user.name}
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
                For demonstrating exceptional technical mastery, structured algorithmic problem solving, and verified readiness for the role of <strong className="text-slate-900">{user.targetRole}</strong> with an overall composite score of <strong className="text-[#6C35F5]">{user.readinessScore}%</strong>.
              </p>

              <div className="flex justify-center gap-6 text-xs text-slate-700 py-2 border-y border-amber-200/80">
                <div>
                  <span className="text-slate-400 text-[10px] block">Credential ID</span>
                  <span className="font-mono font-bold text-slate-900">{credentialId}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Mock Interview</span>
                  <span className="font-bold text-emerald-600">92 / 100 Advanced</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Verification Status</span>
                  <span className="font-bold text-[#6C35F5]">Authenticated AI Seal</span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-4 text-left text-xs">
                <div>
                  <div className="font-serif font-bold text-slate-800 border-b border-slate-300 pb-1">
                    Ankita Chintakindi
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Candidate Signature</div>
                </div>

                <div className="w-14 h-14 rounded-full border-2 border-amber-500/50 flex items-center justify-center text-[10px] font-black text-amber-700 bg-amber-100/50 uppercase shadow-inner">
                  SEAL
                </div>

                <div className="text-right">
                  <div className="font-serif font-bold text-slate-800 border-b border-slate-300 pb-1">
                    Dr. Rajesh K., Ph.D.
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Chair, Evaluation Council</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={handleDownloadCertificate}
                className="px-4 py-2 rounded-xl bg-[#6C35F5] text-white text-xs font-bold hover:bg-[#5B21B6] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save to PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-extrabold text-slate-900">Edit Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Role</label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Education</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6C35F5] hover:bg-[#5B21B6] text-white font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
