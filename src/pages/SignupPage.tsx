import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User,
  AlertCircle,
} from 'lucide-react';
import { SkillTwinLogo } from '../components/common/SkillTwinLogo';
import { StudentProfile } from '../data/collageData';
import { saveUserAccount, setCurrentSessionEmail } from '../utils/userStorage';
import { supabaseSignUp, SUPABASE_PROJECT_ID } from '../utils/supabase';

interface SignupPageProps {
  onSignupSuccess: (user: StudentProfile) => void;
  currentUser: StudentProfile;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onSignupSuccess,
  currentUser,
}) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const requestedFeature = queryParams.get('feature') || '';
  const redirectTarget = queryParams.get('redirect') || '';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    if (!cleanName) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please create a password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setErrorMessage('Please accept the Terms of Service to continue.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // 1. Secure registration in Supabase Cloud Auth & Database
      const sbResult = await supabaseSignUp(cleanName, cleanEmail, password, targetRole);

      if (!sbResult.success && sbResult.error) {
        setIsLoading(false);
        setErrorMessage(sbResult.error);
        return;
      }

      const updated: StudentProfile = {
        ...currentUser,
        name: cleanName,
        email: cleanEmail,
        targetRole: targetRole || 'Select Career Path',
        role: `${targetRole || 'Student'} Aspirant`,
        selectedDomain: undefined,
      };

      saveUserAccount({
        name: cleanName,
        email: cleanEmail,
        password: password,
        profile: updated,
        createdAt: new Date().toISOString(),
      });

      setIsLoading(false);
      setCurrentSessionEmail(cleanEmail);
      onSignupSuccess(updated);

      // Open initial domain setup page
      navigate('/domains', { replace: true });
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Failed to complete registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6FC] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#E3E8F2] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        
        {/* Left Column: Dark Navy */}
        <div className="lg:col-span-5 bg-[#0B1933] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <SkillTwinLogo variant="dark" size="md" linkTo="/" />

            <div className="pt-6 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#6C35F5]" />
                <span>AI-POWERED CAREER PLATFORM</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Create Your SkillTwin Account
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Join thousands of engineering students accelerating their readiness with AI skill gap analysis, personalized roadmaps, and proctored technical evaluations.
              </p>
            </div>

            <div className="pt-2 space-y-2.5">
              {[
                'Free instant ATS resume scoring',
                'Comprehensive coding & aptitude tests',
                'Realistic AI voice mock interviews',
                'Direct company hiring matches',
              ].map((bullet) => (
                <div key={bullet} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-[#16B897]/20 text-[#16B897] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-6 text-[11px] text-slate-400">
            &copy; 2026 SkillTwin AI. All rights reserved.
          </div>
        </div>

        {/* Right Column: Sign Up Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between bg-white overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            {requestedFeature && (
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                <Lock className="w-3 h-3 text-purple-600" />
                <span>Unlock {requestedFeature}</span>
              </span>
            )}
            <Link
              to="/"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 ml-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="max-w-md w-full mx-auto my-auto py-2">
            {requestedFeature && (
              <div className="mb-4 p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900 shadow-xs flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Create your profile to immediately access <strong>{requestedFeature}</strong></span>
              </div>
            )}

            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008774] text-[10px] font-bold uppercase tracking-wider mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Supabase Database Connected • {SUPABASE_PROJECT_ID}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#1B2545] tracking-tight">
                Get Started Free
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Set up your student profile in less than a minute
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ankita Chintakindi"
                    required
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5] transition-all"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5] transition-all"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Role
                </label>
                <div className="relative">
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5] transition-all"
                  >
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password"
                    required
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5] transition-all"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-3.5 h-3.5 mt-0.5 rounded text-[#6C35F5] focus:ring-[#6C35F5] border-slate-300"
                  />
                  <span>
                    I agree to the <span className="text-[#6C35F5] font-semibold">Terms of Service</span> and{' '}
                    <span className="text-[#6C35F5] font-semibold">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-[#6C35F5] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md shadow-[#6C35F5]/30 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account & Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-5 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <Link
                to={`/login?redirect=${encodeURIComponent(redirectTarget)}${requestedFeature ? `&feature=${encodeURIComponent(requestedFeature)}` : ''}`}
                className="font-bold text-[#6C35F5] hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-400">
            SkillTwin AI • Build Skills. Prove Them. Get Career Ready.
          </div>
        </div>

      </div>
    </div>
  );
};
