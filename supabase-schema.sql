-- ==============================================================================
-- SkillTwin AI — Supabase Database Schema
-- Multi-Domain Intelligent Career & Skill Gap Guidance System
-- Project URL: https://xdiogqwtsqrkfwukfnbt.supabase.co
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES / STUDENTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    target_role TEXT DEFAULT 'Select Career Path',
    role TEXT DEFAULT 'Student Aspirant',
    selected_domain TEXT DEFAULT 'ai',
    readiness_score INTEGER DEFAULT 65 CHECK (readiness_score BETWEEN 0 AND 100),
    education TEXT DEFAULT 'B.Tech / B.E in Computer Science',
    college TEXT,
    cgpa NUMERIC(3, 2),
    graduation_year INTEGER,
    bio TEXT,
    phone TEXT,
    location TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    skills_mastered TEXT[] DEFAULT ARRAY[]::TEXT[],
    missing_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Students RLS Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.students;
CREATE POLICY "Users can view their own profile" 
    ON public.students FOR SELECT 
    USING (auth.uid() = id OR auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.students;
CREATE POLICY "Users can insert their own profile" 
    ON public.students FOR INSERT 
    WITH CHECK (auth.uid() = id OR auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.students;
CREATE POLICY "Users can update their own profile" 
    ON public.students FOR UPDATE 
    USING (auth.uid() = id OR auth.jwt() ->> 'email' = email);

-- ==============================================================================
-- 2. STUDENT SKILLS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    skill_name TEXT NOT NULL,
    category TEXT DEFAULT 'technical',
    proficiency_level TEXT DEFAULT 'intermediate' CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    verified BOOLEAN DEFAULT FALSE,
    score INTEGER CHECK (score BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(email, skill_name)
);

ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own skills" ON public.student_skills;
CREATE POLICY "Users can view their own skills" 
    ON public.student_skills FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "Users can manage their own skills" ON public.student_skills;
CREATE POLICY "Users can manage their own skills" 
    ON public.student_skills FOR ALL 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- ==============================================================================
-- 3. RESUMES & RESUME ANALYSES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.resume_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT,
    file_size TEXT,
    ats_score INTEGER DEFAULT 75 CHECK (ats_score BETWEEN 0 AND 100),
    strengths TEXT[] DEFAULT ARRAY[]::TEXT[],
    missing_keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
    formatting_score INTEGER DEFAULT 80,
    impact_score INTEGER DEFAULT 70,
    summary TEXT,
    analyzed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own resume analyses" ON public.resume_analyses;
CREATE POLICY "Users can view their own resume analyses" 
    ON public.resume_analyses FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "Users can insert resume analyses" ON public.resume_analyses;
CREATE POLICY "Users can insert resume analyses" 
    ON public.resume_analyses FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- ==============================================================================
-- 4. ASSESSMENT RESULTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    domain_id TEXT NOT NULL,
    target_role TEXT,
    category TEXT DEFAULT 'technical',
    test_type TEXT DEFAULT 'domain_quiz',
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage INTEGER NOT NULL,
    answers_data JSONB,
    passed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own assessments" ON public.assessment_results;
CREATE POLICY "Users can view their own assessments" 
    ON public.assessment_results FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "Users can insert assessment results" ON public.assessment_results;
CREATE POLICY "Users can insert assessment results" 
    ON public.assessment_results FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- ==============================================================================
-- 5. SKILL GAP ANALYSES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.skill_gaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    domain_id TEXT NOT NULL,
    target_role TEXT NOT NULL,
    matched_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    missing_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    readiness_percentage INTEGER DEFAULT 60,
    priority_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    recommendations TEXT,
    calculated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.skill_gaps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own skill gaps" ON public.skill_gaps;
CREATE POLICY "Users can view their own skill gaps" 
    ON public.skill_gaps FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "Users can manage their own skill gaps" ON public.skill_gaps;
CREATE POLICY "Users can manage their own skill gaps" 
    ON public.skill_gaps FOR ALL 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- ==============================================================================
-- 6. LEARNING PATHS & ROADMAP PROGRESS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.learning_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    domain_id TEXT NOT NULL,
    target_role TEXT NOT NULL,
    completed_milestones TEXT[] DEFAULT ARRAY[]::TEXT[],
    in_progress_milestones TEXT[] DEFAULT ARRAY[]::TEXT[],
    total_milestones INTEGER DEFAULT 10,
    progress_percentage INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(email, domain_id)
);

ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their learning paths" ON public.learning_paths;
CREATE POLICY "Users can view their learning paths" 
    ON public.learning_paths FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "Users can manage their learning paths" ON public.learning_paths;
CREATE POLICY "Users can manage their learning paths" 
    ON public.learning_paths FOR ALL 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- ==============================================================================
-- 7. AI MOCK INTERVIEWS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.mock_interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    domain_id TEXT NOT NULL,
    target_role TEXT NOT NULL,
    difficulty TEXT DEFAULT 'intermediate',
    overall_score INTEGER CHECK (overall_score BETWEEN 0 AND 100),
    strengths TEXT,
    areas_for_improvement TEXT,
    questions_and_answers JSONB,
    conducted_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mock_interviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their mock interviews" ON public.mock_interviews;
CREATE POLICY "Users can view their mock interviews" 
    ON public.mock_interviews FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "Users can insert mock interviews" ON public.mock_interviews;
CREATE POLICY "Users can insert mock interviews" 
    ON public.mock_interviews FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- ==============================================================================
-- 8. USER SETTINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    theme TEXT DEFAULT 'light',
    email_notifications BOOLEAN DEFAULT TRUE,
    weekly_progress_report BOOLEAN DEFAULT TRUE,
    assessment_reminders BOOLEAN DEFAULT TRUE,
    preferences JSONB DEFAULT '{}'::JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their settings" ON public.user_settings;
CREATE POLICY "Users can view their settings" 
    ON public.user_settings FOR SELECT 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "Users can update their settings" ON public.user_settings;
CREATE POLICY "Users can update their settings" 
    ON public.user_settings FOR ALL 
    USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- ==============================================================================
-- 9. SUPABASE STORAGE BUCKET FOR RESUMES
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Authenticated users can upload resumes" ON storage.objects;
CREATE POLICY "Authenticated users can upload resumes" 
    ON storage.objects FOR INSERT 
    TO authenticated 
    WITH CHECK (bucket_id = 'resumes');

DROP POLICY IF EXISTS "Public can view resumes" ON storage.objects;
CREATE POLICY "Public can view resumes" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'resumes');

-- ==============================================================================
-- 10. AUTO-CREATE STUDENT PROFILE ON SIGNUP TRIGGER (OPTIONAL HELPER)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.students (id, email, full_name, target_role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'target_role', 'Select Career Path')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
