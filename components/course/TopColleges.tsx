import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, MapPin, ExternalLink, Trophy, IndianRupee, ArrowLeftRight } from 'lucide-react';
import { getCollegesByIds } from '@/data/colleges';

interface Props {
  collegeIds: string[];
}

export default function TopColleges({ collegeIds }: Props) {
  const colleges = getCollegesByIds(collegeIds);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  if (!colleges || colleges.length === 0) return null;

  const handleCompareToggle = (id: string) => {
    setComparedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const firstCollege = colleges.find(c => c.id === comparedIds[0]);
  const secondCollege = colleges.find(c => c.id === comparedIds[1]);

  return (
    <section id="colleges-section" className="py-16 scroll-mt-24 relative">
      {/* Section Header */}
      <div className="space-y-2 mb-10">
        <div className="inline-block">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pb-1.5">Top Institutions</h2>
          <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">Leading colleges offering this course with average fees and placement statistics.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college, idx) => {
          const isCompared = comparedIds.includes(college.id);
          return (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`premium-glass p-6 md:p-8 rounded-[2rem] flex flex-col justify-between border bg-bg-card hover:bg-[#181818] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 group h-full ${
                isCompared ? 'border-brand-primary/50' : 'border-border-primary'
              }`}
            >
              <div>
                {/* Card Badges */}
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1.5 rounded-lg border uppercase tracking-wider ${
                    college.type === 'Government' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-brand-accent/10 text-brand-accent border-brand-accent/20'
                  }`}>
                    {college.type}
                  </span>
                  {college.nirfRank && (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-lg">
                      <Trophy className="w-3.5 h-3.5" />
                      NIRF #{college.nirfRank}
                    </span>
                  )}
                </div>
                
                {/* College details */}
                <h3 className="text-lg font-extrabold text-slate-100 mb-2 group-hover:text-brand-accent transition-colors leading-snug">
                  {college.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-2 mb-6 font-medium">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0" /> 
                  <span>{college.location}</span>
                </p>
              </div>

              {/* Metrics List */}
              <div>
                <div className="space-y-3 mb-6 border-t border-white/5 pt-5">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-slate-500 font-bold">Average Fees</span>
                    <span className="font-extrabold text-slate-200">{college.fees}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <span className="text-slate-500 font-bold">Average Package</span>
                    <span className="font-extrabold text-brand-accent flex items-center gap-0.5">
                      {college.avgPackage}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {college.website && (
                    <a 
                      href={college.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 h-11 px-4 flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 hover:-translate-y-0.5 active:translate-y-0 text-xs font-bold text-slate-300 transition-all duration-200"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  )}
                  <button 
                    onClick={() => handleCompareToggle(college.id)}
                    className={`flex-1 h-11 px-4 flex items-center justify-center gap-1.5 rounded-xl border hover:-translate-y-0.5 active:translate-y-0 text-xs font-bold transition-all duration-200 ${
                      isCompared 
                        ? 'bg-brand-primary text-white border-brand-primary' 
                        : 'bg-orange-500/10 border-orange-500/15 text-orange-400 hover:bg-orange-500/20'
                    }`}
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
                    <span>{isCompared ? 'Added' : 'Compare'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky Bottom Compare Drawer */}
      <AnimatePresence>
        {comparedIds.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-xl"
          >
            <div className="bg-[#141414] border border-brand-primary/30 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-between shadow-2xl shadow-black/80">
              <div className="flex flex-col gap-0.5 max-w-[65%]">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Compare Institutions ({comparedIds.length}/2)</span>
                <span className="text-xs font-semibold text-slate-200 truncate">
                  {firstCollege ? firstCollege.name : ''} 
                  {secondCollege ? ` vs ${secondCollege.name}` : ''}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setComparedIds([])}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
                <button 
                  disabled={comparedIds.length < 2}
                  onClick={() => setShowModal(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    comparedIds.length === 2 
                      ? 'bg-brand-primary hover:bg-brand-hover text-white cursor-pointer' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Compare Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal Dialog */}
      <AnimatePresence>
        {showModal && comparedIds.length === 2 && firstCollege && secondCollege && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#121212] border border-[#2A2A2A] rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-black text-white font-display mb-6 border-b border-white/5 pb-4">Institution Comparison</h3>
              
              <div className="grid grid-cols-3 gap-4 text-[10px] sm:text-xs md:text-sm font-semibold">
                {/* Headers */}
                <div className="text-slate-500 font-bold">Metric</div>
                <div className="text-brand-primary font-black leading-tight truncate" title={firstCollege.name}>{firstCollege.name}</div>
                <div className="text-brand-accent font-black leading-tight truncate" title={secondCollege.name}>{secondCollege.name}</div>

                <div className="border-t border-white/5 py-3 text-slate-500 font-bold">Type</div>
                <div className="border-t border-white/5 py-3 text-slate-300">{firstCollege.type}</div>
                <div className="border-t border-white/5 py-3 text-slate-300">{secondCollege.type}</div>

                <div className="border-t border-white/5 py-3 text-slate-500 font-bold">NIRF Rank</div>
                <div className="border-t border-white/5 py-3 text-slate-300">#{firstCollege.nirfRank || 'N/A'}</div>
                <div className="border-t border-white/5 py-3 text-slate-300">#{secondCollege.nirfRank || 'N/A'}</div>

                <div className="border-t border-white/5 py-3 text-slate-500 font-bold">Location</div>
                <div className="border-t border-white/5 py-3 text-slate-300">{firstCollege.location}</div>
                <div className="border-t border-white/5 py-3 text-slate-300">{secondCollege.location}</div>

                <div className="border-t border-white/5 py-3 text-slate-500 font-bold">Average Fees</div>
                <div className="border-t border-white/5 py-3 text-slate-300">{firstCollege.fees}</div>
                <div className="border-t border-white/5 py-3 text-slate-300">{secondCollege.fees}</div>

                <div className="border-t border-white/5 py-3 text-slate-500 font-bold">Average Package</div>
                <div className="border-t border-white/5 py-3 text-brand-accent">{firstCollege.avgPackage}</div>
                <div className="border-t border-white/5 py-3 text-brand-accent">{secondCollege.avgPackage}</div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-white/5 pt-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white transition-colors"
                >
                  Close Comparison
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
