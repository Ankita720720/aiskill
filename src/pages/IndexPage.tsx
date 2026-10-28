import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface IndexPageProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const IndexPage: React.FC<IndexPageProps> = ({
  isAuthenticated: propIsAuthenticated,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalFeature, setAuthModalFeature] = useState<{ path: string; name: string } | null>(null);

  // Determine current authentication state (from props or local storage)
  const isUserAuthenticated =
    propIsAuthenticated !== undefined
      ? propIsAuthenticated
      : (() => {
          try {
            return localStorage.getItem('skilltwin_is_authenticated') === 'true';
          } catch (e) {
            return false;
          }
        })();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 750) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Protected Click Handler: If not signed in, prompt sign in; only after sign in does it open
  const handleProtectedClick = (path: string, featureName: string) => {
    if (isUserAuthenticated) {
      navigate(path);
    } else {
      setAuthModalFeature({ path, name: featureName });
    }
  };

  const handleProceedToLogin = (targetPath: string, featureName: string) => {
    setAuthModalFeature(null);
    navigate(`/login?redirect=${encodeURIComponent(targetPath)}&feature=${encodeURIComponent(featureName)}`);
  };

  const handleProceedToSignup = () => {
    setAuthModalFeature(null);
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-white text-[#0B1F3A] font-['Plus_Jakarta_Sans',Arial,Helvetica,sans-serif] selection:bg-[#EDE9FE] selection:text-[#5B2EFF] relative">
      {/* ================= INLINE STYLES FOR EXACT TEMPLATE FIDELITY ================= */}
      <style>{`
        :root {
          --navy: #0B1F3A;
          --purple: #5B2EFF;
          --teal: #00A88F;
          --light-blue: #F3F7FC;
          --light-purple: #EDE9FE;
          --light-teal: #E6F7F4;
          --gray: #64748B;
          --border: #E2E8F0;
          --white: #FFFFFF;
        }

        .gradient-text-brand {
          background: linear-gradient(90deg, #5B2EFF, #00A88F);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-bg-gradient {
          background:
            radial-gradient(circle at 85% 15%, rgba(91, 46, 255, 0.08), transparent 30%),
            radial-gradient(circle at 15% 85%, rgba(0, 168, 143, 0.06), transparent 30%),
            #ffffff;
        }

        .card-hover-purple {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover-purple:hover {
          transform: translateY(-5px);
          border-color: #C4B5FD;
          box-shadow: 0 15px 35px rgba(11, 31, 58, 0.08);
        }

        .career-card-hover {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .career-card-hover:hover {
          transform: translateY(-4px);
          border-color: #C4B5FD;
          box-shadow: 0 12px 30px rgba(11, 31, 58, 0.07);
        }

        .btn-purple-glow {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-purple-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 9px 24px rgba(91, 46, 255, 0.25);
        }

        .btn-purple-hero {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-purple-hero:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(91, 46, 255, 0.25);
        }
      `}</style>

      {/* ================= SIGN IN REQUIRED MODAL ================= */}
      {authModalFeature && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center relative">
            <button
              onClick={() => setAuthModalFeature(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#5B2EFF] border border-purple-100 flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
              🔒
            </div>

            <span className="text-[11px] font-bold tracking-wider uppercase text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              Authentication Required
            </span>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] mt-3 mb-2">
              Sign In to Open {authModalFeature.name}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              To view, test, and practice with <strong>{authModalFeature.name}</strong>, please sign in or register with your SkillTwin student account.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => handleProceedToLogin(authModalFeature.path, authModalFeature.name)}
                className="w-full py-3 px-5 rounded-xl bg-[#5B2EFF] hover:bg-[#4E24DC] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Sign In</span>
                <span>→</span>
              </button>

              <button
                onClick={handleProceedToSignup}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5B2EFF] font-bold text-xs border border-purple-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Don't have an account? Sign Up Free</span>
              </button>

              <button
                onClick={() => setAuthModalFeature(null)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Stay on Home Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= NAVBAR ================= */}
      <nav className="h-[76px] px-[7%] flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-[#EEF2F7] sticky top-0 z-[1000]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-[10px] text-[21px] font-[800] text-[#0B1F3A] hover:opacity-95 transition-opacity">
          <div
            className="w-[39px] h-[39px] flex items-center justify-center rounded-[11px] text-white text-[19px] shrink-0"
            style={{ background: 'linear-gradient(135deg, #5B2EFF, #00A88F)' }}
          >
            ✦
          </div>
          <span>SkillTwin AI</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-[30px]">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] transition-colors cursor-pointer"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
            className="text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] transition-colors cursor-pointer"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
            className="text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] transition-colors cursor-pointer"
          >
            How It Works
          </a>
          <a
            href="#career-paths"
            onClick={(e) => { e.preventDefault(); scrollToSection('career-paths'); }}
            className="text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] transition-colors cursor-pointer"
          >
            Career Paths
          </a>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            className="text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] transition-colors cursor-pointer"
          >
            About
          </a>
        </div>

        {/* Nav Buttons (Conditional on authentication) */}
        <div className="flex items-center gap-[8px]">
          {isUserAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="py-[9px] px-[18px] text-white bg-[#5B2EFF] rounded-[9px] text-[14px] font-[700] btn-purple-glow flex items-center gap-1.5"
              >
                <span>Dashboard</span>
                <span>→</span>
              </Link>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="hidden sm:inline-block py-[9px] px-[14px] text-slate-600 hover:text-red-600 text-[13px] font-[600] rounded-[8px] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-block py-[11px] px-[18px] text-[#0B1F3A] text-[14px] font-[700] hover:text-[#5B2EFF] transition-colors"
              >
                Login
              </Link>

              <button
                onClick={() => handleProtectedClick('/dashboard', 'SkillTwin Workspace')}
                className="py-[11px] px-[20px] text-white bg-[#5B2EFF] rounded-[9px] text-[14px] font-[700] btn-purple-glow cursor-pointer"
              >
                Get Started
              </button>
            </>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-[40px] h-[40px] bg-white border border-[#E2E8F0] rounded-[8px] flex items-center justify-center text-[20px] text-[#0B1F3A] hover:bg-slate-50 transition-colors cursor-pointer ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed top-[76px] left-0 w-full px-[7%] pt-[15px] pb-[25px] bg-white border-b border-[#E2E8F0] shadow-[0_15px_30px_rgba(11,31,58,0.1)] z-[999] md:hidden flex flex-col">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="py-[11px] text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] border-b border-slate-100"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
            className="py-[11px] text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] border-b border-slate-100"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
            className="py-[11px] text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] border-b border-slate-100"
          >
            How It Works
          </a>
          <a
            href="#career-paths"
            onClick={(e) => { e.preventDefault(); scrollToSection('career-paths'); }}
            className="py-[11px] text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] border-b border-slate-100"
          >
            Career Paths
          </a>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            className="py-[11px] text-[#475569] text-[14px] font-[600] hover:text-[#5B2EFF] border-b border-slate-100"
          >
            About
          </a>
          <div className="pt-3 flex flex-col gap-2">
            {isUserAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="py-[10px] text-center text-white text-[14px] font-[700] bg-[#5B2EFF] rounded-[8px]"
                >
                  Go to Dashboard
                </Link>
                {onLogout && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                    className="py-[10px] text-center text-red-600 text-[14px] font-[700] border border-red-200 rounded-[8px]"
                  >
                    Sign Out
                  </button>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-[10px] text-center text-[#0B1F3A] text-[14px] font-[700] border border-[#E2E8F0] rounded-[8px] hover:bg-slate-50"
                >
                  Login
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleProtectedClick('/dashboard', 'SkillTwin Workspace'); }}
                  className="py-[10px] text-center text-white text-[14px] font-[700] bg-[#5B2EFF] rounded-[8px]"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="min-h-[650px] py-[85px] px-[7%] grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-[65px] items-center hero-bg-gradient"
      >
        <div className="max-w-[650px] mx-auto lg:mx-0 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-[8px] py-[8px] px-[14px] mb-[22px] rounded-[30px] bg-[#EDE9FE] text-[#5B2EFF] text-[12px] font-[800] tracking-[0.5px]">
            ✨ AI-POWERED CAREER PLATFORM
          </div>

          {/* Heading */}
          <h1 className="text-[40px] sm:text-[50px] lg:text-[62px] leading-[1.08] tracking-[-2.2px] font-[800] text-[#0B1F3A] mb-[24px]">
            Build Skills.{' '}
            <span className="gradient-text-brand">
              Prove Them.
            </span>
            <br />
            Get Career Ready.
          </h1>

          {/* Description */}
          <p className="text-[#64748B] text-[17px] sm:text-[18px] max-w-[600px] mb-[32px] mx-auto lg:mx-0 leading-relaxed">
            SkillTwin AI is your intelligent career companion for discovering your skills,
            identifying what to learn, building practical experience and preparing for your future career.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center lg:justify-start gap-[13px] flex-wrap">
            <button
              onClick={() => handleProtectedClick('/dashboard', 'SkillTwin Platform')}
              className="inline-flex items-center justify-center py-[14px] px-[25px] bg-[#5B2EFF] text-white rounded-[10px] text-[14px] font-[700] btn-purple-hero cursor-pointer"
            >
              Get Started →
            </button>

            <a
              href="#how-it-works"
              onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
              className="inline-flex items-center justify-center py-[13px] px-[25px] bg-white text-[#0B1F3A] border border-[#CBD5E1] rounded-[10px] text-[14px] font-[700] hover:text-[#5B2EFF] hover:border-[#5B2EFF] transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* PUBLIC PRODUCT PREVIEW */}
        <div className="min-h-[430px] relative flex items-center justify-center w-full max-w-[600px] mx-auto lg:mx-0">
          <div className="w-[470px] max-w-full p-[28px] bg-white border border-[#E2E8F0] rounded-[22px] shadow-[0_25px_70px_rgba(11,31,58,0.12)] relative z-[2] text-left">
            {/* Header */}
            <div className="flex items-center gap-[13px] pb-[21px] border-b border-[#E2E8F0]">
              <div
                className="w-[48px] h-[48px] flex items-center justify-center rounded-[14px] text-white text-[21px] shrink-0"
                style={{ background: 'linear-gradient(135deg, #5B2EFF, #00A88F)' }}
              >
                ✦
              </div>
              <div>
                <h3 className="text-[18px] font-[700] text-[#0B1F3A] mb-[2px]">
                  SkillTwin AI
                </h3>
                <span className="text-[#64748B] text-[12px]">
                  Your AI Career Companion
                </span>
              </div>
            </div>

            {/* Feature 1 */}
            <div
              onClick={() => handleProtectedClick('/skill-gap', 'Understand Your Skills')}
              className="flex gap-[14px] py-[18px] border-b border-[#F1F5F9] items-start hover:bg-slate-50/80 rounded-xl px-2 -mx-2 transition-colors cursor-pointer"
            >
              <div className="w-[39px] h-[39px] shrink-0 flex items-center justify-center bg-[#F3F7FC] rounded-[10px] text-[18px]">
                📄
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-[700] text-[#0B1F3A] mb-[3px]">
                    Understand Your Skills
                  </h4>
                  {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Sign In</span>}
                </div>
                <p className="text-[#64748B] text-[12px] leading-snug">
                  Build a clear picture of your current technical abilities.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => handleProtectedClick('/career-path', 'Identify What To Learn')}
              className="flex gap-[14px] py-[18px] border-b border-[#F1F5F9] items-start hover:bg-slate-50/80 rounded-xl px-2 -mx-2 transition-colors cursor-pointer"
            >
              <div className="w-[39px] h-[39px] shrink-0 flex items-center justify-center bg-[#F3F7FC] rounded-[10px] text-[18px]">
                🎯
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-[700] text-[#0B1F3A] mb-[3px]">
                    Identify What To Learn
                  </h4>
                  {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Sign In</span>}
                </div>
                <p className="text-[#64748B] text-[12px] leading-snug">
                  Discover the knowledge and skills needed for your career direction.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => handleProtectedClick('/learning-resources', 'Learn & Build')}
              className="flex gap-[14px] py-[18px] border-b border-[#F1F5F9] items-start hover:bg-slate-50/80 rounded-xl px-2 -mx-2 transition-colors cursor-pointer"
            >
              <div className="w-[39px] h-[39px] shrink-0 flex items-center justify-center bg-[#F3F7FC] rounded-[10px] text-[18px]">
                📚
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-[700] text-[#0B1F3A] mb-[3px]">
                    Learn & Build
                  </h4>
                  {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Sign In</span>}
                </div>
                <p className="text-[#64748B] text-[12px] leading-snug">
                  Develop your skills through learning and practical experience.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => handleProtectedClick('/mock-interview', 'Prepare For Your Career')}
              className="flex gap-[14px] pt-[18px] items-start hover:bg-slate-50/80 rounded-xl px-2 -mx-2 transition-colors cursor-pointer"
            >
              <div className="w-[39px] h-[39px] shrink-0 flex items-center justify-center bg-[#F3F7FC] rounded-[10px] text-[18px]">
                🎤
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-[700] text-[#0B1F3A] mb-[3px]">
                    Prepare For Your Career
                  </h4>
                  {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Sign In</span>}
                </div>
                <p className="text-[#64748B] text-[12px] leading-snug">
                  Practice assessments and interviews before entering the job market.
                </p>
              </div>
            </div>
          </div>

          {/* Floating Card 1 (top-right) */}
          <div className="hidden sm:block absolute top-[25px] -right-[15px] py-[14px] px-[17px] bg-white border border-[#E2E8F0] rounded-[13px] shadow-[0_15px_40px_rgba(11,31,58,0.1)] z-[3] text-left">
            <div className="text-[#64748B] text-[10px] mb-[3px] font-[600]">
              Career Guidance
            </div>
            <div className="text-[14px] font-[800] text-[#5B2EFF]">
              AI-Powered
            </div>
          </div>

          {/* Floating Card 2 (bottom-left) */}
          <div className="hidden sm:block absolute bottom-[25px] -left-[20px] py-[14px] px-[17px] bg-white border border-[#E2E8F0] rounded-[13px] shadow-[0_15px_40px_rgba(11,31,58,0.1)] z-[3] text-left">
            <div className="text-[#64748B] text-[10px] mb-[3px] font-[600]">
              Learning
            </div>
            <div className="text-[14px] font-[800] text-[#00A88F]">
              Personalized
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-[28px] px-[7%] grid grid-cols-2 lg:grid-cols-4 gap-[20px] bg-[#F3F7FC]">
        <div className="p-[18px] text-center">
          <h3 className="text-[27px] font-[800] text-[#0B1F3A] mb-[3px]">AI</h3>
          <p className="text-[#64748B] text-[13px]">Career Guidance</p>
        </div>

        <div className="p-[18px] text-center">
          <h3 className="text-[27px] font-[800] text-[#0B1F3A] mb-[3px]">8+</h3>
          <p className="text-[#64748B] text-[13px]">Career Directions</p>
        </div>

        <div className="p-[18px] text-center">
          <h3 className="text-[27px] font-[800] text-[#0B1F3A] mb-[3px]">3</h3>
          <p className="text-[#64748B] text-[13px]">Learning & Assessment Areas</p>
        </div>

        <div className="p-[18px] text-center">
          <h3 className="text-[27px] font-[800] text-[#0B1F3A] mb-[3px]">24/7</h3>
          <p className="text-[#64748B] text-[13px]">Learning Support</p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-[90px] px-[7%]" id="features">
        <div className="max-w-[700px] mx-auto mb-[50px] text-center">
          <span className="text-[#5B2EFF] text-[12px] font-[800] uppercase tracking-[1px]">
            Why SkillTwin AI
          </span>
          <h2 className="text-[32px] sm:text-[39px] font-[800] text-[#0B1F3A] leading-[1.2] my-[9px] mb-[14px]">
            Everything You Need To Grow
          </h2>
          <p className="text-[#64748B] text-[15px]">
            SkillTwin AI brings the important parts of your career preparation together in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[21px]">
          {/* Card 1: Resume Analysis */}
          <div
            onClick={() => handleProtectedClick('/resume-analyzer', 'Resume Analysis')}
            className="block p-[27px] bg-white border border-[#E2E8F0] rounded-[16px] card-hover-purple text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-[17px]">
              <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#EDE9FE] text-[#5B2EFF] rounded-[13px] text-[20px]">
                📄
              </div>
              {!isUserAuthenticated && (
                <span className="text-[11px] font-semibold text-[#5B2EFF] bg-[#EDE9FE] px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                  <span>🔒 Sign in to access</span>
                </span>
              )}
            </div>
            <h3 className="text-[17px] font-[700] text-[#0B1F3A] mb-[7px] group-hover:text-[#5B2EFF] transition-colors">
              Resume Analysis
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Understand your existing skills, projects and career alignment.
            </p>
          </div>

          {/* Card 2: Skill Gap Discovery */}
          <div
            onClick={() => handleProtectedClick('/skill-gap', 'Skill Gap Discovery')}
            className="block p-[27px] bg-white border border-[#E2E8F0] rounded-[16px] card-hover-purple text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-[17px]">
              <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#EDE9FE] text-[#5B2EFF] rounded-[13px] text-[20px]">
                🎯
              </div>
              {!isUserAuthenticated && (
                <span className="text-[11px] font-semibold text-[#5B2EFF] bg-[#EDE9FE] px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                  <span>🔒 Sign in to access</span>
                </span>
              )}
            </div>
            <h3 className="text-[17px] font-[700] text-[#0B1F3A] mb-[7px] group-hover:text-[#5B2EFF] transition-colors">
              Skill Gap Discovery
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Identify important skills you need to develop for your career goal.
            </p>
          </div>

          {/* Card 3: Career Guidance */}
          <div
            onClick={() => handleProtectedClick('/career-path', 'Career Guidance')}
            className="block p-[27px] bg-white border border-[#E2E8F0] rounded-[16px] card-hover-purple text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-[17px]">
              <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#EDE9FE] text-[#5B2EFF] rounded-[13px] text-[20px]">
                🧭
              </div>
              {!isUserAuthenticated && (
                <span className="text-[11px] font-semibold text-[#5B2EFF] bg-[#EDE9FE] px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                  <span>🔒 Sign in to access</span>
                </span>
              )}
            </div>
            <h3 className="text-[17px] font-[700] text-[#0B1F3A] mb-[7px] group-hover:text-[#5B2EFF] transition-colors">
              Career Guidance
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Explore career paths and understand the skills required for each direction.
            </p>
          </div>

          {/* Card 4: Assessments */}
          <div
            onClick={() => handleProtectedClick('/assessments', 'Assessments')}
            className="block p-[27px] bg-white border border-[#E2E8F0] rounded-[16px] card-hover-purple text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-[17px]">
              <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#EDE9FE] text-[#5B2EFF] rounded-[13px] text-[20px]">
                📝
              </div>
              {!isUserAuthenticated && (
                <span className="text-[11px] font-semibold text-[#5B2EFF] bg-[#EDE9FE] px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                  <span>🔒 Sign in to access</span>
                </span>
              )}
            </div>
            <h3 className="text-[17px] font-[700] text-[#0B1F3A] mb-[7px] group-hover:text-[#5B2EFF] transition-colors">
              Assessments
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Practice technical, coding and aptitude skills to measure your progress.
            </p>
          </div>

          {/* Card 5: AI Mock Interviews */}
          <div
            onClick={() => handleProtectedClick('/mock-interview', 'AI Mock Interviews')}
            className="block p-[27px] bg-white border border-[#E2E8F0] rounded-[16px] card-hover-purple text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-[17px]">
              <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#EDE9FE] text-[#5B2EFF] rounded-[13px] text-[20px]">
                🎤
              </div>
              {!isUserAuthenticated && (
                <span className="text-[11px] font-semibold text-[#5B2EFF] bg-[#EDE9FE] px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                  <span>🔒 Sign in to access</span>
                </span>
              )}
            </div>
            <h3 className="text-[17px] font-[700] text-[#0B1F3A] mb-[7px] group-hover:text-[#5B2EFF] transition-colors">
              AI Mock Interviews
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Practice interview conversations and improve your interview preparation.
            </p>
          </div>

          {/* Card 6: Career Opportunities */}
          <div
            onClick={() => handleProtectedClick('/job-vacancies', 'Career Opportunities')}
            className="block p-[27px] bg-white border border-[#E2E8F0] rounded-[16px] card-hover-purple text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-[17px]">
              <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#EDE9FE] text-[#5B2EFF] rounded-[13px] text-[20px]">
                💼
              </div>
              {!isUserAuthenticated && (
                <span className="text-[11px] font-semibold text-[#5B2EFF] bg-[#EDE9FE] px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1">
                  <span>🔒 Sign in to access</span>
                </span>
              )}
            </div>
            <h3 className="text-[17px] font-[700] text-[#0B1F3A] mb-[7px] group-hover:text-[#5B2EFF] transition-colors">
              Career Opportunities
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Explore job opportunities according to your skills and career direction.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-[90px] px-[7%] bg-[#F3F7FC]" id="how-it-works">
        <div className="max-w-[700px] mx-auto mb-[50px] text-center">
          <span className="text-[#5B2EFF] text-[12px] font-[800] uppercase tracking-[1px]">
            Simple Process
          </span>
          <h2 className="text-[32px] sm:text-[39px] font-[800] text-[#0B1F3A] leading-[1.2] my-[9px] mb-[14px]">
            How SkillTwin AI Works
          </h2>
          <p className="text-[#64748B] text-[15px]">
            Start with your goal and gradually build the skills and experience you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[25px]">
          {/* Step 1 */}
          <div className="text-center p-4">
            <div className="w-[55px] h-[55px] flex items-center justify-center mx-auto mb-[17px] bg-[#5B2EFF] text-white rounded-full font-[800] text-[18px] shadow-sm">
              01
            </div>
            <h3 className="text-[16px] font-[700] text-[#0B1F3A] mb-[6px]">
              Tell Us Your Goal
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Choose the career direction you want to work toward.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center p-4">
            <div className="w-[55px] h-[55px] flex items-center justify-center mx-auto mb-[17px] bg-[#5B2EFF] text-white rounded-full font-[800] text-[18px] shadow-sm">
              02
            </div>
            <h3 className="text-[16px] font-[700] text-[#0B1F3A] mb-[6px]">
              Understand Your Skills
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Discover your current knowledge and areas for improvement.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center p-4">
            <div className="w-[55px] h-[55px] flex items-center justify-center mx-auto mb-[17px] bg-[#5B2EFF] text-white rounded-full font-[800] text-[18px] shadow-sm">
              03
            </div>
            <h3 className="text-[16px] font-[700] text-[#0B1F3A] mb-[6px]">
              Learn & Practice
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Learn relevant skills and strengthen them through practical work.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center p-4">
            <div className="w-[55px] h-[55px] flex items-center justify-center mx-auto mb-[17px] bg-[#5B2EFF] text-white rounded-full font-[800] text-[18px] shadow-sm">
              04
            </div>
            <h3 className="text-[16px] font-[700] text-[#0B1F3A] mb-[6px]">
              Prepare For Your Career
            </h3>
            <p className="text-[#64748B] text-[13px] leading-relaxed">
              Practice assessments, projects and interviews for your career journey.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CAREER PATHS ================= */}
      <section className="py-[90px] px-[7%]" id="career-paths">
        <div className="max-w-[700px] mx-auto mb-[50px] text-center">
          <span className="text-[#5B2EFF] text-[12px] font-[800] uppercase tracking-[1px]">
            Career Directions
          </span>
          <h2 className="text-[32px] sm:text-[39px] font-[800] text-[#0B1F3A] leading-[1.2] my-[9px] mb-[14px]">
            Explore Your Career Possibilities
          </h2>
          <p className="text-[#64748B] text-[15px]">
            Choose a direction and understand the skills needed to move toward it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {/* Role 1 */}
          <div
            onClick={() => handleProtectedClick('/career-path', 'Frontend Developer')}
            className="p-[23px] bg-white border border-[#E2E8F0] rounded-[15px] career-card-hover block text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-[700] text-[#0B1F3A] group-hover:text-[#5B2EFF] transition-colors">
                Frontend Developer
              </h3>
              {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Lock</span>}
            </div>
            <p className="text-[#64748B] text-[12px] leading-relaxed">
              HTML, CSS, JavaScript, React and modern UI development.
            </p>
          </div>

          {/* Role 2 */}
          <div
            onClick={() => handleProtectedClick('/career-path', 'Backend Developer')}
            className="p-[23px] bg-white border border-[#E2E8F0] rounded-[15px] career-card-hover block text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-[700] text-[#0B1F3A] group-hover:text-[#5B2EFF] transition-colors">
                Backend Developer
              </h3>
              {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Lock</span>}
            </div>
            <p className="text-[#64748B] text-[12px] leading-relaxed">
              Node.js, Express, APIs, databases and backend systems.
            </p>
          </div>

          {/* Role 3 */}
          <div
            onClick={() => handleProtectedClick('/career-path', 'Full Stack Developer')}
            className="p-[23px] bg-white border border-[#E2E8F0] rounded-[15px] career-card-hover block text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-[700] text-[#0B1F3A] group-hover:text-[#5B2EFF] transition-colors">
                Full Stack Developer
              </h3>
              {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Lock</span>}
            </div>
            <p className="text-[#64748B] text-[12px] leading-relaxed">
              Frontend, backend, databases, APIs and deployment.
            </p>
          </div>

          {/* Role 4 */}
          <div
            onClick={() => handleProtectedClick('/career-path', 'Data Analyst')}
            className="p-[23px] bg-white border border-[#E2E8F0] rounded-[15px] career-card-hover block text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-[700] text-[#0B1F3A] group-hover:text-[#5B2EFF] transition-colors">
                Data Analyst
              </h3>
              {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Lock</span>}
            </div>
            <p className="text-[#64748B] text-[12px] leading-relaxed">
              Python, SQL, data analysis and visualization.
            </p>
          </div>

          {/* Role 5 */}
          <div
            onClick={() => handleProtectedClick('/career-path', 'Data Scientist')}
            className="p-[23px] bg-white border border-[#E2E8F0] rounded-[15px] career-card-hover block text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-[700] text-[#0B1F3A] group-hover:text-[#5B2EFF] transition-colors">
                Data Scientist
              </h3>
              {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Lock</span>}
            </div>
            <p className="text-[#64748B] text-[12px] leading-relaxed">
              Python, statistics, machine learning and data science.
            </p>
          </div>

          {/* Role 6 */}
          <div
            onClick={() => handleProtectedClick('/career-path', 'AI / ML Engineer')}
            className="p-[23px] bg-white border border-[#E2E8F0] rounded-[15px] career-card-hover block text-left group cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-[700] text-[#0B1F3A] group-hover:text-[#5B2EFF] transition-colors">
                AI / ML Engineer
              </h3>
              {!isUserAuthenticated && <span className="text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-bold">🔒 Lock</span>}
            </div>
            <p className="text-[#64748B] text-[12px] leading-relaxed">
              Python, machine learning, AI models and deployment.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-[90px] px-[7%] bg-[#F3F7FC]" id="about">
        <div
          className="max-w-[900px] mx-auto p-[36px] sm:p-[48px] border border-[#E2E8F0] rounded-[20px] text-center shadow-xs"
          style={{ background: 'linear-gradient(135deg, #F8FAFF, #F2FBF9)' }}
        >
          <h2 className="text-[28px] sm:text-[32px] font-[800] text-[#0B1F3A] mb-[14px]">
            Your Career Journey, In One Place
          </h2>
          <p className="max-w-[700px] mx-auto text-[#64748B] text-[15px] leading-relaxed">
            SkillTwin AI is designed to help learners understand where they are, decide where they want to go
            and continuously work toward their career goals. From skill development and learning to
            assessments, projects and interview preparation, your journey can be managed from one platform.
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="my-[20px] mx-[7%] mb-[90px] py-[65px] px-[25px] sm:px-[35px] rounded-[25px] text-center text-white shadow-xl"
        style={{ background: 'linear-gradient(135deg, #0B1F3A, #172F50)' }}
      >
        <h2 className="text-[30px] sm:text-[39px] font-[800] mb-[11px] tracking-tight">
          Ready To Start Your Career Journey?
        </h2>
        <p className="max-w-[620px] mx-auto mb-[27px] text-[#CBD5E1] text-[15px] leading-relaxed">
          Create your SkillTwin profile and start building your personalized career journey.
        </p>
        <button
          onClick={() => handleProtectedClick('/dashboard', 'SkillTwin AI Career Platform')}
          className="inline-flex items-center justify-center py-[14px] px-[25px] bg-[#5B2EFF] text-white rounded-[10px] text-[14px] font-[700] btn-purple-hero cursor-pointer"
        >
          Get Started With SkillTwin AI →
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="pt-[50px] px-[7%] pb-[25px] bg-[#08172B] text-white">
        <div className="flex justify-between gap-[50px] flex-wrap pb-[35px] border-b border-[#1E293B]">
          {/* Brand */}
          <div className="max-w-[350px]">
            <Link to="/" className="flex items-center gap-[10px] text-[21px] font-[800] text-white mb-[12px]">
              <div
                className="w-[39px] h-[39px] flex items-center justify-center rounded-[11px] text-white text-[19px] shrink-0"
                style={{ background: 'linear-gradient(135deg, #5B2EFF, #00A88F)' }}
              >
                ✦
              </div>
              <span>SkillTwin AI</span>
            </Link>
            <p className="text-[#94A3B8] text-[13px] leading-relaxed">
              Your AI-powered career companion for learning, skill development and career growth.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-[45px] sm:gap-[65px] flex-wrap">
            <div className="flex flex-col gap-[9px]">
              <h4 className="text-[14px] font-[700] text-white mb-[5px]">
                Explore
              </h4>
              <a
                href="#features"
                onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
                className="text-[#94A3B8] text-[12px] hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
                className="text-[#94A3B8] text-[12px] hover:text-white transition-colors"
              >
                How It Works
              </a>
              <a
                href="#career-paths"
                onClick={(e) => { e.preventDefault(); scrollToSection('career-paths'); }}
                className="text-[#94A3B8] text-[12px] hover:text-white transition-colors"
              >
                Career Paths
              </a>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="text-[#94A3B8] text-[12px] hover:text-white transition-colors"
              >
                About
              </a>
            </div>

            <div className="flex flex-col gap-[9px]">
              <h4 className="text-[14px] font-[700] text-white mb-[5px]">
                Account
              </h4>
              <Link to="/login" className="text-[#94A3B8] text-[12px] hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-[#94A3B8] text-[12px] hover:text-white transition-colors">
                Get Started
              </Link>
              <button
                onClick={() => handleProtectedClick('/dashboard', 'Dashboard')}
                className="text-left text-[#94A3B8] text-[12px] hover:text-white transition-colors cursor-pointer"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="mt-[25px] text-[#64748B] text-center text-[11px]">
          © 2026 SkillTwin AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
