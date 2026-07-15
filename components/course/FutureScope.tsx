import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Landmark, GraduationCap, Globe } from 'lucide-react';
import type { FutureCategory } from '@/types/Course';

interface Props {
  scope: FutureCategory[];
}

export default function FutureScope({ scope }: Props) {
  // Define 4 target sectors
  const sectorConfigs = [
    { 
      key: 'Government', 
      title: 'Government Sector', 
      icon: Landmark,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/10',
      desc: 'Public sector administration, national labs, defense services, and state healthcare commissions.',
      defaultOpps: ['UPSC Civil Services & State PSCs', 'Staff Selection Commission (SSC) Scientific Assistant', 'Scientist positions in national regulatory laboratories']
    },
    { 
      key: 'Private', 
      title: 'Private Sector', 
      icon: Building2,
      color: 'text-brand-accent',
      bg: 'bg-brand-accent/5',
      border: 'border-brand-accent/10',
      desc: 'Corporate industries, healthcare startups, clinical development consulting, and technology roles.',
      defaultOpps: ['Corporate Operations & Sales Manager', 'Healthcare Business Consultant', 'Technical Product & Project Manager']
    },
    { 
      key: 'Research', 
      title: 'Research & Academia', 
      icon: GraduationCap,
      color: 'text-brand-primary',
      bg: 'bg-brand-primary/5',
      border: 'border-brand-primary/10',
      desc: 'Advanced molecular research, fellowships, laboratory testing developments, and university teaching.',
      defaultOpps: ['Research Assistant / Fellow (JRF/SRF)', 'PhD Programs in premier national institutes', 'R&D Bio-lab Scientist']
    },
    { 
      key: 'Abroad', 
      title: 'Global Opportunities', 
      icon: Globe,
      color: 'text-brand-hover',
      bg: 'bg-brand-hover/5',
      border: 'border-brand-hover/10',
      desc: 'International licensing exams, higher studies fellowships, global healthcare consultancies, and clinical practice.',
      defaultOpps: ['Higher Education (MS/PhD) at foreign universities', 'Global practice licenses & certifications', 'Clinical consultant for international health brands']
    }
  ];

  // Map incoming scope data to these 4 quadrants
  const quadrantData = sectorConfigs.map(sec => {
    // Find matching item in scope list
    const matched = scope.find(item => {
      const title = item.title.toLowerCase();
      const desc = item.description.toLowerCase();
      if (sec.key === 'Government') {
        return title.includes('govt') || title.includes('government') || title.includes('civil') || desc.includes('public sector');
      }
      if (sec.key === 'Private') {
        return title.includes('private') || title.includes('corporate') || title.includes('industry') || desc.includes('company') || desc.includes('corporate');
      }
      if (sec.key === 'Research') {
        return title.includes('research') || title.includes('academia') || title.includes('studies') || title.includes('higher') || desc.includes('university') || desc.includes('study');
      }
      if (sec.key === 'Abroad') {
        return title.includes('abroad') || title.includes('global') || title.includes('foreign') || desc.includes('international') || desc.includes('abroad');
      }
      return false;
    });

    return {
      title: sec.title,
      icon: sec.icon,
      color: sec.color,
      bg: sec.bg,
      border: sec.border,
      description: matched ? matched.description : sec.desc,
      opportunities: matched && matched.opportunities.length > 0 ? matched.opportunities : sec.defaultOpps
    };
  });

  return (
    <section id="future-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <div className="inline-block">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pb-1.5">Future Scope & Sectors</h2>
          <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">Explore career paths across the four major professional domains after graduation.</p>
      </div>

      {/* Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quadrantData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#141414] border border-[#232323] hover:border-[#333] hover:-translate-y-0.5 p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between h-full shadow-md"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${item.bg} ${item.border} ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-100 font-display">{item.title}</h3>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium mb-6">
                  {item.description}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/5 pt-5">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-2">Key Opportunities</span>
                {item.opportunities.map((opp, oppIdx) => (
                  <div key={oppIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-medium">
                    <ArrowRight className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                    <span>{opp}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
