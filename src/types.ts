export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  title: string;
  avatarUrl: string;
  bio: string;
  targetRole: string;
  targetCompany?: string;
  location: string;
  phone: string;
  github: string;
  linkedin: string;
  experienceYears: number;
  education: string;
  resumeFileName?: string;
  resumeUploadedAt?: string;
  readinessScore: number;
  placementProbability: number;
  streakDays: number;
  coursesCompleted: number;
  challengesCompleted: number;
  testsAttempted: number;
  notificationsEnabled: boolean;
  emailAlertsEnabled: boolean;
  themePreference: 'light' | 'dark' | 'system';
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
  score: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  status: 'Strong' | 'Moderate' | 'Weak';
  parentId?: string;
  children?: string[];
  evidence: {
    quizScore: number;
    codingScore: number;
    projectScore: number;
    interviewScore: number;
  };
  strengths: string[];
  improvements: string[];
}

export interface AssessmentItem {
  id: string;
  title: string;
  type: 'Adaptive' | 'Quiz' | 'Coding' | 'Aptitude';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  questionCount: number;
  lastAttemptScore?: number;
  lastAttemptDate?: string;
  category: string;
  description: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SkillChallenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  dueInDays: number;
  estimatedHours: number;
  description: string;
  tags: string[];
  status: 'Active' | 'Completed' | 'Recommended';
  progressPercentage: number;
  evaluation?: {
    correctness: number;
    codeQuality: number;
    conceptUsage: number;
    efficiency: number;
    documentation: number;
    overallScore: number;
    aiFeedback: string;
  };
}

export interface MockInterviewQuestion {
  id: string;
  track: 'Aptitude' | 'Technical' | 'Coding' | 'Project' | 'HR';
  question: string;
  keyConcepts: string[];
  sampleGoodAnswer: string;
  hints: string[];
}

export interface InterviewEvaluation {
  technicalScore: number;
  problemSolvingScore: number;
  communicationScore: number;
  confidenceScore: number;
  overallScore: number;
  verdict: 'Excellent' | 'Good' | 'Needs Practice';
  strengths: string[];
  improvements: string[];
  aiDetailedRemarks: string;
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  progress: number;
  estimatedTime: string;
  description: string;
  resources: {
    title: string;
    type: 'Course' | 'Video' | 'Practice' | 'Notes';
    platform: string;
    url?: string;
    completed: boolean;
  }[];
}

export interface JobMatch {
  id: string;
  role: string;
  matchScore: number;
  matchLevel: 'High Match' | 'Good Match' | 'Moderate Match';
  avgSalary: string;
  openingsCount: number;
  keyRequirements: string[];
  missingSkills: string[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assessment' | 'challenge' | 'interview' | 'career';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface DailyGoalSubtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface DailyGoal {
  id: string;
  title: string;
  targetCategory: string;
  progressPercentage: number;
  subtasks: DailyGoalSubtask[];
  createdAt: string;
  dueDate: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Full-time' | 'Contract' | 'Internship';
  salary: string;
  postedDate: string;
  postedDayCategory: 'today' | 'yesterday' | 'this-week';
  experienceLevel: 'Entry Level' | 'Mid Level' | 'Senior';
  matchScore: number;
  matchLevel: 'Top Match' | 'High Match' | 'Good Match' | 'Potential Match';
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  applicationDeadline: string;
  isEasyApply: boolean;
  applicantsCount: number;
  status: 'not_applied' | 'applied' | 'reviewing' | 'interview_offered' | 'saved';
  appliedAt?: string;
  externalUrl?: string;
}

export interface JobApplicationSubmission {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  linkedInUrl: string;
  portfolioUrl: string;
  coverNote: string;
  resumeFileName: string;
  shareSkillTwinScore: boolean;
  appliedDate: string;
}

export interface CompletedGoalHistoryItem {
  id: string;
  title: string;
  category: string;
  completedDate: string;
  scoreEarned: number;
  tasksCompleted: number;
  totalTasks: number;
}

export type CareerGoalId =
  | 'ai-ml-engineer'
  | 'data-scientist'
  | 'data-analyst'
  | 'full-stack-developer'
  | 'backend-developer'
  | 'frontend-developer'
  | 'software-developer'
  | 'cloud-engineer'
  | 'cybersecurity-engineer'
  | 'ui-ux-designer'
  | 'devops-engineer'
  | 'cloud-devops-engineer'
  | 'other';

export interface CareerTrackGoal {
  id: CareerGoalId;
  title: string;
  roleName: string;
  shortDesc: string;
  iconName: string;
  targetBenchmark: number; // e.g. 85%
  primaryCategories: string[];
  keyTechnologies: string[];
  avgSalary: string;
  demandTrend: string;
}

export type ResourceFormatType =
  | 'video'
  | 'playlist'
  | 'pdf'
  | 'article'
  | 'documentation'
  | 'practice'
  | 'cheatsheet'
  | 'quiz'
  | 'project';

export interface ConceptResourceItem {
  id: string;
  title: string;
  type: ResourceFormatType;
  category: string;
  conceptId: string;
  description: string;
  url: string;
  youtubeVideoId?: string;
  channel?: string;
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail?: string;
  isVerified: boolean;
  authorOrSource?: string;
}

export interface ConceptPracticeQuestion {
  id: string;
  category: string;
  conceptId: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  codeSnippet?: string;
}

export interface ConceptDetail {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  order: number;
  shortSummary: string;
  whatYouWillLearn: string[];
  definition: string;
  whyUsed: string;
  realWorldApplications: string[];
  keyTerminology: { term: string; explanation: string }[];
  codeExample?: { language: string; code: string; explanation: string };
  advantages: string[];
  limitations: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  primaryVideo: ConceptResourceItem;
  additionalResources: ConceptResourceItem[];
  practiceQuestions: ConceptPracticeQuestion[];
  nextRecommendedConceptId?: string;
  nextRecommendedConceptName?: string;
}

export interface LearningCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  concepts: ConceptDetail[];
  careerRelevance: CareerGoalId[];
}

export interface ConceptUserProgress {
  conceptId: string;
  watchProgressPercentage: number;
  watchTimeSeconds: number;
  isWatchCompleted: boolean;
  practiceScorePercentage: number;
  practiceAttempted: boolean;
  practiceCorrectCount: number;
  practiceTotalCount: number;
  assessmentScorePercentage?: number;
  masteryScorePercentage: number;
  isMastered: boolean;
  lastStudiedAt: string;
}

export interface LearningStreakDay {
  date: string;
  dayLabel: string;
  minutesLearned: number;
  conceptsCompleted: string[];
  isActive: boolean;
}

export interface ProctoredTestSession {
  assessmentId: string;
  startTime: string;
  tabSwitchViolations: number;
  maxAllowedViolations: number;
  isCameraActive: boolean;
  isFullScreen: boolean;
  isAutoSubmitted: boolean;
}

export interface EmailDispatchRecord {
  id: string;
  sentAt: string;
  recipientEmail: string;
  subject: string;
  jobItemsCount?: number;
  questionItemsCount?: number;
  status: 'delivered' | 'scheduled' | 'failed';
  previewHtmlSnippet: string;
}

export interface RecurringEmailTask {
  id: string;
  title: string;
  type: 'daily_jobs' | 'daily_interview_questions';
  cronTime: string; // e.g. '12:00 PM IST' or '6:00 PM IST'
  hour: number;
  minute: number;
  timeZone: string;
  isActive: boolean;
  recipientEmail: string;
  targetJobTitle: string;
  experienceRange?: string;
  locationPreference?: string;
  companyFocus?: string;
  includeLinkedInOutreach?: boolean;
  topicsCovered?: string[];
  lastSentDate?: string;
  nextScheduledRun: string;
  totalEmailsDispatched: number;
  recentDispatches: EmailDispatchRecord[];
}

export interface CuratedJobRole {
  id: string;
  roleTitle: string;
  companyName: string;
  companyLogo: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  experienceRange: string;
  techStack: string[];
  salaryRange: string;
  applicationDeadline: string;
  directApplyUrl: string;
  companyType: string;
  description: string;
  linkedInOutreachTemplate: string;
  postedTimeAgo: string;
}

export interface DailyInterviewQuestionItem {
  id: string;
  category: string;
  frequency: string;
  question: string;
  modelAnswer: string;
  codeExample?: {
    language: string;
    code: string;
  };
  keyTakeaways: string[];
}

export interface DailyInterviewTopicSet {
  date: string;
  time: string;
  targetRole: string;
  focusAreas: string[];
  questions: DailyInterviewQuestionItem[];
}
