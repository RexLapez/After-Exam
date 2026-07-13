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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Good For */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="premium-glass p-6 rounded-3xl border-l-4 border-l-emerald-500 transition-all duration-300 premium-glass-hover"
        >
          <h3 className="text-sm font-bold text-emerald-400 tracking-wider uppercase font-display flex items-center gap-2 mb-4">
            <ThumbsUp className="w-4 h-4" />
            Good Choice If
          </h3>
          <ul className="space-y-3">
            {goodFor.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                <div className="w-5 h-5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
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
          className="premium-glass p-6 rounded-3xl border-l-4 border-l-rose-500 transition-all duration-300 premium-glass-hover"
        >
          <h3 className="text-sm font-bold text-rose-400 tracking-wider uppercase font-display flex items-center gap-2 mb-4">
            <ThumbsDown className="w-4 h-4" />
            Avoid If
          </h3>
          <ul className="space-y-3">
            {avoidIf.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                <div className="w-5 h-5 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 text-rose-500" />
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
