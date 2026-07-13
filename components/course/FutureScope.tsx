import React from 'react';
import { motion } from 'motion/react';
import { Rocket, ArrowRight } from 'lucide-react';
import type { FutureCategory } from '@/types/Course';

interface Props {
  scope: FutureCategory[];
}

export default function FutureScope({ scope }: Props) {
  return (
    <section id="future-section" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <Rocket className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">Future Scope & Pathways</h2>
          <p className="text-xs text-slate-400 mt-1">What happens after you get the degree? Explore career directions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {scope.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="premium-glass p-6 rounded-2xl transition-all duration-300 premium-glass-hover flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-xl shrink-0">
                  {item.icon || '🚀'}
                </div>
                <h3 className="text-sm md:text-base font-bold text-slate-100">{item.title}</h3>
              </div>
              
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium mb-6">
                {item.description}
              </p>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-5">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-3">Key Opportunities</span>
              {item.opportunities.map((opp, oppIdx) => (
                <div key={oppIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 font-medium">
                  <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{opp}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
