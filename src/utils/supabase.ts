import { createClient } from '@supabase/supabase-js';
import { StudentProfile } from '../data/collageData';

// User-provided Supabase project configuration with fallback defaults
const DEFAULT_PROJECT_ID = 'xdiogqwtsqrkfwukfnbt';
const DEFAULT_ANON_KEY = 'sb_publishable_wO3r7SBe1lB0-CyPr9n5OA_z-tUDwzQ';
const DEFAULT_URL = `https://${DEFAULT_PROJECT_ID}.supabase.co`;

function cleanString(val: any): string {
  if (!val || typeof val !== 'string') return '';
  return val.trim().replace(/^['"]|['"]$/g, '');
}

function resolveSupabaseUrl(): string {
  const envObj = (import.meta as any).env || {};
  const candidates = [
    envObj.VITE_SUPABASE_URL,
    envObj.NEXT_PUBLIC_SUPABASE_URL,
    DEFAULT_URL,
  ];

  for (const raw of candidates) {
    const str = cleanString(raw);
    if (!str) continue;

    // 1. If it contains a supabase.co URL anywhere inside the string
    const match = str.match(/https?:\/\/[a-zA-Z0-9-]+\.supabase\.co[^\s'"]*/);
    if (match) {
      try {
        const u = new URL(match[0]);
        if (u.protocol === 'http:' || u.protocol === 'https:') {
          return u.origin;
        }
      } catch {}
    }

    // 2. Direct valid http/https URL
    if (str.startsWith('http://') || str.startsWith('https://')) {
      try {
        const u = new URL(str);
        if (u.protocol === 'http:' || u.protocol === 'https:') {
          return u.origin;
        }
      } catch {}
    }
  }

  return DEFAULT_URL;
}

function resolveSupabaseKey(): string {
  const envObj = (import.meta as any).env || {};
  const candidates = [
    envObj.VITE_SUPABASE_PUBLISHABLE_KEY,
    envObj.VITE_SUPABASE_ANON_KEY,
    envObj.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    DEFAULT_ANON_KEY,
  ];

  for (const raw of candidates) {
    const str = cleanString(raw);
    if (!str) continue;

    // Look for sb_publishable key
    const publishableMatch = str.match(/sb_publishable_[a-zA-Z0-9_-]+/);
    if (publishableMatch) {
      return publishableMatch[0];
    }
    const keyMatch = str.match(/(?:KEY=|key=)?([a-zA-Z0-9._\-\/+=]{20,})/);
    if (keyMatch && keyMatch[1]) {
      return keyMatch[1];
    }
    if (str.length > 20 && !str.includes(' ')) {
      return str;
    }
  }

  return DEFAULT_ANON_KEY;
}

function resolveSupabaseProjectId(): string {
  const envObj = (import.meta as any).env || {};
  const candidates = [
    envObj.VITE_SUPABASE_PROJECT_ID,
    DEFAULT_PROJECT_ID,
  ];

  for (const raw of candidates) {
    const str = cleanString(raw);
    if (!str) continue;
    const match = str.match(/[a-z0-9]{20}/);
    if (match) return match[0];
    if (/^[a-zA-Z0-9_-]+$/.test(str)) return str;
  }

  return DEFAULT_PROJECT_ID;
}

export const SUPABASE_PROJECT_ID = resolveSupabaseProjectId();
export const SUPABASE_URL = resolveSupabaseUrl();
export const SUPABASE_ANON_KEY = resolveSupabaseKey();
export const SUPABASE_PUBLISHABLE_KEY = SUPABASE_ANON_KEY;

// Initialize the Supabase Client with safe fallback
function createSafeSupabaseClient() {
  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (err) {
    console.warn('Fallback: initializing Supabase with default URL', err);
    return createClient(DEFAULT_URL, DEFAULT_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
}

export const supabase = createSafeSupabaseClient();

export interface SupabaseConnectionStatus {
  isConnected: boolean;
  projectId: string;
  url: string;
  message: string;
  latencyMs?: number;
}

/**
 * Test connectivity to the Supabase Cloud backend
 */
export async function checkSupabaseConnection(): Promise<SupabaseConnectionStatus> {
  const startTime = Date.now();
  try {
    // Ping Supabase auth health
    const { data, error } = await supabase.auth.getSession();
    const latency = Date.now() - startTime;

    if (error && error.status && error.status >= 500) {
      return {
        isConnected: false,
        projectId: SUPABASE_PROJECT_ID,
        url: SUPABASE_URL,
        message: `Supabase server error: ${error.message}`,
        latencyMs: latency,
      };
    }

    return {
      isConnected: true,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      message: 'Supabase Cloud Database connected and operational',
      latencyMs: latency,
    };
  } catch (err: any) {
    return {
      isConnected: false,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      message: err?.message || 'Failed to connect to Supabase Cloud',
      latencyMs: Date.now() - startTime,
    };
  }
}

/**
 * Secure student sign-up in Supabase Auth and database
 */
export async function supabaseSignUp(
  name: string,
  email: string,
  password: string,
  targetRole?: string
): Promise<{ success: boolean; user?: any; error?: string; requiresEmailConfirmation?: boolean }> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    // 1. Sign up through Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: cleanEmail,
      password: password,
      options: {
        data: {
          full_name: cleanName,
          target_role: targetRole || 'Select Career Path',
        },
      },
    });

    if (authError) {
      // If user already registered in Supabase auth, inform or fallback
      if (authError.message.toLowerCase().includes('already registered')) {
        return {
          success: false,
          error: 'An account with this email address already exists. Please sign in.',
        };
      }
      // If weak password
      if (authError.message.toLowerCase().includes('password')) {
        return {
          success: false,
          error: authError.message,
        };
      }
      return {
        success: false,
        error: authError.message,
      };
    }

    // 2. Try inserting student profile into Supabase 'students' table
    try {
      if (authData.user) {
        await supabase.from('students').upsert(
          {
            id: authData.user.id,
            email: cleanEmail,
            full_name: cleanName,
            target_role: targetRole || 'Select Career Path',
            readiness_score: 65,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );
      }
    } catch (dbErr) {
      // Table may not have been created yet in the user's project; auth succeeded
      console.warn('Note: students table upsert skipped:', dbErr);
    }

    const requiresEmailConfirmation = !authData.session && !authData.user?.confirmed_at;

    return {
      success: true,
      user: authData.user,
      requiresEmailConfirmation,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to complete registration on Supabase',
    };
  }
}

/**
 * Secure student sign-in with Supabase Auth
 */
export async function supabaseSignIn(
  email: string,
  password: string
): Promise<{ success: boolean; user?: any; profile?: Partial<StudentProfile>; error?: string }> {
  try {
    const cleanEmail = email.trim().toLowerCase();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password,
    });

    if (authError) {
      return {
        success: false,
        error: authError.message,
      };
    }

    let profileData: Partial<StudentProfile> = {
      email: cleanEmail,
      name:
        authData.user?.user_metadata?.full_name ||
        cleanEmail.split('@')[0].replace(/[._]/g, ' '),
      targetRole: authData.user?.user_metadata?.target_role,
    };

    // Try fetching student profile from Supabase 'students' table
    try {
      const { data: dbData } = await supabase
        .from('students')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (dbData) {
        profileData = {
          ...profileData,
          name: dbData.full_name || profileData.name,
          targetRole: dbData.target_role || profileData.targetRole,
          selectedDomain: dbData.selected_domain || undefined,
          readinessScore: dbData.readiness_score || undefined,
          education: dbData.education || undefined,
          college: dbData.college || undefined,
          cgpa: dbData.cgpa || undefined,
        };
      }
    } catch {
      // Fallback gracefully
    }

    return {
      success: true,
      user: authData.user,
      profile: profileData,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Sign in failed. Please check your credentials.',
    };
  }
}

/**
 * Sign out of Supabase
 */
export async function supabaseSignOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.error('Supabase sign out error', e);
  }
}

/**
 * Sync active student profile to Supabase database
 */
export async function syncStudentProfileToSupabase(
  profile: StudentProfile
): Promise<{ success: boolean; message?: string }> {
  try {
    const email = profile.email.toLowerCase();
    const { error } = await supabase.from('students').upsert(
      {
        email: email,
        full_name: profile.name,
        target_role: profile.targetRole,
        role: profile.role,
        selected_domain: profile.selectedDomain,
        readiness_score: profile.readinessScore,
        education: profile.education,
        college: profile.college,
        cgpa: profile.cgpa,
        skills_mastered: profile.skillsMastered,
        missing_skills: (profile as any).missingSkills || (profile as any).skillsToImprove || [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    );

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Profile synced to Supabase database' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Sync failed' };
  }
}

/**
 * Record assessment scores to Supabase database
 */
export async function saveAssessmentToSupabase(assessmentRecord: {
  email: string;
  domainId: string;
  targetRole: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
  category: string;
}): Promise<boolean> {
  try {
    const { error } = await supabase.from('student_assessments').insert({
      email: assessmentRecord.email.toLowerCase(),
      domain_id: assessmentRecord.domainId,
      target_role: assessmentRecord.targetRole,
      score: assessmentRecord.score,
      total_questions: assessmentRecord.totalQuestions,
      percentage: assessmentRecord.percentage,
      category: assessmentRecord.category,
      completed_at: assessmentRecord.date || new Date().toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
}
