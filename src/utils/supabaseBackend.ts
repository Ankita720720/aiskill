/**
 * Supabase Cloud Backend Integration Service
 * Multi-Domain AI Student Skill Gap Analyzer
 */

import { supabase, SUPABASE_PROJECT_ID, SUPABASE_URL } from './supabase';
import { StudentProfile } from '../data/collageData';

export interface ResumeAnalysisRecord {
  email: string;
  fileName: string;
  fileUrl?: string;
  fileSize?: string;
  atsScore: number;
  strengths: string[];
  missingKeywords: string[];
  formattingScore?: number;
  impactScore?: number;
  summary?: string;
}

export interface AssessmentDbRecord {
  email: string;
  domainId: string;
  targetRole?: string;
  category: string;
  testType?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answersData?: any;
  passed?: boolean;
}

export interface SkillGapDbRecord {
  email: string;
  domainId: string;
  targetRole: string;
  matchedSkills: string[];
  missingSkills: string[];
  readinessPercentage: number;
  prioritySkills?: string[];
  recommendations?: string;
}

export interface MockInterviewDbRecord {
  email: string;
  domainId: string;
  targetRole: string;
  difficulty?: string;
  overallScore: number;
  strengths?: string;
  areasForImprovement?: string;
  questionsAndAnswers?: any;
}

// ==============================================================================
// 1. STUDENT PROFILE
// ==============================================================================

export async function fetchStudentProfileFromDb(email: string): Promise<Partial<StudentProfile> | null> {
  if (!email) return null;
  try {
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (error || !data) return null;

    return {
      email: data.email,
      name: data.full_name || cleanEmail.split('@')[0],
      targetRole: data.target_role,
      role: data.role,
      selectedDomain: data.selected_domain,
      readinessScore: data.readiness_score,
      education: data.education,
      college: data.college,
      cgpa: data.cgpa ? String(data.cgpa) : undefined,
      skillsMastered: typeof data.skills_mastered === 'number' 
        ? data.skills_mastered 
        : (Array.isArray(data.skills_mastered) ? data.skills_mastered.length : 8),
    };
  } catch (err) {
    console.warn('Supabase fetchStudentProfileFromDb note:', err);
    return null;
  }
}

export async function upsertStudentProfileToDb(profile: StudentProfile): Promise<{ success: boolean; error?: string }> {
  if (!profile.email) return { success: false, error: 'Email required' };
  try {
    const cleanEmail = profile.email.trim().toLowerCase();
    const { error } = await supabase.from('students').upsert(
      {
        email: cleanEmail,
        full_name: profile.name,
        target_role: profile.targetRole,
        role: profile.role,
        selected_domain: profile.selectedDomain,
        readiness_score: profile.readinessScore,
        education: profile.education,
        college: profile.college,
        cgpa: profile.cgpa,
        skills_mastered: Array.isArray((profile as any).skills_mastered) 
          ? (profile as any).skills_mastered 
          : [profile.targetRole || 'Full Stack'],
        missing_skills: (profile as any).skillsToImprove || (profile as any).missingSkills || [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    );

    if (error) {
      console.warn('Supabase upsertStudentProfileToDb note:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

// ==============================================================================
// 2. RESUME UPLOAD & ANALYSIS
// ==============================================================================

export async function uploadResumeFileToStorage(
  file: File,
  userEmail: string
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  try {
    const cleanEmail = userEmail.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop() || 'pdf';
    const filePath = `${cleanEmail}/${timestamp}_${file.name.replace(/\s+/g, '_')}`;

    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      // Bucket might not yet be configured in Supabase UI, graceful handling
      console.warn('Supabase Storage upload notice:', error.message);
      return { success: false, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(filePath);

    return {
      success: true,
      publicUrl: publicUrlData?.publicUrl || '',
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Storage upload error' };
  }
}

export async function saveResumeAnalysisToDb(
  record: ResumeAnalysisRecord
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('resume_analyses').insert({
      email: record.email.trim().toLowerCase(),
      file_name: record.fileName,
      file_url: record.fileUrl,
      file_size: record.fileSize,
      ats_score: record.atsScore,
      strengths: record.strengths || [],
      missing_keywords: record.missingKeywords || [],
      formatting_score: record.formattingScore || 80,
      impact_score: record.impactScore || 70,
      summary: record.summary,
      analyzed_at: new Date().toISOString(),
    });

    if (error) {
      console.warn('saveResumeAnalysisToDb note:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

export async function fetchLatestResumeAnalysisFromDb(email: string): Promise<ResumeAnalysisRecord | null> {
  if (!email) return null;
  try {
    const { data, error } = await supabase
      .from('resume_analyses')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .order('analyzed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;

    return {
      email: data.email,
      fileName: data.file_name,
      fileUrl: data.file_url,
      fileSize: data.file_size,
      atsScore: data.ats_score,
      strengths: data.strengths || [],
      missingKeywords: data.missing_keywords || [],
      formattingScore: data.formatting_score,
      impactScore: data.impact_score,
      summary: data.summary,
    };
  } catch {
    return null;
  }
}

// ==============================================================================
// 3. STUDENT SKILLS
// ==============================================================================

export async function saveStudentSkillsToDb(
  email: string,
  skillsMastered: string[],
  skillsToImprove: string[]
): Promise<{ success: boolean }> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    
    // Update array in students table
    await supabase
      .from('students')
      .update({
        skills_mastered: skillsMastered,
        missing_skills: skillsToImprove,
        updated_at: new Date().toISOString(),
      })
      .eq('email', cleanEmail);

    // Also insert individual records into student_skills table
    const skillRows = [
      ...skillsMastered.map((s) => ({
        email: cleanEmail,
        skill_name: s,
        category: 'technical',
        proficiency_level: 'advanced',
        verified: true,
      })),
      ...skillsToImprove.map((s) => ({
        email: cleanEmail,
        skill_name: s,
        category: 'technical',
        proficiency_level: 'beginner',
        verified: false,
      })),
    ];

    if (skillRows.length > 0) {
      await supabase
        .from('student_skills')
        .upsert(skillRows, { onConflict: 'email,skill_name' });
    }

    return { success: true };
  } catch (err) {
    console.warn('saveStudentSkillsToDb note:', err);
    return { success: false };
  }
}

// ==============================================================================
// 4. ASSESSMENT RESULTS
// ==============================================================================

export async function saveAssessmentResultToDb(
  record: AssessmentDbRecord
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('assessment_results').insert({
      email: record.email.trim().toLowerCase(),
      domain_id: record.domainId,
      target_role: record.targetRole,
      category: record.category,
      test_type: record.testType || 'domain_quiz',
      score: record.score,
      total_questions: record.totalQuestions,
      percentage: record.percentage,
      answers_data: record.answersData,
      passed: record.percentage >= 60,
      completed_at: new Date().toISOString(),
    });

    if (error) {
      console.warn('saveAssessmentResultToDb note:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

export async function fetchAssessmentHistoryFromDb(email: string): Promise<any[]> {
  if (!email) return [];
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .order('completed_at', { ascending: false });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

// ==============================================================================
// 5. SKILL GAP ANALYSIS
// ==============================================================================

export async function saveSkillGapAnalysisToDb(
  record: SkillGapDbRecord
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('skill_gaps').insert({
      email: record.email.trim().toLowerCase(),
      domain_id: record.domainId,
      target_role: record.targetRole,
      matched_skills: record.matchedSkills,
      missing_skills: record.missingSkills,
      readiness_percentage: record.readinessPercentage,
      priority_skills: record.prioritySkills || [],
      recommendations: record.recommendations,
      calculated_at: new Date().toISOString(),
    });

    if (error) {
      console.warn('saveSkillGapAnalysisToDb note:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

// ==============================================================================
// 6. LEARNING PATH / ROADMAP PROGRESS
// ==============================================================================

export async function saveLearningPathProgressToDb(
  email: string,
  domainId: string,
  targetRole: string,
  completedMilestones: string[],
  inProgressMilestones: string[],
  totalMilestones: number = 10
): Promise<{ success: boolean }> {
  try {
    const progressPercentage = Math.round((completedMilestones.length / (totalMilestones || 1)) * 100);
    const { error } = await supabase.from('learning_paths').upsert(
      {
        email: email.trim().toLowerCase(),
        domain_id: domainId,
        target_role: targetRole,
        completed_milestones: completedMilestones,
        in_progress_milestones: inProgressMilestones,
        total_milestones: totalMilestones,
        progress_percentage: progressPercentage,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email,domain_id' }
    );

    if (error) {
      console.warn('saveLearningPathProgressToDb note:', error.message);
      return { success: false };
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function fetchLearningPathProgressFromDb(
  email: string,
  domainId: string
): Promise<{ completed: string[]; inProgress: string[]; percentage: number } | null> {
  try {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .eq('domain_id', domainId)
      .maybeSingle();

    if (error || !data) return null;
    return {
      completed: data.completed_milestones || [],
      inProgress: data.in_progress_milestones || [],
      percentage: data.progress_percentage || 0,
    };
  } catch {
    return null;
  }
}

// ==============================================================================
// 7. AI MOCK INTERVIEWS
// ==============================================================================

export async function saveMockInterviewToDb(
  record: MockInterviewDbRecord
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('mock_interviews').insert({
      email: record.email.trim().toLowerCase(),
      domain_id: record.domainId,
      target_role: record.targetRole,
      difficulty: record.difficulty || 'intermediate',
      overall_score: record.overallScore,
      strengths: record.strengths,
      areas_for_improvement: record.areasForImprovement,
      questions_and_answers: record.questionsAndAnswers,
      conducted_at: new Date().toISOString(),
    });

    if (error) {
      console.warn('saveMockInterviewToDb note:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

// ==============================================================================
// 8. USER SETTINGS
// ==============================================================================

export async function saveUserSettingsToDb(
  email: string,
  settings: {
    theme?: string;
    emailNotifications?: boolean;
    weeklyProgressReport?: boolean;
    assessmentReminders?: boolean;
  }
): Promise<{ success: boolean }> {
  try {
    const { error } = await supabase.from('user_settings').upsert(
      {
        email: email.trim().toLowerCase(),
        theme: settings.theme || 'light',
        email_notifications: settings.emailNotifications ?? true,
        weekly_progress_report: settings.weeklyProgressReport ?? true,
        assessment_reminders: settings.assessmentReminders ?? true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    );

    if (error) {
      console.warn('saveUserSettingsToDb note:', error.message);
      return { success: false };
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function fetchUserSettingsFromDb(email: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();

    if (error || !data) return null;
    return {
      theme: data.theme,
      emailNotifications: data.email_notifications,
      weeklyProgressReport: data.weekly_progress_report,
      assessmentReminders: data.assessment_reminders,
    };
  } catch {
    return null;
  }
}
