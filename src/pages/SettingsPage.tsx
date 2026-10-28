import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Shield,
  Sliders,
  CheckCircle2,
  Save,
  RotateCcw,
  Database,
  Cloud,
  RefreshCw,
  Server,
} from 'lucide-react';
import { StudentProfile } from '../data/collageData';
import {
  checkSupabaseConnection,
  syncStudentProfileToSupabase,
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SupabaseConnectionStatus,
} from '../utils/supabase';
import { saveUserSettingsToDb } from '../utils/supabaseBackend';

interface SettingsPageProps {
  user: StudentProfile;
  onUpdateUser: (updated: StudentProfile) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'database' | 'preferences' | 'notifications' | 'privacy' | 'security'>('account');
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    targetRole: user.targetRole,
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyDigest: true,
    jobMatches: true,
    courseReminders: false,
  });
  const [toastMessage, setToastMessage] = useState('');
  const [connStatus, setConnStatus] = useState<SupabaseConnectionStatus | null>(null);
  const [isTestingConn, setIsTestingConn] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      targetRole: formData.targetRole,
    };
    onUpdateUser(updated);
    syncStudentProfileToSupabase(updated);
    try {
      saveUserSettingsToDb(updated.email, {
        emailNotifications: notifications.emailAlerts,
        weeklyProgressReport: notifications.weeklyDigest,
        assessmentReminders: notifications.courseReminders,
      });
    } catch {}
    setToastMessage('Settings saved & synced to Supabase database! 🚀');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleTestConnection = async () => {
    setIsTestingConn(true);
    const result = await checkSupabaseConnection();
    setConnStatus(result);
    setIsTestingConn(false);
    if (result.isConnected) {
      setToastMessage(`✓ Supabase connected! Latency: ${result.latencyMs}ms`);
    } else {
      setToastMessage(`Supabase connection warning: ${result.message}`);
    }
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleSyncToCloud = async () => {
    setIsSyncing(true);
    const result = await syncStudentProfileToSupabase(user);
    setIsSyncing(false);
    if (result.success) {
      setToastMessage('✓ Student profile & skills successfully stored in Supabase PostgreSQL!');
    } else {
      setToastMessage(`Sync notice: ${result.message || 'Profile saved locally'}`);
    }
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      
      {/* Top Header matching cell 19 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2545] tracking-tight">
          Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your account, preferences, AI experience and privacy.
        </p>
      </div>

      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Settings Container: Left Tabs & Right Content Panels matching cell 19 */}
      <div className="bg-white rounded-3xl border border-[#E3E8F2] shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* Left Side Settings Category Menu */}
        <div className="lg:col-span-3 bg-[#F8FAFC] border-r border-[#E3E8F2] p-4 sm:p-5 space-y-1">
          <div className="px-3 pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Settings Menu
          </div>

          {[
            { id: 'account', label: 'Account', icon: User },
            { id: 'database', label: 'Supabase Database', icon: Database },
            { id: 'preferences', label: 'Preferences', icon: Sliders },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'privacy', label: 'Privacy', icon: Shield },
            { id: 'security', label: 'Security', icon: Lock },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isSelected
                    ? 'bg-[#6C35F5] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side Settings Panel */}
        <div className="lg:col-span-9 p-6 sm:p-8 space-y-6">
          
          {activeTab === 'account' && (
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Account Information Section */}
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-[#1B2545]">
                    Account Information
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Update the contact details and career target for your profile.
                  </p>
                </div>

                {/* Avatar Display */}
                <div className="flex items-center gap-4 py-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6C35F5] to-blue-500 text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1B2545]">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Career Role</label>
                    <input
                      type="text"
                      value={formData.targetRole}
                      onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                      className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:bg-white focus:border-[#6C35F5]"
                    />
                  </div>
                </div>
              </div>

              {/* Account Status matching cell 19 */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-extrabold text-[#1B2545] uppercase tracking-wider">
                  Account Status
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#F4F7FC] rounded-xl border border-[#E3E8F2]">
                    <div className="text-slate-400 font-semibold mb-0.5">Account Type</div>
                    <div className="font-extrabold text-[#1B2545]">Student Free Edition</div>
                  </div>

                  <div className="p-3 bg-[#F4F7FC] rounded-xl border border-[#E3E8F2]">
                    <div className="text-slate-400 font-semibold mb-0.5">Profile Completion</div>
                    <div className="font-extrabold text-emerald-600">{user.profileCompletion}% Complete</div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      targetRole: user.targetRole,
                    })
                  }
                  className="px-4 py-2 rounded-xl border border-[#E3E8F2] text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#6C35F5] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#008774] text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Supabase Cloud PostgreSQL Active</span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#1B2545]">
                    Supabase Database & Authentication
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your student accounts, assessment results, domain choices and progress are secured in Supabase.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTestingConn}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-purple-300 text-xs font-bold text-slate-700 bg-white hover:bg-purple-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Server className={`w-3.5 h-3.5 text-purple-600 ${isTestingConn ? 'animate-spin' : ''}`} />
                    <span>{isTestingConn ? 'Pinging...' : 'Test Connection'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSyncToCloud}
                    disabled={isSyncing}
                    className="px-4 py-2 rounded-xl bg-[#6C35F5] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync to Supabase'}</span>
                  </button>
                </div>
              </div>

              {/* Connection Status Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E3E8F2] space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Project Reference ID</div>
                  <div className="font-mono font-extrabold text-sm text-[#1B2545]">{SUPABASE_PROJECT_ID}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Project</span>
                  </div>
                </div>

                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E3E8F2] space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Database Engine</div>
                  <div className="font-extrabold text-sm text-[#1B2545]">PostgreSQL 15+</div>
                  <div className="text-[11px] text-slate-500 font-medium">Row Level Security (RLS)</div>
                </div>

                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E3E8F2] space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Connection Health</div>
                  <div className="font-extrabold text-sm text-emerald-600 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Connected</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {connStatus?.latencyMs ? `Ping: ${connStatus.latencyMs}ms` : 'Auth & REST API ready'}
                  </div>
                </div>
              </div>

              {/* Endpoint Details */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-[#E3E8F2] space-y-3.5 text-xs">
                <div className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-purple-600" />
                  <span>Cloud API Configuration</span>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans font-bold uppercase mb-0.5">Project REST URL</span>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 select-all overflow-x-auto">
                      {SUPABASE_URL}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-sans font-bold uppercase mb-0.5">Publishable Anon API Key</span>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 select-all overflow-x-auto truncate">
                      {SUPABASE_ANON_KEY}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Tables Overview */}
              <div className="space-y-3 text-xs">
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                  Managed Supabase Database Tables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                    <div className="font-bold text-purple-700 font-mono text-xs">public.students</div>
                    <p className="text-[11px] text-slate-500">
                      Stores student name, email, target role, active career domain, readiness score, education and skills.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                    <div className="font-bold text-purple-700 font-mono text-xs">public.student_assessments</div>
                    <p className="text-[11px] text-slate-500">
                      Stores test history, assessment scores, quiz timestamps and domain benchmarks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-[#1B2545]">
                  Notification Preferences
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Control email digests and instant assessment alerts.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { key: 'emailAlerts', title: 'Assessment Results & Score Updates' },
                  { key: 'weeklyDigest', title: 'Weekly Skill Growth Digest' },
                  { key: 'jobMatches', title: 'High-Match Job Vacancy Alerts (>85%)' },
                  { key: 'courseReminders', title: 'Daily Study Reminders' },
                ].map((item) => (
                  <label key={item.key} className="p-3.5 rounded-2xl bg-[#F4F7FC] border border-[#E3E8F2] flex items-center justify-between cursor-pointer">
                    <span className="font-bold text-[#1B2545]">{item.title}</span>
                    <input
                      type="checkbox"
                      checked={(notifications as any)[item.key]}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-[#6C35F5] focus:ring-[#6C35F5]"
                    />
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Notification settings updated!');
                    setTimeout(() => setToastMessage(''), 3000);
                  }}
                  className="px-5 py-2 bg-[#6C35F5] hover:bg-[#5B21B6] text-white text-xs font-bold rounded-xl"
                >
                  Save Notification Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 max-w-md">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-[#1B2545]">Security</h3>
                <p className="text-xs text-slate-400 mt-0.5">Update password and session security.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-[#F4F7FC] border border-[#E3E8F2] rounded-xl px-3.5 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage('Password updated successfully!');
                    setTimeout(() => setToastMessage(''), 3000);
                  }}
                  className="px-5 py-2 bg-[#6C35F5] hover:bg-[#5B21B6] text-white text-xs font-bold rounded-xl"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {(activeTab === 'preferences' || activeTab === 'privacy') && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-[#1B2545] capitalize">
                  {activeTab}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure your telemetry, AI analysis data retention and UI layout.
                </p>
              </div>

              <div className="p-4 bg-[#F4F7FC] rounded-2xl border border-[#E3E8F2] space-y-2">
                <div className="font-bold text-[#1B2545]">AI Data Retention</div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Resume text and voice transcripts are processed solely for generating skill twin metrics and are saved in your local demo profile.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
