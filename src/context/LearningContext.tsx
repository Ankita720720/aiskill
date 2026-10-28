import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LearningCategory,
  ConceptDetail,
  ConceptUserProgress,
  LearningStreakDay,
  CareerTrackGoal,
  CareerGoalId,
} from '../types';
import {
  learningCategories,
  careerTrackGoals,
  initialUserConceptProgress,
  initialLearningStreakDays,
} from '../data/learningData';

interface LearningContextType {
  categories: LearningCategory[];
  careerTracks: CareerTrackGoal[];
  activeCareerGoal: CareerGoalId;
  setActiveCareerGoal: (goalId: CareerGoalId) => void;
  userProgress: Record<string, ConceptUserProgress>;
  updateWatchProgress: (conceptId: string, percentage: number, seconds?: number) => void;
  markWatchCompleted: (conceptId: string) => void;
  submitPracticeAttempt: (conceptId: string, correctCount: number, totalCount: number) => number;
  streakDays: LearningStreakDay[];
  dailyMinutesGoal: number;
  setDailyMinutesGoal: (mins: number) => void;
  todayMinutesLearned: number;
  addStudyMinutes: (mins: number) => void;
  activeConceptId: string | null;
  setActiveConceptId: (id: string | null) => void;
  getConceptById: (id: string) => ConceptDetail | undefined;
  getCategoryById: (id: string) => LearningCategory | undefined;
  getCategoryProgress: (categoryId: string) => number;
  overallLearningScore: number;
  totalConceptsCount: number;
  completedConceptsCount: number;
  totalHoursLearned: number;
  weakConcepts: { concept: ConceptDetail; mastery: number }[];
  recommendedNextConcept: ConceptDetail | null;
  currentlyLearningConcept: ConceptDetail | null;
  calculateBalancedSkillScore: (
    baseSkillScore: number,
    assessmentScore: number,
    challengesScore: number,
    projectsScore: number,
    learningScore: number
  ) => number;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const STORAGE_PROGRESS_KEY = 'skilltwin_learning_progress_v2';
const STORAGE_CAREER_KEY = 'skilltwin_career_goal_v2';
const STORAGE_GOAL_MINS_KEY = 'skilltwin_daily_goal_mins';
const STORAGE_TODAY_MINS_KEY = 'skilltwin_today_mins';

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCareerGoal, setActiveCareerGoalState] = useState<CareerGoalId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CAREER_KEY);
      return (saved as CareerGoalId) || 'ai-ml-engineer';
    } catch {
      return 'ai-ml-engineer';
    }
  });

  const [userProgress, setUserProgress] = useState<Record<string, ConceptUserProgress>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (saved) {
        return { ...initialUserConceptProgress, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return initialUserConceptProgress;
  });

  const [streakDays, setStreakDays] = useState<LearningStreakDay[]>(initialLearningStreakDays);
  const [dailyMinutesGoal, setDailyMinutesGoalState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GOAL_MINS_KEY);
      return saved ? parseInt(saved, 10) : 45;
    } catch {
      return 45;
    }
  });

  const [todayMinutesLearned, setTodayMinutesLearned] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TODAY_MINS_KEY);
      return saved ? parseInt(saved, 10) : 38;
    } catch {
      return 38;
    }
  });

  const [activeConceptId, setActiveConceptId] = useState<string | null>('ml-linear-regression');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(userProgress));
    } catch (e) {
      console.warn('Failed to save learning progress to localStorage', e);
    }
  }, [userProgress]);

  const setActiveCareerGoal = (goalId: CareerGoalId) => {
    setActiveCareerGoalState(goalId);
    try {
      localStorage.setItem(STORAGE_CAREER_KEY, goalId);
    } catch {}
  };

  const setDailyMinutesGoal = (mins: number) => {
    setDailyMinutesGoalState(mins);
    try {
      localStorage.setItem(STORAGE_GOAL_MINS_KEY, mins.toString());
    } catch {}
  };

  const addStudyMinutes = (mins: number) => {
    setTodayMinutesLearned((prev) => {
      const next = prev + mins;
      try {
        localStorage.setItem(STORAGE_TODAY_MINS_KEY, next.toString());
      } catch {}
      return next;
    });
  };

  // Helper to find concept
  const getConceptById = (id: string): ConceptDetail | undefined => {
    for (const cat of learningCategories) {
      const found = cat.concepts.find((c) => c.id === id);
      if (found) return found;
    }
    return undefined;
  };

  const getCategoryById = (id: string): LearningCategory | undefined => {
    return learningCategories.find((c) => c.id === id);
  };

  const updateWatchProgress = (conceptId: string, percentage: number, seconds?: number) => {
    setUserProgress((prev) => {
      const existing = prev[conceptId] || {
        conceptId,
        watchProgressPercentage: 0,
        watchTimeSeconds: 0,
        isWatchCompleted: false,
        practiceScorePercentage: 0,
        practiceAttempted: false,
        practiceCorrectCount: 0,
        practiceTotalCount: 0,
        assessmentScorePercentage: 60,
        masteryScorePercentage: 0,
        isMastered: false,
        lastStudiedAt: 'Just now',
      };

      const newWatchPercent = Math.min(100, Math.max(existing.watchProgressPercentage, Math.round(percentage)));
      const isCompleted = newWatchPercent >= 95;
      const practiceScore = existing.practiceScorePercentage || 0;
      const assessScore = existing.assessmentScorePercentage || 60;
      const mastery = Math.round(newWatchPercent * 0.3 + practiceScore * 0.4 + assessScore * 0.3);

      return {
        ...prev,
        [conceptId]: {
          ...existing,
          watchProgressPercentage: newWatchPercent,
          watchTimeSeconds: seconds ?? existing.watchTimeSeconds,
          isWatchCompleted: isCompleted,
          masteryScorePercentage: mastery,
          isMastered: mastery >= 75,
          lastStudiedAt: 'Just now',
        },
      };
    });
  };

  const markWatchCompleted = (conceptId: string) => {
    updateWatchProgress(conceptId, 100);
    addStudyMinutes(15);
  };

  const submitPracticeAttempt = (conceptId: string, correctCount: number, totalCount: number): number => {
    const practiceScore = Math.round((correctCount / Math.max(1, totalCount)) * 100);

    setUserProgress((prev) => {
      const existing = prev[conceptId] || {
        conceptId,
        watchProgressPercentage: 0,
        watchTimeSeconds: 0,
        isWatchCompleted: false,
        practiceScorePercentage: 0,
        practiceAttempted: false,
        practiceCorrectCount: 0,
        practiceTotalCount: 0,
        assessmentScorePercentage: 65,
        masteryScorePercentage: 0,
        isMastered: false,
        lastStudiedAt: 'Just now',
      };

      const watchPercent = existing.watchProgressPercentage || 0;
      const assessScore = existing.assessmentScorePercentage || 65;
      const mastery = Math.round(watchPercent * 0.3 + practiceScore * 0.4 + assessScore * 0.3);

      return {
        ...prev,
        [conceptId]: {
          ...existing,
          practiceAttempted: true,
          practiceScorePercentage: practiceScore,
          practiceCorrectCount: correctCount,
          practiceTotalCount: totalCount,
          masteryScorePercentage: mastery,
          isMastered: mastery >= 75,
          lastStudiedAt: 'Just now',
        },
      };
    });

    addStudyMinutes(10);
    return practiceScore;
  };

  const getCategoryProgress = (categoryId: string): number => {
    const cat = getCategoryById(categoryId);
    if (!cat || cat.concepts.length === 0) return 0;
    let totalMastery = 0;
    for (const c of cat.concepts) {
      const prog = userProgress[c.id];
      if (prog) {
        totalMastery += prog.masteryScorePercentage;
      }
    }
    return Math.round(totalMastery / cat.concepts.length);
  };

  // Overall aggregates
  const allConcepts = learningCategories.flatMap((c) => c.concepts);
  const totalConceptsCount = allConcepts.length;
  const completedConceptsCount = Object.values(userProgress).filter(
    (p: ConceptUserProgress) => p.isMastered || p.watchProgressPercentage >= 90
  ).length;

  let sumMastery = 0;
  let countWithProgress = 0;
  for (const c of allConcepts) {
    const prog = userProgress[c.id];
    if (prog) {
      sumMastery += prog.masteryScorePercentage;
      countWithProgress++;
    }
  }
  const overallLearningScore = countWithProgress > 0 ? Math.round(sumMastery / countWithProgress) : 58;
  const totalHoursLearned = 18.5 + Math.round((todayMinutesLearned / 60) * 10) / 10;

  // Weak concepts detection (mastery < 60%)
  const weakConcepts = allConcepts
    .map((concept) => {
      const prog = userProgress[concept.id];
      const mastery = prog ? prog.masteryScorePercentage : 45;
      return { concept, mastery };
    })
    .filter((item) => item.mastery < 65)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 4);

  // Currently learning concept
  const currentlyLearningConcept = getConceptById(activeConceptId || 'ml-linear-regression') || allConcepts[0];

  // Recommended next concept
  const recommendedNextConcept =
    getConceptById(currentlyLearningConcept?.nextRecommendedConceptId || '') ||
    weakConcepts[0]?.concept ||
    allConcepts[1];

  // Balanced SkillTwin Score Formula (50% Assessments, 25% Challenges, 15% Projects, 10% Learning Resources)
  const calculateBalancedSkillScore = (
    baseSkillScore: number,
    assessmentScore: number,
    challengesScore: number,
    projectsScore: number,
    learningScore: number
  ): number => {
    const weighted =
      assessmentScore * 0.5 +
      challengesScore * 0.25 +
      projectsScore * 0.15 +
      learningScore * 0.1;
    return Math.round(weighted);
  };

  return (
    <LearningContext.Provider
      value={{
        categories: learningCategories,
        careerTracks: careerTrackGoals,
        activeCareerGoal,
        setActiveCareerGoal,
        userProgress,
        updateWatchProgress,
        markWatchCompleted,
        submitPracticeAttempt,
        streakDays,
        dailyMinutesGoal,
        setDailyMinutesGoal,
        todayMinutesLearned,
        addStudyMinutes,
        activeConceptId,
        setActiveConceptId,
        getConceptById,
        getCategoryById,
        getCategoryProgress,
        overallLearningScore,
        totalConceptsCount,
        completedConceptsCount,
        totalHoursLearned,
        weakConcepts,
        recommendedNextConcept,
        currentlyLearningConcept,
        calculateBalancedSkillScore,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = (): LearningContextType => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
