import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  FileText,
  BrainCircuit,
  Building2,
  MapPin,
  DollarSign,
  ShieldCheck,
  Upload,
  User,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Briefcase,
} from 'lucide-react';
import { JobOpportunity, UserProfile, JobApplicationSubmission } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface DirectApplyModalProps {
  job: JobOpportunity | null;
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onApplySuccess: (jobId: string, submission: JobApplicationSubmission) => void;
}

export const DirectApplyModal: React.FC<DirectApplyModalProps> = ({
  job,
  user,
  isOpen,
  onClose,
  onApplySuccess,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [linkedInUrl, setLinkedInUrl] = useState('linkedin.com/in/ankita-chintakindi');
  const [portfolioUrl, setPortfolioUrl] = useState('github.com/ankita-ai');
  const [shareSkillTwinScore, setShareSkillTwinScore] = useState(true);
  const [resumeFileName, setResumeFileName] = useState('Ankita_Chintakindi_AI_Engineer_Resume.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-generate AI tailored cover note
  const [coverNote, setCoverNote] = useState(
    `Dear ${job?.company || 'Hiring'} Team,\n\nI am thrilled to apply for the ${
      job?.title || 'AI Engineer'
    } position. With strong hands-on proficiency in ${
      job?.matchedSkills.join(', ') || 'Python and Machine Learning'
    } (verified by my SkillTwin Career Benchmark at ${
      user.readinessScore
    }%), I have built end-to-end predictive systems and model pipelines. I am excited to bring my technical skills and rapid problem-solving to ${
      job?.company || 'your engineering team'
    }.\n\nBest regards,\n${user.name}`
  );

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const submission: JobApplicationSubmission = {
        jobId: job.id,
        fullName,
        email,
        phone,
        linkedInUrl,
        portfolioUrl,
        coverNote,
        resumeFileName,
        shareSkillTwinScore,
        appliedDate: 'Today, ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };

      setTimeout(() => {
        onApplySuccess(job.id, submission);
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-8 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 border-b flex items-start justify-between ${
            isLight ? 'bg-slate-50/80 border-slate-100' : 'bg-slate-950/70 border-slate-800'
          }`}
        >
          <div className="flex items-start gap-4">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  1-Click Direct Apply
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-500" />
                  {job.location}
                </span>
              </div>
              <h3 className={`text-lg font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {job.title}
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'} font-medium`}>
                {job.company} • <span className="text-emerald-600 font-bold">{job.salary}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Application Form */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Application Submitted Directly!
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'} mt-1.5 max-w-md mx-auto`}>
                Your application and verified SkillTwin competency profile have been forwarded to the hiring team at <strong>{job.company}</strong>.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/50 text-left max-w-md mx-auto text-xs space-y-1">
              <p className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Direct Candidate Advantage:
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                Your {user.readinessScore}% Career Readiness score gives your application top 15% recruiter queue priority.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Skill Twin Verified Profile Badge banner */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isLight
                  ? 'bg-gradient-to-r from-indigo-50/80 via-white to-emerald-50/60 border-indigo-100'
                  : 'bg-gradient-to-r from-indigo-950/50 via-slate-900 to-emerald-950/40 border-indigo-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      SkillTwin Verified Credentials Attached
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Matched Skills: <strong>{job.matchedSkills.join(', ')}</strong> ({job.matchScore}% Match)
                  </p>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={shareSkillTwinScore}
                  onChange={(e) => setShareSkillTwinScore(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  Include Twin Score
                </span>
              </label>
            </div>

            {/* Candidate Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <User className="w-3.5 h-3.5 text-indigo-500" /> Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900'
                      : 'bg-slate-950 border-slate-800 text-slate-100'
                  }`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <Mail className="w-3.5 h-3.5 text-indigo-500" /> Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900'
                      : 'bg-slate-950 border-slate-800 text-slate-100'
                  }`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <Phone className="w-3.5 h-3.5 text-indigo-500" /> Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900'
                      : 'bg-slate-950 border-slate-800 text-slate-100'
                  }`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <Linkedin className="w-3.5 h-3.5 text-indigo-500" /> LinkedIn Profile
                </label>
                <input
                  type="text"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900'
                      : 'bg-slate-950 border-slate-800 text-slate-100'
                  }`}
                />
              </div>
            </div>

            {/* Resume Attachment Pill */}
            <div className="space-y-1.5">
              <label className={`text-xs font-bold flex items-center justify-between ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" /> Attached Resume
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">AI ATS Optimized</span>
              </label>

              <div
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  isLight ? 'bg-slate-50 border-slate-200/80' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                      {resumeFileName}
                    </p>
                    <p className="text-[10px] text-slate-500">2.4 MB • Updated Today</p>
                  </div>
                </div>

                <label className="cursor-pointer px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors">
                  <Upload className="w-3 h-3 inline mr-1" />
                  Replace
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResumeFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* AI Generated Tailored Cover Note */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> AI Tailored Pitch / Cover Note
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCoverNote(
                      `Dear ${job.company} Hiring Manager,\n\nI am applying for the ${
                        job.title
                      } position with proven skills in ${job.matchedSkills.join(
                        ', '
                      )}. My SkillTwin Career Readiness score is currently ${
                        user.readinessScore
                      }%, backed by verifiable projects and assessments. I would love the opportunity to discuss how my background aligns with your team’s roadmap.\n\nSincerely,\n${
                        user.name
                      }`
                    );
                  }}
                  className="text-[10px] font-bold text-indigo-600 hover:underline"
                >
                  Regenerate Pitch
                </button>
              </div>
              <textarea
                rows={4}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className={`w-full rounded-2xl p-3 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono leading-relaxed ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800'
                    : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              />
            </div>

            {/* Action Buttons */}
            <div className={`flex items-center justify-between pt-3 border-t ${
              isLight ? 'border-slate-100' : 'border-slate-800'
            }`}>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{isSubmitting ? 'Sending Application...' : 'Submit Direct Application'}</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
