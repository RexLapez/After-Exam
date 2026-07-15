import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ChevronDown, Book, Microscope, Briefcase } from 'lucide-react';
import type { Semester } from '@/types/Course';

interface Props {
  semesters: Semester[];
}

export default function SemesterRoadmap({ semesters }: Props) {
  return (
    <section id="syllabus-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-2 mb-10">
        <div className="inline-block">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pb-1.5">Academic Journey</h2>
          <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">Year-by-year breakdown of subjects, practical laboratories, and milestones.</p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-8 md:pl-12 space-y-8">
        {/* Vertical timeline glowing connecting line */}
        <div className="absolute left-[15px] md:left-[23px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-brand-primary via-brand-accent to-transparent opacity-30" />
        
        {semesters.map((sem, idx) => (
          <SemesterAccordion key={idx} semester={sem} idx={idx} isLast={idx === semesters.length - 1} />
        ))}
      </div>
    </section>
  );
}

function SemesterAccordion({ semester, idx, isLast }: { semester: Semester; idx: number; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(idx === 0); // Open first year by default

  return (
    <div className="relative">
      {/* Node bullet indicator */}
      <div className="absolute -left-[32px] md:-left-[48px] top-6 z-10 flex items-center justify-center">
        <div className={`w-[18px] h-[18px] rounded-full border-2 bg-[#07080f] transition-all duration-300 flex items-center justify-center ${
          isOpen 
            ? 'border-brand-primary scale-110' 
            : 'border-slate-700 hover:border-slate-500'
        }`}>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-brand-primary' : 'bg-slate-700'}`} />
        </div>
      </div>

      {/* Accordion Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.05 }}
        className="premium-glass rounded-2xl overflow-hidden border border-white/[0.03] bg-white/[0.015] hover:border-brand-primary/20 transition-all duration-300 shadow-md"
      >
        {/* Accordion Header Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.01] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-primary/10 border border-brand-primary/15 flex items-center justify-center font-black text-brand-primary font-display">
              Y{semester.year}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-100">{semester.title}</h3>
              {semester.description && <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-medium">{semester.description}</p>}
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-primary' : ''}`} />
        </button>

        {/* Accordion Content Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/5"
            >
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/25">
                {semester.subjects.map((subject, sIdx) => {
                  let Icon = Book;
                  let colorClass = 'text-brand-accent bg-brand-accent/5 border-brand-accent/10';
                  
                  if (subject.type === 'practical') {
                    Icon = Microscope;
                    colorClass = 'text-brand-primary bg-brand-primary/5 border-brand-primary/10';
                  } else if (subject.type === 'project' || subject.type === 'internship') {
                    Icon = Briefcase;
                    colorClass = 'text-brand-success bg-brand-success/5 border-brand-success/10';
                  }

                  return (
                    <div 
                      key={sIdx} 
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-brand-primary/20 hover:bg-white/[0.02] transition-all duration-200"
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 ${colorClass.split(' ').slice(1).join(' ')}`}>
                        <Icon className={`w-4.5 h-4.5 ${colorClass.split(' ')[0]}`} />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs md:text-sm font-bold text-slate-200 block leading-tight">{subject.name}</span>
                        <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
                          {subject.type || 'Theory'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
