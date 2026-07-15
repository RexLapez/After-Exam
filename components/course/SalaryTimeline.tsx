import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, IndianRupee, ArrowRight, ShieldCheck, ChevronRight, Briefcase } from 'lucide-react';
import type { SalaryPoint } from '@/types/Course';

interface Props {
  timeline: SalaryPoint[];
}

export default function SalaryTimeline({ timeline }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!timeline || timeline.length === 0) return null;

  const currentPoint = timeline[activeIdx];

  // Helper to parse role responsibilities based on title/label
  const getResponsibilities = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes('entry') || lower.includes('junior') || lower.includes('intern')) {
      return [
        'Assisting senior specialists in daily operations',
        'Executing fundamental research and analysis scripts',
        'Preparing clinical reports and coordinating case studies'
      ];
    }
    if (lower.includes('mid') || lower.includes('associate')) {
      return [
        'Managing independent research projects or patient blocks',
        'Implementing data compliance and standard clinical procedures',
        'Troubleshooting software or biological workflow bottlenecks'
      ];
    }
    return [
      'Leading teams of engineers, researchers, or clinical assistants',
      'Approving final diagnostic releases or system architectures',
      'Interfacing with regional heads and international regulatory bodies'
    ];
  };

  return (
    <section id="salary-section" className="py-16 scroll-mt-24 w-full">
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <div className="inline-block">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pb-1.5">Salary Progression</h2>
          <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">Interactive growth roadmap. Select a professional career tier to view average package benchmarks.</p>
      </div>

      {/* Stepper Track Selector */}
      <div className="relative mb-10 pb-4">
        {/* Horizontal Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-[2px] bg-slate-800/80 rounded-full z-0">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-primary transition-all duration-500" 
            style={{ width: `${(activeIdx / (timeline.length - 1)) * 100}%` }}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4 relative z-10">
          {timeline.map((point, idx) => {
            const isActive = idx === activeIdx;
            const isCompleted = idx < activeIdx;

            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className="flex items-center md:flex-col gap-4 md:gap-3 flex-1 text-left md:text-center group focus:outline-none"
              >
                {/* Stepper Bullet Node */}
                <div 
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all duration-300 font-mono text-xs font-black ${
                    isActive 
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(209,72,54,0.2)] scale-105' 
                      : isCompleted
                      ? 'bg-slate-900 border-[#22C55E] text-[#22C55E]'
                      : 'bg-[#121212] border-slate-800 text-slate-500 group-hover:border-slate-700 group-hover:text-slate-300'
                  }`}
                >
                  {isCompleted ? '✓' : `0${idx + 1}`}
                </div>

                {/* Level Title Label */}
                <div className="space-y-0.5">
                  <span className={`text-xs font-black tracking-wider uppercase font-display block transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                  }`}>
                    {point.label}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 font-mono block">
                    {idx === 0 ? '0-2 Yrs Exp' : idx === 1 ? '3-6 Yrs Exp' : '7+ Yrs Exp'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-[#141414] border border-[#232323] rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-stretch shadow-xl"
        >
          {/* Left Column: Salary Display */}
          <div className="flex-1 flex flex-col justify-between p-6 bg-white/[0.015] border border-white/[0.04] rounded-2xl">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Annual CTC Bracket</span>
              <div className="text-4xl md:text-5xl font-black text-brand-accent tracking-tight font-display flex items-center gap-1.5 pb-2 border-b border-white/5">
                <IndianRupee className="w-8 h-8 stroke-[3]" />
                {currentPoint.range.replace(/^₹\s*/, '')}
              </div>
              {currentPoint.description && (
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  {currentPoint.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 pt-6 text-xs font-semibold text-slate-400">
              <TrendingUp className="w-4.5 h-4.5 text-brand-primary" />
              <span>Higher growth potential based on clinical certifications and specialized domain expertise.</span>
            </div>
          </div>

          {/* Right Column: Roles & Expectations */}
          <div className="flex-1 flex flex-col justify-between py-2">
            <div className="space-y-5">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2 font-display">
                <Briefcase className="w-4.5 h-4.5 text-brand-primary" />
                Responsibilities & Work Scope
              </h3>
              <ul className="space-y-3.5">
                {getResponsibilities(currentPoint.label).map((resp, rIdx) => (
                  <li key={rIdx} className="flex gap-3 text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                    <div className="w-5 h-5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <ChevronRight className="w-3.5 h-3.5 text-brand-primary" />
                    </div>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-white/5 text-[10px] font-semibold text-slate-400 rounded-md border border-white/5">High Growth</span>
              <span className="px-2.5 py-1 bg-white/5 text-[10px] font-semibold text-slate-400 rounded-md border border-white/5">Flexible Hours</span>
              <span className="px-2.5 py-1 bg-white/5 text-[10px] font-semibold text-slate-400 rounded-md border border-white/5">Global Options</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
