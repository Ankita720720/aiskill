import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const problems = [
  {
    title: 'Reverse a String',
    description: 'Write a program that takes a string as input and returns the string reversed.',
    starter: `function reverseString(str) {
    // Write your code here

}

// Example:
// reverseString("hello")
// Expected output: "olleh"`,
  },
  {
    title: 'Find Largest Number',
    description: 'Write a program that takes an array of numbers and returns the largest number in the array.',
    starter: `function findLargest(numbers) {
    // Write your code here

}

// Example:
// findLargest([10, 5, 25, 8])
// Expected output: 25`,
  },
  {
    title: 'Count Vowels',
    description: 'Write a program that takes a string and returns the number of vowels present in the string.',
    starter: `function countVowels(str) {
    // Write your code here

}

// Example:
// countVowels("hello")
// Expected output: 2`,
  },
];

export const CodingTestPage: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [codes, setCodes] = useState<string[]>(problems.map((p) => p.starter));
  const [completed, setCompleted] = useState<boolean[]>([false, false, false]);
  const [outputs, setOutputs] = useState<string[]>(['', '', '']);
  const [language, setLanguage] = useState<string>('javascript');
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
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

  const handleCodeChange = (val: string) => {
    setCodes((prev) => {
      const updated = [...prev];
      updated[current] = val;
      return updated;
    });
  };

  const handleRunCode = () => {
    const code = codes[current];
    if (!code.trim()) {
      setOutputs((prev) => {
        const u = [...prev];
        u[current] = 'Please write some code first.';
        return u;
      });
      return;
    }

    if (language !== 'javascript') {
      setOutputs((prev) => {
        const u = [...prev];
        u[current] = `Code execution for ${language.toUpperCase()} requires a secure backend code runner. Your code has been saved.`;
        return u;
      });
      return;
    }

    try {
      let capturedOutput = '';
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        capturedOutput += args.join(' ') + '\n';
      };

      const fn = new Function(code);
      fn();

      console.log = originalLog;

      const finalOut = capturedOutput.trim() || 'Code executed successfully.\nNo console output was produced.';
      setOutputs((prev) => {
        const u = [...prev];
        u[current] = finalOut;
        return u;
      });

      setCompleted((prev) => {
        const u = [...prev];
        u[current] = true;
        return u;
      });
      showToast('Code executed successfully.');
    } catch (err: any) {
      setOutputs((prev) => {
        const u = [...prev];
        u[current] = 'Error:\n' + err.message;
        return u;
      });
    }
  };

  const handleClearCode = () => {
    if (window.confirm('Are you sure you want to clear the code for this problem?')) {
      handleCodeChange('');
      setOutputs((prev) => {
        const u = [...prev];
        u[current] = 'Run your code to see the output.';
        return u;
      });
    }
  };

  const handleNext = () => {
    if (current < problems.length - 1) {
      setCurrent(current + 1);
    } else {
      showToast('You are on the last problem. Review your answers or submit the test.');
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleSubmit = (autoSubmit = false) => {
    const unanswered = completed.filter((c) => !c).length;
    if (!autoSubmit && unanswered > 0) {
      if (!window.confirm(`${unanswered} problem(s) have not been completed. Do you want to submit anyway?`)) {
        return;
      }
    }
    setFinished(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setCodes(problems.map((p) => p.starter));
    setCompleted([false, false, false]);
    setOutputs(['', '', '']);
    setCurrent(0);
    setSecondsLeft(45 * 60);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const passedCount = completed.filter(Boolean).length;
  const percentage = Math.round((passedCount / problems.length) * 100);
  const usedMinutes = Math.ceil((45 * 60 - secondsLeft) / 60);

  const prob = problems[current];

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
            Coding Test
          </h1>
          <p className="text-xs sm:text-[13px] text-[#64748B]">
            Solve the coding problems and test your programming skills.
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
          <div className="text-[19px] font-bold text-[#0B1F3A]">Coding Challenge</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4.5 shadow-xs">
          <div className="text-xs text-[#64748B] mb-1.5 font-medium">Problems</div>
          <div className="text-[19px] font-bold text-[#0B1F3A]">3</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4.5 shadow-xs">
          <div className="text-xs text-[#64748B] mb-1.5 font-medium">Time Limit</div>
          <div className="text-[19px] font-bold text-[#0B1F3A]">45 Minutes</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4.5 shadow-xs">
          <div className="text-xs text-[#64748B] mb-1.5 font-medium">Difficulty</div>
          <div className="text-[19px] font-bold text-[#0B1F3A]">Beginner</div>
        </div>
      </div>

      {/* ================= TEST CONTAINER ================= */}
      {!finished ? (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 items-start">
          {/* Left: Problem Panel */}
          <div className="bg-white border border-[#E2E8F0] rounded-[14px] p-4.5 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#0B1F3A]">Problems</h3>

            <div className="space-y-2">
              {problems.map((p, idx) => {
                const isActive = idx === current;
                const isDone = completed[idx];

                return (
                  <div
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`p-3.5 rounded-[9px] border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#EDE9FE] border-[#5B2EFF]'
                        : isDone
                        ? 'bg-white border-[#E2E8F0] border-l-4 border-l-[#00A88F]'
                        : 'bg-white border-[#E2E8F0] hover:border-[#5B2EFF]'
                    }`}
                  >
                    <div className="text-[11px] text-[#64748B] mb-1">Problem {idx + 1}</div>
                    <div className="text-[13px] font-bold text-[#0B1F3A]">{p.title}</div>
                    {isDone && (
                      <div className="text-[10px] text-[#00A88F] font-semibold mt-1">✓ Completed</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Code Workspace */}
          <div className="bg-white border border-[#E2E8F0] rounded-[14px] overflow-hidden shadow-xs">
            <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A]">
                Problem {current + 1}: {prob.title}
              </h2>
              <div className="bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] rounded-[8px] px-3 py-2 font-bold text-xs">
                {timeDisplay}
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <div className="text-[#5B2EFF] text-xs font-bold tracking-wider uppercase mb-2">
                  PROBLEM {current + 1} OF {problems.length}
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-3">{prob.title}</h3>
                <div className="bg-[#F3F7FC] p-4 rounded-[9px] text-sm text-[#334155] leading-relaxed">
                  {prob.description}
                </div>
              </div>

              {/* Editor Header */}
              <div className="flex items-center justify-between pt-1">
                <label className="text-xs font-bold text-[#0B1F3A]">Your Code</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border border-[#E2E8F0] rounded-[7px] px-3 py-1.5 text-xs text-[#334155] outline-none bg-white cursor-pointer"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>

              {/* Textarea Code Editor */}
              <textarea
                value={codes[current]}
                onChange={(e) => handleCodeChange(e.target.value)}
                spellCheck="false"
                placeholder="// Write your solution here..."
                className="w-full min-h-[300px] bg-[#0B1F3A] text-[#E2E8F0] rounded-[10px] p-4.5 font-mono text-sm leading-relaxed outline-none resize-y border-none"
              />

              {/* Editor Actions */}
              <div className="flex gap-2.5">
                <button
                  onClick={handleRunCode}
                  className="bg-[#00A88F] hover:bg-[#008F7A] text-white px-4 py-2.5 rounded-[8px] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  ▶ Run Code
                </button>
                <button
                  onClick={handleClearCode}
                  className="border border-[#E2E8F0] bg-white hover:border-[#5B2EFF] text-[#334155] px-4 py-2.5 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* Output Console Box */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[9px] p-4 min-h-[80px]">
                <div className="text-xs text-[#64748B] font-bold mb-2">OUTPUT</div>
                <pre className="font-mono text-xs text-[#334155] whitespace-pre-wrap leading-relaxed">
                  {outputs[current] || 'Run your code to see the output.'}
                </pre>
              </div>

              {/* Navigation */}
              <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex gap-2.5">
                  <button
                    onClick={handlePrevious}
                    disabled={current === 0}
                    className="border border-[#E2E8F0] bg-white hover:border-[#5B2EFF] hover:text-[#5B2EFF] disabled:opacity-40 text-xs font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer"
                  >
                    ← Previous Problem
                  </button>

                  <button
                    onClick={handleNext}
                    className="bg-[#5B2EFF] hover:bg-[#4920DF] text-white text-xs font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer shadow-xs"
                  >
                    {current === problems.length - 1 ? 'Last Problem ✓' : 'Next Problem →'}
                  </button>
                </div>

                <button
                  onClick={() => handleSubmit(false)}
                  className="bg-[#5B2EFF] hover:bg-[#4920DF] text-white text-xs font-bold px-4.5 py-2.5 rounded-[8px] transition-colors cursor-pointer shadow-xs"
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
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">Coding Test Completed!</h2>
            <p className="text-xs text-[#64748B] mt-1">
              {percentage >= 70
                ? 'Good work! Your coding skills are progressing well.'
                : percentage >= 40
                ? 'You completed the assessment. Review the problems you found difficult.'
                : 'Keep practicing and try the assessment again.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3.5">
            <div className="bg-[#F3F7FC] rounded-[10px] p-4 text-center">
              <strong className="block text-xl font-bold text-[#0B1F3A]">{passedCount}</strong>
              <span className="text-xs text-[#64748B]">Problems Completed</span>
            </div>
            <div className="bg-[#F3F7FC] rounded-[10px] p-4 text-center">
              <strong className="block text-xl font-bold text-[#0B1F3A]">{problems.length}</strong>
              <span className="text-xs text-[#64748B]">Total Problems</span>
            </div>
            <div className="bg-[#F3F7FC] rounded-[10px] p-4 text-center">
              <strong className="block text-xl font-bold text-[#0B1F3A]">{usedMinutes} min</strong>
              <span className="text-xs text-[#64748B]">Time Used</span>
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
