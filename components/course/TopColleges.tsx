import React from 'react';
import { motion } from 'motion/react';
import { Building2, MapPin, ExternalLink, Trophy, IndianRupee, ArrowLeftRight } from 'lucide-react';
import { getCollegesByIds } from '@/data/colleges';

interface Props {
  collegeIds: string[];
}

export default function TopColleges({ collegeIds }: Props) {
  const colleges = getCollegesByIds(collegeIds);

  if (!colleges || colleges.length === 0) return null;

  return (
    <section id="colleges-section" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">Top Institutions</h2>
          <p className="text-xs text-slate-400 mt-1">Leading colleges offering this course with average fees and placement statistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {colleges.map((college, idx) => (
          <motion.div
            key={college.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="premium-glass p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 premium-glass-hover group h-full"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${
                  college.type === 'Government' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  {college.type}
                </span>
                {college.nirfRank && (
                  <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                    <Trophy className="w-3.5 h-3.5" />
                    NIRF #{college.nirfRank}
                  </span>
                )}
              </div>
              
              <h3 className="text-base font-bold text-slate-100 mb-1.5 group-hover:text-orange-400 transition-colors leading-snug">
                {college.name}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-600" /> {college.location}
              </p>
            </div>

            <div>
              <div className="space-y-2.5 mb-6 border-t border-white/5 pt-4">
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-slate-500 font-semibold">Average Fees</span>
                  <span className="font-extrabold text-slate-200">{college.fees}</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-slate-500 font-semibold">Average Package</span>
                  <span className="font-extrabold text-emerald-400 flex items-center gap-0.5">
                    {college.avgPackage}
                  </span>
                </div>
              </div>

              <div className="flex gap-2.5">
                {college.website && (
                  <a 
                    href={college.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 text-xs font-bold text-slate-300 transition-all duration-200"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}
                <button className="flex-1 py-3 px-4 flex items-center justify-center gap-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 text-xs font-bold text-orange-400 transition-all duration-200">
                  <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
                  <span>Compare</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
