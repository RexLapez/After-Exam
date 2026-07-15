import React from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, ThumbsDown, Check, X } from 'lucide-react';

interface Props {
  goodFor: string[];
  avoidIf: string[];
}

export default function IsRightForYou({ goodFor, avoidIf }: Props) {
  return (
    <section id="fit-section" className="py-12 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-2 mb-10">
        <div className="inline-block">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pb-1.5">Is This Career Right for You?</h2>
          <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">Understand the criteria and check if your skills, interests, and career goals align with this path.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Good For */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="premium-glass p-6 rounded-3xl border-l-4 border-l-brand-success transition-all duration-300 premium-glass-hover"
        >
          <h3 className="text-sm font-bold text-brand-success tracking-wider uppercase font-display flex items-center gap-2 mb-4">
            <ThumbsUp className="w-4 h-4" />
            Good Choice If
          </h3>
          <ul className="space-y-3">
            {goodFor.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                <div className="w-5 h-5 rounded-lg bg-brand-success/10 border border-brand-success/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-brand-success" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Avoid If */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="premium-glass p-6 rounded-3xl border-l-4 border-l-brand-error transition-all duration-300 premium-glass-hover"
        >
          <h3 className="text-sm font-bold text-brand-error tracking-wider uppercase font-display flex items-center gap-2 mb-4">
            <ThumbsDown className="w-4 h-4" />
            Avoid If
          </h3>
          <ul className="space-y-3">
            {avoidIf.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                <div className="w-5 h-5 rounded-lg bg-brand-error/10 border border-brand-error/20 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 text-brand-error" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
