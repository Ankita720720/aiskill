import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Sparkles,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  X,
  FileText,
  Target,
  Mic,
  Compass,
} from 'lucide-react';
import { StudentProfile } from '../data/collageData';
import { getActiveDomain } from '../data/multiDomainData';

interface JobVacanciesPageProps {
  user: StudentProfile;
}

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  logoText: string;
  location: string;
  type: string;
  companyType: string;
  category: string;
  salary: string;
  experience: string;
  matchScore: number;
  description: string;
  skills: string[];
  applyUrl: string;
}

const JOBS_DATA: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Junior Full Stack Developer',
    company: 'Infosys Careers Portal',
    logoText: 'INF',
    location: 'Bengaluru',
    type: 'Full-time',
    companyType: 'MNC',
    category: 'Technology',
    salary: '₹6 - 9 LPA',
    experience: '0 - 2 Years',
    matchScore: 92,
    description: 'Work on enterprise cloud web services using React, Node.js, Express and REST APIs. Excellent mentorship and growth opportunities.',
    skills: ['React', 'Node.js', 'REST APIs', 'Git', 'JavaScript'],
    applyUrl: 'https://www.infosys.com/careers.html',
  },
  {
    id: 'job-2',
    title: 'Frontend React Developer Intern',
    company: 'Zomato Engineering',
    logoText: 'ZOM',
    location: 'Remote',
    type: 'Internship',
    companyType: 'Growing Company',
    category: 'Technology',
    salary: '₹35,000 / month',
    experience: 'Fresher / Student',
    matchScore: 95,
    description: 'Build fast, accessible customer-facing web interfaces using React, TypeScript, and modern CSS frameworks.',
    skills: ['React', 'HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    applyUrl: 'https://www.zomato.com/careers',
  },
  {
    id: 'job-3',
    title: 'Backend Node.js Engineer',
    company: 'Razorpay Jobs',
    logoText: 'RAZ',
    location: 'Bengaluru',
    type: 'Full-time',
    companyType: 'Growing Company',
    category: 'Technology',
    salary: '₹12 - 18 LPA',
    experience: '1 - 3 Years',
    matchScore: 84,
    description: 'Develop high-throughput payment transaction pipelines with Node.js, microservices, MongoDB, and Redis caching.',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'PostgreSQL'],
    applyUrl: 'https://razorpay.com/jobs/',
  },
  {
    id: 'job-4',
    title: 'Associate Software Engineer',
    company: 'TCS NextStep & Careers',
    logoText: 'TCS',
    location: 'Pune',
    type: 'Entry Level',
    companyType: 'MNC',
    category: 'Technology',
    salary: '₹4.5 - 7 LPA',
    experience: '0 - 1 Years',
    matchScore: 88,
    description: 'Entry-level software engineering role across modern web applications, relational databases, and enterprise systems.',
    skills: ['JavaScript', 'SQL', 'Git', 'HTML/CSS', 'Problem Solving'],
    applyUrl: 'https://nextstep.tcs.com/',
  },
  {
    id: 'job-5',
    title: 'Data Analyst Intern',
    company: 'Swiggy Careers',
    logoText: 'SWG',
    location: 'Bengaluru',
    type: 'Internship',
    companyType: 'Growing Company',
    category: 'Data & AI',
    salary: '₹30,000 / month',
    experience: 'Fresher',
    matchScore: 78,
    description: 'Analyze operational metrics, write SQL data transformations, and design business performance dashboards.',
    skills: ['SQL', 'Python', 'Data Analytics', 'Excel', 'Problem Solving'],
    applyUrl: 'https://careers.swiggy.com/',
  },
  {
    id: 'job-6',
    title: 'Graduate Engineer Trainee',
    company: 'Wipro Careers Portal',
    logoText: 'WIP',
    location: 'Hyderabad',
    type: 'Apprenticeship',
    companyType: 'MNC',
    category: 'Technology',
    salary: '₹4 - 6.5 LPA',
    experience: 'Fresher',
    matchScore: 86,
    description: 'Comprehensive 6-month structured training in full stack development, cloud computing, and real-client projects.',
    skills: ['Web Development', 'SQL', 'JavaScript', 'Git'],
    applyUrl: 'https://careers.wipro.com/',
  },
  {
    id: 'job-7',
    title: 'UI/UX & Product Design Intern',
    company: 'CRED Design Studio',
    logoText: 'CRD',
    location: 'Bengaluru',
    type: 'Internship',
    companyType: 'Startup',
    category: 'Design',
    salary: '₹40,000 / month',
    experience: 'Fresher / Portfolio',
    matchScore: 81,
    description: 'Collaborate with product managers and engineers to design premium mobile and web user interfaces in Figma.',
    skills: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping', 'CSS'],
    applyUrl: 'https://cred.club/careers',
  },
  {
    id: 'job-8',
    title: 'Junior Web Developer (Contract)',
    company: 'Freshworks Careers',
    logoText: 'FRW',
    location: 'Chennai',
    type: 'Contract',
    companyType: 'Growing Company',
    category: 'Technology',
    salary: '₹5 - 8 LPA',
    experience: '0 - 2 Years',
    matchScore: 89,
    description: 'Implement SaaS customer portals and maintain integration widgets using React, REST APIs and Git workflows.',
    skills: ['React', 'JavaScript', 'REST APIs', 'CSS', 'Git'],
    applyUrl: 'https://www.freshworks.com/company/careers/',
  },
];

const JOB_PORTALS = [
  { name: 'LinkedIn Jobs', desc: 'Global professional network & job board', url: 'https://www.linkedin.com/jobs/' },
  { name: 'Indeed India', desc: 'High-volume verified job openings', url: 'https://in.indeed.com/' },
  { name: 'Naukri.com', desc: 'India’s leading job search platform', url: 'https://www.naukri.com/' },
  { name: 'Internshala', desc: 'Premier internship & fresher jobs platform', url: 'https://internshala.com/' },
  { name: 'Wellfound (AngelList)', desc: 'Top high-growth tech startups', url: 'https://wellfound.com/jobs' },
  { name: 'Glassdoor', desc: 'Company reviews, salaries & job search', url: 'https://www.glassdoor.com/Job/' },
  { name: 'Cutshort', desc: 'AI-matched tech recruitment platform', url: 'https://cutshort.io/' },
  { name: 'Foundit (Monster)', desc: 'Enterprise & corporate career portal', url: 'https://www.foundit.in/' },
];

export const JobVacanciesPage: React.FC<JobVacanciesPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const currentDomain = getActiveDomain();

  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('skilltwin_saved_jobs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [onlySaved, setOnlySaved] = useState(false);
  const [activeModalJob, setActiveModalJob] = useState<JobOpportunity | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const allJobs: JobOpportunity[] = [
    ...(currentDomain.jobs || []).map((j, idx) => ({
      id: j.id || `${currentDomain.id}-job-${idx + 1}`,
      title: j.title,
      company: j.company,
      logoText: j.logoText || j.company.slice(0, 3).toUpperCase(),
      location: j.location,
      type: j.type,
      companyType: 'MNC',
      category: currentDomain.name.split('(')[0].trim(),
      salary: j.salary,
      experience: '0 - 2 Years',
      matchScore: j.matchScore,
      description: j.description,
      skills: j.skills,
      applyUrl: j.applyUrl,
    })),
    ...JOBS_DATA,
  ];

  const toggleSaveJob = (id: string, title: string) => {
    const next = !savedJobs[id];
    const updated = { ...savedJobs, [id]: next };
    setSavedJobs(updated);
    try {
      localStorage.setItem('skilltwin_saved_jobs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(next ? `Saved "${title}" to your bookmarks!` : `Removed "${title}" from bookmarks.`);
  };

  const filteredJobs = allJobs.filter((job) => {
    if (onlySaved && !savedJobs[job.id]) return false;

    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation =
      locationFilter === 'all' || job.location.toLowerCase() === locationFilter.toLowerCase();

    const matchesType =
      typeFilter === 'all' || job.type.toLowerCase() === typeFilter.toLowerCase();

    const matchesCompany =
      companyFilter === 'all' || job.companyType.toLowerCase().includes(companyFilter.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || job.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesLocation && matchesType && matchesCompany && matchesCategory;
  });

  const savedCount = Object.values(savedJobs).filter(Boolean).length;

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto font-sans pb-16 text-[#334155]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[6000] bg-[#0B1F3A] text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] tracking-tight mb-1">
            Job Vacancies
          </h1>
          <p className="text-xs sm:text-[14px] text-[#64748B]">
            Find full-time jobs, internships, freelance gigs, apprenticeships and part-time roles.
          </p>
        </div>

        <button
          onClick={() => navigate('/skill-gap')}
          className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-4 py-2.5 rounded-[9px] text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          Check Job Readiness →
        </button>
      </div>

      {/* ================= AI CAREER MATCHING BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#12284C] to-[#182F55] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#B8AAFF]">
            ✦ AI CAREER MATCHING · {currentDomain.name.toUpperCase()}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Personalized job matches based on your {currentDomain.primaryRole} profile
          </h2>
          <p className="text-xs sm:text-[13px] text-[#CBD5E1] leading-relaxed">
            We have filtered verified openings aligned with your target career in {currentDomain.name}. Match scores reflect your current competencies and verified projects.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl px-5 py-4 text-center shrink-0 self-start md:self-auto">
          <div className="text-[10px] font-bold tracking-wider uppercase text-[#B8AAFF] mb-1">
            TARGET CAREER
          </div>
          <div className="text-base font-extrabold text-white">
            {user.targetRole || currentDomain.primaryRole}
          </div>
        </div>
      </div>

      {/* ================= APPLICATION NOTICE ================= */}
      <div className="bg-[#E6F7F4] border border-[#A7F3D0] rounded-xl p-4 text-xs text-[#065F46] flex items-start gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Official Application Notice:</strong> Every job listing includes direct links to official company careers portals and verified job websites. We do not charge fees or act as an intermediary.
        </div>
      </div>

      {/* ================= SEARCH & FILTERS CARD ================= */}
      <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-4.5 shadow-xs flex flex-col lg:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs, companies or skills..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] pl-10 pr-3.5 py-2.5 rounded-lg text-xs text-[#334155] placeholder:text-[#94A3B8] outline-none focus:border-[#5B2EFF]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full lg:w-auto">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-white border border-[#D8E0EA] rounded-lg px-3 py-2 text-xs text-[#475569] font-medium outline-none focus:border-[#5B2EFF]"
          >
            <option value="all">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white border border-[#D8E0EA] rounded-lg px-3 py-2 text-xs text-[#475569] font-medium outline-none focus:border-[#5B2EFF]"
          >
            <option value="all">All Job Types</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Entry Level">Entry Level</option>
            <option value="Apprenticeship">Apprenticeship</option>
            <option value="Contract">Contract</option>
          </select>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="bg-white border border-[#D8E0EA] rounded-lg px-3 py-2 text-xs text-[#475569] font-medium outline-none focus:border-[#5B2EFF]"
          >
            <option value="all">All Companies</option>
            <option value="Startup">Startups</option>
            <option value="Growing Company">Growing Tech</option>
            <option value="MNC">Global MNCs</option>
          </select>
        </div>
      </div>

      {/* ================= CATEGORY BUTTONS ================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Opportunities' },
          { id: 'Technology', label: '💻 IT & Technology' },
          { id: 'Data & AI', label: '📊 Data & AI' },
          { id: 'Design', label: '🎨 Design' },
          { id: 'Marketing', label: '📢 Marketing' },
          { id: 'Business', label: '💼 Business & Sales' },
          { id: 'Finance', label: '💰 Finance' },
          { id: 'HR', label: '👥 HR' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              categoryFilter === cat.id
                ? 'bg-[#EDE9FE] text-[#5B2EFF] border border-[#C4B5FD] shadow-xs'
                : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ================= TWO-COLUMN LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-6 items-start">
        {/* Left Column: Jobs List & Portals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#0B1F3A]">
              {onlySaved ? 'Saved Opportunities' : 'Recommended Opportunities'}
            </h3>
            <span className="text-xs text-[#94A3B8]">
              {filteredJobs.length} openings found
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white border border-dashed border-[#CBD5E1] rounded-2xl p-10 text-center text-[#64748B] text-xs space-y-2">
              <p className="font-bold text-[#0B1F3A] text-sm">No job openings match your criteria.</p>
              <p>Try resetting filters or clear your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLocationFilter('all');
                  setTypeFilter('all');
                  setCompanyFilter('all');
                  setCategoryFilter('all');
                  setOnlySaved(false);
                }}
                className="mt-2 bg-[#5B2EFF] text-white px-4 py-2 rounded-lg text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const isSaved = !!savedJobs[job.id];
                return (
                  <div
                    key={job.id}
                    className="bg-white border border-[#E2E8F0] rounded-[15px] p-5 shadow-xs hover:border-[#C9BEFC] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center font-extrabold text-xs shrink-0">
                          {job.logoText}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-[#0B1F3A] mb-0.5">
                            {job.title}
                          </h4>
                          <div className="text-xs text-[#64748B]">
                            {job.company} • {job.companyType}
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#E6F7F4] text-[#008F7A] text-[10px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap">
                        {job.matchScore}% Match
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px] text-[#64748B] mb-3">
                      <span className="bg-[#F8FAFC] border border-[#EDF1F6] px-2.5 py-1 rounded">
                        📍 {job.location}
                      </span>
                      <span className="bg-[#F8FAFC] border border-[#EDF1F6] px-2.5 py-1 rounded">
                        💼 {job.type}
                      </span>
                      <span className="bg-[#F8FAFC] border border-[#EDF1F6] px-2.5 py-1 rounded">
                        💰 {job.salary}
                      </span>
                      <span className="bg-[#F8FAFC] border border-[#EDF1F6] px-2.5 py-1 rounded">
                        ⏱ {job.experience}
                      </span>
                    </div>

                    <p className="text-xs text-[#64748B] leading-relaxed mb-3.5">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-[#F3F7FC] text-[#475569] text-[10px] font-medium px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#EEF2F7] flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveJob(job.id, job.title)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-[#EDE9FE] border-[#C4B5FD] text-[#5B2EFF]'
                              : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-slate-50'
                          }`}
                        >
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>

                        <button
                          onClick={() => setActiveModalJob(job)}
                          className="bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Details
                        </button>
                      </div>

                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#5B2EFF] hover:bg-[#4820DC] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <span>Apply on Official Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Explore More Job Websites */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5 shadow-xs">
            <h3 className="text-sm font-bold text-[#0B1F3A] mb-3">
              Explore More Job Websites
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOB_PORTALS.map((portal, idx) => (
                <a
                  key={idx}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#E2E8F0] hover:border-[#5B2EFF] hover:bg-[#FAF9FF] p-3 rounded-xl transition-all block group"
                >
                  <div className="text-xs font-bold text-[#0B1F3A] group-hover:text-[#5B2EFF] flex items-center justify-between">
                    <span>{portal.name}</span>
                    <ExternalLink className="w-3 h-3 text-[#94A3B8] group-hover:text-[#5B2EFF]" />
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    {portal.desc}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Readiness, Skills to improve, Quick actions, Saved jobs */}
        <div className="space-y-5">
          {/* Readiness Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5 shadow-xs text-center">
            <h3 className="text-xs font-bold text-[#0B1F3A] mb-3 text-left">
              Job Readiness
            </h3>

            <div
              className="w-[110px] h-[110px] rounded-full mx-auto flex items-center justify-center relative shadow-sm my-2"
              style={{
                background: 'conic-gradient(#5B2EFF 244.8deg, #EDE9FE 0deg)',
              }}
            >
              <div className="w-[84px] h-[84px] rounded-full bg-white flex items-center justify-center font-extrabold text-2xl text-[#0B1F3A]">
                68%
              </div>
            </div>

            <p className="text-[11px] text-[#64748B] leading-relaxed mt-2 mb-3">
              Complete your skill gaps, assessments and mock interviews to improve your job interview preparation.
            </p>

            <Link
              to="/skill-gap"
              className="bg-[#EDE9FE] hover:bg-[#DDD6FE] text-[#5B2EFF] text-xs font-bold py-2 px-3 rounded-lg block text-center transition-colors"
            >
              Improve My Readiness →
            </Link>
          </div>

          {/* Skills to Improve */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5 shadow-xs">
            <h3 className="text-xs font-bold text-[#0B1F3A] mb-3">
              Skills To Improve
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-[#F1F5F9]">
                <span className="text-[#475569]">Node.js</span>
                <span className="bg-[#FEF2F2] text-[#DC2626] text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                  High
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#F1F5F9]">
                <span className="text-[#475569]">SQL</span>
                <span className="bg-[#FEF2F2] text-[#DC2626] text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                  High
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#F1F5F9]">
                <span className="text-[#475569]">Communication</span>
                <span className="bg-[#FFF7ED] text-[#C2410C] text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                  Medium
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[#475569]">Git & GitHub</span>
                <span className="bg-[#FFF7ED] text-[#C2410C] text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                  Medium
                </span>
              </div>
            </div>

            <Link
              to="/skill-gap"
              className="text-xs text-[#5B2EFF] font-bold block text-right mt-3 hover:underline"
            >
              View Complete Skill Gap →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5 shadow-xs">
            <h3 className="text-xs font-bold text-[#0B1F3A] mb-3">
              Quick Actions
            </h3>

            <div className="space-y-1.5">
              <Link
                to="/resume-analyzer"
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F3F7FC] text-xs text-[#475569] font-medium transition-colors"
              >
                <div className="w-7 h-7 rounded-md bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span>Improve Resume</span>
              </Link>

              <Link
                to="/assessments"
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F3F7FC] text-xs text-[#475569] font-medium transition-colors"
              >
                <div className="w-7 h-7 rounded-md bg-[#E6F7F4] text-[#00A88F] flex items-center justify-center shrink-0">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <span>Take Skill Assessment</span>
              </Link>

              <Link
                to="/mock-interview"
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F3F7FC] text-xs text-[#475569] font-medium transition-colors"
              >
                <div className="w-7 h-7 rounded-md bg-[#EDE9FE] text-[#5B2EFF] flex items-center justify-center shrink-0">
                  <Mic className="w-3.5 h-3.5" />
                </div>
                <span>Practice Interview</span>
              </Link>

              <Link
                to="/career-path"
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F3F7FC] text-xs text-[#475569] font-medium transition-colors"
              >
                <div className="w-7 h-7 rounded-md bg-[#F1F5F9] text-[#64748B] flex items-center justify-center shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <span>View Career Roadmap</span>
              </Link>
            </div>
          </div>

          {/* Saved Jobs Summary */}
          <div className="bg-white border border-[#E2E8F0] rounded-[15px] p-5 shadow-xs">
            <h3 className="text-xs font-bold text-[#0B1F3A] mb-2">
              Saved Jobs
            </h3>
            <p className="text-[11px] text-[#64748B] leading-relaxed mb-3">
              {savedCount > 0
                ? `You have bookmarked ${savedCount} position${savedCount > 1 ? 's' : ''}.`
                : 'You have not saved any jobs yet. Click the bookmark icon on any card to save it here.'}
            </p>
            <button
              onClick={() => setOnlySaved((prev) => !prev)}
              className="w-full bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
            >
              {onlySaved ? 'Show All Jobs' : `View Saved Jobs (${savedCount})`}
            </button>
          </div>
        </div>
      </div>

      {/* ================= JOB DETAILS MODAL ================= */}
      {activeModalJob && (
        <div
          className="fixed inset-0 z-[5000] bg-[#0B1F3A]/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModalJob(null)}
        >
          <div
            className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-lg p-6 relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalJob(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-[#64748B] hover:text-[#0B1F3A] flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-extrabold text-[#0B1F3A] mb-1">
              {activeModalJob.title}
            </h3>
            <div className="text-xs text-[#64748B] mb-4">
              {activeModalJob.company} • {activeModalJob.location} • {activeModalJob.type}
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-[#0B1F3A] mb-1">Role Overview:</h4>
                <p className="text-[#64748B] leading-relaxed">
                  {activeModalJob.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0B1F3A] mb-1.5">Required Skills:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalJob.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-[#EDE9FE] text-[#5B2EFF] text-[10px] font-bold px-2.5 py-1 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl">
                <h4 className="font-bold text-[#0B1F3A] mb-1">Before You Apply:</h4>
                <p className="text-[#64748B] leading-relaxed">
                  Review your resume match score and complete any pending assessments to ensure strong competitiveness for this vacancy.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setActiveModalJob(null)}
                className="flex-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#D8E0EA] py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
              <a
                href={activeModalJob.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#5B2EFF] hover:bg-[#4820DC] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs text-center flex items-center justify-center gap-1.5"
              >
                <span>Open Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
