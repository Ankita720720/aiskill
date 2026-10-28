export interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  targetRole: string;
  education: string;
  college: string;
  location: string;
  graduationYear: string;
  cgpa: string;
  readinessScore: number;
  skillsMastered: number;
  totalSkills: number;
  assessmentAverage: number;
  interviewReadiness: number;
  profileCompletion: number;
  projectsCompleted: number;
  projectsInProgress: number;
  projectsRecommended: number;
  projectScore: number;
  resumeFileName: string;
  resumeSize: string;
  resumeUploadedAt: string;
  selectedDomain?: string;
}

export const defaultStudentProfile: StudentProfile = {
  name: 'Ankita Chintakindi',
  email: 'ankitachintakindi@gmail.com',
  phone: '+91 98765 43210',
  role: 'Full Stack Developer Aspirant',
  targetRole: 'Full Stack Developer',
  education: 'B.Tech - Electronics & Telecommunication',
  college: 'Engineering Institute of Technology',
  location: 'Pune, Maharashtra',
  graduationYear: '2025',
  cgpa: '8.7',
  readinessScore: 68,
  skillsMastered: 8,
  totalSkills: 15,
  assessmentAverage: 76,
  interviewReadiness: 73,
  profileCompletion: 85,
  projectsCompleted: 3,
  projectsInProgress: 2,
  projectsRecommended: 4,
  projectScore: 72,
  resumeFileName: 'Ankita_Chintakindi_Resume.pdf',
  resumeSize: '1.2 MB',
  resumeUploadedAt: '2026-10-20',
};

export interface SkillItem {
  name: string;
  proficiency: number;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const studentSkills: SkillItem[] = [
  { name: 'HTML', proficiency: 90, category: 'Frontend', level: 'Advanced' },
  { name: 'CSS', proficiency: 85, category: 'Frontend', level: 'Advanced' },
  { name: 'JavaScript', proficiency: 78, category: 'Frontend', level: 'Intermediate' },
  { name: 'React', proficiency: 72, category: 'Frontend', level: 'Intermediate' },
  { name: 'Python', proficiency: 65, category: 'Backend', level: 'Intermediate' },
  { name: 'SQL', proficiency: 60, category: 'Database', level: 'Intermediate' },
];

export interface SkillGapItem {
  id: string;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  gapPercentage: number;
  targetRoleRequirement: string;
  recommendedAction: string;
  courseTitle: string;
}

export const studentSkillGaps: SkillGapItem[] = [
  {
    id: 'gap-nodejs',
    name: 'Node.js',
    priority: 'High',
    gapPercentage: 40,
    targetRoleRequirement: 'Core backend runtime & async event loop',
    recommendedAction: 'Complete Node.js Fundamentals module',
    courseTitle: 'Node.js Fundamentals',
  },
  {
    id: 'gap-express',
    name: 'Express.js',
    priority: 'High',
    gapPercentage: 45,
    targetRoleRequirement: 'REST API routing, middleware & error handling',
    recommendedAction: 'Build REST API Backend project',
    courseTitle: 'Building REST APIs with Express',
  },
  {
    id: 'gap-mongodb',
    name: 'MongoDB',
    priority: 'Medium',
    gapPercentage: 50,
    targetRoleRequirement: 'NoSQL schema design & aggregation pipelines',
    recommendedAction: 'Learn Mongoose ORM and query indexing',
    courseTitle: 'MongoDB for Web Developers',
  },
  {
    id: 'gap-rest',
    name: 'REST APIs',
    priority: 'Medium',
    gapPercentage: 35,
    targetRoleRequirement: 'HTTP verbs, status codes, JWT auth & pagination',
    recommendedAction: 'Practice API testing with Postman',
    courseTitle: 'API Design & Security Masterclass',
  },
];

export interface CareerMilestone {
  step: number;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming' | 'Locked';
  skills: string[];
  progress: number;
}

export const careerRoadmapMilestones: CareerMilestone[] = [
  {
    step: 1,
    title: 'Frontend Development',
    description: 'Build strong foundations in HTML, CSS, JavaScript, and React.',
    status: 'Completed',
    skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Tailwind CSS'],
    progress: 100,
  },
  {
    step: 2,
    title: 'Backend Development',
    description: 'Learn Node.js, Express.js, REST APIs, and authentication.',
    status: 'In Progress',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
    progress: 45,
  },
  {
    step: 3,
    title: 'Databases & State',
    description: 'Master MongoDB, PostgreSQL, SQL queries, and caching.',
    status: 'Upcoming',
    skills: ['MongoDB', 'PostgreSQL', 'Mongoose', 'Redis Caching'],
    progress: 0,
  },
  {
    step: 4,
    title: 'Full Stack Deployment & DevOps',
    description: 'Docker, CI/CD pipelines, cloud deployment, and monitoring.',
    status: 'Locked',
    skills: ['Docker', 'AWS / Render', 'GitHub Actions', 'Security Best Practices'],
    progress: 0,
  },
];

export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  matchPercentage: number;
  skills: string[];
  description: string;
  postedDate: string;
  officialUrl: string;
  portalName: string;
  applied?: boolean;
  saved?: boolean;
}

export const demoJobVacancies: JobVacancy[] = [
  {
    id: 'job-1',
    title: 'Junior Full Stack Developer',
    company: 'TechNova Solutions',
    location: 'Pune, India (Hybrid)',
    type: 'Full-time',
    salary: '₹6.5 - 8.5 LPA',
    experience: '0-2 Years',
    matchPercentage: 92,
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'REST APIs'],
    description: 'Join our agile core engineering team building cloud-native SaaS applications with React and Node.js. Direct hiring for freshers & junior developers.',
    postedDate: '2 days ago',
    officialUrl: 'https://www.linkedin.com/jobs/search/?keywords=Junior+Full+Stack+Developer+Pune',
    portalName: 'LinkedIn Careers Portal',
    saved: true,
  },
  {
    id: 'job-2',
    title: 'React Frontend Engineer',
    company: 'CloudScale Inc.',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    salary: '₹7.0 - 9.5 LPA',
    experience: '1-3 Years',
    matchPercentage: 88,
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Redux'],
    description: 'Develop responsive, accessible user interfaces and modern web experiences for global enterprise clients using modern React ecosystem.',
    postedDate: '1 day ago',
    officialUrl: 'https://wellfound.com/jobs?role=frontend-engineer',
    portalName: 'Wellfound Official',
  },
  {
    id: 'job-3',
    title: 'Backend Node.js Developer',
    company: 'DataFlow Systems',
    location: 'Mumbai, India',
    type: 'Full-time',
    salary: '₹7.5 - 10.0 LPA',
    experience: '1-3 Years',
    matchPercentage: 82,
    skills: ['Node.js', 'Express', 'SQL', 'PostgreSQL', 'Docker'],
    description: 'Design and optimize performant REST APIs, microservices, and database connectors for financial analytics platforms.',
    postedDate: '3 days ago',
    officialUrl: 'https://www.naukri.com/node-js-developer-jobs-in-mumbai',
    portalName: 'Naukri.com Verified',
  },
  {
    id: 'job-4',
    title: 'Software Development Engineer - Intern',
    company: 'InnoTech Labs',
    location: 'Remote',
    type: 'Internship',
    salary: '₹35,000 / month',
    experience: 'Fresher / Final Year',
    matchPercentage: 95,
    skills: ['JavaScript', 'HTML/CSS', 'Python', 'Problem Solving'],
    description: 'Hands-on 6-month software development internship with high Pre-Placement Offer (PPO) conversion rate for 2025/2026 graduates.',
    postedDate: 'Just now',
    officialUrl: 'https://internshala.com/internships/software-development-internship',
    portalName: 'Internshala Official',
  },
  {
    id: 'job-5',
    title: 'Graduate Engineer Trainee (GET)',
    company: 'Tata Consultancy Services (TCS)',
    location: 'Pan India / Multiple Locations',
    type: 'Full-time',
    salary: '₹4.5 - 7.0 LPA',
    experience: 'Fresher (2024-2025)',
    matchPercentage: 91,
    skills: ['Java', 'Python', 'Data Structures', 'SQL', 'Web Tech'],
    description: 'National Qualifier Test (NQT) direct intake for digital engineering and cloud practices across top global enterprise accounts.',
    postedDate: 'Just now',
    officialUrl: 'https://www.tcs.com/careers/india/entry-level',
    portalName: 'TCS Careers Portal',
  },
  {
    id: 'job-6',
    title: 'Associate Cloud Software Engineer',
    company: 'Amazon Web Services (AWS)',
    location: 'Hyderabad / Bangalore',
    type: 'Full-time',
    salary: '₹14.0 - 18.0 LPA',
    experience: '0-2 Years',
    matchPercentage: 85,
    skills: ['AWS', 'Python', 'Node.js', 'Linux', 'Distributed Systems'],
    description: 'Build hyper-scalable distributed services powering millions of worldwide developers on AWS infrastructure.',
    postedDate: 'Yesterday',
    officialUrl: 'https://www.amazon.jobs/en/job_categories/software-development',
    portalName: 'Amazon Jobs Portal',
  },
];

export interface ProjectCardData {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  technologies: string[];
  status: 'Completed' | 'In Progress' | 'Recommended';
  score?: number;
  description: string;
  brief: string;
  requirements: string[];
  aiGuidance: string;
}

export const demoProjectsData: ProjectCardData[] = [
  {
    id: 'proj-portfolio',
    title: 'Personal Portfolio',
    category: 'Frontend',
    difficulty: 'Beginner',
    duration: '3-5 Days',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind'],
    status: 'Completed',
    score: 88,
    description: 'Create a professional personal portfolio website to showcase your skills, projects, resume and contact.',
    brief: 'Design and code a responsive personal website emphasizing semantic HTML, modern responsive CSS layouts, and subtle animations.',
    requirements: [
      'Create responsive hero, about, projects, and contact sections',
      'Implement dark mode toggle using CSS variables or Tailwind',
      'Deploy to GitHub Pages, Netlify, or Vercel with custom domain',
      'Ensure Lighthouse accessibility and SEO score > 90',
    ],
    aiGuidance: 'Highlight your top projects first with live demo links and GitHub repository links.',
  },
  {
    id: 'proj-ecommerce',
    title: 'E-Commerce Website',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    duration: '14-20 Days',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    status: 'In Progress',
    score: 65,
    description: 'Build a responsive shopping interface with product filters, shopping cart, user checkout and order history.',
    brief: 'A full-stack e-commerce web platform supporting product catalog browsing, cart persistence, mock payment gateway, and order tracking.',
    requirements: [
      'Build dynamic catalog with multi-facet category filters and search',
      'Implement persistent client-side cart and checkout flow',
      'Secure backend authentication with JWT and order creation API',
      'Integrate Stripe mock payment intent testing',
    ],
    aiGuidance: 'Ensure smooth optimistic UI updates when adding and removing cart items.',
  },
  {
    id: 'proj-rest-api',
    title: 'REST API Backend',
    category: 'Backend',
    difficulty: 'Intermediate',
    duration: '10-14 Days',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Postman'],
    status: 'Recommended',
    score: 0,
    description: 'Build a production-style REST API backend with authentication, database integration, CRUD operations and proper error handling.',
    brief: 'Build a complete production-style REST API backend that allows users to create, read, update and delete application data. Implement authentication, validation, database connectivity and proper API error handling.',
    requirements: [
      'Setup Node.js and Express development environment with strict typing',
      'Build RESTful endpoints for CRUD operations on resources',
      'Implement JWT-based authentication and role-based authorization',
      'Connect to MongoDB using Mongoose with schema validation',
      'Add request validation middleware and centralized error handler',
      'Document all endpoints with Postman collection and README',
    ],
    aiGuidance: 'Divide the project into small milestones and complete the database structure before adding routes. Keep your codebase repository organized with a README, screenshots and meaningful commit history.',
  },
  {
    id: 'proj-chat',
    title: 'Real-Time Chat App',
    category: 'Full Stack',
    difficulty: 'Advanced',
    duration: '12-16 Days',
    technologies: ['React', 'Node.js', 'Socket.io', 'Tailwind'],
    status: 'Recommended',
    score: 0,
    description: 'Build an instant messaging application with real-time room chats, typing indicators, and user online status.',
    brief: 'Real-time WebSocket chat platform enabling 1-on-1 and group channels with live presence detection.',
    requirements: [
      'Set up Socket.io server with room subscription mechanisms',
      'Implement typing indicators and active user status indicators',
      'Store recent message history with MongoDB or PostgreSQL',
      'Add media attachment support and notification sound alerts',
    ],
    aiGuidance: 'Handle disconnects and reconnections gracefully with client heartbeats.',
  },
];
