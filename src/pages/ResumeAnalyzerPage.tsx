import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { StudentProfile } from '../data/collageData';
import { uploadResumeFileToStorage, saveResumeAnalysisToDb } from '../utils/supabaseBackend';

interface ResumeAnalyzerPageProps {
  user: StudentProfile;
  onUpdateResume?: (fileInfo: { name: string; size: string }) => void;
}

export const ResumeAnalyzerPage: React.FC<ResumeAnalyzerPageProps> = ({
  user,
  onUpdateResume,
}) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>({
    name: user.resumeFileName || 'Ankita_Chintakindi_Resume.pdf',
    size: user.resumeSize || '1.2 MB',
  });
  const [rawFile, setRawFile] = useState<File | null>(null);

  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const fileObj = { name: file.name, size: sizeStr };
      setSelectedFile(fileObj);
      setRawFile(file);
      if (onUpdateResume) onUpdateResume(fileObj);
      showToast(`Selected "${file.name}"!`);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const fileObj = { name: file.name, size: sizeStr };
      setSelectedFile(fileObj);
      setRawFile(file);
      if (onUpdateResume) onUpdateResume(fileObj);
      showToast(`Uploaded "${file.name}"!`);
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) {
      showToast('Please select or upload a resume file first.');
      return;
    }

    setIsAnalyzing(true);

    try {
      let fileUrl = '';
      if (rawFile) {
        // Upload resume file directly to Supabase Storage 'resumes' bucket
        const uploadRes = await uploadResumeFileToStorage(rawFile, user.email || 'student');
        if (uploadRes.success && uploadRes.publicUrl) {
          fileUrl = uploadRes.publicUrl;
        }
      }

      // Persist resume ATS score and analysis to Supabase database
      await saveResumeAnalysisToDb({
        email: user.email || 'student@skilltwin.ai',
        fileName: selectedFile.name,
        fileUrl: fileUrl,
        fileSize: selectedFile.size,
        atsScore: 84,
        strengths: ['Python', 'SQL', 'Data Structures', 'Git', 'Problem Solving', 'REST APIs'],
        missingKeywords: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Cloud Security'],
        formattingScore: 88,
        impactScore: 82,
        summary: 'Resume demonstrated strong foundational technical competencies and project experience.',
      });
    } catch (err) {
      console.warn('Resume analysis database sync notice:', err);
    }

    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/resume-result');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto font-sans pb-16 text-[#334155]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[6000] bg-[#0B1F3A] text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-[6000] bg-[#0B1F3A]/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-white text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#5B2EFF] border-t-transparent animate-spin mb-4" />
          <h3 className="text-xl font-bold mb-1">
            ✦ SkillTwin AI is analyzing your resume...
          </h3>
          <p className="text-xs text-[#CBD5E1] max-w-sm">
            Extracting technical skills, evaluating ATS keyword density, and benchmarking career role compatibility.
          </p>
        </div>
      )}

      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] tracking-tight mb-1">
            Resume Analyzer
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Upload your resume to extract skills, calculate job role compatibility and identify career gaps.
          </p>
        </div>

        <button
          onClick={() => navigate('/resume-result')}
          className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-4 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          View Last Result →
        </button>
      </div>

      {/* ================= AI BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#B8AAFF]">
            ✦ AI RESUME PARSER
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Extract skills, projects and experience automatically
          </h2>
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
            Our AI engine parses PDF, DOCX and TXT resumes to evaluate ATS keyword match, competency gaps and readiness for your target Full Stack career.
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shrink-0 self-start md:self-auto">
          📄
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_0.75fr] gap-5 items-start">
        {/* Left Card: Upload & Drop Zone */}
        <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-[#0B1F3A] mb-1">
              Upload Resume Document
            </h3>
            <p className="text-xs text-[#64748B]">
              Drag and drop your file or browse from your device
            </p>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-[#5B2EFF] bg-[#FAF9FF]'
                : 'border-[#CBD5E1] hover:border-[#5B2EFF] bg-[#FBFDFF]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center text-2xl mx-auto mb-3">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h4 className="text-sm font-bold text-[#0B1F3A] mb-1">
              Drag and drop your resume here
            </h4>
            <p className="text-xs text-[#64748B] mb-3">
              or click to browse files from your device
            </p>

            <span className="inline-block bg-[#5B2EFF] text-white px-4 py-2 rounded-lg text-xs font-bold">
              Browse Files
            </span>

            <div className="text-[10px] text-[#94A3B8] mt-3">
              Supports PDF, DOCX, TXT (Maximum file size: 10MB)
            </div>
          </div>

          {/* File Preview */}
          {selectedFile && (
            <div className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center font-bold text-xs shrink-0">
                  PDF
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A] truncate max-w-xs sm:max-w-md">
                    {selectedFile.name}
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">
                    {selectedFile.size} • Ready for parsing
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedFile(null)}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-200 text-[#64748B] flex items-center justify-center text-xs cursor-pointer"
                title="Remove file"
              >
                ✕
              </button>
            </div>
          )}

          <button
            onClick={handleStartAnalysis}
            className="w-full bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Analyze Resume with SkillTwin AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* What We Analyze */}
          <div className="pt-4 border-t border-[#F1F5F9]">
            <h4 className="text-xs font-bold text-[#0B1F3A] mb-3">
              What We Analyze in Your Resume:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#475569]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                <span>Technical Skills & Frameworks Extraction</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                <span>ATS Keyword Density & Formatting Match</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                <span>Education, Projects & Experience Validation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                <span>Skill Gap & Next Learning Recommendations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Process & Previous Result */}
        <div className="space-y-5">
          {/* AI Analysis Process */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1F3A] mb-3.5">
              AI Analysis Process
            </h3>

            <div className="space-y-3">
              {[
                { step: '1', title: 'Text Extraction & Tokenization', desc: 'Parses document content, stripping markup.' },
                { step: '2', title: 'Skill & Entity Recognition', desc: 'Detects technical competencies & tools.' },
                { step: '3', title: 'Role Benchmark Comparison', desc: 'Compares against target job requirements.' },
                { step: '4', title: 'ATS Scoring & Keyword Density', desc: 'Evaluates applicant tracking compatibility.' },
                { step: '5', title: 'Skill Gap Detection', desc: 'Highlights missing core competencies.' },
                { step: '6', title: 'Personalized Action Roadmap', desc: 'Generates step-by-step learning next steps.' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1F3A]">{s.title}</div>
                    <div className="text-[11px] text-[#64748B]">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Resume Analysis Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5.5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#0B1F3A]">
                Previous Resume Analysis
              </h3>
              <span className="bg-[#E6F7F4] text-[#008F7A] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                72% Match
              </span>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Target Role: <strong>Full Stack Developer</strong><br />
              Last analyzed: 3 days ago
            </p>

            <button
              onClick={() => navigate('/resume-result')}
              className="w-full bg-[#F3F7FC] hover:bg-[#EDE9FE] text-[#5B2EFF] text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer block text-center"
            >
              View Last Analysis Result →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
