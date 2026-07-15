import React from 'react';
import { motion } from 'motion/react';
import { Target, TrendingUp, Briefcase, Award, GraduationCap, Globe } from 'lucide-react';
import type { SnapshotSection } from '@/types/Course';

interface Props {
  snapshot: SnapshotSection;
}

const getMetricConfig = (label: string) => {
  const lowercase = label.toLowerCase();
  if (lowercase.includes('demand')) {
    return { icon: TrendingUp, color: 'text-brand-primary', bg: 'bg-brand-primary/5', border: 'border-brand-primary/10' };
  }
  if (lowercase.includes('placement')) {
    return { icon: Briefcase, color: 'text-brand-accent', bg: 'bg-brand-accent/5', border: 'border-brand-accent/10' };
  }
  if (lowercase.includes('government') || lowercase.includes('govt')) {
    return { icon: Award, color: 'text-brand-warning', bg: 'bg-brand-warning/5', border: 'border-brand-warning/10' };
  }
  if (lowercase.includes('study') || lowercase.includes('higher')) {
    return { icon: GraduationCap, color: 'text-brand-success', bg: 'bg-brand-success/5', border: 'border-brand-success/10' };
  }
  return { icon: Globe, color: 'text-brand-hover', bg: 'bg-brand-hover/5', border: 'border-brand-hover/10' };
};

export default function CourseSnapshot({ snapshot }: Props) {
  return (
    <section id="snapshot-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-2 mb-10">
        <div className="inline-block">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pb-1.5">Course Snapshot</h2>
          <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">Key career metrics, global demand rankings, and employment indicators.</p>
      </div>

      {/* Snapshot Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snapshot.metrics.map((metric, idx) => {
          const config = getMetricConfig(metric.label);
          const Icon = config.icon;
          const rating = metric.rating;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="premium-glass p-5 rounded-2xl flex items-center justify-between border border-border-primary bg-bg-card hover:bg-bg-elevated hover:border-brand-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${config.bg} ${config.border} ${config.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-200 tracking-wide uppercase font-display leading-tight">{metric.label}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base sm:text-lg font-black text-brand-accent font-display">
                  {metric.rating}
                  <span className="text-xs text-slate-500 font-bold font-sans">/5</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
