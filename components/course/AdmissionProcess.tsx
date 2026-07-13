import React from 'react';
import { motion } from 'motion/react';
import { Route, ArrowRight } from 'lucide-react';
import type { AdmissionStep } from '@/types/Course';

interface Props {
  process: AdmissionStep[];
}

export default function AdmissionProcess({ process }: Props) {
  return (
    <section id="admission-section" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
          <Route className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">Admission Pathway</h2>
          <p className="text-xs text-slate-400 mt-1">Step-by-step roadmap from eligibility to college enrollment.</p>
        </div>
      </div>

      {/* Horizontal scroll timeline container */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 timeline-scroll-container no-scrollbar scroll-smooth">
          {process.map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="timeline-scroll-item shrink-0 relative flex flex-col justify-between"
              >
                {/* Step Card */}
                <div className="premium-glass p-6 rounded-2xl flex-1 flex flex-col justify-between transition-all duration-300 premium-glass-hover h-full">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-black text-blue-400 font-display">
                        0{step.step}
                      </div>
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Phase {step.step}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-bold text-slate-100 mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Connecting arrow indicator (exclude for last item) */}
              {idx < process.length - 1 && (
                <div className="flex items-center justify-center text-slate-700 shrink-0">
                  <ArrowRight className="w-6 h-6 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Soft fading edges for horizontal scroll overflow indicator */}
        <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-[#020205] to-transparent pointer-events-none hidden md:block" />
        <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-[#020205] to-transparent pointer-events-none hidden md:block" />
      </div>
    </section>
  );
}
