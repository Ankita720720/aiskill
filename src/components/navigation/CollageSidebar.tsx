import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  Target,
  Compass,
  Library,
  FolderKanban,
  Briefcase,
  Mic,
  PieChart,
  Settings,
  LogOut,
  X,
  Layers,
} from 'lucide-react';
import { SkillTwinLogo } from '../common/SkillTwinLogo';
import { StudentProfile } from '../../data/collageData';

interface CollageSidebarProps {
  user: StudentProfile;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
}

export const CollageSidebar: React.FC<CollageSidebarProps> = ({
  user,
  isMobileOpen = false,
  onCloseMobile,
  onLogout,
}) => {
  const navigate = useNavigate();

  const navGroups = [
    {
      title: 'MAIN',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Domain Pathways', path: '/domains', icon: Layers },
        { label: 'Resume Analyzer', path: '/resume-analyzer', icon: FileText },
        { label: 'Assessments', path: '/assessments', icon: ClipboardCheck },
        { label: 'Skill Gap', path: '/skill-gap', icon: Target },
        { label: 'Career Path', path: '/career-path', icon: Compass },
      ],
    },
    {
      title: 'LEARN',
      items: [
        { label: 'Learning Resources', path: '/learning-resources', icon: Library },
        { label: 'Projects', path: '/projects', icon: FolderKanban },
      ],
    },
    {
      title: 'CAREER',
      items: [
        { label: 'Mock Interview', path: '/mock-interview', icon: Mic },
        { label: 'Job Vacancies', path: '/job-vacancies', icon: Briefcase },
      ],
    },
    {
      title: 'INSIGHTS',
      items: [
        { label: 'Analytics & Reports', path: '/analytics', icon: PieChart },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Settings', path: '/settings', icon: Settings },
      ],
    },
  ];

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar container: Dark Navy #0B1F3A matching exact HTML templates */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-[250px] bg-[#0B1F3A] text-white flex flex-col justify-between border-r border-[#172F50] transition-transform duration-300 ease-in-out shrink-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Logo & Nav items */}
        <div className="flex-1 overflow-y-auto py-5 px-3.5 scrollbar-thin">
          {/* Logo matching exact HTML */}
          <div className="px-2.5 pb-6 flex items-center justify-between border-b border-white/10">
            <SkillTwinLogo variant="dark" size="md" linkTo="/dashboard" />
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1 text-slate-400 hover:text-white cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Groups */}
          <div className="mt-5 space-y-5">
            {navGroups.map((group) => (
              <div key={group.title}>
                <div className="px-3 mb-2 text-[10px] font-bold text-[#8EA1BC] tracking-[1.2px] uppercase">
                  {group.title}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-[9px] text-[13.5px] font-medium transition-all ${
                          isActive
                            ? 'bg-[#5B2EFF] text-white font-semibold shadow-[0_7px_18px_rgba(91,46,255,0.25)]'
                            : 'text-[#C5D0DF] hover:text-white hover:bg-white/[0.08]'
                        }`
                      }
                    >
                      <item.icon className="w-4.5 h-4.5 flex-shrink-0 text-center" />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Student Profile & Logout */}
        <div className="p-3 border-t border-white/10 bg-[#08172B]">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
            <NavLink
              to="/profile"
              onClick={handleNavClick}
              className="flex items-center gap-2.5 min-w-0 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#5B2EFF] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="min-w-0 text-left">
                <div className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                  {user.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {user.targetRole || 'Full Stack Developer'}
                </div>
              </div>
            </NavLink>

            <button
              onClick={handleLogoutClick}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
