import React from 'react';
import { motion } from 'motion/react';
import { Target, TrendingUp, Briefcase, Award, GraduationCap, Globe } from 'lucide-react';
import type { SnapshotSection } from '@/types/Course';

interface Props {
  snapshot: SnapshotSection;
}

const getMetricConfig = (label: string) => {
  const lowercase = label.toLowerCase();
  if (lowercase.includes('demand')) {
    return { icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-500/5', border: 'border-violet-500/10' };
  }
  if (lowercase.includes('placement')) {
    return { icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-500/5', border: 'border-emerald-500/10' };
  }
  if (lowercase.includes('government') || lowercase.includes('govt')) {
    return { icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/5', border: 'border-amber-500/10' };
  }
  if (lowercase.includes('study') || lowercase.includes('higher')) {
    return { icon: GraduationCap, color: 'text-blue-400', bg: 'bg-blue-500/5', border: 'border-blue-500/10' };
  }
  return { icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-500/5', border: 'border-cyan-500/10' };
};

export default function CourseSnapshot({ snapshot }: Props) {
  return (
    <section id="snapshot-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/15 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white font-display tracking-tight">Course Snapshot</h2>
          <p className="text-sm text-slate-400 mt-1">A high-level health report of key career indicators.</p>
        </div>
      </div>
      
      {/* Redesigned grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {snapshot.metrics.map((metric, idx) => {
          const config = getMetricConfig(metric.label);
          const Icon = config.icon;
          const rating = Math.round(metric.rating);
          
          return (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.4, 
                    delay: idx * 0.05,
                    staggerChildren: 0.08 
                  } 
                }
              }}
              className="premium-glass premium-glass-hover p-6 md:p-8 rounded-[2rem] flex flex-col justify-between border border-white/[0.03] bg-white/[0.015] hover:bg-white/[0.035] hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/10"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${config.bg} ${config.border} ${config.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-100">{metric.label}</h3>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-extrabold shrink-0 bg-white/[0.02] border-white/5 text-slate-300`}>
                     {metric.rating.toFixed(1)} / 5.0
                  </span>
                </div>
                {metric.description && (
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{metric.description}</p>
                )}
              </div>
              
              {/* Custom Segmented Rating Indicator */}
              <div className="space-y-2.5 mt-6 border-t border-white/5 pt-5">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">
                  <span>Rating Scale</span>
                  <span className="text-slate-400">
                    {metric.rating <= 2 ? 'Low' : metric.rating <= 3.5 ? 'Moderate' : 'High'}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((step) => {
                    const isActive = step <= rating;
                    let activeBg = 'bg-gradient-to-r from-violet-500 to-cyan-400';
                    if (rating <= 2) {
                      activeBg = 'bg-gradient-to-r from-rose-500 to-red-400';
                    } else if (rating === 3) {
                      activeBg = 'bg-gradient-to-r from-amber-500 to-orange-400';
                    } else if (rating >= 4) {
                      activeBg = 'bg-gradient-to-r from-emerald-500 to-cyan-400';
                    }

                    return (
                      <div 
                        key={step} 
                        className="h-2.5 flex-1 rounded-full bg-white/[0.04] border border-white/5 overflow-hidden relative"
                      >
                        {isActive && (
                          <motion.div
                            variants={{
                              hidden: { scaleX: 0 },
                              visible: { 
                                scaleX: 1, 
                                transition: { duration: 0.4, ease: "easeOut" } 
                              }
                            }}
                            className={`h-full w-full origin-left rounded-full ${activeBg}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
