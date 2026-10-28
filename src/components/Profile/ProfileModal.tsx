import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Mail,
  Briefcase,
  MapPin,
  Phone,
  FileText,
  Upload,
  CheckCircle2,
  Lock,
  Bell,
  Shield,
  Linkedin,
  Github,
  Save,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { UserProfile } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLearning } from '../../context/LearningContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';
  const { careerTracks, activeCareerGoal, setActiveCareerGoal } = useLearning();

  const [activeTab, setActiveTab] = useState<'general' | 'career' | 'resume' | 'security' | 'notifications'>('general');
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [resumeParsedData, setResumeParsedData] = useState<{
    skillsFound: string[];
    readinessBoost: number;
  } | null>(null);

  // Security password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingResume(true);
    handleInputChange('resumeFileName', file.name);
    handleInputChange('resumeUploadedAt', new Date().toISOString().split('T')[0]);

    // Simulate AI resume parsing & skill extraction
    setTimeout(() => {
      setIsParsingResume(false);
      const parsed = {
        skillsFound: ['Python 3.11', 'PyTorch', 'TensorFlow', 'Pandas & NumPy', 'SQL (PostgreSQL)', 'Scikit-Learn', 'FastAPI', 'Git'],
        readinessBoost: 4,
      };
      setResumeParsedData(parsed);
      handleInputChange('readinessScore', Math.min(100, (formData.readinessScore || 74) + parsed.readinessBoost));
      handleInputChange('placementProbability', Math.min(100, (formData.placementProbability || 78) + 2));
    }, 1200);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setPasswordMessage('New passwords do not match.');
      return;
    }
    setPasswordMessage('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordMessage(''), 3000);
  };

  return (
    <AnimatePresence>
      <div id="profile-management-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          {/* Header */}
          <div className={`px-6 py-4 border-b flex items-center justify-between ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>Profile Management</span>
                  <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2 py-0.5 rounded-full">
                    {formData.role}
                  </span>
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Manage your personal details, career goals, resume, and security preferences for Ankita Chintakindi.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className={`flex border-b px-6 overflow-x-auto ${
            isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-900/90 border-slate-800'
          }`}>
            <button
              onClick={() => setActiveTab('general')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'general'
                  ? 'border-indigo-600 text-indigo-600'
                  : isLight
                  ? 'border-transparent text-slate-500 hover:text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Details</span>
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'career'
                  ? 'border-indigo-600 text-indigo-600'
                  : isLight
                  ? 'border-transparent text-slate-500 hover:text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Career & Target Role</span>
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'resume'
                  ? 'border-indigo-600 text-indigo-600'
                  : isLight
                  ? 'border-transparent text-slate-500 hover:text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume & AI Extraction</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'security'
                  ? 'border-indigo-600 text-indigo-600'
                  : isLight
                  ? 'border-transparent text-slate-500 hover:text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Security & Password</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'notifications'
                  ? 'border-indigo-600 text-indigo-600'
                  : isLight
                  ? 'border-transparent text-slate-500 hover:text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Preferences</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 font-bold"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile details updated successfully! Your dashboard has been synchronized.</span>
              </motion.div>
            )}

            {/* TAB 1: General Personal Details */}
            {activeTab === 'general' && (
              <form onSubmit={handleSave} className="space-y-5">
                <div className={`flex items-center gap-5 p-4 rounded-2xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                }`}>
                  <img
                    src={formData.avatarUrl}
                    alt={formData.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600 shadow-md"
                  />
                  <div className="flex-1 space-y-1.5">
                    <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Profile Photo</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Supports JPG, PNG or WebP images up to 5MB.
                    </p>
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={formData.avatarUrl}
                        onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                        placeholder="Avatar image URL"
                        className={`text-xs rounded-xl px-3 py-1.5 flex-1 border ${
                          isLight
                            ? 'bg-white border-slate-200 text-slate-800'
                            : 'bg-slate-900 border-slate-800 text-slate-200'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Full Name (Dashboard Display Name)
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full rounded-2xl pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                            : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full rounded-2xl pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                            : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Current Title / Headline
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`w-full rounded-2xl px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                          : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className={`w-full rounded-2xl pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                            : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full rounded-2xl pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                            : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Highest Education
                    </label>
                    <input
                      type="text"
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className={`w-full rounded-2xl px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                          : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Professional Bio
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className={`w-full rounded-2xl px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                        : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      GitHub Profile
                    </label>
                    <div className="relative">
                      <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        className={`w-full rounded-2xl pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                            : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className={`w-full rounded-2xl pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                            : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Career & Target Role */}
            {activeTab === 'career' && (
              <form onSubmit={handleSave} className="space-y-5">
                {/* Target Career Track Selector */}
                <div className="space-y-2">
                  <label className={`block text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    What career role do you actually want to pursue? (Tailors curriculum, AI challenges &amp; job feed)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {careerTracks.map((track) => {
                      const isSelected = track.id === activeCareerGoal;
                      return (
                        <div
                          key={track.id}
                          onClick={() => {
                            setActiveCareerGoal(track.id);
                            handleInputChange('role', track.roleName);
                            handleInputChange('targetRole', track.roleName);
                          }}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-indigo-50 border-indigo-600 shadow-xs dark:bg-indigo-950/50 dark:border-indigo-500'
                              : isLight
                              ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                              : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className={`text-xs font-bold ${isSelected ? 'text-indigo-900 dark:text-indigo-200' : ''}`}>
                              {track.title}
                            </h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'
                            }`}>
                              Benchmark: {track.targetBenchmark}%
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {track.shortDesc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Active Track Title
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className={`w-full rounded-2xl px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                          : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                      }`}
                    >
                      <option value="AI/ML Engineer">AI/ML Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Data Analyst">Data Analyst</option>
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Software Developer">Software Developer</option>
                      <option value="Cloud Engineer">Cloud Engineer</option>
                      <option value="Cybersecurity Engineer">Cybersecurity Engineer</option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Target Role
                    </label>
                    <input
                      type="text"
                      value={formData.targetRole}
                      onChange={(e) => handleInputChange('targetRole', e.target.value)}
                      placeholder="e.g. Senior AI Engineer"
                      className={`w-full rounded-2xl px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                          : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Dream Companies
                    </label>
                    <input
                      type="text"
                      value={formData.targetCompany || ''}
                      onChange={(e) => handleInputChange('targetCompany', e.target.value)}
                      placeholder="e.g. Google, DeepMind, Microsoft, Anthropic"
                      className={`w-full rounded-2xl px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                          : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={formData.experienceYears}
                      onChange={(e) => handleInputChange('experienceYears', Number(e.target.value))}
                      className={`w-full rounded-2xl px-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                          : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border space-y-3 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>Career Readiness Score</span>
                    <span className="text-sm font-bold text-indigo-600">{formData.readinessScore}%</span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}>
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${formData.readinessScore}%` }}
                    />
                  </div>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Calculated from your verified quiz scores, coding challenges, project completions, and mock interview performance.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Career Goals</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: Resume Upload & AI Parser */}
            {activeTab === 'resume' && (
              <div className="space-y-6">
                <div className={`border-2 border-dashed rounded-3xl p-8 text-center transition-colors ${
                  isLight
                    ? 'border-slate-300 hover:border-indigo-500 bg-slate-50'
                    : 'border-slate-700 hover:border-indigo-500 bg-slate-950/40'
                }`}>
                  <input
                    type="file"
                    id="resume-upload-input"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="resume-upload-input" className="cursor-pointer space-y-3 block">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto shadow-2xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Click to upload or drag & drop your latest resume
                      </p>
                      <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        PDF or DOCX up to 10MB. SkillTwin AI will automatically parse competencies.
                      </p>
                    </div>
                    <span className="inline-block text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors shadow-sm">
                      Select Resume File
                    </span>
                  </label>
                </div>

                {isParsingResume && (
                  <div className={`p-4 rounded-2xl border flex items-center gap-3 ${isLight ? 'bg-indigo-50/60 border-indigo-100' : 'bg-slate-950 border-slate-800'}`}>
                    <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin" />
                    <div>
                      <p className={`text-xs font-bold ${isLight ? 'text-indigo-900' : 'text-slate-200'}`}>AI Resume Intelligence Parsing...</p>
                      <p className={`text-[11px] ${isLight ? 'text-indigo-700' : 'text-slate-400'}`}>Extracting technical keywords, verified frameworks, and experience metrics.</p>
                    </div>
                  </div>
                )}

                {formData.resumeFileName && (
                  <div className={`p-4 rounded-2xl border flex items-center justify-between ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{formData.resumeFileName}</p>
                        <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Uploaded on {formData.resumeUploadedAt || 'Recently'}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                )}

                {resumeParsedData && (
                  <div className={`p-4 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-indigo-50/70 border-indigo-100' : 'bg-indigo-950/40 border-indigo-800/60'
                  }`}>
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>AI Extracted Competencies ({resumeParsedData.skillsFound.length} Detected)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeParsedData.skillsFound.map((sk) => (
                        <span key={sk} className={`text-xs px-2.5 py-1 rounded-xl font-medium border ${
                          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-700 text-slate-200'
                        }`}>
                          {sk}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-emerald-700 font-bold">
                      + {resumeParsedData.readinessBoost}% Readiness boost applied to your Skill Twin profile!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Security & Password */}
            {activeTab === 'security' && (
              <form onSubmit={handlePasswordChange} className="space-y-5">
                {passwordMessage && (
                  <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-2xl text-xs font-medium">
                    {passwordMessage}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full rounded-2xl pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                            : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full rounded-2xl pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                            : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full rounded-2xl pl-9 pr-3 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-600'
                            : 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500'
                        }`}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Two-Factor Authentication (2FA)</p>
                      <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Secure your digital twin portfolio with authenticator app codes.</p>
                    </div>
                    <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] rounded-full font-bold uppercase">
                      Enabled
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 5: Preferences */}
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <div>
                    <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Email Career Alerts & Challenges</p>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Receive weekly skill gap summaries and new mock interview prompts.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.emailAlertsEnabled}
                    onChange={(e) => handleInputChange('emailAlertsEnabled', e.target.checked)}
                    className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

                <div className={`p-4 rounded-2xl border flex items-center justify-between ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <div>
                    <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>In-App Live Notifications</p>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Show notification badges for assessment results and streak milestones.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.notificationsEnabled}
                    onChange={(e) => handleInputChange('notificationsEnabled', e.target.checked)}
                    className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
