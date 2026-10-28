import { defaultStudentProfile, StudentProfile } from '../data/collageData';
import { DOMAINS_MASTER } from '../data/multiDomainData';

// User account structure for local authentication database
export interface UserAccount {
  name: string;
  email: string;
  password?: string;
  profile: StudentProfile;
  createdAt: string;
}

const USERS_DB_KEY = 'skilltwin_registered_users';
const CURRENT_SESSION_EMAIL_KEY = 'skilltwin_session_email';

/**
 * Retrieve all registered user accounts
 */
export function getAllUsers(): Record<string, UserAccount> {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading users db', e);
  }
  // Initialize with default account
  const initial: Record<string, UserAccount> = {
    [defaultStudentProfile.email.toLowerCase()]: {
      name: defaultStudentProfile.name,
      email: defaultStudentProfile.email.toLowerCase(),
      password: 'password123',
      profile: {
        ...defaultStudentProfile,
        selectedDomain: 'fullstack',
      },
      createdAt: '2026-01-15',
    },
  };
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(initial));
  } catch {}
  return initial;
}

/**
 * Save or register a user account
 */
export function saveUserAccount(account: UserAccount): void {
  const users = getAllUsers();
  users[account.email.toLowerCase()] = account;
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving user account', e);
  }
}

/**
 * Find user account by email
 */
export function findUserByEmail(email: string): UserAccount | null {
  const users = getAllUsers();
  return users[email.trim().toLowerCase()] || null;
}

/**
 * Set active logged-in user email
 */
export function setCurrentSessionEmail(email: string): void {
  try {
    localStorage.setItem(CURRENT_SESSION_EMAIL_KEY, email.trim().toLowerCase());
  } catch {}
}

/**
 * Get active logged-in user email
 */
export function getCurrentSessionEmail(): string {
  try {
    const email = localStorage.getItem(CURRENT_SESSION_EMAIL_KEY);
    if (email) return email.toLowerCase();
  } catch {}
  return defaultStudentProfile.email.toLowerCase();
}

/**
 * Get active user's full profile
 */
export function getCurrentUserProfile(): StudentProfile {
  const email = getCurrentSessionEmail();
  const account = findUserByEmail(email);
  if (account && account.profile) {
    return account.profile;
  }
  try {
    const saved = localStorage.getItem('skilltwin_student_profile');
    if (saved) return JSON.parse(saved);
  } catch {}
  return defaultStudentProfile;
}

/**
 * Update current user's profile
 */
export function updateCurrentUserProfile(updated: StudentProfile): void {
  const email = updated.email.toLowerCase();
  setCurrentSessionEmail(email);
  const account = findUserByEmail(email) || {
    name: updated.name,
    email: email,
    createdAt: new Date().toISOString(),
    profile: updated,
  };
  account.profile = updated;
  account.name = updated.name;
  saveUserAccount(account);
  try {
    localStorage.setItem('skilltwin_student_profile', JSON.stringify(updated));
    if (updated.selectedDomain) {
      localStorage.setItem('skilltwin_selected_domain', updated.selectedDomain);
    }
  } catch {}
}

/**
 * Check if the user has an explicitly saved domain
 */
export function hasUserSelectedDomain(email?: string): boolean {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  const account = findUserByEmail(targetEmail);
  if (account && account.profile && account.profile.selectedDomain) {
    return true;
  }
  const explicit = localStorage.getItem(`skilltwin_domain_${targetEmail}`);
  return !!explicit;
}

/**
 * Get active domain ID for current user
 */
export function getUserActiveDomainId(email?: string): string {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  const account = findUserByEmail(targetEmail);
  if (account?.profile?.selectedDomain && DOMAINS_MASTER[account.profile.selectedDomain]) {
    return account.profile.selectedDomain;
  }
  const saved = localStorage.getItem(`skilltwin_domain_${targetEmail}`);
  if (saved && DOMAINS_MASTER[saved]) {
    return saved;
  }
  const legacy = localStorage.getItem('skilltwin_selected_domain');
  if (legacy && DOMAINS_MASTER[legacy]) {
    return legacy;
  }
  return 'fullstack';
}

/**
 * Set active domain for current user (only done during setup or Profile -> Career Preferences)
 */
export function setUserActiveDomain(domainId: string, role?: string, email?: string): void {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  const account = findUserByEmail(targetEmail);
  const domain = DOMAINS_MASTER[domainId] || DOMAINS_MASTER['fullstack'];
  const targetRole = role || domain.primaryRole;

  if (account) {
    account.profile = {
      ...account.profile,
      selectedDomain: domain.id,
      targetRole: targetRole,
      role: `${targetRole} Aspirant`,
      readinessScore: domain.readinessScoreDefault,
    };
    saveUserAccount(account);
  }

  try {
    localStorage.setItem(`skilltwin_domain_${targetEmail}`, domain.id);
    localStorage.setItem(`skilltwin_role_${targetEmail}`, targetRole);
    localStorage.setItem('skilltwin_selected_domain', domain.id);
  } catch {}
}

/**
 * Completed Courses tracking per user
 */
export function getUserCompletedCourses(email?: string): string[] {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  try {
    const raw = localStorage.getItem(`skilltwin_courses_${targetEmail}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function toggleUserCompletedCourse(courseId: string, email?: string): boolean {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  const list = getUserCompletedCourses(targetEmail);
  const exists = list.includes(courseId);
  const updated = exists ? list.filter((id) => id !== courseId) : [...list, courseId];
  try {
    localStorage.setItem(`skilltwin_courses_${targetEmail}`, JSON.stringify(updated));
  } catch {}
  return !exists;
}

/**
 * Learning Plan tracking per user
 */
export function getUserLearningPlan(email?: string): string[] {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  try {
    const raw = localStorage.getItem(`skilltwin_plan_${targetEmail}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function toggleUserLearningPlan(courseId: string, email?: string): boolean {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  const list = getUserLearningPlan(targetEmail);
  const exists = list.includes(courseId);
  const updated = exists ? list.filter((id) => id !== courseId) : [...list, courseId];
  try {
    localStorage.setItem(`skilltwin_plan_${targetEmail}`, JSON.stringify(updated));
  } catch {}
  return !exists;
}

/**
 * Completed Videos tracking per user
 */
export function getUserCompletedVideos(email?: string): string[] {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  try {
    const raw = localStorage.getItem(`skilltwin_videos_${targetEmail}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function toggleUserCompletedVideo(videoId: string, email?: string): boolean {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  const list = getUserCompletedVideos(targetEmail);
  const exists = list.includes(videoId);
  const updated = exists ? list.filter((id) => id !== videoId) : [...list, videoId];
  try {
    localStorage.setItem(`skilltwin_videos_${targetEmail}`, JSON.stringify(updated));
  } catch {}
  return !exists;
}

/**
 * Roadmap Completed Stages tracking per user per domain
 */
export function getUserRoadmapStages(domainId: string, email?: string): number[] {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  try {
    const raw = localStorage.getItem(`skilltwin_stages_${targetEmail}_${domainId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  const domain = DOMAINS_MASTER[domainId];
  if (domain) {
    return domain.roadmap.filter((s) => s.defaultDone).map((s) => s.stage);
  }
  return [1, 2];
}

export function toggleUserRoadmapStage(domainId: string, stageNum: number, email?: string): boolean {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  const current = getUserRoadmapStages(domainId, targetEmail);
  const exists = current.includes(stageNum);
  const updated = exists ? current.filter((s) => s !== stageNum) : [...current, stageNum];
  try {
    localStorage.setItem(`skilltwin_stages_${targetEmail}_${domainId}`, JSON.stringify(updated));
  } catch {}
  return !exists;
}

/**
 * Historical Assessment tracking per user
 */
export interface AssessmentRecord {
  testName: string;
  domainId: string;
  role: string;
  score: number;
  date: string;
}

export function getUserAssessmentHistory(email?: string): AssessmentRecord[] {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  try {
    const raw = localStorage.getItem(`skilltwin_assessments_${targetEmail}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      testName: 'Core Technical Assessment',
      domainId: 'fullstack',
      role: 'Full Stack Developer',
      score: 78,
      date: '2026-10-18',
    },
    {
      testName: 'Quantitative & Logical Aptitude',
      domainId: 'general',
      role: 'All Roles',
      score: 72,
      date: '2026-10-21',
    },
  ];
}

export function saveUserAssessmentRecord(record: AssessmentRecord, email?: string): void {
  const targetEmail = (email || getCurrentSessionEmail()).toLowerCase();
  const history = getUserAssessmentHistory(targetEmail);
  const updated = [record, ...history];
  try {
    localStorage.setItem(`skilltwin_assessments_${targetEmail}`, JSON.stringify(updated));
  } catch {}
}
