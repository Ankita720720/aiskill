import React, { useState } from 'react';
import {
  Bell,
  Search,
  Menu,
  Sparkles,
  Palette,
  CheckCircle2,
  Clock,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Flame,
  ChevronDown,
  Mail,
  UploadCloud,
} from 'lucide-react';
import { UserProfile, AppNotification } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  user: UserProfile;
  notifications: AppNotification[];
  onOpenProfile: () => void;
  onOpenAIMentor: () => void;
  onOpenResumeRegistration?: () => void;
  onOpenEmailAutomations?: () => void;
  onLogout: () => void;
  onToggleMobileMenu: () => void;
  onMarkNotificationRead?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  notifications,
  onOpenProfile,
  onOpenAIMentor,
  onOpenResumeRegistration,
  onOpenEmailAutomations,
  onLogout,
  onToggleMobileMenu,
  onMarkNotificationRead,
}) => {
  const { design, setIsDesignModalOpen, toggleThemeMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isLight = design.mode === 'light';
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={`h-16 border-b px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md transition-colors ${
        isLight
          ? 'bg-white/95 border-slate-200/90 text-slate-900 shadow-2xs'
          : 'bg-slate-950/80 border-slate-800/80 text-white'
      }`}
    >
      {/* Left: Mobile trigger & Welcome Greeting */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleMobileMenu}
          className={`lg:hidden p-2 rounded-xl border transition-colors ${
            isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 border-slate-800'
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} font-medium`}>
                Welcome back,
              </span>
              <span className={`text-xs font-bold hidden sm:inline ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                {user.role}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1
                id="header-user-display-name"
                className={`text-sm sm:text-base font-bold tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {user.name}
              </h1>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${design.accentBadge}`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills, assessments, topics or challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-xl pl-9 pr-4 py-1.5 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors ${
              isLight
                ? 'bg-slate-100/80 border-slate-200/90 text-slate-800 focus:bg-white focus:border-indigo-500'
                : 'bg-slate-900/80 border-slate-800 text-slate-200 focus:border-indigo-500'
            }`}
          />
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Counter */}
        <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
          isLight ? 'bg-amber-50/80 text-amber-900 border border-amber-200/60' : 'bg-amber-950/40 text-amber-300 border border-amber-800/50'
        }`}>
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{user.streakDays}d streak</span>
        </div>

        {/* Upload Resume / Register Input Button */}
        {onOpenResumeRegistration && (
          <button
            onClick={onOpenResumeRegistration}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 dark:text-indigo-300 dark:border-indigo-850 shadow-2xs"
          >
            <UploadCloud className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden md:inline">Upload Resume</span>
          </button>
        )}

        {/* AI Quick Assist Button */}
        <button
          onClick={onOpenAIMentor}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
            isLight
              ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="hidden sm:inline">AI Mentor</span>
        </button>

        {/* Theme Dark/Light Toggle */}
        <button
          onClick={toggleThemeMode}
          title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
          className={`p-2 rounded-xl border transition-colors ${
            isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 border-slate-800'
          }`}
        >
          {isLight ? <Moon className="w-4 h-4 text-slate-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            id="btn-notifications-bell"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className={`relative p-2 rounded-xl border transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                : 'text-slate-400 hover:text-white hover:bg-slate-900 border-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-80 sm:w-88 rounded-2xl shadow-xl p-4 z-50 space-y-3 border ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-200'
              }`}
            >
              <div className={`flex items-center justify-between pb-2 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Notifications</span>
                <span className="text-[11px] text-indigo-600 font-bold">{unreadCount} Unread</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => onMarkNotificationRead && onMarkNotificationRead(n.id)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      n.read
                        ? isLight
                          ? 'bg-slate-50 border-slate-200/60 text-slate-600'
                          : 'bg-slate-950/40 border-slate-800/40 text-slate-400'
                        : isLight
                        ? 'bg-indigo-50/50 border-indigo-100 text-slate-900'
                        : 'bg-indigo-950/30 border-indigo-800/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Dropdown */}
        <div className="relative">
          <button
            id="btn-header-profile"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100/80 border border-transparent hover:border-slate-200 transition-all"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs"
            />
          </button>

          {showUserMenu && (
            <div
              className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl p-2 z-50 space-y-1 border ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-200'
              }`}
            >
              <div className={`px-3 py-2 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <p className={`font-bold text-xs truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                <span className="mt-1.5 inline-block text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {user.readinessScore}% Career Ready
                </span>
              </div>

              {onOpenEmailAutomations && (
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenEmailAutomations();
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isLight
                      ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <span>Daily Job Automations</span>
                </button>
              )}

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  setIsDesignModalOpen(true);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isLight
                    ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Palette className="w-4 h-4 text-indigo-600" />
                <span>Customize Theme</span>
              </button>

              {onOpenResumeRegistration && (
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenResumeRegistration();
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isLight
                      ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <UploadCloud className="w-4 h-4 text-indigo-600" />
                  <span>Upload Resume / Profile</span>
                </button>
              )}

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onOpenProfile();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isLight
                    ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span>Manage Profile</span>
              </button>

              <div className={`border-t pt-1 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <button
                  id="btn-header-logout"
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
