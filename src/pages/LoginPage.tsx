import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  AlertCircle,
} from 'lucide-react';
import { SkillTwinLogo } from '../components/common/SkillTwinLogo';
import { StudentProfile } from '../data/collageData';
import {
  findUserByEmail,
  saveUserAccount,
  setCurrentSessionEmail,
  hasUserSelectedDomain,
  getUserActiveDomainId,
} from '../utils/userStorage';
import { DOMAINS_MASTER } from '../data/multiDomainData';
import { supabaseSignIn, SUPABASE_PROJECT_ID } from '../utils/supabase';

interface LoginPageProps {
  onLoginSuccess: (user?: StudentProfile) => void;
  currentUser: StudentProfile;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  currentUser,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectTarget = queryParams.get('redirect') || '/dashboard';
  const requestedFeature = queryParams.get('feature');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your account password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // 1. Authenticate with Supabase Auth
      const sbResult = await supabaseSignIn(cleanEmail, password);

      if (!sbResult.success && sbResult.error) {
        // Check if user exists locally (for demo/pre-existing accounts)
        const localAcc = findUserByEmail(cleanEmail);
        if (localAcc && localAcc.password === password) {
          // Allow locally cached login
          setCurrentSessionEmail(cleanEmail);
          onLoginSuccess(localAcc.profile);
          const hasDomain = hasUserSelectedDomain(cleanEmail);
          setIsLoading(false);
          if (!hasDomain) {
            navigate('/domains', { replace: true });
          } else {
            navigate(redirectTarget, { replace: true });
          }
          return;
        }

        setIsLoading(false);
        setErrorMessage(sbResult.error);
        return;
      }

      // 2. Fetch or assemble student profile from Supabase & storage
      let account = findUserByEmail(cleanEmail);
      const studentName =
        sbResult.profile?.name ||
        cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      const activeProfile: StudentProfile = {
        ...currentUser,
        ...(sbResult.profile || {}),
        name: studentName,
        email: cleanEmail,
      };

      if (!account) {
        account = {
          name: studentName,
          email: cleanEmail,
          password: password,
          profile: activeProfile,
          createdAt: new Date().toISOString(),
        };
        saveUserAccount(account);
      }

      setCurrentSessionEmail(cleanEmail);
      onLoginSuccess(activeProfile);

      // Check if user has previously selected a domain
      const hasDomain = hasUserSelectedDomain(cleanEmail) || Boolean(activeProfile.selectedDomain);
      setIsLoading(false);

      if (!hasDomain) {
        navigate('/domains', { replace: true });
      } else {
        const domainId = activeProfile.selectedDomain || getUserActiveDomainId(cleanEmail);
        try {
          localStorage.setItem('skilltwin_selected_domain', domainId);
        } catch {}
        navigate(redirectTarget, { replace: true });
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6FC] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#E3E8F2] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Column: Dark Navy branding */}
        <div className="lg:col-span-5 bg-[#0B1933] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <SkillTwinLogo variant="dark" size="md" linkTo="/" />

            <div className="pt-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#6C35F5]" />
                <span>AI-POWERED CAREER PLATFORM</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Welcome back to SkillTwin AI
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Continue your personalized journey toward becoming job ready. Track your skills, complete assessments, build projects and prepare for interviews.
              </p>
            </div>

            {/* Checkmark benefit bullets */}
            <div className="pt-4 space-y-3">
              {[
                'Personalized skill analysis',
                'AI-powered learning roadmap',
                'AI mock interview preparation',
                'Track your career readiness',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-[#16B897]/20 text-[#16B897] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="relative z-10 pt-8 text-[11px] text-slate-400">
            &copy; 2026 SkillTwin AI. All rights reserved.
          </div>
        </div>

        {/* Right Column: Sign In Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
          <div className="flex justify-between items-center">
            {requestedFeature && (
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                <Lock className="w-3 h-3 text-purple-600" />
                <span>Authentication Required</span>
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

          <div className="max-w-md w-full mx-auto my-auto py-4">
            {/* Banner if redirected from home page click */}
            {requestedFeature && (
              <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/80 text-xs text-slate-800 shadow-xs flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-purple-950">
                    Sign in to open {requestedFeature}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Sign in to your SkillTwin account below. You will be taken straight to {requestedFeature} immediately after.
                  </p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-[#1B2545] tracking-tight">
                Sign In
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your account details to access your career tools
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5] transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#6C35F5] focus:ring-[#6C35F5] border-slate-300"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo password reset link sent to ' + email)}
                  className="font-bold text-[#6C35F5] hover:underline"
                >
                  Forgot password?
                </button>
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
                      <span>Login & Access</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <Link
                to={`/signup?redirect=${encodeURIComponent(redirectTarget)}${requestedFeature ? `&feature=${encodeURIComponent(requestedFeature)}` : ''}`}
                className="font-bold text-[#6C35F5] hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-400">
            SkillTwin AI Platform • Student Career Intelligence
          </div>
        </div>

      </div>
    </div>
  );
};
