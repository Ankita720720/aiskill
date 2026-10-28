import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    section: 'Quantitative Aptitude',
    question: 'If a train travels 120 km in 2 hours, what is its average speed?',
    options: ['40 km/h', '50 km/h', '60 km/h', '80 km/h'],
    answer: 2,
  },
  {
    section: 'Quantitative Aptitude',
    question: 'What is 25% of 240?',
    options: ['40', '50', '60', '80'],
    answer: 2,
  },
  {
    section: 'Quantitative Aptitude',
    question: 'A product costs ₹500 and is sold for ₹600. What is the profit percentage?',
    options: ['10%', '15%', '20%', '25%'],
    answer: 2,
  },
  {
    section: 'Logical Reasoning',
    question: 'Find the next number: 2, 4, 8, 16, ?',
    options: ['20', '24', '30', '32'],
    answer: 3,
  },
  {
    section: 'Logical Reasoning',
    question: 'If all roses are flowers and some flowers fade quickly, which statement is definitely true?',
    options: [
      'All roses fade quickly',
      'Some roses fade quickly',
      'All roses are flowers',
      'No roses fade quickly',
    ],
    answer: 2,
  },
  {
    section: 'Logical Reasoning',
    question: 'If CAT is coded as DBU, how is DOG coded?',
    options: ['EPH', 'EOH', 'FPH', 'DPG'],
    answer: 0,
  },
  {
    section: 'Verbal Ability',
    question: "Choose the word closest in meaning to 'Rapid'.",
    options: ['Slow', 'Quick', 'Weak', 'Late'],
    answer: 1,
  },
  {
    section: 'Verbal Ability',
    question: 'Choose the correctly spelled word.',
    options: ['Accomodation', 'Acommodation', 'Accommodation', 'Accommadation'],
    answer: 2,
  },
  {
    section: 'Verbal Ability',
    question: "Choose the opposite of 'Ancient'.",
    options: ['Old', 'Modern', 'Historic', 'Traditional'],
    answer: 1,
  },
  {
    section: 'Quantitative Aptitude',
    question: 'If 5 workers complete a task in 10 days, how many days would 10 workers take, assuming the same work rate?',
    options: ['2 days', '5 days', '10 days', '20 days'],
    answer: 1,
  },
];

export const AptitudeTestPage: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  const [finished, setFinished] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [finished]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSelectOption = (idx: number) => {
    if (finished) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[current] = idx;
      return updated;
    });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      showToast('You are on the last question. Review your answers or submit the test.');
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleSubmit = (autoSubmit = false) => {
    const unanswered = answers.filter((a) => a === -1).length;
    if (!autoSubmit && unanswered > 0) {
      if (!window.confirm(`${unanswered} question(s) are unanswered. Do you want to submit the test anyway?`)) {
        return;
      }
    }
    setFinished(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setAnswers(new Array(questions.length).fill(-1));
    setCurrent(0);
    setSecondsLeft(20 * 60);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Result stats
  let correct = 0;
  questions.forEach((q, idx) => {
    if (answers[idx] === q.answer) correct++;
  });
  const unansweredCount = answers.filter((a) => a === -1).length;
  const wrongCount = questions.length - correct - unansweredCount;
  const percentage = Math.round((correct / questions.length) * 100);

  const q = questions[current];
  const percent = Math.round(((current + 1) / questions.length) * 100);

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto font-sans pb-16 text-[#334155]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[6000] bg-[#0B1F3A] text-white text-xs font-semibold px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] tracking-tight mb-1">
            Aptitude Assessment
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748B]">
            Test your quantitative, logical reasoning and verbal aptitude skills.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to leave the test? Your current progress will not be submitted.')) {
              navigate('/assessments');
            }
          }}
          className="border border-[#E2E8F0] bg-white px-4 py-2.5 rounded-[8px] text-xs font-bold text-[#334155] hover:border-[#5B2EFF] hover:text-[#5B2EFF] transition-colors self-start sm:self-auto cursor-pointer shadow-xs"
        >
          ← Back to Assessments
        </button>
      </div>

      {/* ================= INFO GRID (4 Cards) ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4.5 shadow-xs">
          <div className="text-xs text-[#64748B] mb-1.5 font-medium">Assessment</div>
          <div className="text-[19px] font-bold text-[#0B1F3A]">Aptitude Assessment</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4.5 shadow-xs">
          <div className="text-xs text-[#64748B] mb-1.5 font-medium">Questions</div>
          <div className="text-[19px] font-bold text-[#0B1F3A]">10</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4.5 shadow-xs">
          <div className="text-xs text-[#64748B] mb-1.5 font-medium">Time Limit</div>
          <div className="text-[19px] font-bold text-[#0B1F3A]">20 Minutes</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4.5 shadow-xs">
          <div className="text-xs text-[#64748B] mb-1.5 font-medium">Difficulty</div>
          <div className="text-[19px] font-bold text-[#0B1F3A]">Beginner</div>
        </div>
      </div>

      {/* ================= TEST CONTAINER ================= */}
      {!finished ? (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 items-start">
          {/* Left: Questions List Panel */}
          <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-4.5 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#0B1F3A]">Questions</h3>

            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {questions.map((item, idx) => {
                const isActive = idx === current;
                const isAnswered = answers[idx] !== -1;

                return (
                  <div
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`p-3 rounded-[9px] border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#EDE9FE] border-[#5B2EFF]'
                        : isAnswered
                        ? 'bg-white border-[#E2E8F0] border-l-4 border-l-[#00A88F]'
                        : 'bg-white border-[#E2E8F0] hover:border-[#5B2EFF]'
                    }`}
                  >
                    <div className="text-[11px] text-[#64748B] mb-1">Question {idx + 1}</div>
                    <div className="text-[13px] font-bold text-[#0B1F3A]">{item.section}</div>
                    <div className={`text-[10px] mt-1 font-semibold ${isAnswered ? 'text-[#00A88F]' : 'text-[#94A3B8]'}`}>
                      {isAnswered ? '✓ Answered' : 'Not answered'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Test Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-[14px] overflow-hidden shadow-xs">
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A]">Aptitude Assessment</h2>
              <div className="bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] rounded-[8px] px-3 py-2 font-bold text-xs">
                {timeDisplay}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-[#64748B]">
                <span>Question {current + 1} of {questions.length}</span>
                <span>{percent}%</span>
              </div>
              <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#5B2EFF] rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Question Area */}
            <div className="p-6 sm:p-7 space-y-5">
              <div>
                <span className="inline-block px-3 py-1 bg-[#E6F7F4] text-[#008F7A] rounded-full text-[11px] font-bold mb-3">
                  {q.section}
                </span>
                <div className="text-[#5B2EFF] text-xs font-bold tracking-wider uppercase mb-2">
                  QUESTION {current + 1} OF {questions.length}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] leading-relaxed">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((option, idx) => {
                  const isSelected = answers[current] === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-4 rounded-[10px] border flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#5B2EFF] bg-[#EDE9FE]'
                          : 'border-[#E2E8F0] hover:border-[#5B2EFF] hover:bg-[#FAF9FF]'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question_${current}`}
                        checked={isSelected}
                        onChange={() => handleSelectOption(idx)}
                        className="w-4 h-4 accent-[#5B2EFF] cursor-pointer"
                      />
                      <span className="text-sm text-[#334155] font-medium leading-normal">
                        {option}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex gap-2.5">
                  <button
                    onClick={handlePrevious}
                    disabled={current === 0}
                    className="border border-[#E2E8F0] bg-white hover:border-[#5B2EFF] hover:text-[#5B2EFF] disabled:opacity-40 text-xs font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer"
                  >
                    ← Previous Question
                  </button>

                  <button
                    onClick={handleNext}
                    className="bg-[#5B2EFF] hover:bg-[#4920DF] text-white text-xs font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer shadow-xs"
                  >
                    {current === questions.length - 1 ? 'Last Question ✓' : 'Next Question →'}
                  </button>
                </div>

                <button
                  onClick={() => handleSubmit(false)}
                  className="bg-[#00A88F] hover:bg-[#008F7A] text-white text-xs font-bold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer shadow-xs"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= RESULT SCREEN ================= */
        <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-8 sm:p-10 text-center max-w-xl mx-auto shadow-xs space-y-6 animate-in fade-in-50 duration-200">
          <div className="w-[130px] h-[130px] rounded-full bg-[#EDE9FE] border-8 border-[#5B2EFF] flex flex-col items-center justify-center mx-auto">
            <span className="text-[29px] font-extrabold text-[#5B2EFF] leading-none">
              {percentage}%
            </span>
            <span className="text-[11px] text-[#64748B] mt-1 font-semibold">Score</span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">Aptitude Test Completed!</h2>
            <p className="text-xs text-[#64748B] mt-1">
              {percentage >= 70
                ? 'Good work! Your aptitude performance is progressing well.'
                : percentage >= 40
                ? 'You completed the assessment. Review the areas where you lost marks.'
                : 'Keep practicing and try the aptitude assessment again.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3.5">
            <div className="bg-[#F3F7FC] rounded-[10px] p-4 text-center">
              <strong className="block text-xl font-bold text-[#0B1F3A]">{correct}</strong>
              <span className="text-xs text-[#64748B]">Correct Answers</span>
            </div>
            <div className="bg-[#F3F7FC] rounded-[10px] p-4 text-center">
              <strong className="block text-xl font-bold text-[#0B1F3A]">{wrongCount}</strong>
              <span className="text-xs text-[#64748B]">Wrong Answers</span>
            </div>
            <div className="bg-[#F3F7FC] rounded-[10px] p-4 text-center">
              <strong className="block text-xl font-bold text-[#0B1F3A]">{unansweredCount}</strong>
              <span className="text-xs text-[#64748B]">Unanswered</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="border border-[#E2E8F0] bg-white hover:border-[#5B2EFF] hover:text-[#5B2EFF] px-4 py-2.5 rounded-[8px] text-xs font-semibold cursor-pointer"
            >
              Retake Test
            </button>
            <button
              onClick={() => navigate('/assessments')}
              className="bg-[#5B2EFF] hover:bg-[#4920DF] text-white px-4 py-2.5 rounded-[8px] text-xs font-semibold cursor-pointer shadow-xs"
            >
              ← Back to Assessments
            </button>
            <button
              onClick={() => navigate('/skill-gap')}
              className="bg-[#00A88F] hover:bg-[#008F7A] text-white px-4 py-2.5 rounded-[8px] text-xs font-semibold cursor-pointer shadow-xs"
            >
              View Skill Gap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
