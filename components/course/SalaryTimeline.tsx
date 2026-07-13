import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, IndianRupee } from 'lucide-react';
import type { SalaryPoint } from '@/types/Course';

interface Props {
  timeline: SalaryPoint[];
}

export default function SalaryTimeline({ timeline }: Props) {
  return (
    <section id="salary-section" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">Salary Progression</h2>
          <p className="text-xs text-slate-400 mt-1">Expected salary growth and benchmark scales based on industry experience.</p>
        </div>
      </div>

      <div className="relative pl-6 md:pl-0 mt-8">
        {/* Desktop horizontal track line */}
        <div className="hidden md:block absolute top-[10px] left-10 right-10 h-0.5 bg-slate-800/80 rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 opacity-40 rounded-full"></div>
        </div>

        {/* Mobile vertical track line */}
        <div className="md:hidden absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-800/80 rounded-full">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500 via-cyan-500 to-violet-500 opacity-40 rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-5 relative z-10">
          {timeline.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex md:flex-col items-start md:items-center text-left md:text-center relative pl-8 md:pl-0 flex-1"
            >
              {/* Stepper Node bullet */}
              <div className="absolute left-1 md:left-auto top-1.5 md:top-auto md:relative w-5 h-5 rounded-full bg-[#020205] border-2 border-emerald-400 z-10 shadow-[0_0_10px_rgba(52,211,153,0.5)] md:mb-6"></div>
              
              {/* Stat card */}
              <div className="premium-glass p-5 rounded-2xl w-full transition-all duration-300 premium-glass-hover">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  {point.label}
                </span>
                <span className="text-sm md:text-base font-black text-emerald-400 block mb-1.5 flex items-center md:justify-center gap-0.5">
                  <IndianRupee className="w-4 h-4 shrink-0 stroke-[3]" />
                  {point.range.replace(/^₹\s*/, '')}
                </span>
                {point.description && (
                  <span className="text-xs text-slate-400 leading-relaxed block font-medium">
                    {point.description}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
