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
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      desc: 'Estimated total tuition cost'
    },
    {
      label: 'Starting Salary',
      value: overview.avgSalary,
      icon: Coins,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      desc: 'Annual CTC for fresh graduates'
    },
    {
      label: 'Course Duration',
      value: overview.duration,
      icon: Clock,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      desc: 'Full-time academic term'
    },
    {
      label: 'Entrance Exams',
      value: overview.entranceExams.length > 0 ? overview.entranceExams.join(', ') : 'Direct Admission',
      icon: BookOpen,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      desc: 'Key qualifying examinations'
    }
  ];

  return (
    <section id="overview-section" className="py-12 scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
          <Landmark className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">Quick Statistics</h2>
          <p className="text-xs text-slate-400 mt-1">Key metrics and details at a glance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="premium-glass premium-glass-hover p-6 rounded-2xl flex flex-col justify-between h-full"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${stat.bg} ${stat.border} ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1 block">
                  {stat.label}
                </span>
                <span className="text-lg font-black text-slate-100 font-display leading-tight block">
                  {stat.value}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-3 font-medium block">
                {stat.desc}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
