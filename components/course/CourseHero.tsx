import React from 'react';
import { motion } from 'motion/react';
import { Clock, GraduationCap, Coins, CheckCircle2, AlertTriangle, ArrowLeftRight, Bookmark, Share2, Award } from 'lucide-react';
import type { HeroSection } from '@/types/Course';

interface Props {
  hero: HeroSection;
  category: string;
  categoryEmoji?: string;
}

const difficultyColor: Record<string, { text: string; bg: string; border: string }> = {
  Easy: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  Moderate: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  Hard: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  'Very Hard': { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
};

export default function CourseHero({ hero, category, categoryEmoji }: Props) {
  const diffStyle = difficultyColor[hero.difficulty] || { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };

  return (
    <section id="hero-section" className="relative pt-12 pb-16 overflow-hidden rounded-3xl mb-12">
      {/* Background soft glow gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/10 blur-[100px] animate-pulse-slow" />
        <div className="absolute top-10 -right-40 w-80 h-80 rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-violet-500/15 bg-violet-500/5 text-violet-400 text-xs font-bold uppercase tracking-widest font-display">
            <span>{categoryEmoji}</span>
            <span>{category}</span>
          </span>
        </motion.div>

        {/* Title & Description */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-display leading-[1.1] pb-1"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-3xl font-medium"
          >
            {hero.subtitle}
          </motion.p>
        </div>

        {/* Elegant badged Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3 pt-4"
        >
          <HeroBadge icon={<Clock className="w-4 h-4 text-blue-400" />} label="Duration" value={hero.duration} />
          <HeroBadge icon={<GraduationCap className="w-4 h-4 text-violet-400" />} label="Degree" value={hero.degree} />
          <HeroBadge icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} label="Eligibility" value={hero.eligibility} />
          <HeroBadge icon={<Coins className="w-4 h-4 text-cyan-400" />} label="Salary (Avg)" value={hero.avgSalary} />
          <HeroBadge 
            icon={<Award className={`w-4 h-4 ${diffStyle.text}`} />} 
            label="Difficulty" 
            value={hero.difficulty} 
            customClass={`${diffStyle.bg} ${diffStyle.border}`}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 pt-6"
        >
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-bold shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5">
            <ArrowLeftRight className="w-4.5 h-4.5" />
            <span>Compare Course</span>
          </button>
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl premium-glass premium-glass-hover text-slate-300 hover:text-white text-sm font-bold transition-all duration-200">
            <Bookmark className="w-4.5 h-4.5" />
            <span>Bookmark</span>
          </button>
          <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl premium-glass premium-glass-hover text-slate-300 hover:text-white text-sm font-bold transition-all duration-200">
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
    <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border ${customClass || 'border-white/5 bg-white/[0.02]'} text-xs font-semibold`}>
      <div className="shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-mono uppercase text-slate-500 tracking-wider font-semibold">{label}</span>
        <span className="text-slate-200 font-bold mt-0.5">{value}</span>
      </div>
    </div>
  );
}
