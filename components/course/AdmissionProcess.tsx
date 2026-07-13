import React from 'react';
import { motion } from 'motion/react';
import { Route, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { AdmissionStep } from '@/types/Course';

interface Props {
  process: AdmissionStep[];
}

export default function AdmissionProcess({ process }: Props) {
  return (
    <section id="admission-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/15 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <Route className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white font-display tracking-tight">Admission Pathway</h2>
          <p className="text-sm text-slate-400 mt-1">Step-by-step roadmap from eligibility to college enrollment.</p>
        </div>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Glow Line Background */}
        <div className="absolute top-[48px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-blue-500/10 via-blue-500/40 to-blue-500/10 hidden lg:block z-0" />

        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 timeline-scroll-container no-scrollbar scroll-smooth relative z-10">
          {process.map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="timeline-scroll-item shrink-0 relative flex flex-col justify-between"
              >
                {/* Step Card with Connector Node above */}
                <div className="flex flex-col items-center mb-4 lg:mb-6">
                  {/* Step Bubble Node */}
                  <div className="w-12 h-12 rounded-full border-2 border-blue-500/40 bg-[#07080f] flex items-center justify-center font-black text-blue-400 font-display shadow-lg shadow-blue-950/20 group-hover:border-blue-400 transition-colors z-20">
                    0{step.step}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-2 block">
                    Phase {step.step}
                  </span>
                </div>

                {/* Step Card Content */}
                <div className="premium-glass p-6 rounded-2xl flex-1 flex flex-col justify-between border border-white/[0.03] bg-white/[0.015] hover:bg-white/[0.035] hover:border-blue-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 h-full">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-100 mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Horizontal Connecting Arrow (exclude for last item) */}
              {idx < process.length - 1 && (
                <div className="flex lg:hidden items-center justify-center text-slate-700 shrink-0 mx-2">
                  <ArrowRight className="w-5 h-5 animate-pulse text-blue-500/60" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Soft fading edges for horizontal scroll overflow indicator */}
        <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-[#020205] to-transparent pointer-events-none hidden md:block z-20" />
        <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-[#020205] to-transparent pointer-events-none hidden md:block z-20" />
      </div>
    </section>
  );
}
