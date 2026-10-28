import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Menu, ChevronDown, User, Settings, LogOut, HelpCircle, Layers } from 'lucide-react';
import { StudentProfile } from '../../data/collageData';
import { getActiveDomain } from '../../data/multiDomainData';

interface CollageHeaderProps {
  user: StudentProfile;
  onToggleMobileMenu: () => void;
  onLogout?: () => void;
  titleOverride?: string;
  breadcrumb?: string;
}

export const CollageHeader: React.FC<CollageHeaderProps> = ({
  user,
  onToggleMobileMenu,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeDomain = getActiveDomain();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('') || 'AC';

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[6000] bg-[#0B1F3A] text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Topbar matching exact HTML: height 72px, background white, border #E2E8F0 */}
      <header className="h-[72px] bg-white border-b border-[#E2E8F0] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40 shrink-0">
        {/* Left: Mobile hamburger & Active Domain Quick Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-[#0B1F3A] hover:bg-[#F3F7FC] rounded-lg transition-colors text-xl font-bold cursor-pointer"
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          {/* Active Domain Indicator (changes in Profile → Career Preferences) */}
          <Link
            to="/profile"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3F7FC] hover:bg-[#EEF2F6] text-[#0B1F3A] text-xs font-medium border border-[#E2E8F0] transition-all cursor-pointer group"
            title="Active Domain Pathway • Manage in Profile → Career Preferences"
          >
            <span className="text-sm">{activeDomain.icon}</span>
            <span className="font-semibold text-xs text-[#0B1F3A]">
              {activeDomain.name.split('(')[0].trim()}
            </span>
            <span className="text-[10px] text-[#64748B] font-semibold bg-[#E2E8F0] px-1.5 py-0.5 rounded">
              Career Pref
            </span>
          </Link>
        </div>

        {/* Right: Actions matching exact HTML */}
        <div className="flex items-center gap-5 ml-auto">
          {/* Notification Button */}
          <button
            onClick={() => showToast('No new notifications')}
            className="w-[38px] h-[38px] border border-[#E2E8F0] rounded-[10px] flex items-center justify-center relative hover:bg-[#F8FAFC] transition-colors cursor-pointer text-[#475569]"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#475569]" />
            <span className="absolute w-[7px] h-[7px] bg-[#EF4444] rounded-full top-[7px] right-[7px] ring-2 ring-white" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer select-none"
              aria-expanded={isProfileMenuOpen}
            >
              <div className="w-10 h-10 rounded-full bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-extrabold text-xs shrink-0">
                {initials}
              </div>

              <div className="hidden sm:block text-left">
                <div className="text-[13px] font-bold text-[#1E293B] leading-tight">
                  {user.name}
                </div>
                <div className="text-[11px] text-[#94A3B8] leading-tight mt-0.5">
                  {user.email || 'Student'}
                </div>
              </div>

              <span className="text-[#64748B] text-xs font-bold ml-0.5">⌄</span>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-[52px] w-[200px] bg-white border border-[#E2E8F0] rounded-[12px] shadow-[0_15px_40px_rgba(15,23,42,0.12)] p-2 z-[2000] animate-in fade-in-50 zoom-in-95 duration-100">
                <Link
                  to="/profile"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[13px] text-[#334155] hover:bg-[#F3F7FC] hover:text-[#5B2EFF] transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[13px] text-[#334155] hover:bg-[#F3F7FC] hover:text-[#5B2EFF] transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    showToast('Help & Support coming soon');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[13px] text-[#334155] hover:bg-[#F3F7FC] hover:text-[#5B2EFF] transition-colors text-left cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Help &amp; Support</span>
                </button>

                <div className="my-1 border-t border-[#EEF2F7]" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[13px] text-[#DC2626] hover:bg-[#FEF2F2] transition-colors text-left font-semibold cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
