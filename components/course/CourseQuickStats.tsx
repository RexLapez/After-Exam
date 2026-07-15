import React from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Coins, Landmark } from 'lucide-react';
import type { OverviewSection } from '@/types/Course';

interface Props {
  overview: OverviewSection;
}

export default function CourseQuickStats({ overview }: Props) {
  const stats = [
    {
      label: 'Average Fees',
      value: overview.avgFees,
      icon: Landmark,
      color: 'text-brand-primary',
      bg: 'bg-brand-primary/5',
      border: 'border-brand-primary/10',
      desc: 'Estimated total tuition cost'
    },
    {
      label: 'Starting Salary',
      value: overview.avgSalary,
      icon: Coins,
      color: 'text-brand-accent',
      bg: 'bg-brand-accent/5',
      border: 'border-brand-accent/10',
      desc: 'Annual CTC for fresh graduates'
    },
    {
      label: 'Course Duration',
      value: overview.duration,
      icon: Clock,
      color: 'text-brand-accent',
      bg: 'bg-brand-accent/5',
      border: 'border-brand-accent/10',
      desc: 'Full-time academic term'
    },
    {
      label: 'Entrance Exams',
      value: overview.entranceExams.length > 0 ? overview.entranceExams.join(', ') : 'Direct Admission',
      icon: BookOpen,
      color: 'text-brand-hover',
      bg: 'bg-brand-hover/5',
      border: 'border-brand-hover/10',
      desc: 'Key qualifying examinations'
    }
  ];

  return (
    <section id="overview-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-2 mb-10">
        <div className="inline-block">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight pb-1.5">Quick Statistics</h2>
          <div className="h-[3px] w-12 bg-brand-primary rounded-full" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">Key metrics and details at a glance.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="premium-glass premium-glass-hover p-8 rounded-[2rem] flex flex-col justify-between min-h-[170px] group border border-border-primary bg-bg-card hover:bg-bg-elevated hover:border-brand-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25"
            >
              <div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 border ${stat.bg} ${stat.border} ${stat.color} transition-all duration-300 group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">
                  {stat.label}
                </span>
                <h3 className="text-xl font-black text-slate-100 font-display leading-tight tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-4 font-medium">
                {stat.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
