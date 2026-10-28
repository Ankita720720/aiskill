import React from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  Milestone,
  BookOpen,
  ClipboardCheck,
  Award,
  FolderGit2,
  Mic,
  TrendingUp,
  FileBarChart2,
  Library,
  Briefcase,
  Settings,
  Sparkles,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { UserProfile } from '../types';
import { useTheme } from '../context/ThemeContext';

export type NavTabId =
  | 'dashboard'
  | 'skill-twin'
  | 'learning-path'
  | 'courses'
  | 'assessments'
  | 'challenges'
  | 'projects'
  | 'mock-interview'
  | 'progress'
  | 'reports'
  | 'resources'
  | 'jobs'
  | 'settings';

interface SidebarProps {
  currentTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  user: UserProfile;
  onOpenAIMentor: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onOpenAIMentor,
  onOpenProfile,
  onLogout,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const navSections: {
    title: string;
    items: { id: NavTabId; label: string; icon: React.FC<{ className?: string }>; badge?: string }[];
  }[] = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'skill-twin', label: 'My Skill Twin', icon: BrainCircuit },
        { id: 'progress', label: 'Progress', icon: TrendingUp },
      ],
    },
    {
      title: 'Learning & Practice',
      items: [
        { id: 'learning-path', label: 'Learning Path', icon: Milestone },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'assessments', label: 'Assessments', icon: ClipboardCheck },
        { id: 'challenges', label: 'Skill Challenges', icon: Award },
        { id: 'projects', label: 'Projects', icon: FolderGit2 },
        { id: 'mock-interview', label: 'AI Mock Interview', icon: Mic },
      ],
    },
    {
      title: 'Career & Analytics',
      items: [
        { id: 'jobs', label: 'Job Opportunities', icon: Briefcase, badge: 'New' },
        { id: 'reports', label: 'Reports', icon: FileBarChart2 },
        { id: 'resources', label: 'Resources', icon: Library },
      ],
    },
  ];

  const handleItemClick = (id: NavTabId) => {
    if (id === 'settings') {
      onOpenProfile();
    } else {
      onSelectTab(id);
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed lg:static top-0 left-0 bottom-0 z-40 w-64 ${
          isLight ? 'bg-white border-slate-200/80' : 'bg-slate-950 border-slate-800/80'
        } border-r flex flex-col justify-between transition-all duration-300 ease-in-out select-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header & Nav Items */}
        <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col">
          
          {/* Logo */}
          <div
            className={`px-5 py-4 border-b ${
              isLight ? 'border-slate-100 bg-white' : 'border-slate-900 bg-slate-950'
            } flex items-center justify-between sticky top-0 z-10`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`font-bold text-base tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  SkillTwin
                </span>
                <span className="text-indigo-600 font-bold text-base">AI</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="px-3 py-3 space-y-4 flex-1">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`sidebar-nav-${item.id}`}
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 font-bold dark:bg-indigo-950/70 dark:text-indigo-300'
                            : isLight
                            ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/70'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-indigo-600 dark:text-indigo-400' : isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-indigo-600 text-white">
                            {item.badge}
                          </span>
                        )}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom AI Career Assistant & User Profile */}
        <div
          className={`p-3 space-y-2 border-t ${
            isLight ? 'border-slate-100 bg-slate-50/40' : 'border-slate-900 bg-slate-950'
          }`}
        >
          {/* AI Career Assistant Pill */}
          <div
            onClick={onOpenAIMentor}
            className={`p-3 rounded-2xl border cursor-pointer group transition-all ${
              isLight
                ? 'bg-indigo-50/60 border-indigo-100/90 hover:bg-indigo-50 hover:border-indigo-200'
                : 'bg-indigo-950/30 border-indigo-900/40 hover:bg-indigo-950/50 hover:border-indigo-800/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    AI Career Assistant
                  </h4>
                  <p className="text-[10px] text-slate-500">Ask for advice & guidance</p>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-indigo-600 transition-all" />
            </div>
          </div>

          {/* User Mini Bar */}
          <div
            className={`flex items-center justify-between p-2 rounded-xl border text-xs ${
              isLight
                ? 'bg-white border-slate-200/80 shadow-2xs'
                : 'bg-slate-900/60 border-slate-800/60'
            }`}
          >
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 text-left min-w-0 flex-1 hover:opacity-90"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-indigo-600/30"
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`font-bold text-[11px] truncate ${
                    isLight ? 'text-slate-900' : 'text-slate-200'
                  }`}
                >
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate">{user.role}</p>
              </div>
            </button>
            <button
              id="btn-sidebar-logout"
              onClick={onLogout}
              title="Sign Out"
              className={`p-1.5 rounded-lg transition-colors ${
                isLight
                  ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                  : 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
