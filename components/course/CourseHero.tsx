import React from 'react';
import { motion } from 'motion/react';
import { Clock, GraduationCap, Coins, CheckCircle2, ArrowLeftRight, Bookmark, Share2, Award } from 'lucide-react';
import type { HeroSection } from '@/types/Course';

interface Props {
  hero: HeroSection;
  category: string;
  categoryEmoji?: string;
}

export default function CourseHero({ hero, category, categoryEmoji }: Props) {
  const diffStyles = {
    Easy: { text: 'text-brand-success', bg: 'bg-brand-success/10', border: 'border-brand-success/25', glow: 'shadow-brand-success/10' },
    Moderate: { text: 'text-brand-warning', bg: 'bg-brand-warning/10', border: 'border-brand-warning/25', glow: 'shadow-brand-warning/10' },
    Hard: { text: 'text-brand-error', bg: 'bg-brand-error/10', border: 'border-brand-error/25', glow: 'shadow-brand-error/10' },
    'Very Hard': { text: 'text-brand-error', bg: 'bg-brand-error/10', border: 'border-brand-error/25', glow: 'shadow-brand-error/10' }
  };
  const diffStyle = diffStyles[hero.difficulty] || diffStyles.Moderate;

  return (
    <section id="hero-section" className="relative p-8 sm:p-12 md:p-16 overflow-hidden rounded-2xl mb-16 bg-bg-card border border-border-primary shadow-2xl shadow-black/25 w-full">
      {/* Premium Background ambient glow gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-30%] left-[-20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-brand-accent/5 to-brand-success/5 blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Hero Title & Subtitle */}
        <div className="space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display leading-[1.05] pb-2"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl font-medium"
          >
            {hero.subtitle}
          </motion.p>
        </div>

        {/* Overview Section Header */}
        <div className="space-y-2 pt-6">
          <div className="inline-block">
            <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight pb-1.5">Overview</h2>
            <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
          </div>
          <p className="text-xs sm:text-sm text-slate-400">Key highlights about this career path to help you quickly understand the basics.</p>
        </div>

        {/* Elegant bento grid metadata list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 pt-2 w-full items-stretch"
        >
          <OverviewCard 
            icon={<Clock className="w-8 h-8" />} 
            label="Duration" 
            value={parseDuration(hero.duration).value} 
            supporting={parseDuration(hero.duration).supporting}
            accentClass="bg-[#F97316]"
            iconColorClass="text-[#F97316]"
            gridClass="sm:col-span-2 lg:col-span-2"
          />
          <OverviewCard 
            icon={<GraduationCap className="w-8 h-8" />} 
            label="Degree" 
            value={hero.degree} 
            supporting={getDegreeSupporting(hero.degree)}
            accentClass="bg-[#F97316]"
            iconColorClass="text-[#F97316]"
            gridClass="sm:col-span-2 lg:col-span-2"
          />
          <OverviewCard 
            icon={<CheckCircle2 className="w-8 h-8" />} 
            label="Eligibility" 
            value={renderEligibilityValue(hero.eligibility).main} 
            supporting={renderEligibilityValue(hero.eligibility).supporting}
            accentClass="bg-[#22C55E]"
            iconColorClass="text-[#22C55E]"
            gridClass="sm:col-span-2 lg:col-span-2"
          />
          <OverviewCard 
            icon={<Coins className="w-8 h-8" />} 
            label="Salary (Avg)" 
            value={parseSalary(hero.avgSalary).range} 
            supporting={parseSalary(hero.avgSalary).period}
            accentClass="bg-[#F97316]"
            iconColorClass="text-[#F97316]"
            gridClass="sm:col-span-2 lg:col-span-3"
          />
          <OverviewCard 
            icon={<Award className="w-8 h-8" />} 
            label="Difficulty" 
            value={hero.difficulty} 
            supporting={renderDifficultyDots(hero.difficulty)}
            accentClass="bg-[#EF4444]"
            iconColorClass="text-[#EF4444]"
            gridClass="sm:col-span-4 lg:col-span-3"
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6"
        >
          <button className="h-14 px-8 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5">
            <ArrowLeftRight className="w-4.5 h-4.5" />
            <span>Compare Course</span>
          </button>
          
          <button className="h-14 px-6 rounded-xl bg-bg-btnSec border border-border-primary hover:bg-[#252525] hover:-translate-y-0.5 active:translate-y-0 text-slate-300 hover:text-white text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2.5">
            <Bookmark className="w-4.5 h-4.5" />
            <span>Bookmark</span>
          </button>

          <button className="h-14 px-6 rounded-xl bg-bg-btnSec border border-border-primary hover:bg-[#252525] hover:-translate-y-0.5 active:translate-y-0 text-slate-300 hover:text-white text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2.5">
            <Share2 className="w-4.5 h-4.5" />
            <span>Share</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// Helpers for clean metadata card structure
const parseDuration = (text: string) => {
  const match = text.match(/^([^(]+)(?:\(([^)]+)\))?/);
  const value = match ? match[1].trim() : text;
  const supporting = match && match[2] ? match[2].trim() : '';
  const capitalizedSupporting = supporting ? supporting.charAt(0).toUpperCase() + supporting.slice(1) : '';
  return { value, supporting: capitalizedSupporting };
};

const getDegreeSupporting = (degree: string) => {
  const deg = degree.toUpperCase();
  if (deg.includes('B.TECH')) return 'Engineering degree';
  if (deg.includes('BSC')) return 'Science degree';
  if (deg.includes('B.PHARM') || deg.includes('BPHARM')) return 'Pharmacy degree';
  if (deg.includes('BAMS') || deg.includes('BHMS') || deg.includes('MBBS')) return 'Medical degree';
  return 'Undergraduate degree';
};

const parseSalary = (text: string) => {
  const parts = text.split('/');
  const range = parts[0]?.trim() || '';
  const period = parts[1] ? (parts[1].trim() === 'yr' ? 'per year' : parts[1].trim()) : 'per year';
  return { range, period };
};

const renderDifficultyDots = (difficulty: string) => {
  const levels: Record<string, number> = {
    Easy: 1,
    Moderate: 3,
    Hard: 4,
    'Very Hard': 5
  };
  const activeCount = levels[difficulty] || 3;
  return (
    <div className="flex gap-1.5 mt-2.5">
      {[1, 2, 3, 4, 5].map((dot) => (
        <span 
          key={dot} 
          className={`text-lg leading-none ${dot <= activeCount ? 'text-[#EF4444]' : 'text-[#333333]'}`}
        >
          ●
        </span>
      ))}
    </div>
  );
};

const renderEligibilityValue = (text: string) => {
  const parts = text.split(/[,+]/).map(p => p.trim()).filter(Boolean);
  
  const highlight = (str: string) => {
    const highlighted = str.replace(
      /(PCB\/PCM|PCB|PCM|PCMB|NEET UG|NEET|VITEEE|MET|State CET|\d+%\+|\d+%|aggregate)/ig,
      (match) => `<span class="text-[#F97316] font-bold">${match}</span>`
    );
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  const main = parts[0] || '';
  const supporting = parts.slice(1);

  return {
    main: highlight(main),
    supporting: (
      <div className="space-y-1 mt-1 font-sans">
        {supporting.map((sup, sIdx) => (
          <div key={sIdx} className="text-xs font-semibold text-slate-400">
            {highlight(sup)}
          </div>
        ))}
      </div>
    )
  };
};

interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  supporting?: string | React.ReactNode;
  accentClass: string;
  iconColorClass: string;
  gridClass: string;
}

function OverviewCard({ icon, label, value, supporting, accentClass, iconColorClass, gridClass }: CardProps) {
  return (
    <div className={`relative bg-[#181818] border border-[#2A2A2A] rounded-[18px] p-[28px] shadow-md shadow-black/10 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-slate-700 hover:shadow-lg hover:shadow-black/20 flex flex-col justify-between h-full overflow-hidden group ${gridClass}`}>
      <div className="space-y-5">
        {/* Icon soft rounded container */}
        <div className="w-[72px] h-[72px] rounded-xl bg-[#111111] border border-white/5 flex items-center justify-center shrink-0">
          <div className={`${iconColorClass}`}>
            {icon}
          </div>
        </div>

        {/* Info hierarchy */}
        <div className="space-y-2">
          <span className="text-[13px] font-mono text-[#A3A3A3] uppercase tracking-wider block font-bold leading-none">
            {label}
          </span>
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
            {value}
          </h3>
          {supporting && (
            <div className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed pt-1.5">
              {supporting}
            </div>
          )}
        </div>
      </div>

      {/* 3px Accent Line at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${accentClass}`} />
    </div>
  );
}
