/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LearningProvider } from './context/LearningContext';

// Layout
import { CollageDashboardLayout } from './layouts/CollageDashboardLayout';

// 21 Pages
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { AssessmentTestPage } from './pages/AssessmentTestPage';
import { AptitudeTestPage } from './pages/AptitudeTestPage';
import { CodingTestPage } from './pages/CodingTestPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { CareerPathPage } from './pages/CareerPathPage';
import { LearningResourcesPage } from './pages/LearningResourcesPage';
import { JobVacanciesPage } from './pages/JobVacanciesPage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { ResumeResultPage } from './pages/ResumeResultPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { DomainsPage } from './pages/DomainsPage';

// Auxiliary Components
import { AIMentorDrawer } from './components/AIMentor/AIMentorDrawer';
import { defaultStudentProfile, StudentProfile } from './data/collageData';
import { initialUserProfile } from './data/initialData';
import { supabase, supabaseSignOut } from './utils/supabase';
import { fetchStudentProfileFromDb, upsertStudentProfileToDb } from './utils/supabaseBackend';

// Protected Route Wrapper for Authenticated Pages
interface ProtectedLayoutProps {
  isAuthenticated: boolean;
  user: StudentProfile;
  onLogout: () => void;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  isAuthenticated,
  user,
  onLogout,
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    const currentTarget = location.pathname + location.search;
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(currentTarget)}`}
        replace
      />
    );
  }

  return <CollageDashboardLayout user={user} onLogout={onLogout} />;
};

export default function App() {
  // Persisted Student Profile State matching reference collage
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('skilltwin_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return defaultStudentProfile;
  });

  // Track session authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('skilltwin_is_authenticated') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);

  // Sync profile to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('skilltwin_student_profile', JSON.stringify(studentProfile));
    } catch (e) {
      // Storage unavailable or quota exceeded
    }
  }, [studentProfile]);

  // Restore Supabase Auth session & fetch profile from database
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsAuthenticated(true);
        try {
          localStorage.setItem('skilltwin_is_authenticated', 'true');
        } catch {}
        if (session.user.email) {
          fetchStudentProfileFromDb(session.user.email).then((remote) => {
            if (remote) {
              setStudentProfile((prev) => ({ ...prev, ...remote }));
            }
          });
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        try {
          localStorage.setItem('skilltwin_is_authenticated', 'true');
        } catch {}
        if (session.user.email) {
          fetchStudentProfileFromDb(session.user.email).then((remote) => {
            if (remote) {
              setStudentProfile((prev) => ({ ...prev, ...remote }));
            }
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = (u?: StudentProfile) => {
    if (u) {
      setStudentProfile(u);
      upsertStudentProfileToDb(u);
    }
    setIsAuthenticated(true);
    try {
      localStorage.setItem('skilltwin_is_authenticated', 'true');
    } catch (e) {
      // Storage unavailable
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    supabaseSignOut();
    try {
      localStorage.removeItem('skilltwin_is_authenticated');
    } catch (e) {
      // Storage unavailable
    }
  };

  const handleUpdateProfile = (updated: StudentProfile) => {
    setStudentProfile(updated);
    upsertStudentProfileToDb(updated);
  };

  const handleUpdateResume = (fileInfo: { name: string; size: string }) => {
    setStudentProfile((prev) => ({
      ...prev,
      resumeFileName: fileInfo.name,
      resumeSize: fileInfo.size,
      resumeUploadedAt: new Date().toISOString().split('T')[0],
      readinessScore: Math.min(99, prev.readinessScore + 4),
    }));
  };

  // Convert studentProfile to compatibility format for AIMentorDrawer
  const mentorUser = {
    ...initialUserProfile,
    name: studentProfile.name,
    email: studentProfile.email,
    targetRole: studentProfile.targetRole,
    role: studentProfile.role,
    readinessScore: studentProfile.readinessScore,
    education: studentProfile.education,
    college: studentProfile.college,
  };

  return (
    <ThemeProvider>
      <LearningProvider>
        <BrowserRouter>
          <Routes>
            {/* Page 1: Landing Page */}
            <Route
              path="/"
              element={
                <IndexPage
                  isAuthenticated={isAuthenticated}
                  onLogout={handleLogout}
                />
              }
            />

            {/* Page 2: Login */}
            <Route
              path="/login"
              element={
                <LoginPage
                  onLoginSuccess={handleLogin}
                  currentUser={studentProfile}
                />
              }
            />

            {/* Page 3: Sign Up */}
            <Route
              path="/signup"
              element={
                <SignupPage
                  onSignupSuccess={handleLogin}
                  currentUser={studentProfile}
                />
              }
            />

            {/* Protected Dashboard Layout framing all 18 authenticated pages */}
            <Route
              element={
                <ProtectedLayout
                  isAuthenticated={isAuthenticated}
                  user={studentProfile}
                  onLogout={handleLogout}
                />
              }
            >
              {/* Page 4: Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <DashboardPage
                    user={studentProfile}
                    onOpenAIMentor={() => setIsAIMentorOpen(true)}
                  />
                }
              />

              {/* Multi-Domain Selection Page */}
              <Route
                path="/domains"
                element={
                  <DomainsPage
                    user={studentProfile}
                    onUpdateProfile={handleUpdateProfile}
                  />
                }
              />

              {/* Page 5: Profile */}
              <Route
                path="/profile"
                element={
                  <ProfilePage
                    user={studentProfile}
                    onUpdateUser={handleUpdateProfile}
                  />
                }
              />

              {/* Page 6: Assessments */}
              <Route path="/assessments" element={<AssessmentsPage />} />

              {/* Page 7: Assessment Test */}
              <Route path="/assessment-test" element={<AssessmentTestPage />} />

              {/* Page 8: Aptitude Test */}
              <Route path="/aptitude-test" element={<AptitudeTestPage />} />

              {/* Page 9: Coding Test */}
              <Route path="/coding-test" element={<CodingTestPage />} />

              {/* Page 10: Skill Gap Analysis */}
              <Route
                path="/skill-gap"
                element={<SkillGapPage user={studentProfile} />}
              />

              {/* Page 11: Career Path */}
              <Route
                path="/career-path"
                element={<CareerPathPage user={studentProfile} />}
              />

              {/* Redirect /course-learning to /learning-resources */}
              <Route
                path="/course-learning"
                element={<Navigate to="/learning-resources" replace />}
              />

              {/* Page 12: Learning Resources */}
              <Route path="/learning-resources" element={<LearningResourcesPage />} />

              {/* Page 14: Job Vacancies */}
              <Route
                path="/job-vacancies"
                element={<JobVacanciesPage user={studentProfile} />}
              />

              {/* Page 15: Mock Interview */}
              <Route
                path="/mock-interview"
                element={<MockInterviewPage user={studentProfile} />}
              />

              {/* Page 16: Resume Analyzer */}
              <Route
                path="/resume-analyzer"
                element={
                  <ResumeAnalyzerPage
                    user={studentProfile}
                    onUpdateResume={handleUpdateResume}
                  />
                }
              />

              {/* Page 17: Resume Result */}
              <Route
                path="/resume-result"
                element={<ResumeResultPage user={studentProfile} />}
              />

              {/* Page 18: Projects */}
              <Route
                path="/projects"
                element={<ProjectsPage user={studentProfile} />}
              />

              {/* Page 19: Project Details */}
              <Route path="/project-details" element={<ProjectDetailsPage />} />

              {/* Page 20: Analytics */}
              <Route
                path="/analytics"
                element={<AnalyticsPage user={studentProfile} />}
              />

              {/* Page 21: Settings */}
              <Route
                path="/settings"
                element={
                  <SettingsPage
                    user={studentProfile}
                    onUpdateUser={handleUpdateProfile}
                  />
                }
              />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* AI Mentor Interactive Chat Drawer */}
          <AIMentorDrawer
            isOpen={isAIMentorOpen}
            onClose={() => setIsAIMentorOpen(false)}
            user={mentorUser}
          />
        </BrowserRouter>
      </LearningProvider>
    </ThemeProvider>
  );
}
