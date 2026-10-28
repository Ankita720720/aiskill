import React from 'react';
import { Link } from 'react-router-dom';

interface SkillTwinLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  linkTo?: string;
  className?: string;
}

export const SkillTwinLogo: React.FC<SkillTwinLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = false,
  linkTo,
  className = '',
}) => {
  const iconSizeClasses = {
    sm: 'w-8 h-8 rounded-lg text-sm',
    md: 'w-[38px] h-[38px] rounded-[11px] text-[18px]',
    lg: 'w-11 h-11 rounded-xl text-xl',
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-[19px] font-[750] tracking-[-0.4px]',
    lg: 'text-[22px] font-extrabold',
  };

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Gradient Logo Mark matching HTML templates */}
      <div
        className={`${iconSizeClasses[size]} flex items-center justify-center text-white font-extrabold shrink-0 shadow-sm`}
        style={{ background: 'linear-gradient(135deg, #5B2EFF, #00A88F)' }}
      >
        ✦
      </div>

      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center">
          <span
            className={`${titleSizes[size]} ${
              variant === 'dark' ? 'text-white' : 'text-[#0B1F3A]'
            }`}
          >
            Skill<span className="text-[#AFA0FF]">Twin</span> AI
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
            Your AI Career Companion
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};
