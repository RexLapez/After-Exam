import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ChevronDown, Book, Microscope, Briefcase } from 'lucide-react';
import type { Semester } from '@/types/Course';

interface Props {
  semesters: Semester[];
}

export default function SemesterRoadmap({ semesters }: Props) {
  return (
    <section id="syllabus-section" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">Academic Journey</h2>
          <p className="text-xs text-slate-400 mt-1">Year-by-year breakdown of subjects, practical laboratories, and milestones.</p>
        </div>
      </div>

      <div className="relative pl-6 md:pl-10 space-y-6">
        {/* Vertical timeline connecting line */}
        <div className="absolute left-3.5 md:left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent opacity-30"></div>
        
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
      <div className="absolute -left-[30px] md:-left-[46px] top-6 z-10 flex items-center justify-center">
        <div className={`w-4 h-4 rounded-full border-2 border-indigo-500 bg-[#020205] transition-all duration-300 ${isOpen ? 'scale-125 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]' : ''}`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.05 }}
        className="premium-glass rounded-2xl overflow-hidden"
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-400 font-display">
              Y{semester.year}
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-slate-100">{semester.title}</h3>
              {semester.description && <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-medium">{semester.description}</p>}
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/5"
            >
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-black/30">
                {semester.subjects.map((subject, sIdx) => {
                  let Icon = Book;
                  let colorClass = 'text-slate-400 bg-slate-500/10 border-slate-500/20';
                  
                  if (subject.type === 'practical') {
                    Icon = Microscope;
                    colorClass = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
                  } else if (subject.type === 'project' || subject.type === 'internship') {
                    Icon = Briefcase;
                    colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
                  }

                  return (
                    <div 
                      key={sIdx} 
                      className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.015] border border-white/5 hover:border-indigo-500/20 transition-all duration-200"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${colorClass.split(' ').slice(1).join(' ')}`}>
                        <Icon className={`w-4 h-4 ${colorClass.split(' ')[0]}`} />
                      </div>
                      <div>
                        <span className="text-xs md:text-sm font-bold text-slate-200 block leading-tight">{subject.name}</span>
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1 block">
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
