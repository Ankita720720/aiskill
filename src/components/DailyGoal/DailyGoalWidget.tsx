import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit3,
  History,
  Calendar,
  Sparkles,
  ChevronRight,
  Flame,
  Award,
  ArrowRight,
  Check,
  Clock,
  BookOpen,
  Filter,
  X,
  RotateCcw,
} from 'lucide-react';
import { DailyGoal, CompletedGoalHistoryItem, DailyGoalSubtask } from '../../types';
import { initialDailyGoal, initialCompletedGoalsHistory } from '../../data/initialData';
import { useTheme } from '../../context/ThemeContext';

interface DailyGoalWidgetProps {
  onGoalCompletedBonus?: (bonusPoints: number) => void;
}

export const DailyGoalWidget: React.FC<DailyGoalWidgetProps> = ({ onGoalCompletedBonus }) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  // Active view: 'active' (today's goal) vs 'history' (completed goals log)
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  // Goals State
  const [currentGoal, setCurrentGoal] = useState<DailyGoal | null>(initialDailyGoal);
  const [history, setHistory] = useState<CompletedGoalHistoryItem[]>(initialCompletedGoalsHistory);

  // Edit / Set Goal Modal or Inline Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(currentGoal?.title || '');
  const [editCategory, setEditCategory] = useState(currentGoal?.targetCategory || 'AI & Deep Learning');
  const [editSubtasks, setEditSubtasks] = useState<string[]>(
    currentGoal?.subtasks.map((s) => s.title) || [
      'Revise backpropagation calculus',
      'Implement custom Autograd function',
      'Submit NumPy challenge',
    ]
  );
  const [newSubtaskInput, setNewSubtaskInput] = useState('');

  // Celebration state when 100% is reached or completed
  const [showCelebration, setShowCelebration] = useState(false);

  // History search filter
  const [historySearch, setHistorySearch] = useState('');
  const [selectedHistoryCategory, setSelectedHistoryCategory] = useState<string>('All');

  // Quick preset goal suggestions
  const presetSuggestions = [
    {
      title: 'Complete PyTorch Autograd & Backprop Math',
      category: 'Deep Learning',
      tasks: ['Read Chapter 3 on Matrix Calculus', 'Implement autograd in Python', 'Pass 10-question quiz'],
    },
    {
      title: 'Solve 2 Advanced PostgreSQL Query Challenges',
      category: 'SQL & Database',
      tasks: ['Practice Window Functions (RANK/DENSE_RANK)', 'Optimize indexed subqueries'],
    },
    {
      title: 'Simulate 1 AI Technical Mock Interview',
      category: 'Interview Prep',
      tasks: ['Answer 5 ML theory questions', 'Review AI speech clarity score'],
    },
    {
      title: 'Review System Design Blueprint for LLM Apps',
      category: 'System Design',
      tasks: ['Study RAG caching architecture', 'Explore Vector DB similarity search'],
    },
  ];

  // Toggle Subtask Completion
  const handleToggleSubtask = (subtaskId: string) => {
    if (!currentGoal) return;

    const updatedSubtasks = currentGoal.subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    const completedCount = updatedSubtasks.filter((st) => st.completed).length;
    const totalCount = updatedSubtasks.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const isNowAllDone = totalCount > 0 && completedCount === totalCount;

    setCurrentGoal({
      ...currentGoal,
      subtasks: updatedSubtasks,
      progressPercentage: percentage,
      isCompleted: isNowAllDone,
    });

    if (isNowAllDone && !currentGoal.isCompleted) {
      triggerGoalCompletedCelebration({
        ...currentGoal,
        subtasks: updatedSubtasks,
        progressPercentage: 100,
        isCompleted: true,
      });
    }
  };

  // Directly complete goal
  const handleCompleteCurrentGoal = () => {
    if (!currentGoal) return;
    const updatedSubtasks = currentGoal.subtasks.map((st) => ({ ...st, completed: true }));
    const finishedGoal: DailyGoal = {
      ...currentGoal,
      subtasks: updatedSubtasks,
      progressPercentage: 100,
      isCompleted: true,
      completedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setCurrentGoal(finishedGoal);
    triggerGoalCompletedCelebration(finishedGoal);
  };

  const triggerGoalCompletedCelebration = (goal: DailyGoal) => {
    setShowCelebration(true);
    if (onGoalCompletedBonus) {
      onGoalCompletedBonus(150);
    }

    // Add to history log
    const historyItem: CompletedGoalHistoryItem = {
      id: `hist-${Date.now()}`,
      title: goal.title,
      category: goal.targetCategory,
      completedDate: 'Today (' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ')',
      scoreEarned: 150,
      tasksCompleted: goal.subtasks.length || 1,
      totalTasks: goal.subtasks.length || 1,
    };

    setHistory((prev) => [historyItem, ...prev]);

    setTimeout(() => {
      setShowCelebration(false);
    }, 4000);
  };

  // Save new or edited goal
  const handleSaveGoal = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editTitle.trim()) return;

    const formattedSubtasks: DailyGoalSubtask[] = editSubtasks
      .filter((t) => t.trim().length > 0)
      .map((t, idx) => ({
        id: `sub-${Date.now()}-${idx}`,
        title: t.trim(),
        completed: false,
      }));

    // Fallback if no subtasks
    if (formattedSubtasks.length === 0) {
      formattedSubtasks.push({
        id: `sub-${Date.now()}-0`,
        title: editTitle.trim(),
        completed: false,
      });
    }

    const newGoal: DailyGoal = {
      id: `goal-${Date.now()}`,
      title: editTitle.trim(),
      targetCategory: editCategory,
      progressPercentage: 0,
      subtasks: formattedSubtasks,
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: 'Today, 11:59 PM',
      isCompleted: false,
    };

    setCurrentGoal(newGoal);
    setIsEditing(false);
    setActiveTab('active');
  };

  const handleApplyPreset = (preset: typeof presetSuggestions[0]) => {
    setEditTitle(preset.title);
    setEditCategory(preset.category);
    setEditSubtasks(preset.tasks);
  };

  const handleAddEditSubtask = () => {
    if (!newSubtaskInput.trim()) return;
    setEditSubtasks((prev) => [...prev, newSubtaskInput.trim()]);
    setNewSubtaskInput('');
  };

  const handleRemoveEditSubtask = (index: number) => {
    setEditSubtasks((prev) => prev.filter((_, i) => i !== index));
  };

  // Filter history
  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(historySearch.toLowerCase()) ||
      item.category.toLowerCase().includes(historySearch.toLowerCase());
    const matchesCategory = selectedHistoryCategory === 'All' || item.category === selectedHistoryCategory;
    return matchesSearch && matchesCategory;
  });

  const categoriesInHistory = ['All', ...Array.from(new Set(history.map((h) => h.category)))];

  return (
    <div
      id="daily-goal-sidebar-widget"
      className={`rounded-2xl border transition-all shadow-2xs overflow-hidden ${
        isLight
          ? 'bg-white border-slate-200/90'
          : 'bg-slate-900/80 border-slate-800'
      }`}
    >
      {/* Widget Header with Tab Selector (Goal vs History) */}
      <div
        className={`px-3 py-2 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50/80 border-slate-100' : 'bg-slate-950/60 border-slate-800/80'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
            <Target className="w-3 h-3 text-indigo-600" />
          </div>
          <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Daily Goal
          </span>
        </div>

        {/* View Switcher Tabs: Today's Goal vs History */}
        <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800 p-0.5 rounded-lg">
          <button
            onClick={() => {
              setActiveTab('active');
              setIsEditing(false);
            }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
              activeTab === 'active' && !isEditing
                ? 'bg-indigo-600 text-white shadow-2xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => {
              setActiveTab('history');
              setIsEditing(false);
            }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-2.5 h-2.5" />
            <span>History ({history.length})</span>
          </button>
        </div>
      </div>

      {/* Celebration Notification Banner */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-2 text-[11px] font-bold flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-bounce" />
              <span>Goal Completed! +150 XP &amp; Streak Maintained!</span>
            </div>
            <Award className="w-4 h-4 text-amber-200" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEW 1: ACTIVE DAILY GOAL */}
      {activeTab === 'active' && !isEditing && (
        <div className="p-3 space-y-2.5">
          {currentGoal ? (
            <>
              {/* Goal Title & Category Header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {currentGoal.targetCategory}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{currentGoal.dueDate}</span>
                  </div>
                </div>

                <h4
                  className={`text-xs font-bold leading-tight ${
                    isLight ? 'text-slate-900' : 'text-slate-100'
                  }`}
                >
                  {currentGoal.title}
                </h4>
              </div>

              {/* Progress Percentage Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Progress
                  </span>
                  <span
                    className={`font-black ${
                      currentGoal.progressPercentage === 100
                        ? 'text-emerald-600'
                        : currentGoal.progressPercentage > 50
                        ? 'text-indigo-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {currentGoal.progressPercentage}%
                  </span>
                </div>

                <div
                  className={`w-full h-2 rounded-full overflow-hidden ${
                    isLight ? 'bg-slate-100' : 'bg-slate-800'
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentGoal.progressPercentage}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      currentGoal.progressPercentage === 100
                        ? 'bg-emerald-500'
                        : 'bg-gradient-to-r from-indigo-500 to-cyan-500'
                    }`}
                  />
                </div>
              </div>

              {/* Subtasks Checklist */}
              <div className="space-y-1.5 pt-0.5">
                <p className={`text-[10px] font-bold uppercase ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                  Target Milestones ({currentGoal.subtasks.filter((s) => s.completed).length}/
                  {currentGoal.subtasks.length})
                </p>

                <div className="space-y-1 max-h-36 overflow-y-auto pr-0.5 scrollbar-thin">
                  {currentGoal.subtasks.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleToggleSubtask(st.id)}
                      className={`w-full flex items-start gap-2 p-1.5 rounded-lg text-left transition-all border ${
                        st.completed
                          ? isLight
                            ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-900'
                            : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                          : isLight
                          ? 'bg-slate-50/70 border-slate-200/60 hover:bg-slate-100 text-slate-700'
                          : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {st.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                      <span
                        className={`text-[11px] leading-snug flex-1 ${
                          st.completed ? 'line-through opacity-75 font-normal' : 'font-medium'
                        }`}
                      >
                        {st.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Set New / Edit or Complete */}
              <div className={`pt-2 border-t flex items-center justify-between gap-1.5 ${
                isLight ? 'border-slate-100' : 'border-slate-800/80'
              }`}>
                <button
                  onClick={() => {
                    setEditTitle(currentGoal.title);
                    setEditCategory(currentGoal.targetCategory);
                    setEditSubtasks(currentGoal.subtasks.map((s) => s.title));
                    setIsEditing(true);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Edit3 className="w-2.5 h-2.5" />
                  <span>Edit Goal</span>
                </button>

                {currentGoal.progressPercentage < 100 ? (
                  <button
                    onClick={handleCompleteCurrentGoal}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs transition-all"
                  >
                    <Check className="w-3 h-3" />
                    <span>Mark Done</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditTitle('');
                      setEditCategory('AI Engineer');
                      setEditSubtasks(['']);
                      setIsEditing(true);
                    }}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Set Next Goal</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Prompt to set today's goal if none exists */
            <div className="text-center py-3 space-y-2">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto">
                <Target className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  No Goal Set For Today
                </p>
                <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Setting a daily objective improves career readiness speed by 2.4x.
                </p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Set Today&apos;s Learning Objective</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: SET OR EDIT GOAL FORM */}
      {isEditing && (
        <form onSubmit={handleSaveGoal} className="p-3 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold flex items-center gap-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Define Today&apos;s Goal</span>
            </span>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Presets Carousel */}
          <div className="space-y-1">
            <span className={`text-[9px] font-bold uppercase ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
              Quick AI Presets:
            </span>
            <div className="space-y-1">
              {presetSuggestions.slice(0, 2).map((ps, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(ps)}
                  className={`w-full text-left p-1.5 rounded-lg text-[10px] border font-medium flex items-center justify-between transition-colors ${
                    isLight
                      ? 'bg-slate-50 hover:bg-indigo-50 border-slate-200/80 hover:border-indigo-200 text-slate-700'
                      : 'bg-slate-950 border-slate-800 hover:border-indigo-700 text-slate-300'
                  }`}
                >
                  <span className="truncate pr-1">{ps.title}</span>
                  <span className="text-[9px] font-bold text-indigo-600 shrink-0">+ Use</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-1">
            <label className={`block text-[10px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Learning Objective
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="e.g. Master PyTorch CNNs & build classifier"
              className={`w-full rounded-xl px-2.5 py-1.5 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-600'
                  : 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus:border-indigo-500'
              }`}
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1">
            <label className={`block text-[10px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Category
            </label>
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className={`w-full rounded-xl px-2 py-1.5 text-xs border focus:outline-none ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-slate-950 border-slate-800 text-slate-200'
              }`}
            >
              <option value="Deep Learning">Deep Learning & PyTorch</option>
              <option value="Machine Learning">Machine Learning Algorithms</option>
              <option value="Python 3.11">Python 3.11 Mastery</option>
              <option value="SQL & Database">SQL & Databases</option>
              <option value="System Design">System Design & MLOps</option>
              <option value="Interview Prep">Interview Preparation</option>
            </select>
          </div>

          {/* Subtasks List & Addition */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className={`text-[10px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Checklist Milestones
              </label>
              <span className="text-[9px] text-slate-400">({editSubtasks.length} tasks)</span>
            </div>

            <div className="space-y-1 max-h-28 overflow-y-auto scrollbar-thin pr-0.5">
              {editSubtasks.map((st, i) => (
                <div key={i} className="flex items-center gap-1 text-[11px]">
                  <input
                    type="text"
                    value={st}
                    onChange={(e) => {
                      const updated = [...editSubtasks];
                      updated[i] = e.target.value;
                      setEditSubtasks(updated);
                    }}
                    className={`flex-1 rounded-lg px-2 py-1 text-[10px] border ${
                      isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}
                  />
                  {editSubtasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEditSubtask(i)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add new subtask input */}
            <div className="flex items-center gap-1 pt-1">
              <input
                type="text"
                placeholder="Add subtask..."
                value={newSubtaskInput}
                onChange={(e) => setNewSubtaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddEditSubtask();
                  }
                }}
                className={`flex-1 rounded-lg px-2 py-1 text-[10px] border ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}
              />
              <button
                type="button"
                onClick={handleAddEditSubtask}
                className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-[10px] font-bold"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-2.5 py-1 text-[10px] font-bold rounded-lg text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold rounded-lg shadow-2xs"
            >
              Save Goal
            </button>
          </div>
        </form>
      )}

      {/* VIEW 3: COMPLETED GOALS HISTORY VIEW */}
      {activeTab === 'history' && !isEditing && (
        <div className="p-3 space-y-2.5">
          {/* History Header & Summary */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Completed Goals Log
              </h4>
              <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {history.length} objectives achieved
              </p>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>7 Day Streak</span>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="space-y-1.5">
            <input
              type="text"
              placeholder="Search past goals..."
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              className={`w-full rounded-xl px-2.5 py-1 text-[10px] border focus:outline-none ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  : 'bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-600'
              }`}
            />

            {/* Quick Category Filter Pills */}
            <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
              {categoriesInHistory.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedHistoryCategory(cat)}
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap transition-colors border ${
                    selectedHistoryCategory === cat
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : isLight
                      ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Previously Completed Goals with Dates */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin pr-0.5">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className={`p-2 rounded-xl border transition-all space-y-1 ${
                    isLight
                      ? 'bg-slate-50/90 border-slate-200/80 hover:bg-slate-100/80'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="space-y-0.5 min-w-0">
                      <span className="inline-block text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {item.category}
                      </span>
                      <h5
                        className={`text-[11px] font-bold leading-snug line-clamp-2 ${
                          isLight ? 'text-slate-800' : 'text-slate-200'
                        }`}
                      >
                        {item.title}
                      </h5>
                    </div>
                    <span className="shrink-0 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full p-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  </div>

                  {/* Completion Date & Stats Footer */}
                  <div className={`flex items-center justify-between text-[9px] pt-1 border-t ${
                    isLight ? 'border-slate-200/60 text-slate-500' : 'border-slate-800/60 text-slate-400'
                  }`}>
                    <div className="flex items-center gap-1 font-medium">
                      <Calendar className="w-2.5 h-2.5 text-indigo-500" />
                      <span>{item.completedDate}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-700 font-bold">100% Done</span>
                      <span className="font-bold text-indigo-600">+{item.scoreEarned} XP</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-slate-400 text-[11px]">
                No completed goals match this filter.
              </div>
            )}
          </div>

          {/* Back to Active Goal Button */}
          <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('active')}
              className={`w-full py-1.5 rounded-xl text-[10px] font-bold border transition-colors flex items-center justify-center gap-1 ${
                isLight
                  ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <RotateCcw className="w-3 h-3 text-indigo-500" />
              <span>Return to Today&apos;s Goal</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
