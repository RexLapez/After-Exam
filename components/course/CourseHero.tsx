import React from 'react';
import { motion } from 'motion/react';
import { Clock, GraduationCap, Coins, CheckCircle2, ArrowLeftRight, Bookmark, Share2, Award } from 'lucide-react';
import type { HeroSection } from '@/types/Course';

interface Props {
  hero: HeroSection;
  category: string;
  categoryEmoji?: string;
}

const difficultyColor: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  Easy: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', glow: 'shadow-emerald-500/10' },
  Moderate: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/25', glow: 'shadow-amber-500/10' },
  Hard: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25', glow: 'shadow-orange-500/10' },
  'Very Hard': { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/25', glow: 'shadow-rose-500/10' },
};

export default function CourseHero({ hero, category, categoryEmoji }: Props) {
  const diffStyle = difficultyColor[hero.difficulty] || { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', glow: 'shadow-slate-500/10' };

  return (
    <section id="hero-section" className="relative p-8 sm:p-12 md:p-16 overflow-hidden rounded-[2.5rem] mb-16 bg-gradient-to-b from-[#0b0c15] via-[#07080f] to-[#04050d] border border-white/[0.04] shadow-2xl shadow-violet-900/5 w-full">
      {/* Premium Background ambient glow gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-30%] left-[-20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-600/15 to-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-cyan-600/10 to-emerald-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* Category tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-black uppercase tracking-widest font-display shadow-[0_0_15px_rgba(139,92,246,0.05)]">
            <span className="text-sm shrink-0 leading-none">{categoryEmoji}</span>
            <span>{category}</span>
          </span>
        </motion.div>

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

        {/* Elegant metadata list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 pt-4"
        >
          <HeroBadge icon={<Clock className="w-5 h-5 text-blue-400" />} label="Duration" value={hero.duration} />
          <HeroBadge icon={<GraduationCap className="w-5 h-5 text-violet-400" />} label="Degree" value={hero.degree} />
          <HeroBadge icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />} label="Eligibility" value={hero.eligibility} />
          <HeroBadge icon={<Coins className="w-5 h-5 text-cyan-400" />} label="Salary (Avg)" value={hero.avgSalary} />
          <HeroBadge 
            icon={<Award className={`w-5 h-5 ${diffStyle.text}`} />} 
            label="Difficulty" 
            value={hero.difficulty} 
            customClass={`${diffStyle.bg} ${diffStyle.border} ${diffStyle.glow} col-span-2 sm:col-span-1`}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6"
        >
          <button className="h-14 px-8 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-bold shadow-lg shadow-violet-500/10 hover:shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5">
            <ArrowLeftRight className="w-4.5 h-4.5" />
            <span>Compare Course</span>
          </button>
          
          <button className="h-14 px-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-0.5 active:translate-y-0 text-slate-300 hover:text-white text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2.5">
            <Bookmark className="w-4.5 h-4.5" />
            <span>Bookmark</span>
          </button>

          <button className="h-14 px-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-0.5 active:translate-y-0 text-slate-300 hover:text-white text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2.5">
            <Share2 className="w-4.5 h-4.5" />
            <span>Share</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  customClass?: string;
}

function HeroBadge({ icon, label, value, customClass }: BadgeProps) {
  return (
    <div className={`flex items-center gap-3.5 px-5 py-4 rounded-2xl border ${customClass || 'border-white/[0.03] bg-white/[0.015]'} text-xs font-semibold hover:bg-white/[0.03] hover:border-white/10 transition-colors duration-300`}>
      <div className="shrink-0 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-mono uppercase text-slate-500 tracking-wider font-bold">{label}</span>
        <span className="text-slate-200 font-extrabold mt-0.5 text-sm">{value}</span>
      </div>
    </div>
  );
}
