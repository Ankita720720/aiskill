# SkillTwin AI — AI Student Skill Gap Analyzer

Complete frontend web application recreating all 21 pages of the SkillTwin AI platform from the reference design collage.

## Technology Stack

- **React 19** with **TypeScript**
- **Vite**
- **React Router DOM v7**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **Recharts** (data visualization and charts)
- **LocalStorage API** (profile & settings demo persistence)
- **HTML5 Web Audio & MediaDevices API** (Mock Interview voice interaction)

## All 21 Pages & Routes

1. **Page 1: Landing Page** — `/`
   - Marketing homepage with hero banner, product feature breakdown, and four-step student skill twin preview.
2. **Page 2: Login** — `/login`
   - Split-screen sign-in interface with dark navy branding, benefit checklist, and credential validation.
3. **Page 3: Sign Up** — `/signup`
   - Registration flow with career goal selection and student profile generation.
4. **Page 4: Dashboard** — `/dashboard`
   - Primary student dashboard with 68% job readiness banner, 4 stat cards, verified skill profile, and top skill gaps.
5. **Page 5: Profile** — `/profile`
   - Student profile overview (Ankita Chintakindi), 85% completion gauge, personal details, verified technical competencies, and modal editing.
6. **Page 6: Assessments** — `/assessments`
   - Available technical, coding, and aptitude evaluations with domain filtering, performance ring, and AI assessment coach.
7. **Page 7: Assessment Test** — `/assessment-test`
   - Active timed test environment with 10 questions, countdown timer, question navigator, and score calculation.
8. **Page 8: Aptitude Test** — `/aptitude-test`
   - Quantitative and logical aptitude assessment with word problems, options, countdown clock, and submission scoring.
9. **Page 9: Coding Test** — `/coding-test`
   - Algorithm challenges (Reverse String, Array Max, Vowel Count) with syntax-styled code editor, JavaScript/Python selector, and automated test cases.
10. **Page 10: Skill Gap Analysis** — `/skill-gap`
    - Deep diagnostic comparison between current proficiency and target Full Stack Developer requirements.
11. **Page 11: Career Path** — `/career-path`
    - Four-milestone vertical career roadmap with progress tracking, required skills, and alignment metrics.
12. **Page 12: Course Learning** — `/course-learning`
    - Node.js Fundamentals course with 5 chapters, video lesson player with controls, lesson notes, and completion toggles.
13. **Page 13: Learning Resources** — `/learning-resources`
    - Curated Full Stack learning library with category filters, search, recommended HTML & CSS banner, and course cards.
14. **Page 14: Job Vacancies** — `/job-vacancies`
    - Career matching portal with role, location, and salary filtering, match scores (82%-95%), direct apply, and saved jobs.
15. **Page 15: Mock Interview** — `/mock-interview`
    - Voice mock interview simulator with role configuration, microphone voice recording, real-time transcript, and AI evaluation scorecard.
16. **Page 16: Resume Analyzer** — `/resume-analyzer`
    - Drag-and-drop resume upload zone (.pdf, .docx), sample resume loader, and explanation of analysis dimensions.
17. **Page 17: Resume Result** — `/resume-result`
    - 72% overall match report, 4-tier score breakdown, detected technical skill chips, and strengths/improvement suggestions.
18. **Page 18: Projects** — `/projects`
    - Practical project directory based on skill gaps, completion counters, category filters, and difficulty tags.
19. **Page 19: Project Details** — `/project-details`
    - REST API Backend project specification with interactive requirement checkboxes, AI guidance box, and submission input.
20. **Page 20: Analytics & Reports** — `/analytics`
    - Skill growth trajectory bar charts, career readiness donut breakdown, and recent student activity log.
21. **Page 21: Settings** — `/settings`
    - Account preferences, profile information, notification alerts, and password security management.

## Unified Branding & Navigation

- **Consistent Brand Identity**: The unified `SkillTwinLogo` component is rendered identically across all pages.
- **Dark Navy Sidebar (`#0B1933`)**: Fixed on desktop for all 18 dashboard pages with grouped navigation items and purple `#6C35F5` active indicator states.
- **Header**: Standardized breadcrumbs/titles, notification menu, and user avatar dropdown menu with instant profile and sign-out shortcuts.
