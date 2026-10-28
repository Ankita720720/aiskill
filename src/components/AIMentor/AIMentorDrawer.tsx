import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  BrainCircuit,
  Lightbulb,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { UserProfile, ChatMessage } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface AIMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const AIMentorDrawer: React.FC<AIMentorDrawerProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { design } = useTheme();
  const isLight = design.mode === 'light';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      content: `Hello ${user.name.split(' ')[0]}! 👋 I'm your dedicated SkillTwin AI Mentor. I have full context on your digital twin—currently at **74% Career Readiness** with strong mastery in Python (82%) and SQL (61%). How can I help you accelerate your AI Engineer journey today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'How do I bridge my Machine Learning gap (42%)?',
    'What should I study for Deep Learning & PyTorch?',
    'Explain the bias-variance tradeoff simply',
    'How can I raise my placement probability to 90%?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('machine learning') || lower.includes('gap')) {
        botResponse = `Based on your digital twin analysis, your **Machine Learning score is at 42% (Intermediate)**. 
        
To reach a strong level (75%+):
1. **Complete Challenge #3**: *"Build a Linear Regression Model from Scratch"* in NumPy. This reinforces gradient descent math.
2. **Master Regularization**: Focus on Ridge (L2) vs Lasso (L1) loss penalties to fix overfitting tendencies.
3. **Practice XGBoost & Ensemble methods** on imbalanced datasets.
Doing this will boost your overall Readiness Score by **+6%**!`;
      } else if (lower.includes('deep learning') || lower.includes('pytorch')) {
        botResponse = `For Deep Learning (currently 28%):
- Prioritize **PyTorch Tensors & Autograd mechanics**.
- Study **Backpropagation mathematics** and the matrix calculus behind weights updating.
- Build a simple **Convolutional Neural Network (CNN)** for CIFAR-10 before advancing to Transformers attention mechanisms.`;
      } else if (lower.includes('bias-variance') || lower.includes('tradeoff')) {
        botResponse = `**Bias-Variance Tradeoff in a nutshell:**
- **High Bias (Underfitting)**: Model is overly rigid/simple and misses key trends. Fix: Increase model capacity, add polynomial features, reduce regularization.
- **High Variance (Overfitting)**: Model memorizes training noise and fails to generalize to test data. Fix: Add dropout, L1/L2 penalties, collect more data, use Random Forests / Ensembles.`;
      } else if (lower.includes('placement') || lower.includes('probability')) {
        botResponse = `You currently have a **78% High Placement Probability** for Tier-1 AI & Data Science openings!
        
To cross the **90% milestone** within 6-8 weeks:
1. Finish the **SQL for Data Science** milestone on your learning path.
2. Attempt 2 more **AI Mock Interviews** on the Technical & Coding tracks to push your interview evidence score above 80%.
3. Add 1 end-to-end LLM or Computer Vision project to your verified portfolio.`;
      } else {
        botResponse = `Great question, ${user.name.split(' ')[0]}! In the context of your AI Engineer path, focusing on demonstrable project evidence and high code correctness on your active challenges will give you the fastest confidence boost. Would you like me to generate a tailored practice question for you right now?`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`w-full max-w-md border-l shadow-2xl h-full flex flex-col justify-between ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}
        >
          {/* Top Bar */}
          <div className={`p-4 border-b flex items-center justify-between ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-sm font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>SkillTwin AI Mentor</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </h2>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Context: {user.name} ({user.role})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl transition-colors ${
                isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isLight ? 'bg-slate-50/50' : 'bg-slate-900'}`}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs leading-relaxed ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-1 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : isLight
                      ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span className={`block text-[9px] text-right ${
                    msg.sender === 'user' ? 'text-indigo-200' : isLight ? 'text-slate-400' : 'text-slate-400'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-indigo-600 shrink-0 mt-0.5"
                  />
                )}
              </div>
            ))}

            {isTyping && (
              <div className={`flex gap-2 items-center text-xs pl-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                <span className={`text-[11px] ml-1 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>AI Mentor thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts & Input */}
          <div className={`p-4 border-t space-y-3 ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-950/90 border-slate-800'
          }`}>
            {/* Quick Prompt Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(qp)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about your skill gaps, code, or interviews..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`flex-1 rounded-2xl px-3 py-2 text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-600'
                    : 'bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500'
                }`}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
