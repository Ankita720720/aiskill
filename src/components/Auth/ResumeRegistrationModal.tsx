import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  User,
  Mail,
  Briefcase,
  GraduationCap,
  FileCheck,
  RotateCcw,
  Code2,
} from 'lucide-react';
import { UserProfile } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { useLearning } from '../../context/LearningContext';

interface ResumeRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export const ResumeRegistrationModal: React.FC<ResumeRegistrationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';
  const { careerTracks, setActiveCareerGoal } = useLearning();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeMode, setActiveMode] = useState<'upload' | 'manual'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [fullName, setFullName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [targetRole, setTargetRole] = useState(currentUser.targetRole || 'AI/ML Engineer');
  const [education, setEducation] = useState(currentUser.education || 'B.Tech in Computer Science');
  const [skillsInput, setSkillsInput] = useState('Python, PyTorch, SQL, Machine Learning, FastAPI, Docker');
  const [experienceSummary, setExperienceSummary] = useState(
    'Built end-to-end predictive models and REST APIs. Experienced in data pipelines and deep learning.'
  );

  // Uploaded file & parsed data
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    parsedSkills: string[];
    extractedRole: string;
    extractedEducation: string;
  } | null>(
    currentUser.resumeFileName
      ? {
          name: currentUser.resumeFileName,
          size: '1.4 MB',
          parsedSkills: ['Python', 'PyTorch', 'SQL', 'FastAPI', 'Pandas', 'Scikit-Learn'],
          extractedRole: currentUser.role,
          extractedEducation: currentUser.education,
        }
      : null
  );

  if (!isOpen) return null;

  const handleProcessFile = (file: File) => {
    setIsProcessing(true);
    setSuccessMessage('');

    // Simulate clean, fast AI resume parsing
    setTimeout(() => {
      setIsProcessing(false);
      const isAI = file.name.toLowerCase().includes('ai') || file.name.toLowerCase().includes('ml');
      const isWeb = file.name.toLowerCase().includes('web') || file.name.toLowerCase().includes('stack');

      let parsedSkills = ['Python 3.11', 'PyTorch', 'SQL (PostgreSQL)', 'FastAPI', 'NumPy', 'Docker'];
      let role = 'AI/ML Engineer';

      if (isWeb) {
        parsedSkills = ['TypeScript', 'React 18', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Next.js'];
        role = 'Full Stack Developer';
      } else if (isAI) {
        parsedSkills = ['Python', 'PyTorch', 'Hugging Face', 'Vector Databases', 'Transformers', 'MLOps'];
        role = 'AI/ML Engineer';
      }

      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        parsedSkills,
        extractedRole: role,
        extractedEducation: 'Bachelor of Technology (Computer Science)',
      });

      setTargetRole(role);
      setSkillsInput(parsedSkills.join(', '));
      setSuccessMessage('Resume parsed successfully! Skills and profile data extracted.');
    }, 900);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleApplySampleResume = () => {
    const sampleFile = new File(['sample content'], 'Ankita_Chintakindi_AI_Engineer_Resume.pdf', {
      type: 'application/pdf',
    });
    handleProcessFile(sampleFile);
  };

  const handleSaveAndRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const matchedTrack = careerTracks.find(
      (t) => t.roleName.toLowerCase() === targetRole.toLowerCase() || t.id.includes(targetRole.toLowerCase())
    );
    if (matchedTrack) {
      setActiveCareerGoal(matchedTrack.id);
    }

    const updatedUser: UserProfile = {
      ...currentUser,
      name: fullName.trim() || currentUser.name,
      email: email.trim() || currentUser.email,
      role: targetRole,
      targetRole: targetRole,
      education: education,
      resumeFileName: uploadedFile ? uploadedFile.name : currentUser.resumeFileName,
      resumeUploadedAt: new Date().toISOString().split('T')[0],
      readinessScore: Math.min(99, (currentUser.readinessScore || 74) + 4),
      placementProbability: Math.min(99, (currentUser.placementProbability || 78) + 2),
    };

    onUpdateUser(updatedUser);
    setSuccessMessage('Profile registered and updated successfully!');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className={`w-full max-w-2xl rounded-2xl border shadow-xl overflow-hidden flex flex-col max-h-[90vh] ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isLight ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800 bg-slate-950/30'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-2xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Register Profile &amp; Upload Resume
              </h2>
              <p className="text-xs text-slate-500">
                Upload your resume or enter details directly to customize your SkillTwin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className={`px-6 pt-3 pb-2 border-b flex items-center gap-2 ${
          isLight ? 'border-slate-100' : 'border-slate-800'
        }`}>
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'upload'
                ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                : isLight
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Resume File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('manual')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'manual'
                ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                : isLight
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Give Input Directly</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Notification Toast */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mode 1: Resume Upload */}
          {activeMode === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Drag & Drop Area */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : isLight
                    ? 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                {isProcessing ? (
                  <div className="space-y-2 py-4">
                    <div className="w-7 h-7 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-bold text-indigo-600">Analyzing resume &amp; extracting competencies...</p>
                    <p className="text-[11px] text-slate-400">Parsing work history, skill taxonomy, and target role</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mx-auto">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                        Click to upload or drag &amp; drop your resume
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Supports PDF, DOCX, or TXT (Max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Sample Button */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 text-[11px]">Don't have a file ready right now?</span>
                <button
                  type="button"
                  onClick={handleApplySampleResume}
                  className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Use Sample Resume</span>
                </button>
              </div>

              {/* Parsed Resume Result Preview */}
              {uploadedFile && (
                <div className={`p-4 rounded-xl border space-y-3 ${
                  isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/40 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {uploadedFile.name}
                      </span>
                      <span className="text-[10px] text-slate-400">({uploadedFile.size})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Parsed &amp; Validated
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Extracted Competencies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {uploadedFile.parsedSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Direct Input Form */}
          {activeMode === 'manual' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ankita Chintakindi"
                      className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:border-indigo-600 ${
                        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ankitachintakindi@gmail.com"
                      className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:border-indigo-600 ${
                        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target Career Goal
                  </label>
                  <div className="relative">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="AI/ML Engineer"
                      className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:border-indigo-600 ${
                        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Education
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      placeholder="B.Tech Computer Science"
                      className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:border-indigo-600 ${
                        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Key Skills &amp; Tools (comma separated)
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="Python, PyTorch, SQL, Pandas, FastAPI, Git"
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-indigo-600 ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Past Experience / Projects Summary
                </label>
                <textarea
                  rows={3}
                  value={experienceSummary}
                  onChange={(e) => setExperienceSummary(e.target.value)}
                  placeholder="Briefly describe your projects, past internships or technical experience..."
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-indigo-600 leading-relaxed ${
                    isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${
          isLight ? 'border-slate-100 bg-slate-50/50' : 'border-slate-800 bg-slate-950/30'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveAndRegister}
            disabled={isProcessing}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span>Save &amp; Update Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
