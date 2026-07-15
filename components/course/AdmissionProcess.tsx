import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import type { AdmissionStep } from '@/types/Course';

interface Props {
  process: AdmissionStep[];
}

export default function AdmissionProcess({ process }: Props) {
  if (!process || process.length === 0) return null;

  return (
    <section id="admission-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <div className="inline-block">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pb-1.5">Admission Pathway</h2>
          <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">Detailed chronological steps from high school examinations to college counseling enrollment.</p>
      </div>

      {/* Vertical Stepper Container */}
      <div className="relative pl-6 md:pl-8 space-y-12">
        {/* Vertical Stepper Connecting Track Line */}
        <div className="absolute left-[20px] md:left-[28px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-brand-primary/40 via-brand-accent/20 to-transparent pointer-events-none z-0" />

        {process.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="relative flex items-start gap-6 md:gap-8 z-10"
          >
            {/* Step Bubble Node */}
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl border-2 border-brand-primary/30 bg-bg-card flex items-center justify-center font-black text-sm md:text-base text-brand-primary font-display shadow-lg shrink-0 transition-transform group-hover:scale-105">
              0{step.step}
            </div>

            {/* Step Card Content */}
            <div className="flex-1 bg-[#141414] hover:bg-[#181818] border border-[#232323] hover:border-brand-primary/20 p-5 md:p-6 rounded-2xl transition-all duration-300 shadow-md">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                Phase 0{step.step}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-100 mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
