import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircleQuestion, Plus, Minus } from 'lucide-react';
import type { FAQ } from '@/types/Course';

interface Props {
  faqs: FAQ[];
}

export default function CourseFAQ({ faqs }: Props) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 rounded-2xl bg-slate-500/10 border border-slate-500/15 text-slate-400 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
          <MessageCircleQuestion className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white font-display tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-400 mt-1">Common queries regarding degree validation, eligibility, and career pathways.</p>
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <FAQItem key={idx} faq={faq} idx={idx} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ faq, idx }: { faq: FAQ; idx: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: idx * 0.05 }}
      className="premium-glass rounded-2xl overflow-hidden border border-white/[0.03] bg-white/[0.01] hover:bg-[#07080f]/40 hover:border-violet-500/20 transition-all duration-300 shadow-sm"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.01] transition-colors gap-6"
      >
        <h3 className="text-base font-extrabold text-slate-200 leading-snug">{faq.question}</h3>
        <div className={`w-8 h-8 shrink-0 rounded-xl border flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-violet-500/10 border-violet-500/20 text-violet-400 rotate-180' 
            : 'bg-white/[0.03] border-white/5 text-slate-500'
        }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed font-medium">
              <div className="h-px bg-white/5 mb-5" />
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
