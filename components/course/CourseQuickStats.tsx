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
      color: 'text-violet-400',
      bg: 'bg-violet-500/5',
      border: 'border-violet-500/10',
      desc: 'Estimated total tuition cost'
    },
    {
      label: 'Starting Salary',
      value: overview.avgSalary,
      icon: Coins,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/10',
      desc: 'Annual CTC for fresh graduates'
    },
    {
      label: 'Course Duration',
      value: overview.duration,
      icon: Clock,
      color: 'text-blue-400',
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/10',
      desc: 'Full-time academic term'
    },
    {
      label: 'Entrance Exams',
      value: overview.entranceExams.length > 0 ? overview.entranceExams.join(', ') : 'Direct Admission',
      icon: BookOpen,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/5',
      border: 'border-cyan-500/10',
      desc: 'Key qualifying examinations'
    }
  ];

  return (
    <section id="overview-section" className="py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/15 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
          <Landmark className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white font-display tracking-tight">Quick Statistics</h2>
          <p className="text-sm text-slate-400 mt-1">Key metrics and details at a glance.</p>
        </div>
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
              className="premium-glass premium-glass-hover p-8 rounded-[2rem] flex flex-col justify-between min-h-[170px] group border border-white/[0.03] bg-white/[0.015] hover:bg-white/[0.035] hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/10"
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
