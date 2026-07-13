import React from 'react';
import { motion } from 'motion/react';
import { Target, Activity } from 'lucide-react';
import type { SnapshotSection } from '@/types/Course';

interface Props {
  snapshot: SnapshotSection;
}

const getRatingColor = (rating: number) => {
  if (rating <= 2) return 'from-rose-500 to-red-500 text-rose-400 bg-rose-500/10 border-rose-500/20';
  if (rating === 3) return 'from-amber-500 to-orange-500 text-amber-400 bg-amber-500/10 border-amber-500/20';
  return 'from-emerald-500 to-cyan-500 text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
};

export default function CourseSnapshot({ snapshot }: Props) {
  return (
    <section id="snapshot-section" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">Course Snapshot</h2>
          <p className="text-xs text-slate-400 mt-1">A high-level health report of key career indicators.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {snapshot.metrics.map((metric, idx) => {
          const colorClasses = getRatingColor(metric.rating);
          const barWidth = `${metric.rating * 20}%`;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="premium-glass premium-glass-hover p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-sm font-bold text-slate-200">{metric.label}</h3>
                  <span className={`inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 ${colorClasses.split(' ').slice(2).join(' ')}`}>
                    {metric.rating.toFixed(1)} / 5.0
                  </span>
                </div>
                {metric.description && (
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">{metric.description}</p>
                )}
              </div>
              
              {/* Premium Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-white/[0.04] border border-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: barWidth }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                    className={`h-full bg-gradient-to-r rounded-full ${colorClasses.split(' ').slice(0, 2).join(' ')}`}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
